// auth-service/pkg/client/auth_client.go
package client

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type AuthClient struct {
	baseURL string
	client  *http.Client
}

type ValidateTokenResponse struct {
	Valid    bool   `json:"valid"`
	UserID   int    `json:"user_id"`
	Username string `json:"username"`
	Role     string `json:"role"`
}

func NewAuthClient(baseURL string) *AuthClient {
	return &AuthClient{
		baseURL: baseURL,
		client:  &http.Client{},
	}
}

// Valider un token depuis un autre service
func (c *AuthClient) ValidateToken(token string) (*ValidateTokenResponse, error) {
	url := fmt.Sprintf("%s/api/v1/auth/validate", c.baseURL)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", "Bearer "+token)

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return &ValidateTokenResponse{Valid: false}, nil
	}

	var result ValidateTokenResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	return &result, nil
}
