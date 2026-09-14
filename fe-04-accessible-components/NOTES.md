# Accessibility Notes

## Hand-built components vs shadcn/ui

### Modal / Dialog

Our hand-built modal implements important accessibility behavior manually:

- Escape closes the modal.
- Focus moves into the modal when it opens.
- Tab and Shift+Tab keep focus inside the modal.
- Focus returns to the trigger when the modal closes.

The shadcn Dialog uses Base UI dialog primitives, which provide reusable behavior instead of requiring us to implement all of the dialog behavior ourselves.

A concrete gap in our implementation is that our modal has a fixed structure. The shadcn Dialog separates functionality into reusable primitives such as `DialogTrigger`, `DialogClose`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogOverlay`, and `DialogPortal`.

Another gap is that our implementation manually manages focus trapping and Escape handling. With the shadcn/Base UI approach, these interaction and accessibility behaviors are handled by the underlying dialog primitive.

### Tabs

Our hand-built Tabs component supports:

- `tablist`, `tab`, and `tabpanel` ARIA roles.
- `aria-selected` and `aria-controls`.
- Arrow Left/Right keyboard navigation.
- Moving focus between tabs.
- Keeping inactive tabs out of the normal tab order.

The shadcn Tabs component uses Base UI primitives and provides a more reusable component structure: `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent`.

A concrete gap is that our implementation only supports a horizontal tab layout, while the shadcn component supports both horizontal and vertical orientations.

Another gap is that our implementation manually manages the active tab state and keyboard focus. The underlying shadcn/Base UI Tabs primitive provides the interaction behavior as part of the reusable component.

## Conclusion

Building the components by hand helped us understand the accessibility requirements instead of treating an AI-generated component as automatically accessible. The main difference is that shadcn provides reusable primitives that already handle more interaction and accessibility behavior, while our implementation requires us to maintain those behaviors ourselves.
