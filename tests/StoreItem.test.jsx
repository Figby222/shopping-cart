import StoreItem from "../src/components/utilities/StoreItem/StoreItem.jsx";
import { screen, render } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { act } from "@testing-library/react";

globalThis.fetch = vi.fn((URL, options) => {
  if (
    URL === "https://fakestoreapi.com/products/1" ||
    URL === "https://fakestoreapi.com/products/1/"
  ) {
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
  else if (
    URL === "https://fakestoreapi.com/products/2" ||
    URL === "https://fakestoreapi.com/products/2/"
  ) {
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

  return Promise.resolve({
    status: 404
  })
});

beforeEach(() => {
  vi.clearAllMocks();
})

describe("Add to cart button", () => {
  it("renders button with text 'Add to cart'", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);

    });

    expect(
      screen.getByRole("button", { name: /Add to cart/i }),
    ).toBeInTheDocument();
  });

  it("calls prop function when clicked", async () => {
    const onClick = vi.fn();

    await act(async () => {
      render(<StoreItem addToCartHandler={onClick} id={1} />);
    });

    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /Add to cart/i });

    await act(() => user.click(button));

    expect(onClick).toHaveBeenCalled();
  })

  it("calls onClick function with item's id, which comes from a mocked fetch", async () => {
    const id = 1;
    const onClick = vi.fn();
    await act(async () => {
      render (
          <StoreItem 
              addToCartHandler={onClick} 
              id={id} />
      );
    });

    const addToCart = screen.getByRole("button", { name: /Add to cart/i });

    const user = userEvent.setup();
    await user.click(addToCart)
    
    expect(onClick.mock.calls[0][0].id).toEqual(id)

  })

  it("calls onClick function with item's details, which come from mocked fetch", async () => {
    const expectedObject = {
      id: 1,
      title: "Oriental Fresh Shirt",
      price: 124,
      description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      imageSrc: "https://loremflickr.com/640/480"
    }

    const onClick = vi.fn();

    await act(async () => {
      render(<StoreItem addToCartHandler={onClick} id={1} />);
    });
    const user = userEvent.setup();
    const addToCart = screen.getByRole("button", { name: /Add to cart/i });

    await user.click(addToCart);
    expect(onClick.mock.calls[0][0]).toEqual(expectedObject);
  })
  
  it("calls onClick function with item quantity", async () => {
    const onClick = vi.fn();
    
    await act(async () => {
      render(<StoreItem addToCartHandler={onClick} id={1} />);

    })

    const user = userEvent.setup();
    const addToCart = screen.getByRole("button", { name: /Add to cart/i });
    
    await user.click(addToCart);

    expect(onClick.mock.calls[0][1]).toBe(1);
  })

  it("calls onClick function with updated item quantity", async () => {
    const onClick = vi.fn();
    await act(async () => {
      render(<StoreItem addToCartHandler={onClick} id={1} />);
    })

    const user = userEvent.setup();
    const quantity = screen.getByRole("spinbutton", { name: /Item quantity/i });
    const addToCart = screen.getByRole("button", { name: /Add to cart/i });

    await user.clear(quantity);
    await user.type(quantity, "2");
    await user.click(addToCart);

    expect(onClick.mock.calls[0][1]).toBe(2);
  })
});

describe("Item quantity input", () => {
  it("renders input for item quantity", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);

    })

    expect(screen.getByRole("spinbutton", { name: /item quantity/i }))
      // somehow query number input. I don't think textbox will work
      .toBeInTheDocument();
  });

  it("starts with a value of 1", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);

    })

    expect(
      screen.getByRole("spinbutton", { name: /item quantity/i }),
    ).toHaveValue(1);
  });

  it("sets input value correctly when user types a number", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);

    })

    const user = userEvent.setup();
    const input = screen.getByRole("spinbutton", { name: /item quantity/i});

    await user.clear(input);
    expect(input).toHaveValue(null);

    await user.type(input, "2");
    expect(input.value).toBe("2");
  });

  it("does not set input when a letter is typed in", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);

    })

    const user = userEvent.setup();
    const input = screen.getByRole("spinbutton", { name: /item quantity/i });

    await user.type(input, "a");
    expect(input.value).not.toBe("a");
  })

  it("does not set input as negative number", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);
    })

    const user = userEvent.setup();
    const input = screen.getByRole("spinbutton", { name: /item quantity/i });

    await user.clear(input);
    await user.type(input, "-3");
    
    expect(parseInt(input.value)
  ).not.toBeLessThan(0);
  })
})

