// shared/middleware/auth_middleware.go
package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type AuthClient interface {
	ValidateToken(token string) (*ValidateTokenResponse, error)
}

type ValidateTokenResponse struct {
	Valid    bool   `json:"valid"`
	UserID   int    `json:"user_id"`
	Username string `json:"username"`
	Role     string `json:"role"`
}

func AuthMiddleware(authClient AuthClient) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token d'autorisation manquant"})
			c.Abort()
			return
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)

		// Appel au service d'authentification
		response, err := authClient.ValidateToken(tokenString)
		if err != nil || !response.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalide"})
			c.Abort()
			return
		}

		// Stocker les informations utilisateur dans le contexte
		c.Set("userID", response.UserID)
		c.Set("username", response.Username)
		c.Set("role", response.Role)
		c.Next()
	}
}
