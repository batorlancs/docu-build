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

// mock window.electron.ipcRenderer
window.electron = {
    ipcRenderer: {
        on: jest.fn(),
        once: jest.fn(),
        invoke: jest.fn(),
        send: jest.fn(),
        removeAllListeners: jest.fn(),
    },
};

describe("App", () => {
    it("should render", () => {
        expect(render(<App />)).toBeTruthy();
    });
});
