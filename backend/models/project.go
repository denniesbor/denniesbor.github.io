package models

type Project struct {
	ID              string   `json:"id"`
	Title           string   `json:"title"`
	Description     string   `json:"description,omitempty"`
	PrimaryCategory string   `json:"primaryCategory,omitempty"`
	Tags            []string `json:"tags,omitempty"`
	Featured        bool     `json:"featured,omitempty"`
	Demo            string   `json:"demo,omitempty"`      
	GitHub          string   `json:"github,omitempty"`    
	Path            string   `json:"path"`
	Assets          Assets   `json:"assets"`
}
type Assets struct {
	Notebooks []string `json:"notebooks,omitempty"`
	PDFs      []string `json:"pdfs,omitempty"`
	Images    []string `json:"images,omitempty"`
	Audio     []string `json:"audio,omitempty"`
	Videos    []string `json:"videos,omitempty"`
	Data      []string `json:"data,omitempty"`
}