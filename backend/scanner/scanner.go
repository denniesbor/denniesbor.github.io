package scanner

import (
	"bufio"
	"denniesbor.com/models"
	"os"
	"path/filepath"
	"strings"
)

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

		projectPath := filepath.Join(projectsDir, entry.Name())
		assets, err := DetectAssets(projectPath)
		if err != nil {
			continue
		}

		project := models.Project{
			ID:     entry.Name(),
			Title:  formatTitle(entry.Name()),
			Path:   entry.Name(),
			Assets: assets,
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
				}
			}
		}
	}

	if thought.Title == "" {
		thought.Title = formatTitle(slug)
	}

	return thought, nil
}

func formatTitle(id string) string {
	title := strings.ReplaceAll(id, "-", " ")
	title = strings.ReplaceAll(title, "_", " ")
	return strings.Title(title)
}