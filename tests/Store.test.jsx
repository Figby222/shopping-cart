import Store from "../src/components/Store/Store.jsx";
import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Store rendering", () => {
    it("renders heading with text \"Store\"", () => {
        render(
            <Store cart={{}} 
            addToCartHandler={() => {}} 
            removeFromCartHandler={() => {}} />
        );
        expect(screen.getByRole("heading", { name: "Store" }))
            .toBeInTheDocument();
    });
    
    it("renders an shopping-cart-item-count element", () => {
        render(
            <Store cart={{}} 
            addToCartHandler={() => {}}
            removeFromCartHandler={() => {}} />
        );
        expect(screen.getByLabelText("shopping-cart-item-count"))
            .toBeInTheDocument();
    })

    it(`renders shopping-cart-item-count element with the text:
         "Item count: <digit>"`, () => {
        render(
            <Store cart={{}} 
            addToCartHandler={() => {}} 
            removeFromCartHandler={() => {}}/>
        );
        const shoppingCartItemCount = 
            screen.getByLabelText("shopping-cart-item-count");
        
        expect(shoppingCartItemCount.textContent).toMatch(/item count: \d/i);

    })
})