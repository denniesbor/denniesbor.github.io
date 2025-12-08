package api

import (
	"denniesbor.com/models"
	"denniesbor.com/scanner"
	"encoding/json"
	"net/http"
	"github.com/gorilla/mux"
)

var projects []models.Project

func InitProjects(projectsDir string) error {
	var err error
	projects, err = scanner.ScanProjects(projectsDir)
	return err
}

func GetProjects(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}

func GetProject(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	for _, project := range projects {
		if project.ID == id {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(project)
			return
		}
	}

	http.Error(w, "Project not found", http.StatusNotFound)
}