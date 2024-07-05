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
});