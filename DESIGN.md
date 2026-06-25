# Hero's Essay Blueprint - System Design & Architecture

## 1. Executive Summary & Product Vision
The Hero's Essay Blueprint is an interactive web application designed to help college applicants conquer the "Curse of the Blank Page." By digitizing Joseph Campbell’s Hero's Journey and Pixar’s 22 Rules of Storytelling, the app provides a rigorous framework for drafting compelling, narrative-driven personal statements.

### The Core Paradigm & MVP Limitations: The "Ingredients List"
The explicit goal of this application is NOT to output a finalized, ready-to-submit essay. Instead, it acts as a pre-writing synthesizer.

**Pedagogical Disclaimer:** Users are explicitly warned against forcing every application essay into these structural tracks. Doing so risks creating a homogenized, formulaic application profile. This tool is designed for primary, narrative-driven personal statements.

**MVP Scope Limitation:** This application is not currently optimized for strictly factual, exposition-heavy supplemental prompts (e.g., the 150-word "Extracurricular Activity" summary). Users are advised that external outlining methods may be more appropriate for those specific requirements.

By the end of the workflow, the user will have an ordered list of "ingredients"—a structurally sound Zero Draft containing their core transformation, narrative spine, sensory elements, and contextual themes. The user can select from multiple ways to order the ingredients. The user will then export this raw material in the preferred ordering to their own external text editor (Google Docs/Word) for independent final wordsmithing, transitional stitching, and prose polishing.

### AI Communication Strategy
The application strictly avoids the use of generative AI. To align user expectations and comply with academic integrity policies, the onboarding flow requires users to acknowledge an explicit disclosure stating the tool contains no AI generation, auto-completion, or summarization features. This replaces the passive visual badge approach to ensure active user comprehension.

## 2. Product Requirements (Functional Scope)

### 2.1. Authentication & Onboarding
* **Authentication:** Authentication & COPPA Compliance: Handled securely via Firebase Authentication (Google OAuth & Email/Password). Prior to capturing any credentials, the registration flow mandates a neutral Date of Birth (DOB) input. Any user inputting a DOB indicating an age under 13 is hard-blocked from account creation to ensure COPPA compliance. Support for Verifiable Parental Consent (VPC) flows is excluded from the MVP.
* **Trust Messaging:** The login screen will prominently feature a badge communicating the platform's "100% Human-Authored / Zero Generative AI" guarantee.
* **Onboarding Flow:** When a user launches the application for the first time, they are presented with a streamlined onboarding modal consisting of six sequential steps (Steps 0-5). To prevent user abandonment, each step presents only a concise summary of the core pedagogical concept. Each screen includes a "Learn More" toggle to dynamically expand the full detailed curriculum, alongside a prominent "Skip Ahead" button allowing the user to bypass the current step.
* **This flow establishes the pedagogical foundation of the app:**
   * **Step 0: The Grand Splash Screen:** Introduces the core philosophy that a story is superior to a resume.
   * **Step 1: The Screenplay Solution:** Explains the "Pixar Rule of Struggle," emphasizing that vulnerability builds trust.
   * **Step 2: Choose Your Story Guides:** Users select 2 to 4 familiar stories from a grid of recognizable films and books (e.g., Harry Potter, Lord of the Rings, Spider-Man). A "Camp Counselor Essay" is permanently selected as a baseline academic example.
   * **Step 3: Beat-by-Beat Narrative Blueprint:** An interactive timeline where users click through the 8 stages of the "Hero's Journey" framework. The UI displays the strategic purpose of each beat and a comparative table showing how the selected stories tackle that specific narrative step.
   * **Step 4: Cinematic Prose Techniques:** Introduces the functionality of the "Zoom Lens" and "Montage" tools as described in the Guidebook Manual.
   * **Step 5: Drafting Track Selection:** The final step where users choose their primary structural framework: Hero's Journey (8 beats), Different but Truthful (5 beats), or Intellectual Journey (5 beats).

### 2.2. The Dashboard (Essay Management)
A central hub where users can view and manage all their active essays (supporting multiple application prompts simultaneously).
* **Create:** Generate a new, blank workspace.
* **Open:** Resume an existing essay.
* **Duplicate:** Clone an existing essay. This allows students to tweak a core narrative for slightly different college supplements without destroying the original.
* **Delete:** Remove an essay. This action must trigger a destructive-action modal that requires the user to manually type the exact title of the draft to authorize the deletion. This interrupts automated clicking behavior and prevents catastrophic accidental data loss.

