# Hero's Essay Blueprint - UI & Experience Principles

## 5. User Interface & Experience Principles

### 5.1. Global Interface & Navigation
*   **Header Ribbon:** Sticky top header containing title, dropdown menu to switch drafts, new/delete buttons, and a Light/Dark mode toggle.
*   **Master Navigation Bar:** Centralized row of tabs controlling main viewport routing.

### 5.2. Workspace Modules
*   **Worksheet Planner:** Left column for settings (title, target word count, tracking type) and right column for drafting canvas.
*   **Elements Clinic:** Interactive Zoom Lens and Montage Builder sandboxes.
*   **Manuscript Preview:**
    *   *Analytics Panel:* Word count strategy progress bar and Admissions Quality Audit checklist. Passive warnings trigger only when global essay reaches 90% and 100% of maximum.
    *   *Live Manuscript View:* Scrolling viewport assembling the text.
*   **Guidebook Manual:** Toggleable reference library.

### 5.3. Overall Aesthetic & Color Palette
*   **Dark Mode (Default):** Extremely dark navy/slate (#070B14). Interactive elements use Mint, Cyan, Teal, and Cerulean. Rose-Pink used for warnings.
*   **Light Mode (Professional):** Clean whites and light grays for guidance counselors. Deep Red serves as secondary accent.

### 5.4. Typography, Geometry, & Icons
*   **Typography:** Sans-Serif (Inter) for structural UI. Serif (Lora) for narrative. Monospace (JetBrains Mono) for micro-data.
*   **Layout:**
    *   *Desktop:* 12-column grid.
    *   *Mobile Mode:* Single-column interface hiding analytical structures, featuring only Scratchpad and vertical text fields.
*   **Icons:** \`lucide-react\` library throughout.

### 5.5. Accessibility (a11y) Standards
*   **Contrast Ratios:** Minimum 4.5:1.
*   **Keyboard Navigation & Focus Management:** Full keyboard access.
*   **ARIA:** Detailed \`aria-roledescription\` and \`aria-live\` in drag-and-drop assembly.
*   **Form Labelling:** Explicit \`<label>\` tags tied to \`<textarea>\`.

## 6. Alternatives Considered & Rejected
*   **❌ Generative AI Integration:** Rejected due to admissions safety (AI detectors) and bypassing the pedagogical goal of introspection.
*   **❌ Automated Essay Stitching:** Rejected to ensure the burden of authorship remains entirely on the student.
*   **❌ Rich Text Editing (WYSIWYG):** Rejected to eliminate superficial aesthetic distraction.
*   **❌ Linear "Wizard" Navigation:** Rejected because non-linear brainstorming is required for organic narrative evolution.
*   **❌ Strict Form Validation:** Rejected; "blank page" friction is countered visually instead of with hard system blocks.
*   **❌ Pre-Populated "Demo Essay":** Rejected to prevent anchoring bias; abstract tooltips are preferred.
