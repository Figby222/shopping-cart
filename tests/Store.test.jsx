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

    it("renders cart item title when cart has 1 item", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 1,
                price: 40,
            }
        ]
        render(
            <Store cart={mockCart} 
            addToCartHandler={() => {}} 
            removeFromCartHandler={() => {}} />
        );
        const title = screen.getByText(/Black pants/i);
        expect(title)
            .toBeInTheDocument();
    })
})