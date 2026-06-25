# Hero's Essay Blueprint - Product Requirements

## 2. Product Requirements (Functional Scope)

### 2.1. Authentication & Onboarding
*   **Authentication & COPPA Compliance:** Handled securely via Firebase Authentication (Google OAuth & Email/Password). Prior to capturing any credentials, the registration flow mandates a neutral Date of Birth (DOB) input. Any user inputting a DOB indicating an age under 13 is hard-blocked from account creation to ensure COPPA compliance. Support for Verifiable Parental Consent (VPC) flows is excluded from the MVP.
*   **Trust Messaging:** The login screen will prominently feature a badge communicating the platform's "100% Human-Authored / Zero Generative AI" guarantee.
*   **Onboarding Flow:** When a user launches the application for the first time, they are presented with a streamlined onboarding modal consisting of six sequential steps (Steps 0-5). To prevent user abandonment, each step presents only a concise summary of the core pedagogical concept. Each screen includes a "Learn More" toggle to dynamically expand the full detailed curriculum, alongside a prominent "Skip Ahead" button allowing the user to bypass the current step.
    *   *Step 0:* The Grand Splash Screen.
    *   *Step 1:* The Screenplay Solution (Pixar Rule of Struggle).
    *   *Step 2:* Choose Your Story Guides (Interactive comparison).
    *   *Step 3:* Beat-by-Beat Narrative Blueprint (Hero's Journey timeline).
    *   *Step 4:* Cinematic Prose Techniques (Zoom Lens and Montage).
    *   *Step 5:* Drafting Track Selection (Hero's Journey, Different but Truthful, or Intellectual Journey).

### 2.2. The Dashboard (Essay Management)
A central hub where users can view and manage all their active essays:
*   **Create:** Generate a new, blank workspace.
*   **Open:** Resume an existing essay.
*   **Duplicate:** Clone an existing essay.
*   **Delete:** Remove an essay. Must trigger a destructive-action modal requiring manual typing of the exact title to prevent accidental data loss.

### 2.3. The Workspace (Core Tabbed UI)
The core editing experience is divided into four distinct phases. Rich text editing (WYSIWYG) is disabled.
*   **The Universal Scratchpad:** A persistent drawer or side-panel toggle, accessible instantly across all tabs to rapidly record unformatted, spontaneous thoughts.
*   **Tab 1: The Workbook (The Outliner):** Free-form text areas broken into distinct pedagogical phases, asked out of chronological order.
*   **Tab 2: Story Arc Visualizer:** A vertical CSS timeline that maps the user's Workbook inputs directly onto the stages of their selected framework, highlighting missing data.
*   **Tab 3: Elements Clinic (Cinematic Polish):** Specialized text inputs enforcing cinematic rules (Zoom Lens and Montage).
*   **Tab 4: Manuscript Assembly (Draft Zero):** A compiler screen synthesizing inputs. Users utilize a drag-and-drop interface to rearrange narrative beats. It includes a pedagogical linter displaying soft warnings for weak sequencing (e.g., Climax before Inciting Incident).

### 2.4. Educational Support
*   **Slide-Out Handbook Sidebar:** A globally accessible, toggleable drawer containing the full text of the curriculum.
*   **Contextual Tooltips:** In-line pedagogical hints placed directly above text areas in the Workbook.

### 2.5. Export & Portability Suite
Frictionless client-side export options:
*   **Copy to Clipboard:** One-click copy of the raw Draft Zero.
*   **Download as .RTF / .DOCX:** Client-side generation preserving basic structural markers.
*   **Download as .PDF:** Client-side generation of a static document.
