package models

type Project struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Path        string   `json:"path"`
	Description string   `json:"description,omitempty"`
	Assets      Assets   `json:"assets"`
}

type Assets struct {
	Notebooks []string `json:"notebooks,omitempty"`
	PDFs      []string `json:"pdfs,omitempty"`
	Images    []string `json:"images,omitempty"`
	Audio     []string `json:"audio,omitempty"`
	Videos    []string `json:"videos,omitempty"`
	Data      []string `json:"data,omitempty"`
}