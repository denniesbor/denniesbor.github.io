# Research catalog and portfolio links

Updated September 16, 2026. The catalog in `denniesbor.com/src/api/papers.js` covers journal papers, preprints, ASSIP collaborations, and current research. It is broader than the selected postdoc CV. Existing scientific project files and manuscripts were read as sources and left unchanged.

## Publication and attribution sources

| Record | Evidence and treatment |
| --- | --- |
| C-SWIM power grid | [AGU Advances](https://doi.org/10.1029/2026AV002367), 7(6), e2026AV002367, 2026. Published September 4. Oughton and Bor contributed equally. |
| C-MAP | [Space Weather](https://doi.org/10.1029/2026SW005166), 24(9), e2026SW005166, 2026. Published September 9. Bor, Oughton, and Peters contributed equally. |
| May 2024 GIC observations | [Space Weather](https://doi.org/10.1029/2025SW004758), 24(5), e2025SW004758, 2026. |
| New Zealand mitigation | [Otago publication list](https://space.physics.otago.ac.nz/publications/) lists this as in press, with DOI [10.1029/2025SW004919](https://doi.org/10.1029/2025SW004919). Direct publisher access was unavailable. The catalog retains in-press status and links the [preprint](https://arxiv.org/abs/2507.12495). |
| C-SWIM satellite fleet | [arXiv:2605.22576](https://arxiv.org/abs/2605.22576). Under-review status is carried forward from the user's CV, not inferred from arXiv. |
| MHTran | [arXiv:2605.23053](https://arxiv.org/abs/2605.23053). Preprint. |
| Political polarization | [arXiv:2302.07775](https://arxiv.org/abs/2302.07775). Bor, Lee, and Oughton. Included in the portfolio, omitted from the selected CV. |
| ASSIP substation object detection | [arXiv:2512.22454](https://arxiv.org/abs/2512.22454). Mody, Bansal, Bor, and Oughton. |
| ASSIP heat vulnerability, HEVAM | [EarthArXiv](https://doi.org/10.31223/X5ND9V). Bambardekar, Bor, and Oughton. Preprint, 2024. |
| ASSIP extreme space-weather review | [GMU record](https://journals.gmu.edu/jssr/article/view/5285), DOI 10.13021/jssr2025.5285. Published abstract, 2025. |
| ASSIP GPS services | [GMU record](https://journals.gmu.edu/jssr/article/view/5282), DOI 10.13021/jssr2025.5282. Published abstract, 2025. |
| ASSIP substation labeling | [GMU record](https://journals.gmu.edu/jssr/article/view/4289), DOI 10.13021/jssr2024.4289. Published abstract, 2024. |
| ASSIP climate stressors | [GMU record](https://journals.gmu.edu/jssr/article/view/4296), DOI 10.13021/jssr2024.4296. Published abstract, 2024, associated with the HEVAM research. |
| ASSIP broadband sentiment | [GMU record](https://journals.gmu.edu/jssr/article/view/3938), DOI 10.13021/jssr2023.3938. Published abstract, 2023. |
| ASSIP Twitter NLP | [GMU record](https://journals.gmu.edu/jssr/article/view/3367), DOI 10.13021/jssr2022.3367. Published abstract, 2022. |
| ASSIP GPS input-output manuscript | Current `main.tex` in the Saisha workspace lists Doma, Bor, Griffin, and Oughton and explicitly acknowledges ASSIP. Listed conservatively as in preparation; no verified public manuscript or editorial status was found. The earlier 2025 abstract is a separate record. |
| Cagniard / magnetotelluric transmission-line manuscript | Title, authorship, and scope from `~/Cagniard/manuscript/mt_transmission_line.tex`. The user reports an intended arXiv submission. Listed as in preparation, without an arXiv link. Connected to the existing `MT-TL-Analogy` project notes without replacing their original assets. |
| GIC prediction | Retained from the existing portfolio, linked to `denniesbor/tfpy`. No publication status or additional authors inferred. |

The GMU student journal organizes its records as abstracts and identifies itself as an ASSIP publication. Those six records are labeled **Published abstract**, not as full peer-reviewed journal articles. ASSIP tags for the object-detection and HEVAM preprints follow the user's requested classification and the documented student collaborations. The catalog's record count includes abstracts and developing work; it is not a count of peer-reviewed papers.

## Dashboards and public routes

`denniesbor.com/src/api/dashboards.js` is the shared source for dashboard cards on the home and portfolio pages.

| Public route | Source workspace | Role |
| --- | --- | --- |
| <https://mhtran.denniesbor.me/> | `/data/archives/nfs/mhtran-dash` | Transmission-network multi-hazard research dashboard. Uses the landing page because direct browser-history routes can depend on static-host fallback configuration. |
| <https://aviation.denniesbor.me/> | `/data/models-active/nfs/projects/aviation-dash` | Research prototype combining flights and space-weather observations. Credits the GMU DAEN capstone collaboration documented in the project README. |
| <https://cswims.denniesbor.me/#/dashboard> | `/data/archives/nfs/cswims-dash` | Satellite-fleet dashboard. Preserves the application's hash-router route. |
| `/portfolio/space-weather-grid` | Existing portfolio route | C-SWIM grid dashboard. |
| `/portfolio/cswim-journey` | New portfolio route | Journey 12 video preview. |

The three public dashboard origins returned HTTP 200 when checked on September 16. This establishes URL reachability, not the freshness or scientific validity of every dashboard data feed. The services use local Docker containers and an AWS reverse proxy over WireGuard, as described by the owner. Container names and mount paths were inspected read-only. No containers, proxy configuration, schedules, or databases were changed. No private service addresses are embedded in the new public links.

## Journey 12 delivery

The source is `/data/archives/nfs/c-swim/blender/renders/journey_v12/journey_v12.mp4`, 1280 by 720 pixels, 24 fps, approximately 89 seconds, with no audio. The original is preserved. The derived copy is 16,200,146 bytes (15.5 MiB), down from 111,486,166 bytes; encoding settings and checksums are recorded in `journey-v12-media.json`. The portfolio contains a derived H.264/yuv420p copy with a constrained bitrate and MP4 fast-start metadata. Its video element uses `preload="none"`, a poster, native controls, and `playsInline`, with a direct download fallback. Large source renders, simulation data, and Blender scenes are not copied into the portfolio.

The page distinguishes historical solar imagery and field reconstruction from illustrative transitions and a sampled statistical 250-year thermal-failure scenario. Updating the portfolio player does not resolve the scientific or rendering issues recorded in the Blender workspace's `NEXT_TASK.md`.

## CV and maintenance

`denniesbor.com/public/cv/Dennies_Bor_CV.pdf` is a copy of the locally verified postdoc CV in `~/Resume/main_cv_postdoc.pdf`, including May 2027 graduation and HAPI server development. The website no longer offers the older archived CV variants as current choices. After future CV builds, refresh this copy.

Production assets are built with `npm run build` from `denniesbor.com/`. The existing deployment workflow publishes on a push to the main branch. This update is prepared locally and has not been committed, pushed, or deployed.

## Validation

The production build (`npm run build`) and scoped ESLint checks for the new or rewritten catalog, dashboard, Journey, and CV modules pass. `git diff --check` passes. Full-repository lint still reports 123 errors and 2 warnings, compared with 134 errors and 2 warnings before this update; these are existing prop-validation, unused-variable, and configuration issues. Existing build warnings about bundle size, browser compatibility data, and an optional font fallback also remain.

Before removing the search controls, twenty-three Chromium browser checks passed against the production build at desktop (1440 pixels) and mobile (390 pixels) viewport widths, with additional homepage overflow checks at 320, 768, and 1024 pixels. They cover the 18-record catalog, six abstract labels, nine-record ASSIP filter, collaborator search and empty results, complete research descriptions, Cagniard navigation and manuscript status, dashboard URLs, current three-page CV rendering, deferred video loading, playback and seeking, missing-video fallback, and layout overflow. No uncaught page errors occurred. The local project API and original project assets were supplied as read-only browser fixtures; the catalog, CV PDF, and video used their real built assets. These checks do not exercise the production proxy or dashboard data services.

The copied CV matches the source PDF by SHA-256. `ffprobe` confirms the derived video is H.264, yuv420p, 1280 × 720, and 88.958333 seconds; its MP4 metadata precedes the media payload. Browser checks verified playback and seeking without preloading the MP4 on page entry.

## Visitor introductions and presentation

The homepage now begins with the research purpose in plain language. A wider main column replaces the technical-project sidebar; a direct section link keeps the complete technical portfolio accessible. The short film introduces the solar-storm story before four research tools. Each tool has a descriptive title, its full project name, a complete explanation of its purpose, concrete examples of what visitors can explore, and a descriptive action link.

Project names were checked against the local project READMEs: C-SWIM is the Coupled Space Weather Impact Model; MHTran is Multi-Hazard Power Transmission Risk Analysis. Satellite and aviation descriptions retain the distinction between modeled scenarios and observations. Aviation retains its research-prototype framing and George Mason University Data Analytics Engineering capstone credit.

Use “and” in interface copy. Explain project abbreviations where they are introduced. Research summaries, technical-project titles, and project descriptions are displayed in full. Technical project notes and demo previews have separate controls. The homepage does not need the project API to display its introductions, tools, or papers. The technical portfolio keeps the research tools visible when the project API is loading or unavailable.

The updated browser checks cover the explained project names, full descriptions, absence of ampersands in the home and portfolio interface text, section navigation, separate project controls, and the project-API failure state. Desktop and mobile screenshots were reviewed. Existing repository-wide lint errors remain at 123 errors and 2 warnings; the new and rewritten modules pass scoped ESLint checks.

The research section now presents all work directly under three headings, without search, a section dropdown, result counts, or empty-filter states. This is a personal portfolio; its small publication list does not need a search interface. Full summaries and the existing publication, ASSIP, and work-in-progress grouping remain. The production build and scoped ESLint check pass after this simplification.

## CNN coverage

The film card on the home and portfolio pages, and the film page below the player, link to [CNN’s coverage of the power-grid research](https://www.cnn.com/interactive/2026/07/weather/solar-storms-power-grid/). The link is labeled “Read CNN’s coverage of the research.” Its URL and label are maintained with the film entry in `src/api/dashboards.js`.

On September 17, 2026, the CNN URL returned HTTP 200 with the title “Here’s where a massive solar storm could take down the US power grid.” [George Mason’s news page](https://www.gmu.edu/news) identifies the September 4 CNN article as coverage of the research coauthored by Edward Oughton and Dennies Bor. The link describes coverage of the study; the Blender film retains its own description and provenance.
