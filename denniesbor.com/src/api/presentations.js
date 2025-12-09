import { STATIC_BASE } from './portfolio';

export const presentations = [
  {
    id: "dissertation-prop",
    title: "Space Weather Impact on Critical Infrastructure",
    subtitle: "Dissertation Proposal Defense",
    description: "A transferable framework to assess the socio-economic impact of space weather on critical infrastructure systems, focusing on power grids and satellite constellations.",
    date: "November 2025",
    type: "web", 
    // Points to the external site (opens in new tab, so no CORS issues)
    link: "https://denniesbor.me/Presentations/dissertation_prop/index.html", 
    tags: ["Reveal.js", "Space Weather", "Economics"]
  },
  {
    id: "gis-day-2025",
    title: "Space Radiation Risk Assessment",
    subtitle: "GIS Day Presentation",
    description: "A framework linking particle flux and orbital vulnerability to probabilistic economic risk. Analyzes the May 2024 'Gannon' storm impacts on the global satellite fleet.",
    date: "November 2025",
    type: "pdf", 
    // Served locally via Nginx (No CORS, Fast)
    link: `${STATIC_BASE}/projects/presentations/Bor_GIS_Day.pdf`, 
    tags: ["PDF", "Geospatial", "Satellites"]
  },
  {
    id: "comp-phys-2",
    title: "Computational Physics II",
    subtitle: "Spring 2025",
    description: "Advanced computational methods and modeling techniques for physical systems.",
    date: "Spring 2025",
    type: "pdf",
    // Served locally via Nginx
    link: `${STATIC_BASE}/projects/presentations/dennies_bor_comp_phys_2.pdf`,
    tags: ["PDF", "Modeling", "Physics"]
  }
];