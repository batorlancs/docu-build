const closeWindow = () => {
    const { ipcRenderer } = window.electron;
    ipcRenderer.closeWindow();
};

const setWindowSize = (width: number, height: number) => {
    const { ipcRenderer } = window.electron;
    ipcRenderer.setWindowSize(width, height);
};

export { closeWindow, setWindowSize };
