import StoreItem from "../src/components/utilities/StoreItem/StoreItem.jsx";
import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Add to cart button", () =>{
    it("renders button with text 'Add to cart'", () => {
        render(<StoreItem />);
        expect(screen.getByRole("button", { name: /Add to cart/i }))
            .toBeInTheDocument();
    })
});