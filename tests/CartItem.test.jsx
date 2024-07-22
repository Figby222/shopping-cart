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
})