import StoreItem from "../src/components/utilities/StoreItem/StoreItem.jsx";
import { screen, render } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { act } from "@testing-library/react";

globalThis.fetch = vi.fn((URL, options) => Promise.resolve({
  json: () => Promise.resolve({
    id: 1,
    title: "Oriental Fresh Shirt",
    price: 124,
    description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    image: "https://loremflickr.com/640/480"
  })
}));

beforeEach(() => {
  vi.clearAllMocks();
})

describe("Add to cart button", () => {
  it("renders button with text 'Add to cart'", () => {
    render(<StoreItem />);
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
      render(<StoreItem addToCartHandler={() => {}} />);

    })

    expect(
      screen.getByRole("spinbutton", { name: /item quantity/i }),
    ).toHaveValue(1);
  });

  it("sets input value correctly when user types a number", async () => {
    await act(async () => {
      render(<StoreItem addToCartHandler={() => {}} />);

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
})