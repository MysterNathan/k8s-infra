package middleware

import (
	"backend/services/auth-service/internal/services"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthRequired(authService *services.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Récupérer le header Authorization
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token d'authentification requis"})
			c.Abort()
			return
		}

		// Vérifier le format Bearer
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Format token invalide"})
			c.Abort()
			return
		}

		// Valider le token
		claims, err := authService.ValidateToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalide"})
			c.Abort()
			return
		}

		// Stocker les informations utilisateur dans le contexte
		c.Set("userID", claims.ID)
		c.Set("username", claims.Username)
		c.Set("role", claims.Role)

		c.Next()
	}
}

// Middleware pour les admins seulement
func AdminRequired(authService *services.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		// D'abord vérifier l'authentification
		AuthRequired(authService)(c)

		if c.IsAborted() {
			return
		}

		// Vérifier le rôle admin
		role, exists := c.Get("role")
		if !exists || role != "admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Accès admin requis"})
			c.Abort()
			return
		}

		c.Next()
	}
}
