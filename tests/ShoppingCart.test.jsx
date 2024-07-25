import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart.jsx";
import { screen, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("ShoppingCart", () => {
    it("renders heading with 'Shopping Cart' text", () => {
        render(<ShoppingCart cart={[]} removeFromCartHandler={() => {}} />)

        expect(screen.getByRole("heading", { name: /shopping cart/i }))
            .toBeInTheDocument();
    })

    it("renders paragraph with 'item count' text", () => {
        render(<ShoppingCart cart={[]} removeFromCartHandler={() => {}} />)
        
        expect(screen.getByText(/item count/i))
            .toBeInTheDocument();
    })

    it("renders item count paragraph with correct item count", () => {
        const mockCart = [
            {
                itemId: 1,
                title: "T-shirt",
                itemQuantity: 1,
            }
        ]
        render(<ShoppingCart cart={mockCart} removeFromCartHandler={() => {}} />)
        
        const itemCountParagraph = screen.getByText(/item count/i);

        expect(itemCountParagraph.textContent)
            .toMatch(/1/i);
    })

    it("renders item count paragraph with correct item count", () => {
        const mockCart = [
            {
                itemId: 1,
                title: "T-shirt",
                itemQuantity: 1,
            },
            {
                itemId: 2,
                title: "T-shirt",
                itemQuantity: 1,
            }
        ]
        render(<ShoppingCart cart={mockCart} removeFromCartHandler={() => {}} />)
        
        const itemCountParagraph = screen.getByText(/item count/i);

        expect(itemCountParagraph.textContent)
            .toMatch(/2/i);
    })
})

describe("shopping cart items", () => {
    it("renders a title paragraph", () => {
        const mockCart = [
            {
                itemId: 1,
                title: "T-shirt",
                itemQuantity: 1,
            }
        ]
        render(<ShoppingCart cart={mockCart} removeFromCartHandler={() => {}} />)
        
        const itemTitleParagraph = screen.getByText(/title/i);
        expect(itemTitleParagraph).toBeInTheDocument();

    })
})