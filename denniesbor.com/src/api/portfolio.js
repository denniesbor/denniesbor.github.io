const getAPIBase = () => {
  const hostname = window.location.hostname;
  
  // GitHub Pages (denniesbor.me or denniesbor.github.io)
  if (hostname === 'denniesbor.me' || 
      hostname === 'www.denniesbor.me' || 
      hostname === 'denniesbor.github.io') {
    return 'https://denniesbor.com/portfolio';
  }
  
  // Production (denniesbor.com)
  if (import.meta.env.PROD) {
    return '/portfolio';
  }
  
  // Local development
  return 'http://localhost:8080/api';
};

const getStaticBase = () => {
  const hostname = window.location.hostname;
  
  // GitHub Pages - files served from denniesbor.com via Nginx
  if (hostname === 'denniesbor.me' || 
      hostname === 'www.denniesbor.me' || 
      hostname === 'denniesbor.github.io') {
    return 'https://denniesbor.com';
  }
  
  // Production AWS - files served via Nginx (same domain)
  if (import.meta.env.PROD) {
    return '';
  }
  
  // Local development - files served via Go backend
  return 'http://localhost:8080';
};

export const API_BASE = getAPIBase();
export const STATIC_BASE = getStaticBase();

export const api = {
  // Projects
  getProjects: () => 
    fetch(`${API_BASE}/projects`).then(r => r.json()),
  
  getProject: (id) => 
    fetch(`${API_BASE}/projects/${id}`).then(r => r.json()),
  
  // Thoughts
  getThoughts: () => 
    fetch(`${API_BASE}/thoughts`).then(r => r.json()),
  
  getThought: (cat, slug) => 
    fetch(`${API_BASE}/thoughts/${cat}/${slug}`).then(r => r.json()),
  
  getThoughtContent: (cat, slug) => 
    fetch(`${API_BASE}/thoughts/${cat}/${slug}/content`).then(r => r.text()),
  
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

  getGICVulnerability: (id) =>
    fetch(`${API_BASE}/spw/vulnerability/${id}`).then(r => r.json()),

  getEconomicImpact: (id) =>
    fetch(`${API_BASE}/spw/economics/${id}`).then(r => r.json()),
};