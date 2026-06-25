# Product Design Documents

## Feature: Parent-Sponsored Accounts for Student Draft Sharing

### Goal
The primary user (student) needs to write essays and share them with another account (e.g., college counselor, parent, friend) for review and feedback (comment access only). Students often lack independent payment methods, so the system must allow a parent or sponsor account to pay for premium features on the student's behalf.

### Architectural Plan

1.  **Role-Based Access Control (RBAC) & Data Model**
    *   **Users Collection:** Enhance the `users` table to support `accountType` (e.g., `student`, `counselor`, `parent/sponsor`) and `linkedSponsorId` (pointing to the account holding the active subscription).
    *   **Sharing/Collaborators Collection:** For each draft (or globally under a student account), create a sub-collection representing `collaborators`. Each document will specify the `userId`, `role` (e.g., `commenter`, `viewer`), and the `draftId`.
    *   **Comments Collection:** Introduce a `comments` collection tied to specific `blocks` or `sentences` within a draft, storing `authorId`, `timestamp`, `content`, and `resolved` status.

2.  **Billing & Subscription Delegation (Stripe Integration)**
    *   **Sponsor Flow:** When a student hits a premium paywall, they can generate a "Sponsor Link." The parent clicks this link, creates a Parent account, and completes the Stripe checkout.
    *   **Stripe Metadata:** The Stripe checkout session will embed metadata linking the `payerUid` (parent) to the `beneficiaryUid` (student).
    *   **Entitlement Check:** The application will modify the premium entitlement check. Instead of just `user.isPro`, the check becomes `user.isPro || lookupSponsor(user.linkedSponsorId).isPro`.

3.  **Authentication & Accounts**
    *   Both students and parents/counselors will use standard Firebase Authentication.
    *   The counselor/parent will log in to a distinct "Reviewer Dashboard" that aggregates shared drafts rather than showing the standard writing workspace.

4.  **Security Rules (Firestore)**
    *   **Draft Read/Write:**
        *   `allow read: if request.auth.uid == resource.data.ownerId || isCollaborator(request.auth.uid, resource.id)`
        *   `allow write: if request.auth.uid == resource.data.ownerId` (Strictly locking reviewers out of editing).
    *   **Comment Write:**
        *   `allow write (create): if isCollaborator(request.auth.uid, resource.data.draftId)`

5.  **Application UI Extensions**
    *   **Share Modal:** Add a "Share for Review" panel in the essay environment to invite via email.
    *   **Sponsor Prompt:** Add a "Ask a Parent to Pay" workflow in the billing modal.
    *   **Reviewer Environment:** A read-only mode of the Editor that highlights text and opens a commenting sidebar.
