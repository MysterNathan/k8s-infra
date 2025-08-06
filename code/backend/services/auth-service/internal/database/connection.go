package database

import (
	"backend/services/auth-service/internal/config"
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func NewConnection(cfg *config.Config) (*sql.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		cfg.Database.Host,
		cfg.Database.Port,
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.DBName,
		cfg.Database.SSLMode,
	)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, fmt.Errorf("erreur lors de l'ouverture de la connexion : %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("impossible de se connecter à la base de données : %w", err)
	}

	log.Println("Connexion à la base de données établie avec succès")
	return db, nil
}
