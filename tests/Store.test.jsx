import Store from "../src/components/Store/Store.jsx";
import { screen, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from '@testing-library/user-event';
import { useState } from "react";
import { act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import routes from "../src/routes.jsx";

globalThis.fetch = vi.fn((URL) => {
    if (URL === "https://fakestoreapi.com/products/1") {
        return Promise.resolve({
            json: () => Promise.resolve({
                id: 1,
                title: "Oriental Fresh Shirt",
                price: 124,
                description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
                image: "https://loremflickr.com/640/480"
            })
        })
    }

    if (URL === "https://fakestoreapi.com/products/2") {
        return Promise.resolve({
            json: () => Promise.resolve({
                id: 2,
                title: "Mens Casual Premium Slim Fit T-Shirts",
                price: 22.3,
                description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            })
        })

    }

    if (URL === "https://fakestoreapi.com/products/3") {
        return Promise.resolve({
            json: () => Promise.resolve({
                id: 3,
                title: "Mens Cotton Jacket",
                price: 55.99,
                description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
                    "category": "men's clothing",
                image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
                
            })
        })
    }

    if (URL === "https://fakestoreapi.com/products/4") {
        return Promise.resolve({
            json: () => Promise.resolve({
                id: 4,
                title: "red shirt",
                price: 128,
                description: "A super cool red shirt",
                image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            })
        })
    }

    return Promise.resolve({
        status: 404,
    })
})

describe("Store rendering", () => {
    it("renders heading with text \"Store\"", () => {
        render(
            <Store cart={[]} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
        )
        
        const titleParagraphs = screen.queryAllByText(/title/i);
        expect(titleParagraphs).toHaveLength(2);
    })

    it("doesn't render anything when no items are given", () => {
        const mockCart = [];
        render(
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
        )
        
        const titleParagraphs = screen.queryAllByText(/title/i);
        expect(titleParagraphs).toHaveLength(0);
    })
})

describe("total price", () => {
    it("renders a paragraph for total", () => {
        const mockCart = []
        render(
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
        )
        
        const totalParagraph = screen.getByText(/total/i);
        expect(totalParagraph).toBeInTheDocument();
    })

    it("starts with value of 0", () => {
        const mockCart = []
        render(
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
            <Store cart={mockCart} setCart={() => {}} />,
            { wrapper: BrowserRouter }
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
        render(<Store cart={mockCart} setCart={() => {}} />, { wrapper: BrowserRouter });

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
        render(<Store cart={mockCart} setCart={() => {}} />, { wrapper: BrowserRouter });

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
        render(<Store cart={mockCart} setCart={() => {}} />, { wrapper: BrowserRouter });

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
        render(<Store cart={mockCart} setCart={() => {}} />, { wrapper: BrowserRouter });

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
        render(<Store cart={mockCart} setCart={() => {}} />, { wrapper: BrowserRouter });

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
        render(<Store cart={mockCart} setCart={() => {}} />, { wrapper: BrowserRouter });

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
        render(<Store cart={mockCart} setCart={() => {}} />, { wrapper: BrowserRouter });

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
        render(<Store cart={mockCart} setCart={() => {}} />, { wrapper: BrowserRouter });

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

        render(<MockParent initialMockCart={mockCart}/>, { wrapper: BrowserRouter });

        const removeFromCart = screen.getByRole("button", { name: /remove item from cart/i });
        const user = userEvent.setup();
        await user.click(removeFromCart);
        expect(screen.queryByText(/title/i)).not.toBeInTheDocument();
    })

    it("renders 2 removeFromCart buttons with 2 cart items", () => {
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

        const MockParent = ({ initialMockCart }) => {
            const [ cart, setCart ] = useState(initialMockCart);

            return <Store cart={cart} setCart={setCart} />
        }

        render(<MockParent initialMockCart={mockCart}/>, { wrapper: BrowserRouter });

        const removeFromCartBtns = 
            screen.getAllByRole("button", { name: /remove item from cart/i });
        expect(removeFromCartBtns).toHaveLength(2);
    })

    it("removes only 1 item from the cart", async () => {
        const mockCart = [
            {
                id: 1,
                title: "Blue T-shirt",
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

        const MockParent = ({ initialMockCart }) => {
            const [ cart, setCart ] = useState(initialMockCart);

            return <Store cart={cart} setCart={setCart} />
        }

        render(<MockParent initialMockCart={mockCart}/>, { wrapper: BrowserRouter });

        const removeFromCartBtns = 
            screen.getAllByRole("button", { name: /remove item from cart/i });

        const removeFirstItemFromCart = removeFromCartBtns[1];
        const user = userEvent.setup();
        await user.click(removeFirstItemFromCart);

        expect(screen.queryByText(/Blue T-shirt/i)).toBeInTheDocument();
        expect(screen.queryByText(/Black pants/i)).not.toBeInTheDocument();
    })
})

describe("rendering store items", () => {
    it("renders the correct title heading for the item", async () => {
        await act(async () => {
            render(<Store cart={[]} setCart={() => {}} />, { wrapper: BrowserRouter })
        })
    
        const titleHeading = screen.queryByRole("heading", { name: /Oriental fresh shirt/i });
        expect(titleHeading).toBeInTheDocument();
    })
      
    it("renders the details for a different item", async () => {
        await act(async () => {
            render(<Store cart={[]} setCart={() => {}} />, { wrapper: BrowserRouter });
        })

        const titleHeading = screen.queryByRole("heading", { name: /Premium Slim Fit T-Shirts/i });
        const priceParagraph = screen.queryByText(/22.3/i);
        const descriptionParagraph = screen.queryByText(/Slim-fitting style/i);
        const image = screen.queryByAltText(/Premium slim fit T-Shirts/i);

        expect(titleHeading).toBeInTheDocument();
        expect(priceParagraph).toBeInTheDocument();
        expect(descriptionParagraph).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    })

    it("renders the details for the item with id: 3", async () => {
        await act(async () => {
            render(<Store cart={[]} setCart={() => {}} />, { wrapper: BrowserRouter });
        })

        const titleHeading = screen.queryByRole("heading", { name: /Mens Cotton Jacket/i });
        const priceParagraph = screen.getByText(/55.99/i);
        const descriptionParagraph = screen.queryByText(/great outerwear jackets for Spring\/Autumn\/Winter/i);
        const image = screen.queryByAltText(/Mens Cotton Jacket/i);

        expect(titleHeading).toBeInTheDocument();
        expect(priceParagraph).toBeInTheDocument();
        expect(descriptionParagraph).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    })

    it("renders the details for the item with id: 4", async () => {
        await act(async () => {
            render(<Store cart={[]} setCart={() => {}} />, { wrapper: BrowserRouter });   
        })

        const titleHeading = screen.queryByRole("heading", { name: /Red shirt/i });
        const priceParagraph = screen.queryByText(/128/i);
        const descriptionParagraph = screen.queryByText(/A super cool red shirt/i);
        const image = screen.queryByAltText(/Red shirt/i);

        expect(titleHeading).toBeInTheDocument();
        expect(priceParagraph).toBeInTheDocument();
        expect(descriptionParagraph).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    })
})

describe("store accessibility", () => {
    it("renders heading for catalog", async () => {
        await act(async () => {
            render(<Store cart={[]} setCart={() => {}} />, { wrapper: BrowserRouter });
        })

        const catalogHeading = screen.getByRole("heading", { name: /catalog/i });

        expect(catalogHeading).toBeInTheDocument();
    })
})

describe("add to cart button", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.restoreAllMocks();
    })
    it("renders an add to cart button", async () => {
        await act(async () => {
            render(<Store cart={[]} setCart={() => {}} />, { wrapper: BrowserRouter });
        })

        const addToCartButtons = screen.queryAllByRole("button", { name: /Add to cart/i });
        
        expect(addToCartButtons.length).toBeGreaterThan(0);
    })

    it("adds an item to cart on Click", async () => {
        // const StoreItem = await import('../src/components/utilities/StoreItem/StoreItem.jsx');

        // StoreItem.default = vi.fn(({ addToCartHandler, id }) => {
        //     if (!(id === 1)) {
        //         return (<></>, { wrapper: BrowserRouter })
        //     }

        //     return (
        //         <>
        //             <h3 data-testid="StoreItem-title">Red Shirt</h3>
        //             <button></button>
        //         </>
        //     )
        // })
        
        const CartItem = await import('../src/components/utilities/CartItem/CartItem.jsx');

        CartItem.default = vi.fn(({ item, removeFromCartHandler }) => {
            return(
                <>
                    <p data-testid="cart-item-title">Title: {item.title}</p>
                    <p data-testid="cart-item-price">Price: {item.price}</p>
                    <p data-testid="cart-item-quantity">Quantity: {item.quantity}</p>
                </>
            )
        })

        const MockParent = ({ initialMockCart }) => {
            const [ cart, setCart ] = useState(initialMockCart);
            
            return (
                <>
                    <Store cart={cart} setCart={setCart} />
                </>
            )
        }

        await act(async () => {
            render(<MockParent initialMockCart={[]} />, { wrapper: BrowserRouter });
        })

        const itemButtons = screen.getAllByRole("button", { name: /Add to cart/i });
        const item1Button = itemButtons[0];

        const user = userEvent.setup();
        await user.click(item1Button);
        
        const cartItemTitles = screen.queryAllByTestId("cart-item-title");
        const cartItem1Title = cartItemTitles[0];

        expect(cartItem1Title).toBeInTheDocument();

        // expect(screen.queryAllByTestId("test-heading")[0]).toBeInTheDocument()


    })

    it("adds an item that contains the correct data", async () => {
        const CartItem = await import('../src/components/utilities/CartItem/CartItem.jsx');

        CartItem.default = vi.fn(({ item, removeFromCartHandler }) => {
            return(
                <>
                    <p data-testid="cart-item-title">Title: {item.title}</p>
                    <p data-testid="cart-item-price">Price: {item.price}</p>
                    <p data-testid="cart-item-quantity">Quantity: {item.quantity}</p>
                </>
            )
        })

        const MockParent = ({ initialMockCart }) => {
            const [ cart, setCart ] = useState(initialMockCart);
            
            return (
                <>
                    <Store cart={cart} setCart={setCart} />
                </>
            )
        }

        await act(async () => {
            render(<MockParent initialMockCart={[]} />, { wrapper: BrowserRouter });
        })

        const itemButtons = screen.getAllByRole("button", { name: /Add to cart/i });
        const item1Button = itemButtons[0];

        const user = userEvent.setup();
        await user.click(item1Button);
        
        const cartItemTitles = screen.queryAllByTestId("cart-item-title");
        const cartItem1Title = cartItemTitles[0];

        const cartItemPrices = screen.queryAllByTestId("cart-item-price");
        const cartItem1Price = cartItemPrices[0];

        const cartItemQuantities = screen.queryAllByTestId("cart-item-quantity");
        const cartItem1Quantity = cartItemQuantities[0];

        expect(cartItem1Title.textContent).toMatch(/Oriental fresh shirt/i)
        expect(cartItem1Price.textContent).toMatch(/124/i);
        expect(cartItem1Quantity.textContent).toMatch(/1/i);

        
    })

    it("adds a different item that contains the correct data", async () => {
        const CartItem = await import('../src/components/utilities/CartItem/CartItem.jsx');

        CartItem.default = vi.fn(({ item, removeFromCartHandler }) => {
            return(
                <>
                    <p data-testid="cart-item-title">Title: {item.title}</p>
                    <p data-testid="cart-item-price">Price: {item.price}</p>
                    <p data-testid="cart-item-quantity">Quantity: {item.quantity}</p>
                </>
            )
        })

        const MockParent = ({ initialMockCart }) => {
            const [ cart, setCart ] = useState(initialMockCart);
            
            return (
                <>
                    <Store cart={cart} setCart={setCart} />
                </>
            )
        }

        await act(async () => {
            render(<MockParent initialMockCart={[]} />, { wrapper: BrowserRouter });
        })

        const itemButtons = screen.getAllByRole("button", { name: /Add to cart/i });
        const item2Button = itemButtons[1];

        const user = userEvent.setup();
        await user.click(item2Button);
        
        const cartItemTitles = screen.queryAllByTestId("cart-item-title");
        const cartItem1Title = cartItemTitles[0];

        const cartItemPrices = screen.queryAllByTestId("cart-item-price");
        const cartItem1Price = cartItemPrices[0];

        const cartItemQuantities = screen.queryAllByTestId("cart-item-quantity");
        const cartItem1Quantity = cartItemQuantities[0];

        expect(cartItem1Title.textContent).toMatch(/Mens casual premium slim fit t-shirts/i);
        expect(cartItem1Price.textContent).toMatch(/22.3/i);
        expect(cartItem1Quantity.textContent).toMatch(/1/i);
    })

    it("can add multiple cart items", async () => {
        const CartItem = await import('../src/components/utilities/CartItem/CartItem.jsx');

        CartItem.default = vi.fn(({ item, removeFromCartHandler }) => {
            return(
                <>
                    <p data-testid="cart-item-title">Title: {item.title}</p>
                    <p data-testid="cart-item-price">Price: {item.price}</p>
                    <p data-testid="cart-item-quantity">Quantity: {item.quantity}</p>
                </>
            )
        })

        const MockParent = ({ initialMockCart }) => {
            const [ cart, setCart ] = useState(initialMockCart);
            
            return (
                <>
                    <Store cart={cart} setCart={setCart} />
                </>
            )
        }

        await act(async () => {
            render(<MockParent initialMockCart={[]} />, { wrapper: BrowserRouter });
        })

        const itemButtons = screen.getAllByRole("button", { name: /Add to cart/i });
        const item1Button = itemButtons[0];
        const item2Button = itemButtons[1];

        const user = userEvent.setup();
        await user.click(item1Button);
        await user.click(item2Button);
        
        const cartItemTitles = screen.queryAllByTestId("cart-item-title");
        const cartItem1Title = cartItemTitles[0];
        const cartItem2Title = cartItemTitles[1];

        const cartItemPrices = screen.queryAllByTestId("cart-item-price");
        const cartItem1Price = cartItemPrices[0];
        const cartItem2Price = cartItemPrices[1];

        const cartItemQuantities = screen.queryAllByTestId("cart-item-quantity");
        const cartItem1Quantity = cartItemQuantities[0];
        const cartItem2Quantity = cartItemQuantities[1];

        

        expect(cartItem1Title.textContent).toMatch(/Oriental fresh shirt/i)
        expect(cartItem1Price.textContent).toMatch(/124/i);
        expect(cartItem1Quantity.textContent).toMatch(/1/i);

        expect(cartItem2Title.textContent).toMatch(/Mens casual premium slim fit t-shirts/i);
        expect(cartItem2Price.textContent).toMatch(/22.3/i);
        expect(cartItem2Quantity.textContent).toMatch(/1/i);
    })

    it("combines quantities when adding the same item twice", async () => {
        const CartItem = await import('../src/components/utilities/CartItem/CartItem.jsx');

        CartItem.default = vi.fn(({ item, removeFromCartHandler }) => {
            return(
                <>
                    <p data-testid="cart-item-title">Title: {item.title}</p>
                    <p data-testid="cart-item-price">Price: {item.price}</p>
                    <p data-testid="cart-item-quantity">Quantity: {item.quantity}</p>
                </>
            )
        })

        const MockParent = ({ initialMockCart }) => {
            const [ cart, setCart ] = useState(initialMockCart);
            
            return (
                <>
                    <Store cart={cart} setCart={setCart} />
                </>
            )
        }

        await act(async () => {
            render(<MockParent initialMockCart={[]} />, { wrapper: BrowserRouter });
        })

        const itemButtons = screen.getAllByRole("button", { name: /Add to cart/i });
        const item1Button = itemButtons[0];

        const user = userEvent.setup();
        await user.click(item1Button);
        await user.click(item1Button);
        
        const cartItemTitles = screen.queryAllByTestId("cart-item-title");
        const cartItem1Title = cartItemTitles[0];

        const cartItemPrices = screen.queryAllByTestId("cart-item-price");
        const cartItem1Price = cartItemPrices[0];

        const cartItemQuantities = screen.queryAllByTestId("cart-item-quantity");
        const cartItem1Quantity = cartItemQuantities[0];


        expect(cartItem1Title.textContent).toMatch(/Oriental fresh shirt/i)
        expect(cartItem1Price.textContent).toMatch(/124/i);
        expect(cartItem1Quantity.textContent).toMatch(/2/i);
    })

    it("combines different quantities when adding the same item twice", async () => {
        const CartItem = await import('../src/components/utilities/CartItem/CartItem.jsx');

        CartItem.default = vi.fn(({ item, removeFromCartHandler }) => {
            return(
                <>
                    <p data-testid="cart-item-title">Title: {item.title}</p>
                    <p data-testid="cart-item-price">Price: {item.price}</p>
                    <p data-testid="cart-item-quantity">Quantity: {item.quantity}</p>
                </>
            )
        })

        const MockParent = ({ initialMockCart }) => {
            const [ cart, setCart ] = useState(initialMockCart);
            
            return (
                <>
                    <Store cart={cart} setCart={setCart} />
                </>
            )
        }
        
        await act(async () => {
            render(<MockParent initialMockCart={[]} />, { wrapper: BrowserRouter });
        })

        const itemQuantityInputs = screen.getAllByLabelText(/quantity/i);
        const item1QuantityInput = itemQuantityInputs[0];

        const itemButtons = screen.getAllByRole("button", { name: /Add to cart/i });
        const item1Button = itemButtons[0];

        const user = userEvent.setup();

        await user.clear(item1QuantityInput);
        await user.type(item1QuantityInput, "2");
        await user.click(item1Button);

        await user.clear(item1QuantityInput);
        await user.type(item1QuantityInput, "4");
        await user.click(item1Button);
        
        const cartItemTitles = screen.queryAllByTestId("cart-item-title");
        const cartItem1Title = cartItemTitles[0];

        const cartItemPrices = screen.queryAllByTestId("cart-item-price");
        const cartItem1Price = cartItemPrices[0];

        const cartItemQuantities = screen.queryAllByTestId("cart-item-quantity");
        const cartItem1Quantity = cartItemQuantities[0];

        expect(cartItem1Title.textContent).toMatch(/Oriental fresh shirt/i);
        expect(cartItem1Price.textContent).toMatch(124);
        expect(cartItem1Quantity.textContent).toMatch(/6/i);
    })
})

describe("navigation", () => {
    it("Renders a link for Homepage", async () => {
        await act(async () => {
            render(<Store cart={[]} setCart={() => {}} />, { wrapper: BrowserRouter });
        })

        const homeLink = screen.queryByText(/Home/i);

        expect(homeLink).toBeInTheDocument();
    })
})