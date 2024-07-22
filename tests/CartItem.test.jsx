import CartItem from "../src/components/utilities/CartItem/CartItem.jsx";
import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("CartItem", () => {
    it("renders itemTitle paragraph", () => {
        render(<CartItem 
            itemId={1} 
            itemTitle={""} 
            itemQuantity={1} 
            removeFromCartHandler={() => {}}/>);

        expect(screen.getByLabelText(/item title/i)).toBeInTheDocument();
    })

    it("renders itemTitle paragraph with prop-given text", () => {
        render(<CartItem
            itemId={1}
            itemTitle={"T-shirt"}
            itemQuantity={1}
            removeFromCartHandler={() => {}} />
        )

        const itemTitle = screen.getByLabelText(/item title/i);
        expect(itemTitle.textContent).toMatch(/t-shirt/i);
    })

    it("renders itemTitle paragraph with different prop-given text", () => {
        render(<CartItem
            itemId={1}
            itemTitle={"black pants"}
            itemQuantity={1}
            removeFromCartHandler={() => {}} />
        )

        const itemTitle = screen.getByLabelText(/item title/i);
        expect(itemTitle.textContent).toMatch(/black pants/i);
    })

    it("renders itemQuantity paragraph", () => {
        render(<CartItem
            itemId={1}
            itemTitle={"black pants"}
            itemQuantity={1}
            removeFromCartHandler={() => {}} />
        )

        expect(screen.getByLabelText(/item quantity/i)).toBeInTheDocument();
    })

    it("renders itemQuantity paragraph with prop-given value", () => {
        render(<CartItem
            itemId={1}
            itemTitle={"black pants"}
            itemQuantity={1}
            removeFromCartHandler={() => {}} />
        )

        const itemQuantity = screen.getByLabelText(/item quantity/i); 
        expect(itemQuantity.textContent).toMatch(/1/i);
    })

    it("renders itemQUantity paragraph with different prop-given value", () => {
        render(<CartItem
            itemId={1}
            itemTitle={"black pants"}
            itemQuantity={2}
            removeFromCartHandler={() => {}} />
        )

        const itemQuantity = screen.getByLabelText(/item quantity/i); 
        expect(itemQuantity.textContent).toMatch(/2/i);
    })
})

describe("remove from cart button", () => {
    it("renders a button to remove from cart", () => {
        render(<CartItem
            itemId={1}
            itemTitle={"black pants"}
            itemQuantity={2}
            removeFromCartHandler={() => {}} />
        )

        expect(screen.getByRole("button", { name: /remove item from cart/i }))
            .toBeInTheDocument();
    })
})