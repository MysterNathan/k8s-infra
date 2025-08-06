// cmd/server/main.go
package main

import (
	"backend/services/auth-service/internal/config"
	"backend/services/auth-service/internal/database"
	"backend/services/auth-service/internal/handlers"
	"backend/services/auth-service/internal/middleware"
	"backend/services/auth-service/internal/repository"
	"backend/services/auth-service/internal/services"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Charger les variables d'environnement
	if err := godotenv.Load(); err != nil {
		log.Println("Pas de fichier .env trouvé")
	}

	// Charger la configuration
	cfg := config.LoadConfig()

	// Connexion à la base de données
	db, err := database.NewConnection(cfg)
	if err != nil {
		log.Fatal("Impossible de se connecter à la base de données:", err)
	}
	defer db.Close()

	// Initialiser les couches
	userRepo := repository.NewUserRepository(db)
	authService := services.NewAuthService(userRepo, cfg)
	authHandler := handlers.NewAuthHandler(authService)

	// Configurer Gin
	gin.SetMode(cfg.Server.Mode)
	r := gin.Default()

	// Middleware CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://mysternathan.freeboxos.fr"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Routes publiques
	api := r.Group("/backend")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/login", authHandler.Login)
			auth.POST("/register", authHandler.Register)
		}
	}

	// Routes protégées
	protected := api.Group("/")
	protected.Use(middleware.AuthRequired(authService))
	{
		protected.GET("/auth/me", authHandler.GetProfile)

		// Routes admin
		admin := protected.Group("/admin")
		admin.Use(middleware.AdminRequired(authService))
		{
			// Futures routes admin ici
			admin.GET("/users", func(c *gin.Context) {
				c.JSON(http.StatusOK, gin.H{"message": "Admin endpoint"})
			})
		}
	}

	// Démarrer le serveur
	log.Printf("Serveur démarré sur le port %s", cfg.Server.Port)
	if err := http.ListenAndServe(":"+cfg.Server.Port, r); err != nil {
		log.Fatal("Impossible de démarrer le serveur:", err)
	}
}
