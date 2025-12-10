package scanner

import (
	"bufio"
	"encoding/json"
	"denniesbor.com/models"
	"os"
	"path/filepath"
	"strings"
)

// Folders to ignore when scanning projects
var ignoredFolders = map[string]bool{
	"power-grid-data": true,
	"presentations":   true,
	"data":            true,
	".git":            true,
	"node_modules":    true,
}

// ProjectMetadata represents the metadata.json file in project folders
type ProjectMetadata struct {
	Title           string   `json:"title"`
	Description     string   `json:"description"`
	PrimaryCategory string   `json:"primaryCategory"`
	Tags            []string `json:"tags"`
	Featured        bool     `json:"featured"`
	Demo            string   `json:"demo"` 
	GitHub          string   `json:"github"`    
}

func ScanProjects(projectsDir string) ([]models.Project, error) {
	var projects []models.Project

	entries, err := os.ReadDir(projectsDir)
	if err != nil {
		return nil, err
	}

	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}

		// Skip ignored folders
		if ignoredFolders[entry.Name()] {
			continue
		}

		projectPath := filepath.Join(projectsDir, entry.Name())
		
		// Try to read metadata.json
		var metadata ProjectMetadata
		metadataPath := filepath.Join(projectPath, "metadata.json")
		if data, err := os.ReadFile(metadataPath); err == nil {
			json.Unmarshal(data, &metadata)
		}

		assets, err := DetectAssets(projectPath)
		if err != nil {
			continue
		}

		project := models.Project{
			ID:              entry.Name(),
			Title:           getTitle(metadata.Title, entry.Name()),
			Description:     metadata.Description,
			PrimaryCategory: metadata.PrimaryCategory,
			Tags:            metadata.Tags,
			Featured:        metadata.Featured,
			Demo:            metadata.Demo,     
			GitHub:          metadata.GitHub,    
			Path:            entry.Name(),
			Assets:          assets,
		}

		projects = append(projects, project)
	}

	return projects, nil
}

func ScanThoughts(thoughtsDir string) ([]models.ThoughtCategory, error) {
	var categories []models.ThoughtCategory

	categoryDirs, err := os.ReadDir(thoughtsDir)
	if err != nil {
		return nil, err
	}

	for _, catDir := range categoryDirs {
		if !catDir.IsDir() {
			continue
		}

		category := models.ThoughtCategory{
			Name: formatTitle(catDir.Name()),
			Slug: catDir.Name(),
		}

		categoryPath := filepath.Join(thoughtsDir, catDir.Name())
		postDirs, err := os.ReadDir(categoryPath)
		if err != nil {
			continue
		}

		for _, postDir := range postDirs {
			if !postDir.IsDir() {
				continue
			}

			postPath := filepath.Join(categoryPath, postDir.Name())
			postFile := filepath.Join(postPath, "post.md")

			if _, err := os.Stat(postFile); err == nil {
				thought, err := parseThought(postFile, catDir.Name(), postDir.Name())
				if err == nil {
					category.Posts = append(category.Posts, thought)
				}
			}
		}

		if len(category.Posts) > 0 {
			categories = append(categories, category)
		}
	}

	return categories, nil
}

func parseThought(postFile, category, slug string) (models.Thought, error) {
	thought := models.Thought{
		Slug:     slug,
		Category: category,
		Path:     filepath.Join(category, slug, "post.md"),
	}

	file, err := os.Open(postFile)
	if err != nil {
		return thought, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	inFrontmatter := false

	for scanner.Scan() {
		line := scanner.Text()

		if strings.TrimSpace(line) == "---" {
			if !inFrontmatter {
				inFrontmatter = true
				continue
			} else {
				break
			}
		}

		if inFrontmatter {
			parts := strings.SplitN(line, ":", 2)
			if len(parts) == 2 {
				key := strings.TrimSpace(parts[0])
				value := strings.Trim(strings.TrimSpace(parts[1]), `"`)

				switch key {
				case "title":
					thought.Title = value
				case "date":
					thought.Date = value
				case "summary":
					thought.Summary = value
				case "category":
					thought.Category = value
				case "tags":
					thought.Tags = parseTagsArray(value)
				}
			}
		}
	}

	if thought.Title == "" {
		thought.Title = formatTitle(slug)
	}

	return thought, nil
}

func parseTagsArray(tagString string) []string {
	// Handle formats like: ["tag1", "tag2", "tag3"]
	tagString = strings.Trim(tagString, "[]")
	if tagString == "" {
		return []string{}
	}

	tags := strings.Split(tagString, ",")
	var cleaned []string
	for _, tag := range tags {
		tag = strings.TrimSpace(tag)
		tag = strings.Trim(tag, `"'`)
		if tag != "" {
			cleaned = append(cleaned, tag)
		}
	}
	return cleaned
}

func getTitle(metaTitle, dirName string) string {
	if metaTitle != "" {
		return metaTitle
	}
	return formatTitle(dirName)
}

func formatTitle(id string) string {
	title := strings.ReplaceAll(id, "-", " ")
	title = strings.ReplaceAll(title, "_", " ")
	return strings.Title(title)
}