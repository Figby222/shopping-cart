import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart.jsx";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            }
        ]
        render(<ShoppingCart cart={mockCart} removeFromCartHandler={() => {}} />)
        
        const itemCountParagraph = screen.getByTestId(/shopping-cart-item-count/i);

        expect(itemCountParagraph.textContent)
            .toMatch(/1/i);
    })

    it("renders item count paragraph with correct item count", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            },
            {
                id: 2,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            }
        ]
        render(<ShoppingCart cart={mockCart} removeFromCartHandler={() => {}} />)
        
        const itemCountParagraph = screen.getByTestId(/shopping-cart-item-count/i);

        expect(itemCountParagraph.textContent)
            .toMatch(/2/i);
    })
})

describe("removeFromCartHandler mock tests", () => {
    it("calls removeFromCartHandler function on click", async () => {
        const onClick = vi.fn();
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 2,
                price: 40,
            }
        ]
        render(<ShoppingCart 
            cart={mockCart} 
            removeFromCartHandler={onClick} />);
        const user = userEvent.setup();

        const removeFromCart = screen.getByRole("button", { name: /remove item from cart/i });
        await user.click(removeFromCart);
        expect(onClick).toHaveBeenCalled();
    })

    it("calls removeFromCartHandler function with id arg", async () => {
        const onClick = vi.fn();
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 2,
                price: 20,
            }
        ]
        render(<ShoppingCart 
            cart={mockCart} 
            removeFromCartHandler={onClick} />);
        const user = userEvent.setup();

        const removeFromCart = screen.getByRole("button", { name: /remove item from cart/i });
        await user.click(removeFromCart);
        expect(onClick.mock.calls[0][0]).toBe(1);
    })

    it("calls removeFromCartHandler function with different id arg", async () => {
        const onClick = vi.fn();
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 2,
                price: 40,
            }
        ]
        render(<ShoppingCart 
            cart={mockCart} 
            removeFromCartHandler={onClick} />);
        const user = userEvent.setup();

        const removeFromCart = screen.getByRole("button", { name: /remove item from cart/i });
        await user.click(removeFromCart);
        expect(onClick.mock.calls[0][0]).toBe(2);
    })
})