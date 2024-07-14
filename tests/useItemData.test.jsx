import useItemData from "../src/components/utilities/useItemData/useItemData.jsx";
import { screen, render } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { useEffect } from 'react';

function setup(fetchURL) {
    let resolve;
    let reject;
    globalThis.fetch = vi.fn((URL, options) => {
        return new Promise((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        })
    })

    let response;

    const MockComponent = ({ useItemData, URL }) => {
        const { error, isLoading, data } = useItemData(URL);

        useEffect(() => {
            response = { error, isLoading, data }
        }, [ error, isLoading, data ])

        return (
            <>
            </>
        )
    }

    const getResponse = () => response;

    act(() => {
        render(<MockComponent useItemData={useItemData} URL={fetchURL} />)
    });

    return { resolve, reject, getResponse }
}

describe("useItemData", () => {
    it("should return something", () => {
        const { getResponse } = setup();
        const response = getResponse();
        
        expect(response).toBeTruthy();
    });

    it("should return an object", () => {
        const { getResponse } = setup();
        const response = getResponse();
        
        expect(typeof response).toBe('object');
    });

    
});
describe("useItemData response properties", () => {
    it("should return an object that has an 'error' property", () => {
        const { getResponse } = setup();
        const response = getResponse();

        expect(response).toHaveProperty("error");
    });
    
    it ("should return an object that has a 'isLoading' property", () => {
        const { getResponse } = setup();
        const response = getResponse();

        expect(response).toHaveProperty("isLoading");
    });
    
    it("should return an object that has a 'data' property", () => {
        const { getResponse } = setup();
        const response = getResponse();

        expect(response).toHaveProperty("data");
    })

})

describe("useItemData API request", () => {

    it("should set 'error' to true if URL isn't provided", async () => {
        const { resolve, getResponse } = setup();

        await act( async () => {
            resolve({
                status: 404,
            })
        })

        const response = getResponse();
        
        expect(response.error).toBe(true);
    })

    it("returns response with a not null 'data' property", async () => {
        const { resolve, getResponse } = setup("https://668d0428099db4c579f15f4d.mockapi.io/api/v1/items/1");

        await act( async () => {
            resolve({
                json: () => Promise.resolve({
                    id: 1,
                    title: "Oriental Fresh Shirt",
                    price: 124,
                    description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
                    image: "https://loremflickr.com/640/480"
                })
            })
        })

        const response = getResponse();
        
        expect(response.data).not.toBeNull();
    })

    it("returns response with 'data' property that is an object", async () => {
        const { resolve, getResponse } = setup("https://668d0428099db4c579f15f4d.mockapi.io/api/v1/items/1")
        await act( async () => {
            resolve({
                json: () => Promise.resolve({
                    id: 1,
                    title: "Oriental Fresh Shirt",
                    price: 124,
                    description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
                    image: "https://loremflickr.com/640/480"
                })
            })
        })

        const response = getResponse();

        expect(typeof response.data).toBe('object')
    })

    it("returns object with 'data' that includes 'id', 'title', 'price', 'description', & 'imageSrc'", async () => {
        const { resolve, getResponse } = setup();
        let response = getResponse();

        await act( async () => {
            resolve({
                json: () => Promise.resolve({
                    id: "",
                    title: "",
                    price: "",
                    description:"",
                    image: ""
                })
            });
        });

        response = getResponse();

        expect(response.data).toHaveProperty("id");
        expect(response.data).toHaveProperty("title");
        expect(response.data).toHaveProperty("price");
        expect(response.data).toHaveProperty("description");
        expect(response.data).toHaveProperty("imageSrc");
    })

    it("returns object with 'data' that includes accurate prop types", async () => {
        const { resolve, getResponse } = setup();

        await act( async () => {
            resolve({
                json: () => Promise.resolve({
                    id: 1,
                    title: "",
                    price: 1,
                    description: "",
                    image: ""
                })
            });
        });

        const response = getResponse();

        expect(typeof response.data.id).toBe("number");
        expect(typeof response.data.title).toBe("string");
        expect(typeof response.data.price).toBe("number");
        expect(typeof response.data.description).toBe("string");
        expect(typeof response.data.imageSrc).toBe("string");
    })
    

    it("returns object with 'data' that includes accurate prop values", async () => {
        const { resolve, getResponse } = 
            setup("https://668d0428099db4c579f15f4d.mockapi.io/api/v1/items/1");
        let response = getResponse();
        await act( async () => {
            resolve({
                json: () => Promise.resolve({
                    id: 1,
                    title: "Oriental Fresh Shirt",
                    price: 124,
                    description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
                    image: "https://loremflickr.com/640/480"
                })
            })
        })

        response = getResponse();
        expect(response.data.id).toBe(1);
        expect(response.data.title).toBe("Oriental Fresh Shirt");
        expect(response.data.price).toBe(124);
        expect(response.data.description).toBe("Carbonite web goalkeeper gloves are ergonomically designed to give easy fit");
        expect(response.data.imageSrc).toBe("https://loremflickr.com/640/480");
    })

    it("sets error to true if API call is rejected", async () => {
        const { reject, getResponse } = setup();

        await act(async () => {
            reject("Fetch call rejected");
        });

        const response = getResponse();

        expect(response.error).toBe(true);
    });

    it("sets error to true if response has 404 status", async () => {
        const { resolve, getResponse } = setup();

        await act( async () => {
            resolve({
                status: 404,
            });
        });

        const response = getResponse();
        expect(response.error).toBeTruthy();
    });

    it("sets isLoading to true after API request is called", () => {
        const { getResponse } = setup();

        const response = getResponse();
        expect(response.isLoading).toBe(true);
    });

    it("sets isLoading to false after API request is resolved", async () => {
        const { resolve, getResponse } = setup("https://668d0428099db4c579f15f4d.mockapi.io/api/v1/items/1");
        
        await act(async () => {
            resolve({
                json: () => Promise.resolve({
                    id: 1,
                    title: "",
                    price: 1,
                    description: "",
                    image: "",
                })
            });
        });

        const response = getResponse();
        expect(response.data).not.toBeNull();
        expect(response.isLoading).toBe(false);
    });

    it("sets isLoading to false after API request is rejected", async () => {
        const { reject, getResponse } = setup();
        
        await act(async () => {
            reject("Fetch request failed");
        });

        const response = getResponse();
        expect(response.error).toBeTruthy();
        expect(response.isLoading).toBe(false);
    })
})