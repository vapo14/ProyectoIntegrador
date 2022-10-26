const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function send(message, table) {
  return new Promise((resolve) => {
    ipcRenderer.once(`${table}-reply`, (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send(table, message);
  });
}
