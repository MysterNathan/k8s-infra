package handlers

import (
	"backend/services/auth-service/internal/models"
	"backend/services/auth-service/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

type AuthHandler struct {
	authService *services.AuthService
}

func NewAuthHandler(authService *services.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

func (h *AuthHandler) ValidateToken(c *gin.Context) {
	// Récupérer le token depuis le header Authorization
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"valid": false, "error": "Token manquant"})
		return
	}

	// Retirer "Bearer " du token
	if len(token) > 7 && token[:7] == "Bearer " {
		token = token[7:]
	}

	// Valider le token
	claims, err := h.authService.ValidateToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"valid": false, "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"valid":    true,
		"user_id":  claims.UserID,
		"username": claims.Username,
		"role":     claims.Role,
	})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var loginReq models.LoginRequest
	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Données invalides"})
		return
	}

	response, err := h.authService.Login(loginReq.Username, loginReq.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response)
}

func (h *AuthHandler) GetProfile(c *gin.Context) {
	// Récupérer l'ID utilisateur depuis le middleware
	userIDInterface, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalide"})
		return
	}

	// Récupérer l'ID utilisateur (adapté pour int au lieu de uint)
	userID, ok := userIDInterface.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur interne"})
		return
	}

	// Utiliser GetUserProfile qui retourne déjà l'utilisateur sans mot de passe
	user, err := h.authService.GetUserProfile(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Utilisateur non trouvé"})
		return
	}

	// Retourner directement l'utilisateur (le mot de passe est déjà omis)
	c.JSON(http.StatusOK, user)
}

func (h *AuthHandler) Register(c *gin.Context) {
	var registerReq models.RegisterRequest
	if err := c.ShouldBindJSON(&registerReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Données invalides"})
		return
	}
	response, err := h.authService.Register(registerReq.Username, registerReq.Email, registerReq.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, response)
}
