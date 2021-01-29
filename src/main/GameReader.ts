import Struct from 'structron';
import {
	GameState,
	AmongUsState,
} from '../common/AmongUsState';

export default class GameReader {
	PlayerStruct: Struct | undefined;

	menuUpdateTimer = 20;
	lastPlayerPtr = 0;
	shouldReadLobby = false;
	exileCausesEnd = false;
	is64Bit = false;
	oldGameState = GameState.UNKNOWN;
	lastState: AmongUsState = {} as AmongUsState;

	gameCode = 'MENU';

	fetchStateFromServer(): void {
		//this.lastState = newState;
		//this.oldGameState = state;
		// TODO this
		return;
	}
}
