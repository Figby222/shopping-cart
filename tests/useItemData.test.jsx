import useItemData from "../src/components/utilities/useItemData/useItemData.jsx";
import { screen, render } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { act } from "@testing-library/react";

describe("useItemData", () => {
    it("should return something", () => {
        let response;
        vi.useFakeTimers();
        act(() => {
            response = useItemData();
        })
        vi.runAllTimers();

        expect(response).toBeTruthy();
    });

    it("should return an object", () => {
        let response;
        vi.useFakeTimers();
        act(() => {
            response = useItemData();
        })
        vi.runAllTimers();
        expect(typeof response).toBe('object');
    });

});