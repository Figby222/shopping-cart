import CartItem from "../src/components/utilities/CartItem/CartItem.jsx";
import { screen, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("CartItem", () => {
    it("renders itemTitle paragraph", () => {
        render(<CartItem 
            id={1} 
            itemTitle={""} 
            quantity={1} 
            removeFromCartHandler={() => {}}/>);

        expect(screen.getByText(/title/i)).toBeInTheDocument();
    })

    it("renders itemTitle paragraph with prop-given text", () => {
        render(<CartItem
            id={1}
            itemTitle={"T-shirt"}
            quantity={1}
            removeFromCartHandler={() => {}} />
        )

        const itemTitle = screen.getByText(/title/i);
        expect(itemTitle.textContent).toMatch(/t-shirt/i);
    })

    it("renders itemTitle paragraph with different prop-given text", () => {
        render(<CartItem
            id={1}
            itemTitle={"black pants"}
            quantity={1}
            removeFromCartHandler={() => {}} />
        )

        const itemTitle = screen.getByText(/title/i);
        expect(itemTitle.textContent).toMatch(/black pants/i);
    })

    it("renders quantity paragraph", () => {
        render(<CartItem
            id={1}
            itemTitle={"black pants"}
            quantity={1}
            removeFromCartHandler={() => {}} />
        )

        expect(screen.getByText(/quantity/i)).toBeInTheDocument();
    })

    it("renders quantity paragraph with prop-given value", () => {
        render(<CartItem
            id={1}
            itemTitle={"black pants"}
            quantity={1}
            removeFromCartHandler={() => {}} />
        )

        const quantity = screen.getByText(/quantity/i); 
        expect(quantity.textContent).toMatch(/1/i);
    })

    it("renders quantity paragraph with different prop-given value", () => {
        render(<CartItem
            id={1}
            itemTitle={"black pants"}
            quantity={2}
            removeFromCartHandler={() => {}} />
        )

        const quantity = screen.getByText(/quantity/i); 
        expect(quantity.textContent).toMatch(/2/i);
    })
})

describe("remove from cart button", () => {
    it("renders a button to remove from cart", () => {
        render(<CartItem
            id={1}
            itemTitle={"black pants"}
            quantity={2}
            removeFromCartHandler={() => {}} />
        )

        expect(screen.getByRole("button", { name: /remove item from cart/i }))
            .toBeInTheDocument();
    })

    it("renders remove from cart button with 'X' textContent", () => {
        render(<CartItem
            id={1}
            itemTitle={"black pants"}
            quantity={2}
            removeFromCartHandler={() => {}} />
        )

        const removeFromCart = screen.getByRole("button", { name: /remove item from cart/i });
        expect(removeFromCart.textContent).toMatch(/X/i);
    })

    it("calls removeFromCartHandler function on click", async () => {
        const onClick = vi.fn();
        render(<CartItem
            id={1}
            itemTitle={"black pants"}
            quantity={2}
            removeFromCartHandler={onClick} />
        )
        const user = userEvent.setup();

        const removeFromCart = screen.getByRole("button", { name: /remove item from cart/i });
        await user.click(removeFromCart);
        expect(onClick).toHaveBeenCalled();
    })

    it("calls removeFromCartHandler function with id arg", async () => {
        const onClick = vi.fn();
        render(<CartItem
            id={1}
            itemTitle={"black pants"}
            quantity={2}
            removeFromCartHandler={onClick} />
        )
        const user = userEvent.setup();

        const removeFromCart = screen.getByRole("button", { name: /remove item from cart/i });
        await user.click(removeFromCart);
        expect(onClick.mock.calls[0][0]).toBe(1);
    })

    it("calls removeFromCartHandler function with different id arg", async () => {
        const onClick = vi.fn();
        render(<CartItem
            id={2}
            itemTitle={"black pants"}
            quantity={2}
            removeFromCartHandler={onClick} />
        )
        const user = userEvent.setup();

        const removeFromCart = screen.getByRole("button", { name: /remove item from cart/i });
        await user.click(removeFromCart);
        expect(onClick.mock.calls[0][0]).toBe(2);
    })
})