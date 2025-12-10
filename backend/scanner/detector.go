package scanner

import (
	"denniesbor.com/models"
	"os"
	"path/filepath"
	"strings"
)

func DetectAssets(projectPath string) (models.Assets, error) {
	assets := models.Assets{}

	files, err := os.ReadDir(projectPath)
	if err != nil {
		return assets, err
	}

	for _, file := range files {
		if file.IsDir() {
			continue
		}

		name := file.Name()

		// Skip metadata and description files
		if name == "metadata.json" || name == "description.md" {
			continue
		}

		ext := strings.ToLower(filepath.Ext(name))

		switch ext {
		case ".ipynb":
			assets.Notebooks = append(assets.Notebooks, name)
		case ".pdf":
			assets.PDFs = append(assets.PDFs, name)
		case ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp":
			assets.Images = append(assets.Images, name)
		case ".wav", ".mp3", ".ogg", ".m4a":
			assets.Audio = append(assets.Audio, name)
		case ".mp4", ".webm", ".mov":
			assets.Videos = append(assets.Videos, name)
		case ".csv", ".geojson", ".json", ".txt", ".xlsx", ".xls":
			assets.Data = append(assets.Data, name)
		}
	}

	return assets, nil
}