import Store from "../src/components/Store/Store.jsx";
import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Store rendering", () => {
    it("renders heading with text \"Store\"", () => {
        render(
            <Store cart={[]} 
            addToCartHandler={() => {}} 
            removeFromCartHandler={() => {}} />
        );
        expect(screen.getByRole("heading", { name: "Store" }))
            .toBeInTheDocument();
    });
})