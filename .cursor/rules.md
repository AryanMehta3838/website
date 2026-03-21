Project guardrails
Build a personal portfolio website to showcase projects.
Use Next.js and Tailwind CSS.
Do not add a backend in v1.
Do not add login/auth.
Do not add a database.
Use local static data for projects.
Each project card must support:
- title
- description
- tech stack tags
- GitHub link
- download link
- optional live demo link
- optional thumbnail
Keep the architecture simple and maintainable.
Prioritize clean UX and recruiter readability.
Use responsive design for desktop and mobile.
Use a dark modern design with a single blue accent color.
Use subtle animations only.
No overengineered component patterns.
Organize code clearly for future expansion.

Animation and Threejs guidlines
Keep all 3D effects decorative, not essential to navigation or content.
Preserve recruiter readability over visual flair at all times.
Prefer lightweight ambient motion over complex interactive scenes.
Do not block initial page render with heavy 3D assets.
Use progressive enhancement: the site must still look good if WebGL fails or is disabled.
Respect prefers-reduced-motion; reduce or disable nonessential animations.
Avoid full-screen particle systems unless explicitly requested.
Keep frame rate smooth on typical laptops; prioritize performance over complexity.
Minimize bundle size and avoid unnecessary Three.js helpers/dependencies.
Do not animate every section at once.
Limit animation focus to 1–2 hero effects plus subtle section transitions.
Reuse shared animation utilities/components instead of scattering logic everywhere.
Ensure mobile performance is acceptable; simplify or disable heavier effects on small screens.
Do not interfere with scroll, text selection, buttons, or links.
Keep z-index/layering simple so canvas effects never block UI interaction.
Prefer subtle parallax, gradient motion, floating geometry, or light trails over gimmicky 3D scenes.
All animations must have a clear cleanup path to avoid memory leaks.
No audio, autoplay video, or unexpected interactive effects.
Maintain accessibility contrast and text legibility over animated backgrounds.