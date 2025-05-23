> **Quick Recovery Checklist**
>
> 1. Collect error messages from browser, server, and terminal.
> 2. Review recent git commits for breaking changes.
> 3. Verify environment variables and dependencies.
> 4. Decide: Rollback to last stable commit or fix incrementally.
> 5. Test after each change and document all fixes.
> 6. Once stable, perform root cause analysis and update docs.
---
# Project Recovery Plan: Mindful Moments

## 1. Introduction

This document outlines a structured approach to diagnose, address, and recover the Mindful Moments application from its current non-functional state. The goal is to restore core functionality methodically and prevent future occurrences.

## 2. Current Status Assessment

*   **Symptoms**: Application is crashing and non-functional.
*   **Suspected Cause**: Recent changes (potentially by AI agents Claude/Gemini).
*   **Immediate Goal**: Stabilize the application and restore critical features.

## 3. Recovery Phases

### Phase 1: Diagnosis and Information Gathering

1.  **Error Collection**:
    *   Document specific error messages from browser console, server logs, and terminal output.
    *   Note the steps that lead to crashes.
2.  **Version Control Review**:
    *   Examine recent commits and changes using `git log`.
    *   Identify changesets introduced around the time the issues began.
    *   Consider using `git bisect` if the problematic commit is unclear.
3.  **Environment Check**:
    *   Verify environment variables (.env) are correct and loaded.
    *   Ensure all dependencies (package.json) are correctly installed (e.g., `pnpm install`).
    *   Check build processes (e.g., `pnpm build` or `pnpm dev`).

### Phase 2: Strategy and Prioritization

1.  **Identify Critical Path**:
    *   List the most critical user-facing functionalities that must be restored first (e.g., application startup, core meditation session flow).
2.  **Choose Recovery Strategy**:
    *   **Option A: Rollback**: Revert to the last known stable commit. This is often the quickest way to restore service.
        *   Command: `git checkout <last_known_good_commit_sha>` (then test thoroughly).
    *   **Option B: Incremental Fixes**: If rollback is not feasible or desired, identify and fix specific issues one by one, starting with the most critical.
3.  **Resource Allocation**:
    *   Determine if specialized modes (e.g., Debugger, Auto-Coder) are needed for specific fixes.

### Phase 3: Implementation and Verification

1.  **Execute Strategy**:
    *   If rolling back, perform the `git checkout`.
    *   If fixing incrementally, address issues based on priority.
2.  **Iterative Testing**:
    *   After each significant change or fix, thoroughly test the affected functionality and perform regression testing on related areas.
    *   Use browser developer tools, server logs, and application-specific debugging tools.
3.  **Code Review (if applicable)**:
    *   If new code is written for fixes, ensure it's reviewed.
4.  **Documentation of Fixes**:
    *   Keep a log of changes made, issues resolved, and new issues found during the recovery process.

### Phase 4: Post-Mortem and Preventative Measures

1.  **Root Cause Analysis**:
    *   Once stable, conduct a thorough analysis of what went wrong.
2.  **Lessons Learned**:
    *   Document insights gained from the incident and recovery process.
3.  **Process Improvement**:
    *   Identify changes to development, testing, or deployment processes to prevent similar issues.
    *   Consider enhanced pre-commit hooks, more rigorous automated testing, or stricter review processes for AI-generated code.
4.  **Update Documentation**:
    *   Ensure all project documentation reflects the current stable state.

## 4. Next Steps (Suggested)

*   Begin **Phase 1: Diagnosis and Information Gathering**.
*   Consider switching to "🪲 Debugger" mode for detailed error analysis or "🧠 Auto-Coder" for implementing fixes.

---
**Note**: This plan provides a general framework. Specific actions will depend on the findings during the diagnosis phase.