package api

import (
	"denniesbor.com/models"
	"denniesbor.com/scanner"
	"encoding/json"
	"net/http"
	"github.com/gorilla/mux"
	"os"
	"path/filepath"
)

var thoughts []models.ThoughtCategory

func InitThoughts(thoughtsDir string) error {
	var err error
	thoughts, err = scanner.ScanThoughts(thoughtsDir)
	return err
}

func GetThoughts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(thoughts)
}

func GetThought(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	category := vars["category"]
	slug := vars["slug"]

	for _, cat := range thoughts {
		if cat.Slug == category {
			for _, post := range cat.Posts {
				if post.Slug == slug {
					w.Header().Set("Content-Type", "application/json")
					json.NewEncoder(w).Encode(post)
					return
				}
			}
		}
	}

	http.Error(w, "Thought not found", http.StatusNotFound)
}

func GetThoughtContent(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	category := vars["category"]
	slug := vars["slug"]

	postPath := filepath.Join("../thoughts", category, slug, "post.md")
	
	content, err := os.ReadFile(postPath)
	if err != nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "text/markdown")
	w.Write(content)
}