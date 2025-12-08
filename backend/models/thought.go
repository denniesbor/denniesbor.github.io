package models

type ThoughtCategory struct {
	Name  string    `json:"name"`
	Slug  string    `json:"slug"`
	Posts []Thought `json:"posts"`
}

type Thought struct {
	Title    string   `json:"title"`
	Slug     string   `json:"slug"`
	Category string   `json:"category"`
	Date     string   `json:"date,omitempty"`
	Summary  string   `json:"summary,omitempty"`
	Path     string   `json:"path"`
	Assets   []string `json:"assets,omitempty"`
}