import StoreItem from "../src/components/utilities/StoreItem/StoreItem.jsx";
import { screen, render } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";

describe("Add to cart button", () =>{
    it("renders button with text 'Add to cart'", () => {
        render(<StoreItem />);
        expect(screen.getByRole("button", { name: /Add to cart/i }))
            .toBeInTheDocument();
    })

    it("calls prop function when clicked", async () => {
        const onClick = vi.fn();

        render(<StoreItem addToCartHandler={onClick}/>)

        const user = userEvent.setup();

        const button = screen.getByRole("button", {name: /Add to cart/i });

        await user.click(button);

        expect(onClick).toHaveBeenCalled();
    })
    it("calls onClick function with item quantity", async () => {
        const onClick = vi.fn();

        render(<StoreItem addToCartHandler={onClick} />);

        const user = userEvent.setup();
        const addToCart = screen.getByRole("button", { name: /Add to cart/i});
        const quantityInput = 
            screen.getByLabelText(/item quantity/i);
        
        await user.type(quantityInput, "2");
        await user.click(addToCart);

        expect(onClick.mock.calls[0][1]).toBe(2);

    })
});

describe("Item quantity input", () => {
    it("renders input for item quantity", () => {
        render(<StoreItem addToCartHandler={() => {}} />);

        expect(screen.getByLabelText(/item quantity/i))
        // somehow query number input. I don't think textbox will work
            .toBeInTheDocument();
    });

    it("sets input value correctly when user types a number", async () => {
        render(<StoreItem addToCartHandler={() => {}} />);

        const user = userEvent.setup();
        const input = screen.getByLabelText(/item quantity/i);

        await user.type(input, "2");

        expect(input.value).toBe("2")
    })
})