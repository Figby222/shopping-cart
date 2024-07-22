import ShoppingCart from "../src/components/ShoppingCart/ShoppingCart.jsx";
import { screen, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("ShoppingCart", () => {
    it("renders heading with 'Shopping Cart' text", () => {
        render(<ShoppingCart cart={{}} removeFromCartHandler={() => {}} />)

        expect(screen.getByRole("heading", { name: /shopping cart/i }))
            .toBeInTheDocument();
    })
})