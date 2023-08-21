const { ipcRenderer } = window.electron;

const closeWindow = () => {
    ipcRenderer.closeWindow();
};

const setWindowSize = (width: number, height: number) => {
    ipcRenderer.setWindowSize(width, height);
};

export { closeWindow, setWindowSize };