### 2.3. The Workspace (Core Tabbed UI)
The core editing experience is divided into four distinct phases, navigable via an unlocked tabbed interface. All user text inputs strictly accept and store plain text. Rich text editing (WYSIWYG) is disabled. Export operations utilize basic RTF/HTML snippets exclusively to inject system-generated structural formatting (e.g., bolding section names, inserting pedagogical headers, and formatting ordered lists), ensuring the user's plain-text raw ingredients are clearly delineated when opened in an external editor.
* **The Universal Scratchpad:** The interface features a persistent "Scratchpad" drawer or side-panel toggle, accessible instantly across all tabs on desktop and serving as a primary view in Mobile Capture Mode. This plain-text staging area allows users to rapidly record unformatted, spontaneous thoughts, isolated from the rigorous pedagogical structure of the core essay blocks.
* **Tab 1: The Workbook (The Outliner):** Free-form text areas broken into distinct pedagogical phases. It asks specific questions out of chronological order to ensure the story has a point before the plot is formed.
* **Tab 2: Story Arc Visualizer:** A vertical CSS timeline that maps the user's Workbook inputs directly onto the stages of their selected framework. It visually flags missing data to highlight weak narrative momentum.
* **Tab 3: Elements Clinic (Cinematic Polish):** Two specialized text inputs enforcing cinematic rules:
   * **The Zoom Lens:** Prompts the user to expand their climax with sensory details.
   * **The Montage:** Prompts the user to summarize background context using active, punchy sentences.
* **Tab 4: Manuscript Assembly (Zero Draft):** A compiler screen synthesizing inputs into an ordered document. Users utilize a drag-and-drop interface to dynamically rearrange their narrative beats prior to export. To guide narrative structure, this tab employs a pedagogical linter. If a user drops blocks into an inherently weak sequence (e.g., placing the "Climax" before the "Inciting Incident"), the UI displays a soft, non-blocking warning icon. Hovering triggers a tooltip explaining the pedagogical risk and suggesting the standard chronological alternative, preserving user freedom while offering expert guidance.

### 2.4. Educational Support
* **Slide-Out Handbook Sidebar:** A globally accessible, toggleable drawer containing the full text of the curriculum. Users can reference deep pedagogy (like the "Anti-Patterns" checklist) without leaving their active text editor.
* **Contextual Tooltips:** In-line pedagogical hints placed directly above text areas in the Workbook.

### 2.5. Export & Portability Suite
Frictionless client-side export options move the "ingredients" to an external editor using RTF or HTML snippets to preserve structural formatting where possible.
* **Copy to Clipboard:** One-click copy of the raw Zero Draft.
* **Download as .RTF:** Client-side generation of a Rich Text Format document preserving basic system-generated structural markers.
* **Local Export:** Client-side generation and download of formatted .docx and .pdf files.

## 3. System Architecture & Tech Stack

### 3.1. Frontend Technologies
* **Framework:** React 18+ (Single Page Application paradigm).
* **Language:** TypeScript (for strict typing of the narrative data models).
* **Styling:** Tailwind CSS (for utility-first, rapid, responsive UI development) and lucide-react for iconography.
* **Routing:** react-router-dom. Every essay and tab has a discrete URL (e.g., /dashboard, /essay/:id/workbook). This enables deep linking, bookmarking, and safe use of the browser's native "Back" button without breaking the app state.

### 3.2. Backend & State Management
The application utilizes a single-layer, cloud-first state management strategy.
* **Primary Database:** Firebase Firestore.
* **Offline Persistence:** The application leverages the Firebase Web SDK's native IndexedDB caching for offline capabilities and background synchronization. The custom localStorage sync layer is eliminated to remove race conditions, prevent data overwrites, and reduce engineering overhead.
* **Conflict Resolution & Data Safety:** Based on the operational assumption that users will not concurrently edit from multiple devices, the system defaults to an optimistic concurrency model utilizing a standard "last-write-wins" resolution protocol. To prevent marooned data during asynchronous background synchronization, the frontend utilizes a `beforeunload` event listener tied to a dirty-state flag. If a user attempts to close the tab before a sync completes, the browser forces a native confirmation dialogue to prevent data loss.
* **Sync Indicator:** The UI must include a Sync Indicator component to visually distinguish between offline (local-only) and online (synced) states.

### 3.3. Export Libraries
* **docx:** For native Microsoft Word document generation entirely in the browser.
* **jspdf:** For static PDF rendering.
* **file-saver:** For triggering client-side file downloads.

## 4. Data Model (Schema) & Integrity

