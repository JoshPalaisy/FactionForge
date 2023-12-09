const remote = require('electron').remote;
const win = remote.getCurrentWindow();
const Tray = remote.Tray;
const Menu = remote.Menu;
//  tray is declared out to prevent garbage collection
//  https://www.electronjs.org/docs/faq#my-apps-windowtray-disappeared-after-a-few-minutes
let tray = null;
// const iconPath = path.join(__dirname, '/icon.png');

tray = new Tray('./images/icon.png');
const template = [
    {
        label: 'Star Citizen Org Manager',
        icon: './images/icon.png',
        enabled: true,
    },
    {
        type: 'separator',
    },
    {
        label: 'Show App', click: function () {
            win.show();
        },
    },
    {
        label: 'Quit', click: function () {
            win.close();
        },
    },
];
const contextMenu = Menu.buildFromTemplate(template);
tray.setContextMenu(contextMenu);
tray.setToolTip('Star Citizen Org Manager');


win.on('minimize', () => {
    // if (tray) { return win.hide(); }
    //  tray documentation at - https://github.com/electron/electron/blob/main/docs/api/menu-item.md
    // tray = new Tray('./images/icon.png');
    // const template = [
    //     {
    //         label: 'Star Citizen Org Manager',
    //         icon: './images/icon.png',
    //         enabled: false,
    //     },
    //     {
    //         type: 'separator',
    //     },
    //     {
    //         label: 'Show App', click: function () {
    //             win.show();
    //         },
    //     },
    //     {
    //         label: 'Quit', click: function () {
    //             win.close();
    //         },
    //     },
    // ];
    // const contextMenu = Menu.buildFromTemplate(template);
    // tray.setContextMenu(contextMenu);
    // tray.setToolTip('CodeSpeedy');
    win.hide();
})