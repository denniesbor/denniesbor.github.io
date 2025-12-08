package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"denniesbor.com/api"
)

func getProjectsPath() string {
	// Try NFS mount first (primary - fast)
	if _, err := os.Stat("/mnt/portfolio-projects"); err == nil {
		log.Println("Using NFS mount for projects")
		return "/mnt/portfolio-projects"
	}
	
	// Fall back to Google Drive mount
	if _, err := os.Stat("/mnt/gdrive-portfolio/projects"); err == nil {
		log.Println("Using Google Drive mount for projects (NFS unavailable)")
		return "/mnt/gdrive-portfolio/projects"
	}
	
	// Local development
	log.Println("Using local projects directory")
	return "../projects"
}

func getThoughtsPath() string {
	// Try NFS mount first (primary - fast)
	if _, err := os.Stat("/mnt/portfolio-thoughts"); err == nil {
		log.Println("Using NFS mount for thoughts")
		return "/mnt/portfolio-thoughts"
	}
	
	// Fall back to Google Drive mount
	if _, err := os.Stat("/mnt/gdrive-portfolio/thoughts"); err == nil {
		log.Println("Using Google Drive mount for thoughts (NFS unavailable)")
		return "/mnt/gdrive-portfolio/thoughts"
	}
	
	// Local development
	log.Println("Using local thoughts directory")
	return "../thoughts"
}

func main() {
	log.Println("Starting Portfolio Backend Server...")

	projectsDir := getProjectsPath()
	log.Printf("Projects directory: %s", projectsDir)
	if err := api.InitProjects(projectsDir); err != nil {
		log.Fatal("Failed to scan projects:", err)
	}

	thoughtsDir := getThoughtsPath()
	log.Printf("Thoughts directory: %s", thoughtsDir)
	if err := api.InitThoughts(thoughtsDir); err != nil {
		log.Fatal("Failed to scan thoughts:", err)
	}

	// Space weather data is now inside projects/power-grid-data
	spwDataDir := filepath.Join(projectsDir, "power-grid-data")
	log.Printf("Loading space weather data from: %s", spwDataDir)
	if err := api.LoadSpaceWeatherData(spwDataDir); err != nil {
		log.Printf("Warning: Failed to load space weather data: %v", err)
	}

	router := api.SetupRoutes()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on http://localhost:%s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}