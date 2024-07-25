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
                quantity: 1,
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
                quantity: 1,
            },
            {
                itemId: 2,
                title: "T-shirt",
                quantity: 1,
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
                quantity: 1,
            }
        ]
        render(<ShoppingCart cart={mockCart} removeFromCartHandler={() => {}} />)
        
        const itemTitleParagraph = screen.getByText(/title/i);
        expect(itemTitleParagraph).toBeInTheDocument();

    })

    it("renders a title paragraph with 'T-shirt' text", () => {
        const mockCart = [
            {
                itemId: 1,
                title: "T-shirt",
                quantity: 1,
            }
        ]
        render(<ShoppingCart cart={mockCart} removeFromCartHandler={() => {}} />)
        
        const titleParagraph = screen.getByText(/title/i);
        expect(titleParagraph.textContent).toMatch(/T-shirt/i);
    })

    it("renders a title paragraph with 'Black pants' text", () => {
        const mockCart = [
            {
                itemId: 2,
                title: "Black pants",
                quantity: 1,
            }
        ]
        render(<ShoppingCart cart={mockCart} removeFromCartHandler={() => {}} />)
        
        const titleParagraph = screen.getByText(/title/i);
        expect(titleParagraph.textContent).toMatch(/Black pants/i);
    })

    it("renders a quantity paragraph", () => {
        const mockCart = [
            {
                itemId: 1,
                title: "T-shirt",
                quantity: 1,
            }
        ]
        render(<ShoppingCart cart={mockCart} removeFromCartHandler={() => {}} />)
        
        const quantityParagraph = screen.getByText(/quantity/i);
        expect(quantityParagraph).toBeInTheDocument();
    })

    it("renders a quantity paragraph with correct quantity", () => {
        const mockCart = [
            {
                itemId: 1,
                title: "T-shirt",
                quantity: 1,
            }
        ]
        render(<ShoppingCart cart={mockCart} removeFromCartHandler={() => {}} />)
        
        const quantityParagraph = screen.getByText(/quantity/i);
        expect(quantityParagraph.textContent).toMatch(/1/i);
    })
})