package main

import (
	"log"
	"net/http"
	"path/filepath"

	"denniesbor.com/api"
)

func main() {
	log.Println("Starting Portfolio Backend Server...")

	projectsDir := "../projects"
	if err := api.InitProjects(projectsDir); err != nil {
		log.Fatal("Failed to scan projects:", err)
	}

	thoughtsDir := "../thoughts"
	if err := api.InitThoughts(thoughtsDir); err != nil {
		log.Fatal("Failed to scan thoughts:", err)
	}

	spwDataDir := filepath.Join(".", "data")
	if err := api.LoadSpaceWeatherData(spwDataDir); err != nil {
		log.Printf("Failed to load space weather data: %v", err)
	}

	router := api.SetupRoutes()

	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}