describe("data retrieving", () => {
  it("displays 'Loading...' as data is loading", () => {
    render(<StoreItem addToCartHandler={() => {}} id={1} />)

    const loadingHeading = screen.getByRole("heading", { name: /Loading.../i});
    expect(loadingHeading).toBeInTheDocument();
  })

  it("displays 'An error has occured' on error", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={-3} />);
    })

    const errorHeading = 
      screen.getByRole("heading", { name: /An error has occurred/i });
    expect(errorHeading).toBeInTheDocument();
  })
})

describe("StoreItem content", () => {
  it("renders a heading", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);
    })

    expect(screen.getByRole("heading")).toBeInTheDocument();
  })

  it("renders a heading that has the textContent of the item's title", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />)
    })
    
    const titleHeading = screen.getByRole("heading", { name: /Oriental Fresh Shirt/i});
    expect(titleHeading).toBeInTheDocument();
  })

  it("renders a paragraph for item-price", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);
    })

    expect(screen.getByText(/price/i))
      .toBeInTheDocument();
  })

  it ("renders a paragraph for item-price with the correct price", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() =>{}} id={1} />);
    })

    const itemPrice = screen.getByText(/price/i);
    expect(itemPrice.textContent).toMatch(/124/i);
  })

  it("renders a paragraph for item-description", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);
    })

    expect(screen.getByText(/description/i))
      .toBeInTheDocument();
  })

  it("renders a paragraph for item-description with the accurate description", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);
    })

    const itemDescription = screen.getByText(/description/i);
    expect(itemDescription.textContent).toMatch(
      /Carbonite web goalkeeper gloves are ergonomically designed to give easy fit/i
    )
  })

  it("renders an image for item-image", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);
    })

    expect(screen.getByRole("img", { name: /image of Oriental fresh shirt/i }))
      .toBeInTheDocument();
  })

  it("renders an image for item-image with the correct src", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={1} />);
    })

    const itemImage = screen.getByRole(
      "img", 
      { name: /image of Oriental fresh shirt/i }
    );
    expect(itemImage.src).toBe("https://loremflickr.com/640/480")
  })



})

describe("StoreItem content with id: 2", () => {
  it("renders accurate title", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={2} />);
    });
    const itemTitle = screen.getByRole(
      "heading", 
      { name: /Mens Casual Premium Slim Fit T-Shirts/i }
    );

    expect(itemTitle).toBeInTheDocument();
  })

  it("renders accurate price", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={2} />);
    });
    const itemPrice = screen.getByText(/price/i);
    expect(itemPrice.textContent).toMatch(/22.3/i)
  })

  it("renders accurate description", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={2} />);
    });
    const itemDescription = screen.getByText(/description/i);
    expect(itemDescription.textContent).toMatch(
      /Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket./i
    );
  })

  it("renders accurate image src", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={2} />);
    });
    const itemImage = screen.getByRole(
      "img", 
      { name: /Mens casual premium slim fit t-shirts/i }
    );
    expect(itemImage.src)
      .toBe("https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg");


  })
})

describe("decrement button", () => {
  it("renders a button to decrement quantity", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={2} />);
    })

    const decrementButton = screen.queryByRole("button", { name: /decrease quantity/i });

    expect(decrementButton).toBeInTheDocument();

  })

  it("has text content containing up arrow", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={2} />);
    })
    
    const decrementButton = screen.queryByRole("button", { name: /decrease quantity/i });

    expect(decrementButton.textContent).toMatch(/\u2193/i);
  })

  it("decreases the item quantity value", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} id={2} />);
    })

    const decrementButton = screen.queryByRole("button", { name: /decrease quantity/i });
    
    const itemQuantityInput = screen.getByLabelText(/item quantity/i);
    const user = userEvent.setup();
    await user.clear(itemQuantityInput);
    await user.type(itemQuantityInput, "5");

    await user.click(decrementButton);

    expect(itemQuantityInput.value).toMatch(/4/i);
  })
})