const API_BASE = 'http://localhost:8080/api';

export const api = {
  // Projects
  getProjects: () => 
    fetch(`${API_BASE}/projects`).then(r => r.json()),
  
  getProject: (id) => 
    fetch(`${API_BASE}/projects/${id}`).then(r => r.json()),
  
  // Thoughts
  getThoughts: () => 
    fetch(`${API_BASE}/thoughts`).then(r => r.json()),
  
  getThought: (category, slug) => 
    fetch(`${API_BASE}/thoughts/${category}/${slug}`).then(r => r.json()),
  
  getThoughtContent: (category, slug) => 
    fetch(`${API_BASE}/thoughts/${category}/${slug}/content`).then(r => r.text()),

  // Space Weather Power Grid
  getSpaceWeatherSummary: () =>
    fetch(`${API_BASE}/spw/summary`).then(r => r.json()),

  getTransmissionLines: () =>
    fetch(`${API_BASE}/spw/grid/lines`).then(r => r.json()),

  getMagnetometers: () =>
    fetch(`${API_BASE}/spw/grid/magnetometers`).then(r => r.json()),

  getSubstations: () =>
    fetch(`${API_BASE}/spw/grid/substations`).then(r => r.json()),

  getSpaceWeatherScenarios: () =>
    fetch(`${API_BASE}/spw/scenarios`).then(r => r.json()),

  getSpaceWeatherScenario: (id) =>
    fetch(`${API_BASE}/spw/scenarios/${id}`).then(r => r.json()),

  getGICVulnerability: (scenarioId) =>
    fetch(`${API_BASE}/spw/vulnerability/${scenarioId}`).then(r => r.json()),

  getEconomicImpact: (scenarioId) =>
    fetch(`${API_BASE}/spw/economics/${scenarioId}`).then(r => r.json()),
};