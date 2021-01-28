import Struct from 'structron';
import {
	GameState,
	AmongUsState,
} from '../common/AmongUsState';

export default class GameReader {
	sendIPC: Electron.WebContents['send'];
	PlayerStruct: Struct | undefined;

	menuUpdateTimer = 20;
	lastPlayerPtr = 0;
	shouldReadLobby = false;
	exileCausesEnd = false;
	is64Bit = false;
	oldGameState = GameState.UNKNOWN;
	lastState: AmongUsState = {} as AmongUsState;

	gameCode = 'MENU';

	fetchStateFromServer() {
		//this.lastState = newState;
		//this.oldGameState = state;
		// TODO this
		return null;
	}

	constructor(sendIPC: Electron.WebContents['send']) {
		this.sendIPC = sendIPC;
	}
}
