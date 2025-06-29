package services

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"

	"backend/internal/config"
	"backend/internal/models"
	"backend/internal/repository"
)

type AuthService struct {
	userRepo   *repository.UserRepository
	jwtSecret  string
	jwtExpires int
}

// Claims JWT personnalisés
type Claims struct {
	UserID   int    `json:"user_id"`
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

func NewAuthService(userRepo *repository.UserRepository, cfg *config.Config) *AuthService {
	return &AuthService{
		userRepo:   userRepo,
		jwtSecret:  cfg.JWT.SecretKey,
		jwtExpires: cfg.JWT.ExpiresIn,
	}
}

func (s *AuthService) Login(username, password string) (*models.LoginResponse, error) {
	// Récupérer l'utilisateur par son nom d'utilisateur
	user, err := s.userRepo.GetByUsername(username)
	if err != nil {
		return nil, errors.New("nom d'utilisateur ou mot de passe incorrect")
	}

	// Vérifier le mot de passe
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, errors.New("nom d'utilisateur ou mot de passe incorrect")
	}

	// Générer le token JWT
	token, err := s.generateJWT(user)
	if err != nil {
		return nil, errors.New("erreur lors de la génération du token")
	}

	// Créer la réponse (sans le mot de passe)
	userResponse := models.User{
		ID:        user.ID,
		Username:  user.Username,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		// Password omis volontairement
	}

	return &models.LoginResponse{
		Token: token,
		User:  userResponse,
	}, nil
}

func (s *AuthService) generateJWT(user *models.User) (string, error) {
	// Créer les claims personnalisés
	claims := &Claims{
		UserID:   user.ID,
		Username: user.Username,
		Role:     user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * time.Duration(s.jwtExpires))),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "portfolio-backend",
			Subject:   user.Username,
			ID:        string(rune(user.ID)), // JWT ID basé sur l'ID utilisateur
		},
	}

	// Créer le token avec la méthode HMAC SHA256
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Signer le token avec la clé secrète
	return token.SignedString([]byte(s.jwtSecret))
}

func (s *AuthService) ValidateToken(tokenString string) (*Claims, error) {
	// Parser le token avec validation des claims
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// Vérifier que la méthode de signature est HMAC
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("méthode de signature invalide")
		}
		return []byte(s.jwtSecret), nil
	})

	if err != nil {
		return nil, err
	}

	// Extraire et valider les claims
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, errors.New("token invalide")
}

func (s *AuthService) GetUserByID(userID int) (*models.User, error) {
	user, err := s.userRepo.GetByID(userID)
	if err != nil {
		return nil, errors.New("utilisateur non trouvé")
	}

	return user, nil
}

func (s *AuthService) GetUserProfile(userID int) (*models.User, error) {
	user, err := s.GetUserByID(userID)
	if err != nil {
		return nil, err
	}

	// Retourner l'utilisateur sans le mot de passe
	profileUser := &models.User{
		ID:        user.ID,
		Username:  user.Username,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		// Password omis volontairement
	}

	return profileUser, nil
}

// Méthode utilitaire pour vérifier si un utilisateur existe
func (s *AuthService) UserExists(username string) (bool, error) {
	_, err := s.userRepo.GetByUsername(username)
	if err != nil {
		return false, nil
	}
	return true, nil
}

// Méthode pour valider la force du mot de passe
func (s *AuthService) ValidatePasswordStrength(password string) error {
	if len(password) < 8 {
		return errors.New("le mot de passe doit contenir au moins 8 caractères")
	}

	// Tu peux ajouter d'autres règles de validation ici
	// - Au moins une majuscule
	// - Au moins un chiffre
	// - Au moins un caractère spécial
	// etc.

	return nil
}

// Méthode pour rafraîchir un token (future fonctionnalité)
func (s *AuthService) RefreshToken(oldTokenString string) (string, error) {
	// Valider l'ancien token
	claims, err := s.ValidateToken(oldTokenString)
	if err != nil {
		return "", errors.New("token invalide")
	}

	// Récupérer l'utilisateur pour s'assurer qu'il existe toujours
	user, err := s.GetUserByID(claims.UserID)
	if err != nil {
		return "", errors.New("utilisateur non trouvé")
	}

	// Générer un nouveau token
	return s.generateJWT(user)
}

func (s *AuthService) Register(username, email, password string) (*models.RegisterResponse, error) {
	// Valider la force du mot de passe
	if err := s.ValidatePasswordStrength(password); err != nil {
		return nil, err
	}

	// Vérifier si le nom d'utilisateur existe déjà
	exists, err := s.userRepo.ExistsByUsername(username)
	if err != nil {
		return nil, errors.New("erreur lors de la vérification du nom d'utilisateur")
	}
	if exists {
		return nil, errors.New("ce nom d'utilisateur est déjà utilisé")
	}

	// Vérifier si l'email existe déjà
	exists, err = s.userRepo.ExistsByEmail(email)
	if err != nil {
		return nil, errors.New("erreur lors de la vérification de l'email")
	}
	if exists {
		return nil, errors.New("cet email est déjà utilisé")
	}

	// Hasher le mot de passe
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("erreur lors du hashage du mot de passe")
	}

	// Créer l'utilisateur
	user := &models.User{
		Username: username,
		Email:    email,
		Password: string(hashedPassword),
		Role:     "user", // Rôle par défaut
	}

	// Enregistrer en base de données
	if err := s.userRepo.Create(user); err != nil {
		return nil, errors.New("erreur lors de la création de l'utilisateur")
	}

	// Créer la réponse (sans le mot de passe)
	userResponse := models.User{
		ID:        user.ID,
		Username:  user.Username,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}

	return &models.RegisterResponse{
		Message: "Utilisateur créé avec succès",
		User:    userResponse,
	}, nil
}
