# Project Recovery Plan: 2. Strategy and Prioritization

This document details Phase 2 of the project recovery plan, focusing on defining the strategy and prioritizing efforts based on the diagnosis conducted in Phase 1 (documented in [`docs/Project_Recovery_Plan.md`](docs/Project_Recovery_Plan.md:1)).

## 2.1 Identify Critical Path Functionalities

Based on the application's core purpose, define the minimum set of features that must be functional for the application to be considered "working" or "usable". These are the critical path functionalities.

### Steps:

1.  **List Core Features**: Identify the main features of the Mindful Moments application.
    *   *Example*: User authentication, starting a meditation session, accessing weather information, displaying messages.
2.  **Prioritize Features**: Rank the features based on their importance to the core user experience.
    *   *Example*: Application startup > Starting session > Displaying messages > Accessing weather.
3.  **Define "Minimum Viable Functionality"**: Determine which features *must* work for the application to provide any value.
    *   *Example*: Application starts, user can log in, user can start a basic meditation session.

## 2.2 Choose Recovery Strategy

Based on the diagnosis from Phase 1 (error types, extent of damage, identified problematic commits), select the most appropriate recovery strategy.

### Option A: Rollback

Revert the codebase to the last known stable commit.

*   **When to Choose**:
    *   The diagnosis reveals widespread issues affecting multiple core components.
    *   Identifying and fixing individual issues seems complex or time-consuming.
    *   A clear last known good commit is available.
    *   The primary goal is rapid restoration of basic functionality.
*   **Process**:
    1.  Identify the SHA of the last stable commit (e.g., using `git log` or `git bisect`).
    2.  Execute `git checkout <stable_commit_sha>`.
    3.  Reinstall dependencies (`pnpm install`).
    4.  Test the application thoroughly to confirm stability.
    5.  Carefully re-apply necessary features or fixes from later commits, one by one, with rigorous testing.

### Option B: Incremental Fixes

Address specific issues identified in Phase 1 one by one.

*   **When to Choose**:
    *   The diagnosis reveals localized issues affecting specific components.
    *   The problematic changes are clearly identified and seem straightforward to fix.
    *   Rolling back would discard valuable, working features implemented recently.
    *   The primary goal is to fix the current version without losing recent progress.
*   **Process**:
    1.  Prioritize the identified issues based on severity and impact on critical path functionalities.
    2.  For each issue:
        *   Analyze the root cause (using logs, code review).
        *   Implement a targeted fix.
        *   Test the fix thoroughly in isolation and for regressions.
    3.  Repeat until all critical path functionalities are restored.

## 2.3 Resource Allocation (Mode/Tool Assignment)

Assign specific tasks or types of work to the most suitable SPARC modes based on their capabilities.

*   **🪲 Debugger Mode**:
    *   Detailed analysis of error logs and stack traces.
    *   Stepping through code execution to find bugs.
    *   Identifying root causes of crashes.
*   **🧠 Auto-Coder Mode**:
    *   Implementing code fixes identified during debugging.
    *   Refactoring problematic code sections.
    *   Writing new code for missing or broken features.
*   **📚 Documentation Writer Mode**:
    *   Documenting the recovery process, findings, and fixes.
    *   Updating project documentation to reflect the stable state.
    *   Creating post-mortem analysis documents.
*   **🔗 System Integrator Mode**:
    *   Ensuring different parts of the application work together after fixes.
    *   Testing end-to-end workflows.
*   **🧪 Tester (TDD) Mode**:
    *   Writing tests for fixed functionalities to prevent regressions.
    *   Ensuring test coverage for critical paths.

### Example Allocation based on Strategy:

*   **If Rollback (Option A)**:
    *   Execute rollback: Manual Git command (or guided by Orchestrator).
    *   Testing after rollback: System Integrator, Tester.
    *   Carefully re-applying features: Auto-Coder, Tester, System Integrator.
    *   Documentation: Documentation Writer.
*   **If Incremental Fixes (Option B)**:
    *   Issue Diagnosis: Debugger.
    *   Implementing Fixes: Auto-Coder.
    *   Testing Fixes: Tester, System Integrator.
    *   Documentation: Documentation Writer.

## 2.4 Next Steps

Proceed to Phase 3: Implementation and Verification, following the chosen strategy and assigned resources.

---