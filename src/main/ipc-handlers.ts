import { app, BrowserWindow, dialog, ipcMain } from 'electron';

import { IpcMessages, IpcOverlayMessages } from '../common/ipc-messages';

// Listeners are fire and forget, they do not have "responses" or return values
export const initializeIpcListeners = (overlayWindow: BrowserWindow): void => {
	ipcMain.on(
		IpcMessages.SHOW_ERROR_DIALOG,
		(e, opts: { title: string; content: string }) => {
			if (
				typeof opts === 'object' &&
				opts &&
				typeof opts.title === 'string' &&
				typeof opts.content === 'string'
			) {
				dialog.showErrorBox(opts.title, opts.content);
			}
		}
	);

	ipcMain.on(IpcMessages.RESTART_CREWLINK, () => {
		app.relaunch();
		app.quit();
	});

	ipcMain.on(IpcMessages.QUIT_CREWLINK, () => {
		for (const win of BrowserWindow.getAllWindows()) {
			win.close();
		}
		app.quit();
	});

	ipcMain.on(
		IpcMessages.SEND_TO_OVERLAY,
		(_, event: IpcOverlayMessages, ...args: unknown[]) => {
			overlayWindow.webContents.send(event, ...args);
		}
	);
};

// Handlers are async cross-process instructions, they should have a return value
// or the caller should be "await"'ing them.  If neither of these are the case
// consider making it a "listener" instead for performance and readability
export const initializeIpcHandlers = (): void => {
	// TODO: Put handlers here
};
