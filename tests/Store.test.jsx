import Store from "../src/components/Store/Store.jsx";
import { screen, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from '@testing-library/user-event';
import { useState } from "react";

describe("Store rendering", () => {
    it("renders heading with text \"Store\"", () => {
        render(
            <Store cart={[]} setCart={() => {}} />
        );
        expect(screen.getByRole("heading", { name: "Store" }))
            .toBeInTheDocument();
    });

    it("renders cart item title when cart has 1 item", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 1,
                price: 40,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        );
        const title = screen.getByText(/Black pants/i);
        expect(title)
            .toBeInTheDocument();
    })
})

describe("shopping cart items", () => {
    it("renders a title paragraph", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const itemTitleParagraph = screen.getByText(/title/i);
        expect(itemTitleParagraph).toBeInTheDocument();

    })

    it("renders a title paragraph with 'T-shirt' text", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const titleParagraph = screen.getByText(/title/i);
        expect(titleParagraph.textContent).toMatch(/T-shirt/i);
    })

    it("renders a title paragraph with 'Black pants' text", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 1,
                price: 20,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const titleParagraph = screen.getByText(/title/i);
        expect(titleParagraph.textContent).toMatch(/Black pants/i);
    })

    it("renders a quantity paragraph", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const quantityParagraph = screen.getByText(/quantity/i);
        expect(quantityParagraph).toBeInTheDocument();
    })

    it("renders a quantity paragraph with correct quantity", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const quantityParagraph = screen.getByText(/quantity/i);
        expect(quantityParagraph.textContent).toMatch(/1/i);
    })

    it("renders a quantity paragraph with different quantity", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 2,
                price: 20,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const quantityParagraph = screen.getByText(/quantity/i);
        expect(quantityParagraph.textContent).toMatch(/2/i);
    })

    it("renders a price paragraph", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 2,
                price: 20,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const priceParagraph = screen.getByText(/price/i);
        expect(priceParagraph).toBeInTheDocument();
    })
    
    it("renders a price paragraph with accurate price", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const priceParagraph = screen.getByText(/price/i);
        expect(priceParagraph.textContent).toMatch(/20/i);
    })

    it("renders price with a different price", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 1,
                price: 40,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const priceParagraph = screen.getByText(/price/i);
        expect(priceParagraph.textContent).toMatch(/40/i);
    })

    it("renders price that is multiplied by quantity", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 2,
                price: 40,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const priceParagraph = screen.getByText(/price/i);
        expect(priceParagraph.textContent).toMatch(/80/i);
    })

    it("renders multiple items", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            },
            {
                id: 2,
                title: "Black pants",
                quantity: 2,
                price: 40,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const titleParagraphs = screen.queryAllByText(/title/i);
        expect(titleParagraphs).toHaveLength(2);
    })

    it("doesn't render anything when no items are given", () => {
        const mockCart = [];
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const titleParagraphs = screen.queryAllByText(/title/i);
        expect(titleParagraphs).toHaveLength(0);
    })
})

describe("total price", () => {
    it("renders a paragraph for total", () => {
        const mockCart = []
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const totalParagraph = screen.getByText(/total/i);
        expect(totalParagraph).toBeInTheDocument();
    })

    it("starts with value of 0", () => {
        const mockCart = []
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const totalParagraph = screen.getByText(/total/i);
        expect(totalParagraph.textContent).toMatch(/0/i);
    })

    it("has accurate price when there's 1 cart item", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 1,
                price: 40,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )
        
        const totalParagraph = screen.getByText(/total/i);
        expect(totalParagraph.textContent).toMatch(/40/i);
    })

    it("has accurate price when there are 2 cart items", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            },
            {
                id: 2,
                title: "Black pants",
                quantity: 1,
                price: 40,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )

        const totalParagraph = screen.getByText(/total/i);
        expect(totalParagraph.textContent).toMatch(/60/i);
    })

    it("has accurate price when there are 2 cart items with different quantities", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            },
            {
                id: 2,
                title: "Black pants",
                quantity: 2,
                price: 40,
            }
        ]
        render(
            <Store cart={mockCart} setCart={() => {}} />
        )

        const totalParagraph = screen.getByText(/total/i);
        expect(totalParagraph.textContent).toMatch(/100/i);
    })
})

describe("CartItem", () => {
    it("renders itemTitle paragraph", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            }
        ]
        render(<Store cart={mockCart} setCart={() => {}} />);

        expect(screen.getByText(/title/i)).toBeInTheDocument();
    })

    it("renders itemTitle paragraph with prop-given text", () => {
        const mockCart = [
            {
                id: 1,
                title: "T-shirt",
                quantity: 1,
                price: 20,
            }
        ]
        render(<Store cart={mockCart} setCart={() => {}} />);

        const itemTitle = screen.getByText(/title/i);
        expect(itemTitle.textContent).toMatch(/t-shirt/i);
    })

    it("renders itemTitle paragraph with different prop-given text", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 1,
                price: 40,
            }
        ]
        render(<Store cart={mockCart} setCart={() => {}} />);

        const itemTitle = screen.getByText(/title/i);
        expect(itemTitle.textContent).toMatch(/black pants/i);
    })

    it("renders quantity paragraph", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 1,
                price: 40,
            }
        ]
        render(<Store cart={mockCart} setCart={() => {}} />);

        expect(screen.getByText(/quantity/i)).toBeInTheDocument();
    })

    it("renders quantity paragraph with prop-given value", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 1,
                price: 40,
            }
        ]
        render(<Store cart={mockCart} setCart={() => {}} />);

        const quantity = screen.getByText(/quantity/i); 
        expect(quantity.textContent).toMatch(/1/i);
    })

    it("renders quantity paragraph with different prop-given value", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 2,
                price: 40,
            }
        ]
        render(<Store cart={mockCart} setCart={() => {}} />);

        const quantity = screen.getByText(/quantity/i); 
        expect(quantity.textContent).toMatch(/2/i);
    })
})

describe("remove from cart button", () => {
    it("renders a button to remove from cart", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 2,
                price: 40,
            }
        ]
        render(<Store cart={mockCart} setCart={() => {}} />);

        expect(screen.getByRole("button", { name: /remove item from cart/i }))
            .toBeInTheDocument();
    })

    it("renders remove from cart button with 'X' textContent", () => {
        const mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 2,
                price: 40,
            }
        ]
        render(<Store cart={mockCart} setCart={() => {}} />);

        const removeFromCart = screen.getByRole("button", { name: /remove item from cart/i });
        expect(removeFromCart.textContent).toMatch(/X/i);
    })

    it("removes item from cart when there's one item", async () => {
        let mockCart = [
            {
                id: 2,
                title: "Black pants",
                quantity: 2,
                price: 40,
            }
        ]

        const MockParent = ({ initialMockCart }) => {
            const [ cart, setCart ] = useState(initialMockCart);

            return <Store cart={cart} setCart={setCart} />
        }

        render(<MockParent initialMockCart={mockCart}/>);

        const removeFromCart = screen.getByRole("button", { name: /remove item from cart/i });
        const user = userEvent.setup();
        await user.click(removeFromCart);
        expect(screen.queryByText(/title/i)).not.toBeInTheDocument();
    })
})