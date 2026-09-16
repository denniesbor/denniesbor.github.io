// Publication metadata and source checks: docs/research-catalog.md
const papers = [
  {
    "id": "cswim-grid",
    "title": "Major Space Weather Risks Identified via Coupled Physics–Engineering–Economic Modeling",
    "authors": [
      "E. J. Oughton",
      "D. K. Bor",
      "R. S. Weigel",
      "C. T. Gaunt",
      "R. Dogan",
      "L. Huang",
      "J. J. Love",
      "M. Wiltberger"
    ],
    "description": "Couples geophysical drivers, power-grid engineering, and economic modeling to assess potential impacts of severe geomagnetic storms, with quantified uncertainty.",
    "status": "Published",
    "role": "Co-first author",
    "year": 2026,
    "section": "publications",
    "venue": "AGU Advances, 7(6), e2026AV002367",
    "contribution": "Edward J. Oughton and Dennies K. Bor contributed equally.",
    "paperLink": "https://doi.org/10.1029/2026AV002367",
    "preprintLink": "https://arxiv.org/abs/2412.18032",
    "githubLink": "https://github.com/denniesbor/C-SWIM",
    "resultsLink": "/portfolio/space-weather-grid",
    "resultsType": "internal",
    "resultsLabel": "Dashboard",
    "preview": true,
    "featured": true,
    "visualizationLink": "/portfolio/cswim-journey"
  },
  {
    "id": "cmap",
    "title": "Systematic Component-Level Characterization of Electricity Transmission Infrastructure for Space Weather Risk Assessment",
    "authors": [
      "D. K. Bor",
      "E. J. Oughton",
      "E. A. Peters",
      "N. Rivera",
      "C. T. Gaunt",
      "R. S. Weigel",
      "M. Wiltberger"
    ],
    "description": "Maps electricity-substation components from imagery and builds a regional network for screening geomagnetically induced currents, with comparison to May 2024 observations.",
    "status": "Published",
    "role": "Co-first author",
    "year": 2026,
    "section": "publications",
    "venue": "Space Weather, 24(9), e2026SW005166",
    "contribution": "Dennies K. Bor, Edward J. Oughton, and Evan A. Peters contributed equally.",
    "paperLink": "https://doi.org/10.1029/2026SW005166",
    "preprintLink": "https://arxiv.org/abs/2412.17685",
    "githubLink": "https://github.com/denniesbor/c-map"
  },
  {
    "id": "gannon-observations",
    "title": "GIC-Related Observations During the May 2024 Geomagnetic Storm in the United States",
    "authors": [
      "L. A. Wilkerson",
      "R. S. Weigel",
      "D. Thomas",
      "D. Bor",
      "E. J. Oughton",
      "C. T. Gaunt",
      "C. C. Balch",
      "M. J. Wiltberger",
      "A. Pulkkinen"
    ],
    "description": "Examines magnetometer and power-grid observations from the May 2024 geomagnetic storm to characterize geomagnetically induced currents and their relation to storm disturbances.",
    "status": "Published",
    "role": "Co-author",
    "year": 2026,
    "section": "publications",
    "venue": "Space Weather, 24(5), e2025SW004758",
    "paperLink": "https://doi.org/10.1029/2025SW004758",
    "preprintLink": "https://arxiv.org/abs/2507.07009"
  },
  {
    "id": "nz-mitigation",
    "title": "Assessing the Economic Benefits of Space Weather Mitigation Investment Decisions: Evidence from Aotearoa New Zealand",
    "authors": [
      "E. J. Oughton",
      "A. Renton",
      "D. H. Mac Manus",
      "D. Bor",
      "C. J. Rodger"
    ],
    "description": "Evaluates the potential economic benefits of operational and physical measures for reducing geomagnetic-storm impacts on New Zealand electricity infrastructure.",
    "status": "In press",
    "role": "Co-author",
    "year": 2026,
    "section": "publications",
    "venue": "Space Weather",
    "paperLink": "https://doi.org/10.1029/2025SW004919",
    "preprintLink": "https://arxiv.org/abs/2507.12495"
  },
  {
    "id": "cswim-satellites",
    "title": "C-SWIM: A Coupled Space Weather Impact Model for Satellite Fleet Vulnerability and Economic Loss Under a 1-in-100-Year Solar Energetic Particle Event",
    "authors": [
      "D. Bor",
      "E. J. Oughton",
      "R. S. Weigel",
      "R. Yang",
      "T. Clower",
      "M. J. Wiltberger",
      "R. Linares"
    ],
    "description": "Links solar energetic particle exposure, geomagnetic shielding, radiation transport, and satellite vulnerability to fleet-level capital and economic loss estimates.",
    "status": "Under review",
    "role": "First author",
    "year": 2026,
    "section": "publications",
    "venue": "arXiv:2605.22576",
    "paperLink": "https://arxiv.org/abs/2605.22576",
    "paperLabel": "Preprint",
    "githubLink": "https://github.com/denniesbor/C-SWIMs",
    "resultsLink": "https://cswims.denniesbor.me/#/dashboard",
    "resultsType": "external",
    "resultsLabel": "Dashboard"
  },
  {
    "id": "mhtran",
    "title": "A Comparative Multi-Hazard Risk Assessment of the US High-Voltage Transmission Network",
    "authors": [
      "D. Bor",
      "E. J. Oughton",
      "R. S. Weigel",
      "R. Yang",
      "T. Clower",
      "A. Newman",
      "A. R. Valle"
    ],
    "description": "Combines hazard data, infrastructure fragility, and input-output economics to compare disruption scenarios across natural hazards affecting the US transmission network.",
    "status": "Preprint",
    "role": "First author",
    "year": 2026,
    "section": "publications",
    "venue": "arXiv:2605.23053",
    "paperLink": "https://arxiv.org/abs/2605.23053",
    "paperLabel": "Preprint",
    "githubLink": "https://github.com/denniesbor/mhtran",
    "resultsLink": "https://mhtran.denniesbor.me/",
    "resultsType": "external",
    "resultsLabel": "Dashboard"
  },
  {
    "id": "political-polarization",
    "title": "Quantifying Polarization Across Political Groups on Key Policy Issues Using Sentiment Analysis",
    "authors": [
      "D. Bor",
      "B. S. Lee",
      "E. J. Oughton"
    ],
    "description": "Uses sentiment analysis of US congressional Twitter posts to compare political polarization across policy issues and voting-based political groups.",
    "status": "Preprint",
    "role": "First author",
    "year": 2023,
    "section": "publications",
    "venue": "arXiv:2302.07775",
    "paperLink": "https://arxiv.org/abs/2302.07775",
    "paperLabel": "Preprint",
    "githubLink": "https://github.com/denniesbor/twitter_political_polarization",
    "resultsLink": "https://denniesbor.github.io/twitter_political_polarization/",
    "resultsType": "external",
    "resultsLabel": "Dashboard",
    "preview": true
  },
  {
    "id": "assip-gps-models",
    "title": "Assessing the Sensitivities of Input-Output Models for GPS Satellite Disruption Macroeconomic Impacts",
    "authors": [
      "S. Doma",
      "D. K. Bor",
      "T. Griffin",
      "E. J. Oughton"
    ],
    "description": "Compares Leontief, Ghosh, and inoperability input-output models to examine how assumptions about GPS dependence affect estimates of economic disruption.",
    "status": "In preparation",
    "role": "Co-author",
    "year": 2026,
    "section": "assip",
    "collaboration": "ASSIP",
    "note": "Current manuscript extending the earlier ASSIP GPS disruption study.",
    "githubLink": "https://github.com/saishadoma-del/gpsoutages"
  },
  {
    "id": "assip-substation-detection",
    "title": "Comparing Object Detection Models for Electrical Substation Component Mapping",
    "authors": [
      "H. Mody",
      "N. Bansal",
      "D. K. Bor",
      "E. J. Oughton"
    ],
    "description": "Compares YOLOv8, YOLOv11, and RF-DETR for identifying electrical-substation components in imagery, supporting research on infrastructure exposure.",
    "status": "Preprint",
    "role": "Co-author",
    "year": 2025,
    "section": "assip",
    "collaboration": "ASSIP",
    "venue": "arXiv:2512.22454",
    "paperLink": "https://arxiv.org/abs/2512.22454",
    "paperLabel": "Preprint"
  },
  {
    "id": "assip-space-weather-review",
    "title": "A Review of Extreme Space Weather Event Impacts on Critical Infrastructure",
    "authors": [
      "S. Bambardekar",
      "D. K. Bor",
      "E. Oughton"
    ],
    "description": "Reviews research on the May 2024 Gannon storm and impacts across power, satellites, communications, aviation, and connected infrastructure.",
    "status": "Published abstract",
    "role": "Co-author",
    "year": 2025,
    "section": "assip",
    "collaboration": "ASSIP",
    "venue": "Journal of Student-Scientists' Research, 7",
    "paperLink": "https://doi.org/10.13021/jssr2025.5285",
    "paperLabel": "Abstract"
  },
  {
    "id": "assip-gps-services",
    "title": "Assessing the Economic Impacts of Disruption to Global Positioning System (GPS) Services",
    "authors": [
      "S. Doma",
      "D. K. Bor",
      "E. Oughton"
    ],
    "description": "Studies sectoral dependence on GPS positioning, navigation, and timing services and the potential economic consequences of outages with different durations.",
    "status": "Published abstract",
    "role": "Co-author",
    "year": 2025,
    "section": "assip",
    "collaboration": "ASSIP",
    "venue": "Journal of Student-Scientists' Research, 7",
    "paperLink": "https://doi.org/10.13021/jssr2025.5282",
    "paperLabel": "Abstract"
  },
  {
    "id": "assip-hevam",
    "title": "Heat Vulnerability Analysis and Mapping (HEVAM): Analysis of United States Power Grids Vulnerability to Climate Changes",
    "authors": [
      "S. Bambardekar",
      "D. Bor",
      "E. J. Oughton"
    ],
    "description": "Combines detailed substation mapping with climate projections to study heat exposure and vulnerability of US power-grid components.",
    "status": "Preprint",
    "role": "Co-author",
    "year": 2024,
    "section": "assip",
    "collaboration": "ASSIP",
    "venue": "EarthArXiv",
    "paperLink": "https://doi.org/10.31223/X5ND9V",
    "paperLabel": "Preprint"
  },
  {
    "id": "assip-grid-labeling",
    "title": "Enhancing Power Grid Resilience: A Novel Labeling System for Assessing Climate Vulnerabilities in US Substations",
    "authors": [
      "A. Walia",
      "E. A. Peters",
      "N. T. Rivera",
      "D. K. Bor",
      "E. J. Oughton"
    ],
    "description": "Develops a system for labeling substation components to support spatial analysis of power-grid exposure to climate hazards.",
    "status": "Published abstract",
    "role": "Co-author",
    "year": 2024,
    "section": "assip",
    "collaboration": "ASSIP",
    "venue": "Journal of Student-Scientists' Research, 6",
    "paperLink": "https://doi.org/10.13021/jssr2024.4289",
    "paperLabel": "Abstract"
  },
  {
    "id": "assip-grid-climate",
    "title": "Analyzing the Vulnerability of US Power Grids to Climate Change Related Stressors",
    "authors": [
      "S. Bambardekar",
      "D. Bor",
      "E. J. Oughton"
    ],
    "description": "Investigates how component mapping from satellite and street-view imagery can support assessment of climate stressors on US electricity substations.",
    "status": "Published abstract",
    "role": "Co-author",
    "year": 2024,
    "section": "assip",
    "collaboration": "ASSIP",
    "venue": "Journal of Student-Scientists' Research, 6",
    "paperLink": "https://doi.org/10.13021/jssr2024.4296",
    "paperLabel": "Abstract",
    "note": "Earlier ASSIP abstract associated with the HEVAM research."
  },
  {
    "id": "assip-broadband",
    "title": "Analyzing the Interplay of Public Opinion, Political Ideology, and Demographic Factors in Addressing the Digital Divide Relating to Broadband Infrastructure Sentiment",
    "authors": [
      "M. Kuriakose",
      "F. Howton",
      "B. Osoro",
      "D. Bor",
      "E. Oughton"
    ],
    "description": "Examines public sentiment about broadband expansion and its relationship to political ideology and the digital divide.",
    "status": "Published abstract",
    "role": "Co-author",
    "year": 2023,
    "section": "assip",
    "collaboration": "ASSIP",
    "venue": "Journal of Student-Scientists' Research, 5",
    "paperLink": "https://doi.org/10.13021/jssr2023.3938",
    "paperLabel": "Abstract"
  },
  {
    "id": "assip-twitter-nlp",
    "title": "Using Natural Language Processing to Analyse the Current State of Political Discourse on Twitter",
    "authors": [
      "M. Baraya",
      "D. Bor",
      "E. Oughton"
    ],
    "description": "Applies natural language processing to congressional Twitter posts to explore topics, emotions, and sentiment across political groups.",
    "status": "Published abstract",
    "role": "Co-author",
    "year": 2022,
    "section": "assip",
    "collaboration": "ASSIP",
    "venue": "Journal of Student-Scientists' Research, 4",
    "paperLink": "https://doi.org/10.13021/jssr2022.3367",
    "paperLabel": "Abstract"
  },
  {
    "id": "cagniard",
    "title": "Magnetotelluric Impedance of a Layered Earth as a Transmission Line",
    "authors": [
      "Dennies Bor"
    ],
    "description": "Derives and implements the layered-Earth impedance through a transmission-line analogy. The manuscript examines agreement with measured magnetotelluric responses and separately assesses magnetic-source interpolation during the May 2024 storm.",
    "status": "In preparation",
    "role": "Author",
    "year": 2026,
    "section": "in-progress",
    "note": "Manuscript in preparation for a possible arXiv submission.",
    "projectId": "MT-TL-Analogy",
    "resultsLink": "/portfolio/MT-TL-Analogy",
    "resultsType": "internal",
    "resultsLabel": "Project notes"
  },
  {
    "id": "gic-prediction",
    "title": "Evaluation of Geomagnetically Induced Current Prediction Models: Comparing Traditional Transfer Functions and Neural Network Approaches",
    "authors": [],
    "description": "Research comparing transfer-function methods and neural-network approaches for GIC prediction using TVA observations from the May 2024 geomagnetic storm.",
    "status": "In progress",
    "role": "Primary author",
    "year": null,
    "section": "in-progress",
    "githubLink": "https://github.com/denniesbor/tfpy"
  }
];

export default papers;
