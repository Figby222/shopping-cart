import Homepage from "../src/components/Homepage/Homepage.jsx";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("Homepage content", () => {
    it("renders heading", () => {
        render(<Homepage />, { wrapper: BrowserRouter });
        const title = screen.getByRole("heading", { name: "Ryan's Totally Real Jewelry"});
        expect(title).toBeInTheDocument();
    });
});