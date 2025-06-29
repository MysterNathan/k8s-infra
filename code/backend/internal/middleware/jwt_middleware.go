package middleware

import (
	"backend/internal/models"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// JWTSecret - En production, utilisez une variable d'environnement !
var JWTSecret = []byte("votre-secret-super-securise-ici")

// Claims représente les données stockées dans le JWT
type Claims struct {
	UserID   int    `json:"user_id"`
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

// GenerateToken génère un JWT pour un utilisateur
func GenerateToken(user models.User) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour) // 24h

	claims := &Claims{
		UserID:   user.ID,
		Username: user.Username,
		Role:     user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "portfolio-backend",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JWTSecret)
}

// ValidateToken valide et decode un JWT
func ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return JWTSecret, nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("token invalide")
	}

	return claims, nil
}

// ExtractTokenFromHeader extrait le token du header Authorization
func ExtractTokenFromHeader(authHeader string) string {
	if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
		return authHeader[7:]
	}
	return ""
}
