import ErrorBoundary from "../src/components/utilities/ErrorBoundary/ErrorBoundary.jsx";
import { screen, render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("render ErrorBoundary", () => {
    it("provides feedback as to an invalid webpage", () => {
        render(<ErrorBoundary />, { wrapper: BrowserRouter });

        const invalidPage = screen.queryByText(/invalid page/i);
        expect(invalidPage).toBeInTheDocument();
    })

    it("provides link to homepage", () => {
        render(<ErrorBoundary />, { wrapper: BrowserRouter });

        const homeLink = screen.queryByText(/click here to go back home/i);
        expect(homeLink).toBeInTheDocument();
    })
})