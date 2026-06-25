# Hero's Essay Blueprint - System Architecture & Data Model

## 3. System Architecture & Tech Stack

### 3.1. Frontend Technologies
*   **Framework:** React 18+ (Single Page Application paradigm).
*   **Language:** TypeScript.
*   **Styling:** Tailwind CSS and \`lucide-react\` for iconography.
*   **Routing:** \`react-router-dom\` for deep linking and safe use of browser navigation.

### 3.2. Backend & State Management
*   **Primary Database:** Firebase Firestore.
*   **Offline Persistence:** Leveraging the Firebase Web SDK's native IndexedDB caching for offline capabilities.
*   **Conflict Resolution & Data Safety:** Optimistic concurrency model utilizing "last-write-wins". Utilizes a \`beforeunload\` event listener tied to a dirty-state flag to prevent data loss.
*   **Sync Indicator:** UI must include an indicator to distinguish between offline (local-only) and online (synced) states.

### 3.3. Export Libraries
*   **docx:** Native Microsoft Word document generation.
*   **jspdf:** Static PDF rendering.
*   **file-saver:** Client-side file downloads.

## 4. Data Model (Schema) & Integrity

### 4.1. Firestore Schema
*   \`id\` (UUID)
*   \`userId\` (Firebase Auth UID)
*   \`title\` (String)
*   \`createdAt\` (Timestamp, mapped via serverTimestamp)
*   \`updatedAt\` (Timestamp, mapped via serverTimestamp)
*   \`schemaVersion\` (Number, set to 1)
*   \`blocks\` (Array of Objects): Polymorphic array containing \`type\`, \`orderIndex\`, and \`content\`.
*   \`montageElements\` (Array of Objects): Stores discrete objects with era, theme, and collegePromise.
*   \`scratchpad\` (String): Stores unstructured, raw text independently.

### 4.2. Security & Compliance
*   **Firestore Rules:** Enforce schema versioning (\`allow update: if request.resource.data.schemaVersion == resource.data.schemaVersion\`).
*   **Cascading Deletion:** A Firebase Cloud Function guarantees user data deleted upon account removal.
*   **Migration Strategy:** Future batch-update scripts when schema increments.
