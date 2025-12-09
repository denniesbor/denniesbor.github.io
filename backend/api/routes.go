package api

import (
    "net/http"
    "github.com/gorilla/mux"
)

// Update signature to accept the dynamic paths
func SetupRoutes(projectsDir, thoughtsDir string) *mux.Router {
    r := mux.NewRouter()
    r.Use(corsMiddleware)

    api := r.PathPrefix("/api").Subrouter()

    // Portfolio
    api.HandleFunc("/projects", GetProjects).Methods("GET")
    api.HandleFunc("/projects/{id}", GetProject).Methods("GET")

    // Thoughts
    api.HandleFunc("/thoughts", GetThoughts).Methods("GET")
    api.HandleFunc("/thoughts/{category}/{slug}", GetThought).Methods("GET")
    api.HandleFunc("/thoughts/{category}/{slug}/content", GetThoughtContent).Methods("GET")

    // Space Weather Power Grid
    api.HandleFunc("/spw/summary", GetSpaceWeatherSummary).Methods("GET")
    api.HandleFunc("/spw/grid/lines", GetTransmissionLines).Methods("GET")
    api.HandleFunc("/spw/grid/magnetometers", GetMagnetometerSites).Methods("GET")
    api.HandleFunc("/spw/grid/substations", GetSubstations).Methods("GET")
    api.HandleFunc("/spw/scenarios", GetSpaceWeatherScenarios).Methods("GET")
    api.HandleFunc("/spw/scenarios/{id}", GetSpaceWeatherScenarioByID).Methods("GET")
    api.HandleFunc("/spw/vulnerability/{id}", GetGICVulnerabilityByScenario).Methods("GET")
    api.HandleFunc("/spw/economics/{id}", GetEconomicImpactByScenario).Methods("GET")

    // Static file serving
    // Uses the 'projectsDir' and 'thoughtsDir' passed from main.go
    r.PathPrefix("/api/projects/").Handler(
        http.StripPrefix("/api/projects/", http.FileServer(http.Dir(projectsDir))),
    )
    r.PathPrefix("/api/thoughts/").Handler(
        http.StripPrefix("/api/thoughts/", http.FileServer(http.Dir(thoughtsDir))),
    )

    return r
}

func corsMiddleware(next http.Handler) http.Handler {
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