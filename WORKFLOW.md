# AI Development Workflow Comparison

## Round 1: Vague Prompt

For the first implementation, I gave the AI assistant a deliberately vague request to build a settings form. The resulting form included profile fields, preferences, notifications, validation, localStorage persistence, and a reset action. It was functional and required relatively little direction from me. The form rejected empty display names and invalid emails, and saved values remained after refreshing the page.

However, the vague approach gave me less control over the implementation details. I had to inspect the generated result myself to understand how validation, persistence, and the UI behavior had been implemented. The feedback messages appeared near the bottom of the form.

## Round 2: Precise Prompt

For the second implementation, I started from a fresh branch and fresh AI session. I provided specific files, requirements, constraints, edge cases, example behavior, accessibility requirements, and a verification step. I also asked the AI to inspect the repository and explain its plan before implementing the feature.

The precise prompt produced a substantially different implementation. The diff contained 358 insertions and 118 deletions compared with the vague branch. The HTML gained more explicit structure, field wrappers, autocomplete attributes, `aria-required`, and an `aria-live` status region. The theme selection also changed from a select element to a radio group. The JavaScript included explicit sanitization and safe handling of malformed localStorage data.

I manually tested the Round 2 implementation. Empty and whitespace-only display names were rejected, invalid emails were rejected, valid data persisted after refresh, Reset restored the defaults, and malformed localStorage data did not crash the page.

## AI Mistake and Review

One important lesson was that AI verification still required human review. Cursor reported that 9/9 automated tests passed, but the `tests` folder in the resulting repository was empty, so I could not independently reproduce those reported tests. I therefore relied on direct browser testing for the behaviors I could verify.

## Conclusion

The precise workflow required more effort up front because I had to specify requirements, constraints, examples, and verification steps. However, it produced a more deliberate implementation and made the expected behavior much clearer. The biggest improvement was not simply the amount of code generated, but the reduction in ambiguity and the ability to verify specific requirements. In future AI-assisted development, I will use the explore → plan → implement → test → review workflow rather than relying on a vague prompt and accepting the first output.
