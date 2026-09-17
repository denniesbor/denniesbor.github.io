// Introductions describe the linked research tools; source notes are in docs/research-catalog.md.
const dashboards = [
  {
    "id": "cswim-grid",
    "topic": "Electricity and space weather",
    "title": "How solar storms can affect the power grid",
    "project": "Coupled Space Weather Impact Model (C-SWIM)",
    "description": "A solar storm can drive unwanted currents through long power lines and heat transformers. This model connects storm conditions to equipment vulnerability and possible economic losses.",
    "explore": [
      "View the US transmission network and its substations.",
      "Explore historical storm fields, modeled extreme storms, and estimates of economic loss."
    ],
    "action": "Explore power-grid impacts",
    "url": "/portfolio/space-weather-grid",
    "internal": true,
    "github": "https://github.com/denniesbor/C-SWIM"
  },
  {
    "id": "mhtran",
    "topic": "Electricity and natural hazards",
    "title": "Compare natural hazards affecting the power grid",
    "project": "Multi-Hazard Power Transmission Risk Analysis (MHTran)",
    "description": "Floods, earthquakes, wildfires, and severe weather threaten different parts of the electricity network. This project compares hazards across the US transmission system and estimates equipment damage and economic consequences.",
    "explore": [
      "Map where power lines and substations are exposed to natural hazards.",
      "Compare the modeled effects of different hazards across locations."
    ],
    "action": "Compare natural hazards",
    "url": "https://mhtran.denniesbor.me/",
    "github": "https://github.com/denniesbor/mhtran-dash"
  },
  {
    "id": "cswims",
    "topic": "Satellites and solar radiation",
    "title": "How solar radiation can affect satellites",
    "project": "Coupled Space Weather Impact Model: satellites (C-SWIMs)",
    "description": "Energetic particles from the Sun can damage satellite electronics. This study examines how a severe solar particle event could affect satellites in different orbits, using a scenario expected roughly once per century.",
    "explore": [
      "Explore satellite orbits and modeled vulnerability on a 3D globe.",
      "View solar and geomagnetic observations alongside the study results."
    ],
    "action": "Explore satellite vulnerability",
    "url": "https://cswims.denniesbor.me/#/dashboard",
    "github": "https://github.com/denniesbor/cswims-dash"
  },
  {
    "id": "aviation",
    "topic": "Aviation and radio communications",
    "title": "Where space weather may affect aviation",
    "project": "Space weather and flight monitoring (C-SWIM Monitor)",
    "description": "Solar activity can weaken the high-frequency radio signals used for long-distance aircraft communications. This research prototype puts flight activity and space-weather observations on the same map so their overlap can be explored.",
    "explore": [
      "View flights alongside maps of radio-signal absorption.",
      "Explore solar observations, alerts, and other map layers."
    ],
    "collaboration": "Developed with collaborators in George Mason University’s Data Analytics Engineering capstone program.",
    "action": "Explore flights and space weather",
    "url": "https://aviation.denniesbor.me/",
    "github": "https://github.com/denniesbor/aviation-dash"
  },
  {
    "id": "cswim-journey",
    "kind": "film",
    "title": "From the Sun to the power grid",
    "description": "Follow a solar storm from the Sun to Earth, then see how changes in Earth’s magnetic field can affect power equipment and nearby communities. This short film introduces the power-grid research behind the Coupled Space Weather Impact Model (C-SWIM).",
    "action": "Watch the 89-second film",
    "url": "/portfolio/cswim-journey",
    "internal": true,
    "poster": "/media/cswim-journey-v12.jpg"
  }
];

export default dashboards;
