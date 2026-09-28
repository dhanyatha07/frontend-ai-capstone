import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AttemptInput from "./AttemptInput";

describe("AttemptInput", () => {
  it("shows an error when the student submits an empty attempt", () => {
    const onSubmit = vi.fn();

    render(<AttemptInput problemId="two-sum" onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: "Get Coaching" }));

    expect(
      screen.getByText("please enter your approach or code first."),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits the student's approach with the problem ID", () => {
    const onSubmit = vi.fn();

    render(<AttemptInput problemId="two-sum" onSubmit={onSubmit} />);

    const textarea = screen.getByPlaceholderText(
      "Explain your approach or paste your code here...",
    );

    fireEvent.change(textarea, {
      target: {
        value: "I will use a HashMap",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Get Coaching" }));

    expect(onSubmit).toHaveBeenCalledWith({
      problemId: "two-sum",
      attempt: "I will use a HashMap",
    });
  });
});
