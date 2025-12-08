package api

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"denniesbor.com/models"
	"github.com/gorilla/mux"
)

var (
	powerGridTopology     models.PowerGridTopology
	spaceWeatherScenarios []models.SpaceWeatherScenario
	gicVulnerability      models.GICVulnerabilityData
	economicImpacts       models.EconomicImpactData
)

func LoadSpaceWeatherData(dataDir string) error {
	if err := loadJSON(filepath.Join(dataDir, "grid_topology.json"), &powerGridTopology); err != nil {
		return err
	}
	log.Println("✓ Loaded grid_topology.json")

	if err := loadJSON(filepath.Join(dataDir, "scenario_data.json"), &spaceWeatherScenarios); err != nil {
		return err
	}
	log.Printf("✓ Loaded scenario_data.json (%d scenarios)\n", len(spaceWeatherScenarios))

	if err := loadJSON(filepath.Join(dataDir, "vulnerability_data.json"), &gicVulnerability); err != nil {
		return err
	}
	log.Printf("✓ Loaded vulnerability_data.json (%d scenarios)\n", len(gicVulnerability))

	if err := loadJSON(filepath.Join(dataDir, "economics_data.json"), &economicImpacts); err != nil {
		return err
	}
	log.Printf("✓ Loaded economics_data.json (%d scenarios)\n", len(economicImpacts))

	return nil
}

func loadJSON(filename string, v interface{}) error {
	data, err := os.ReadFile(filename)
	if err != nil {
		return err
	}
	return json.Unmarshal(data, v)
}

func GetPowerGridTopology(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(powerGridTopology)
}

func GetTransmissionLines(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(powerGridTopology.Lines)
}

func GetMagnetometerSites(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(powerGridTopology.MTSites)
}

func GetSubstations(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(powerGridTopology.Substations)
}

func GetSpaceWeatherScenarios(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	type ScenarioMeta struct {
		ID    string `json:"id"`
		Label string `json:"label"`
	}

	meta := make([]ScenarioMeta, len(spaceWeatherScenarios))
	for i, s := range spaceWeatherScenarios {
		meta[i] = ScenarioMeta{ID: s.ID, Label: s.Label}
	}

	json.NewEncoder(w).Encode(meta)
}

func GetSpaceWeatherScenarioByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	scenarioID := vars["id"]

	w.Header().Set("Content-Type", "application/json")

	for _, scenario := range spaceWeatherScenarios {
		if scenario.ID == scenarioID {
			json.NewEncoder(w).Encode(scenario)
			return
		}
	}

	http.Error(w, "Space weather scenario not found", http.StatusNotFound)
}

func GetGICVulnerabilityByScenario(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	scenarioID := vars["id"]

	w.Header().Set("Content-Type", "application/json")

	// Map frontend scenario IDs to vulnerability data keys
	var dataKey string
	switch scenarioID {
	case "75yr":
		dataKey = "e_75-year-hazard A/ph"
	case "100yr":
		dataKey = "e_100-year-hazard A/ph"
	case "150yr":
		dataKey = "e_150-year-hazard A/ph"
	case "200yr":
		dataKey = "e_200-year-hazard A/ph"
	case "250yr":
		dataKey = "e_250-year-hazard A/ph"
	default:
		http.Error(w, "Vulnerability data only available for synthetic scenarios (75yr-250yr)", http.StatusNotFound)
		return
	}

	if vuln, exists := gicVulnerability[dataKey]; exists {
		json.NewEncoder(w).Encode(vuln)
		return
	}

	http.Error(w, "GIC vulnerability data not found for scenario", http.StatusNotFound)
}

func GetAllGICVulnerability(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(gicVulnerability)
}

func GetEconomicImpactByScenario(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	scenarioID := vars["id"]

	w.Header().Set("Content-Type", "application/json")

	if econ, exists := economicImpacts[scenarioID]; exists {
		json.NewEncoder(w).Encode(econ)
		return
	}

	http.Error(w, "Economic impact data not found for scenario", http.StatusNotFound)
}

func GetAllEconomicImpacts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(economicImpacts)
}

func GetSpaceWeatherSummary(w http.ResponseWriter, r *http.Request) {
	summary := map[string]interface{}{
		"power_grid": map[string]interface{}{
			"total_mt_sites":    len(powerGridTopology.MTSites),
			"total_substations": len(powerGridTopology.Substations),
		},
		"scenarios": map[string]interface{}{
			"total": len(spaceWeatherScenarios),
			"available": func() []string {
				ids := make([]string, len(spaceWeatherScenarios))
				for i, s := range spaceWeatherScenarios {
					ids[i] = s.ID
				}
				return ids
			}(),
		},
		"gic_vulnerability_scenarios": func() []string {
			keys := make([]string, 0, len(gicVulnerability))
			for k := range gicVulnerability {
				keys = append(keys, k)
			}
			return keys
		}(),
		"economic_impact_scenarios": func() []string {
			keys := make([]string, 0, len(economicImpacts))
			for k := range economicImpacts {
				keys = append(keys, k)
			}
			return keys
		}(),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(summary)
}