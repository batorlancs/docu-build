import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../renderer/App";

global.matchMedia =
    global.matchMedia ||
    jest.fn(() => {
        return {
            matches: false,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        };
    });

describe("App", () => {
    it("should render", () => {
        expect(render(<App />)).toBeTruthy();
    });
    // it("test here", () => {
    //     expect(1).toBe(1);
    // });
});
