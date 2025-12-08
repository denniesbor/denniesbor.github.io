package models

type PowerGridTopology struct {
	Lines        interface{}   `json:"lines"`
	MTSites      []MTSite      `json:"mt_sites"`
	Substations  []Substation  `json:"substations"`
}

type MTSite struct {
	ID   int     `json:"id"`
	Name string  `json:"name"`
	Lat  float64 `json:"lat"`
	Lon  float64 `json:"lon"`
}

type Substation struct {
	ID      interface{} `json:"id"`
	Name    interface{} `json:"name"` 
	Lat     float64     `json:"lat"`
	Lon     float64     `json:"lon"`
	Voltage float64     `json:"voltage"`
}

type SpaceWeatherScenario struct {
	ID      string            `json:"id"`
	Label   string            `json:"label"`
	EField  GeomagneticField  `json:"e_field"`
	BField  GeomagneticField  `json:"b_field"`
}

type GeomagneticField struct {
	IsVector bool        `json:"is_vector"`
	X        []float64   `json:"x,omitempty"`
	Y        []float64   `json:"y,omitempty"`
	Val      []float64   `json:"val,omitempty"`
}

type GICVulnerabilityData map[string]map[string]float64

type EconomicImpactData map[string][]SectorImpact

type SectorImpact struct {
	Sector   string  `json:"sector"`
	Direct   float64 `json:"direct"`
	Indirect float64 `json:"indirect"`
	Total    float64 `json:"total"`
	P5       float64 `json:"p5"`
	P95      float64 `json:"p95"`
}