### 4.1. Firestore Schema
The data model utilizes a flat NoSQL document structure in Firestore where each essay document (`users/{userId}/essays/{essayId}`) contains embedded metadata to track the application lifecycle and nested objects grouping the pedagogical phases. It strictly accepts plain-text strings.
* **id (UUID)**
* **userId (Firebase Auth UID)**
* **title (String)**
* **createdAt (Timestamp):** Generated exclusively via `FieldValue.serverTimestamp()` upon document creation to enable accurate lifecycle analytics.
* **updatedAt (Timestamp):** Generated exclusively via `FieldValue.serverTimestamp()` on every write operation, negating issues related to skewed client-side clocks.
* **schemaVersion (Number):** Set to 1. The frontend must implement explicit null-checking and fallback logic to prevent UI crashes if future curriculum updates introduce new keys.
* **blocks (Array of Objects):** A polymorphic array replacing rigid track maps. Each element contains `type` (String, mapping to the specific prompt), `orderIndex` (Number), and `content` (String). `montageElements` (Array of Objects): Stores discrete objects with distinct fields for era, theme, and collegePromise to preserve structural data integrity between sessions. Note on Mutations: To prevent nested object overwrites, frontend data mutations must strictly utilize field-level dot-notation updates rather than merging entire document trees.
* **scratchpad (String):** A dedicated data field storing unstructured, raw text. This operates independently of the structural blocks array, ensuring transient thoughts are not accidentally parsed as narrative beats during export or assembly.

### 4.2. Security & Compliance
* **Firestore Rules:** Enforce schema versioning: `allow update: if request.resource.data.schemaVersion == resource.data.schemaVersion`.
* **Cascading Deletion:** A Firebase Cloud Function (triggered by `auth.user().onDelete`) must ensure all user data in Firestore is deleted upon account removal to prevent PII leakage.

## 5. User Interface & Experience Principles

### 5.1. Global Interface & Navigation
Once inside the main application, the interface utilizes a sticky top header.
* **Header Ribbon:** Contains the application title, a dropdown menu to switch between saved essay drafts, buttons to create or delete drafts, and a global Light/Dark mode toggle switch.
* **Welcome Pinnacle:** A top-level summary banner offering quick-action buttons to restart the tutorial tour, read the guidebook, or jump into writing.
* **Master Navigation Bar:** A centralized row of tabs that control the main viewport routing.

### 5.2. Workspace Modules (The Main Tabs)
1. **Worksheet Planner:** The core drafting engine, split into two columns:
   * **Left Column (Settings & Guides):** Users configure metadata, type a title, dynamically toggle their Framework Methodology, and set a Target Word Count. A "Tutorial Study Templates" panel allows users to instantly hydrate the workspace with pre-written, high-quality examples to study.
   * **Right Column (The Drafting Canvas):** Displays vertical input cards for each narrative prompt. Each prompt card contains a descriptive label, a real-time word counter mapped against a proportional "sweet spot" target rather than a strict localized limit, a primary text area, dynamic warnings, and inline clickable template buttons.
2. **Elements Clinic:**
   * **The Zoom Lens:** The UI features interactive examples on the left. On the right, a "Sensory Builder Sandbox" provides dedicated text areas to isolate micro-details across Sight, Sound, Sensation, and Smell.
   * **The Montage Builder:** Users select a unifying theme, describe three distinct eras, and declare a "College Connection Promise." The tool mathematically combines these into a sweeping timeline.
3. **Manuscript Preview:**
   * **Analytics Panel (Left):** Features a master "Word Count Strategy" progress bar, a "Proportional Balance Indicator" displaying the relative weight of each structural beat, and an "Admissions Quality Audit" checklist. Passive warning states trigger only when the global essay reaches 90% (585 words) and 100% (650 words) of the standard maximum. The UI actively advises reserving 10% of the total budget for final stitching and transitional prose.
   * **Live Manuscript View (Right):** A scrolling viewport that renders the fully assembled essay in a clean, serif font. A toolbar offers export buttons.
4. **Guidebook Manual:**
   * A toggleable reference library. Interactive Guide: Foundational chapters and narrative rules. Clichés & Pitfalls: A searchable database of common essay traps providing the definition, a strategic fix, a poorly written example, and a strong alternative.

