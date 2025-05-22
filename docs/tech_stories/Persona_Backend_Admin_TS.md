# Technical User Story: Backend Persona Management & Admin Configuration

**As a** developer building the backend systems and admin panel,
**I want** a robust and flexible system to define, store, and manage AI personas—including their unique one-word identifiers, system prompts, and voice configurations—with full CRUD (Create, Read, Update, Delete) capabilities accessible through an admin panel,
**So that** administrators can easily curate and expand the library of distinct AI personas offered to users without requiring direct code changes, and the application can dynamically adapt AI interactions based on these managed personas.

---

## Requirements:

1.  **Persona Data Model/Schema:**
    *   [ ] Each persona must have the following attributes:
        *   `id`: Unique system identifier (e.g., UUID, auto-incrementing ID).
        *   `oneWordIdentifier`: A unique, capitalized, single word for quick reference and potential UI display (e.g., "REFLECT", "GRIEVE", "DUMP"). This should be unique.
        *   `displayName`: User-facing name for the persona (e.g., "The Reflective Mirror," "The Empathetic Listener").
        *   `description`: A brief explanation of the persona's style, focus, or purpose.
        *   `systemPrompt`: The detailed base instructions and personality definition provided to the LLM (e.g., Hume API). This must be editable text.
        *   `voiceConfigId` (or embedded voice configuration): Link to or contain parameters for the voice to be used with this persona (e.g., specific Hume voice ID, pitch, speed).
        *   `isActive`: Boolean flag to enable/disable the persona for user selection.
        *   `icon` (Optional): Path or identifier for a visual representation.
        *   `metadata` (Optional): JSON field for any other specific settings or tags.

2.  **Storage Solution:**
    *   [ ] Persona definitions must be stored in a persistent database (e.g., PostgreSQL, MongoDB) to allow for dynamic management via an admin panel.
    *   [ ] Database schema must be designed to efficiently store and query persona attributes.

3.  **Admin Panel Functionality (CRUD for Personas):**
    *   [ ] **List Personas:** The admin panel must display a list of all existing personas with key details (e.g., `oneWordIdentifier`, `displayName`, `isActive`).
    *   [ ] **Create Persona:**
        *   A form allowing administrators to input all required fields for a new persona (`oneWordIdentifier`, `displayName`, `description`, `systemPrompt`, select/configure `voiceConfigId`, set `isActive`).
        *   Validation for required fields and uniqueness of `oneWordIdentifier`.
    *   [ ] **Edit Persona:**
        *   Allow administrators to modify any attribute of an existing persona.
        *   The `systemPrompt` should be editable in a text area.
        *   Voice configuration should be modifiable.
    *   [ ] **Delete Persona:**
        *   Allow administrators to remove personas (consider soft delete vs. hard delete).
    *   [ ] **Activate/Deactivate Persona:**
        *   Quick toggle for the `isActive` status.

4.  **Voice Configuration Management (within Admin Panel for Personas):**
    *   [ ] The admin panel interface for creating/editing personas must provide a way to:
        *   Select from a list of pre-defined Hume voices (if the list is manageable and can be fetched/updated).
        *   OR input specific Hume voice IDs and configuration parameters (pitch, speed, etc.) directly.
        *   This might involve a separate "Voice Configurations" table/entity that personas can link to, also managed via the admin panel.

5.  **API Endpoints for Persona Management:**
    *   [ ] Secure RESTful API endpoints must be created to support the admin panel's CRUD operations:
        *   `GET /api/admin/personas` (List all personas)
        *   `POST /api/admin/personas` (Create a new persona)
        *   `GET /api/admin/personas/{personaId}` (Get a specific persona)
        *   `PUT /api/admin/personas/{personaId}` (Update a specific persona)
        *   `DELETE /api/admin/personas/{personaId}` (Delete a specific persona)
    *   [ ] These endpoints must be protected and require appropriate admin authentication/authorization.

6.  **API Endpoints for Frontend Consumption:**
    *   [ ] A public API endpoint for the frontend application to fetch active personas:
        *   `GET /api/personas` (List all `isActive: true` personas, returning only necessary fields like `id`, `oneWordIdentifier`, `displayName`, `description`, `icon`).

7.  **Integration with AI Service:**
    *   [ ] The core AI interaction service must be able to fetch the `systemPrompt` and `voiceConfig` for the currently selected (or default) persona to initialize/configure the LLM (Hume API).

8.  **Validation and Error Handling:**
    *   [ ] Implement robust input validation for all persona attributes in the API and admin panel.
    *   [ ] Ensure `oneWordIdentifier` is unique.
    *   [ ] Provide clear error messages in the admin panel for failed operations.

---

## Notes:

*   The design of the `voiceConfigId` or embedded voice configuration needs to align with how Hume API voices are identified and customized. If Hume provides a static list of voices, these could be dropdowns. If voices are highly configurable, direct parameter input might be needed.
*   Consider versioning for `systemPrompt` if significant iterative changes are expected.
*   The admin panel itself is a separate feature but its requirements for persona management are captured here.