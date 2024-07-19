import StoreItem from "../src/components/utilities/StoreItem/StoreItem.jsx";
import { screen, render } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { act } from "@testing-library/react";

globalThis.fetch = vi.fn((URL, options) => {
  if (
    URL === "https//fakestoreapi.com/products/1" ||
    URL === "https//fakestoreapi.com/products/1/"
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
      render(<StoreItem addToCartHandler={() => {}} itemId={1} />);

    });

    expect(
      screen.getByRole("button", { name: /Add to cart/i }),
    ).toBeInTheDocument();
  });

  it("calls prop function when clicked", async () => {
    const onClick = vi.fn();

    await act(async () => {
      render(<StoreItem addToCartHandler={onClick} itemId={1} />);
    });

    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /Add to cart/i });

    await act(() => user.click(button));

    expect(onClick).toHaveBeenCalled();
  })

  it("calls onClick function with item's details, which come from a mocked fetch", async () => {
    const itemId = 1;
    const onClick = vi.fn();
    await act(async () => {
      render (
          <StoreItem 
              addToCartHandler={onClick} 
              itemId={itemId} />
      );
    });

    const addToCart = screen.getByRole("button", { name: /Add to cart/i });

    const user = userEvent.setup();
    await user.click(addToCart)
    
    expect(onClick.mock.calls[0][0].id).toEqual(itemId)

  })
  
  it("calls onClick function with item quantity", async () => {
    const onClick = vi.fn();
    
    await act(async () => {
      render(<StoreItem addToCartHandler={onClick} itemId={1} />);

    })

    const user = userEvent.setup();
    const addToCart = screen.getByRole("button", { name: /Add to cart/i });
    
    await user.click(addToCart);

    expect(onClick.mock.calls[0][1]).toBe(1);
  })

  it("calls onClick function with updated item quantity", async () => {
    const onClick = vi.fn();
    await act(async () => {
      render(<StoreItem addToCartHandler={onClick} itemId={1} />);
    })

    const user = userEvent.setup();
    const itemQuantity = screen.getByRole("spinbutton", { name: /Item quantity/i });
    const addToCart = screen.getByRole("button", { name: /Add to cart/i });

    await user.clear(itemQuantity);
    await user.type(itemQuantity, "2");
    await user.click(addToCart);

    expect(onClick.mock.calls[0][1]).toBe(2);
  })
});

describe("Item quantity input", () => {
  it("renders input for item quantity", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} itemId={1} />);

    })

    expect(screen.getByRole("spinbutton", { name: /item quantity/i }))
      // somehow query number input. I don't think textbox will work
      .toBeInTheDocument();
  });

  it("starts with a value of 1", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} itemId={1} />);

    })

    expect(
      screen.getByRole("spinbutton", { name: /item quantity/i }),
    ).toHaveValue(1);
  });

  it("sets input value correctly when user types a number", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} itemId={1} />);

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
      render(<StoreItem addToCartHandler={() => {}} itemId={1} />);

    })

    const user = userEvent.setup();
    const input = screen.getByRole("spinbutton", { name: /item quantity/i });

    await user.type(input, "a");
    expect(input.value).not.toBe("a");
  })

  it("does not set input as negative number", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} itemId={1} />);
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
    render(<StoreItem addToCartHandler={() => {}} itemId={1} />)

    const loadingHeading = screen.getByRole("heading", { name: /Loading.../i});
    expect(loadingHeading).toBeInTheDocument();
  })

  it("displays 'An error has occured' on error", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} itemId={-3} />);
    })

    const errorHeading = 
      screen.getByRole("heading", { name: /An error has occurred/i });
    expect(errorHeading).toBeInTheDocument();
  })
})

describe("StoreItem content", () => {
  it("renders a heading", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} itemId={1} />);
    })

    expect(screen.getByRole("heading")).toBeInTheDocument();
  })

  it("renders a heading that has the textContent of the item's title", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} itemId={1} />)
    })
    
    const titleHeading = screen.getByRole("heading", { name: /Oriental Fresh Shirt/i});
    expect(titleHeading).toBeInTheDocument();
  })

  it("renders a paragraph for item-price", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} itemId={1} />);
    })

    expect(screen.getByLabelText(/item price/i))
      .toBeInTheDocument();
  })

})