### 5.3. Overall Aesthetic & Color Palette
* **Dark Mode (Default):** The root application canvas utilizes an extremely dark navy/slate (#070B14), while panels layer slightly lighter shades (slate-950, slate-900) for depth. Readable text uses soft whites (text-slate-100). Interactive elements, active states, and structural tools utilize a vibrant, modern palette of Mint, Cyan, Teal, and Cerulean. A vibrant Rose-Pink is explicitly reserved as the secondary accent for warnings, problems, and anti-pattern alerts.
* **Light Mode (Professional):** Tailored for guidance counselors and parents. Overrides map the dark slate backgrounds to clean whites and light grays (#ffffff, #f8fafc, #f1f5f9), shifting text to dark navy/slates (#1e293b, #0f172a) for maximum trustworthiness and readability. Deep Red serves as the secondary accent for warnings and missing data.

### 5.4. Typography, Geometry, & Icons
* **Typography:** Sans-Serif (Inter) for the structural interface. Serif (Lora) for narrative/story content to mimic a printed book. Monospace (JetBrains Mono) for micro-data, counters, and step indicators.
* **Layout & Geometry:**
   * **Desktop/Laptop (>= 1024px):** Utilizes a responsive, asymmetrical 12-column grid (4 columns for settings, 8 columns for canvas). UI elements feature generous border radii.
   * **Mobile Capture Mode (< 1024px):** Triggers a simplified, single-column interface that strictly hides the Manuscript Assembly, Analytics, and structural tabs. Mobile Capture Mode exposes only two interfaces: a vertical stack of text-entry fields for the user's active structural track, and a globally accessible Scratchpad.

### 5.5 Accessibility (a11y) Standards
* **Contrast Ratios:** The UI must maintain a minimum contrast ratio of 4.5:1.
* **Keyboard Navigation & Focus Management:** All interactive elements must be fully navigable via keyboard.
* **ARIA Implementation:** "Manuscript Assembly" drag-and-drop interface must include comprehensive aria-roledescription.

## 6. Alternatives Considered & Rejected
* ❌ 1. Generative AI Integration (LLMs as a "Co-Pilot")
* ❌ 2. Automated Essay Stitching
* ❌ 3. Rich Text Editing (WYSIWYG)
* ❌ 4. Linear "Wizard" Navigation (Stepper UI)
* ❌ 5. Strict Form Validation & Character Limits
* ❌ 6. Pre-Populated "Demo Essay" on Onboarding

## 7. Planned Architecture: Role-Based Sharing & Parent Billing

### 7.1. Use Cases & Core Requirements
1. **Sharing & Feedback:** Primary users (students) need the ability to share drafts with third parties (counselors, parents, or peers) for review, restricting them to read-only or comment-only access.
2. **Sponsored Billing:** Because young users may lack payment methods, parent or guardian accounts must be able to sponsor the student's account and pay for premium functionality seamlessly.

### 7.2. Role-Based Sharing Architecture
* **Data Model (Firestore):**
   * Move from a purely single-user essay ownership model (`userId` field) to a robust collaborative data model.
   * **Essay Document Updates:** Add an `accessControl` map or `collaborators` array storing user UIDs and their explicitly assigned roles (e.g., `owner`, `commenter`).
   * **Pending Invites:** Create an `invitations` root collection. When a student shares an essay via email, an invite is logged. If the invitee already has an account, they are instantly added. Otherwise, upon registration, a Cloud Function detects their email and resolves pending invites.
* **Roles & Permissions:**
   * **Owner:** Full read/write/delete capabilities.
   * **Commenter:** Read-only access to the essay content. Write access strictly limited to a new, isolated `comments` sub-collection attached to the essay document.
* **Firestore Security Rules:** Overhaul structure to validate reads against the `collaborators` object. Comment creation is restricted to users with `commenter` or `owner` roles for that specific `essayId`.
* **UI Extensions:** Implement a "Share" modal allowing the owner to add/remove users by email, and introduce a "Feedback/Review Mode" UI state for invited commenters.

### 7.3. Parent Billing & Sponsored Accounts Architecture
* **Linked Account Paradigm:** Establish a system where parents and students have discrete authentications but linked authorizations.
   * The student initiates a link by generating a secure "Sponsor Code" or invitation link, which the parent accepts.
* **Data Model Changes:**
   * **Student Document (`users/{studentId}`):** Add `sponsorId` (String UID) indicating who pays for the account.
   * **Parent Document (`users/{parentId}`):** Add `sponsoredStudentIds` (Array of Strings). 
* **Backend Integration (Stripe & Firebase Functions):**
   * The parent interacts with the Stripe checkout flow. 
   * A Stripe Webhook triggers a Firebase Cloud Function whenever a subscription activates, renews, or cancels.
   * Instead of frequent client-side querying of the sponsor's status, the Cloud Function directly injects a Custom Auth Claim (e.g., `premium: true`) into BOTH the parent's and the linked student's Firebase Auth tokens.
* **Access Control:** The frontend routes and Firestore Rules can instantly verify premium feature access by checking `request.auth.token.premium == true`, guaranteeing fast, secure authorization without additional database reads per request.
