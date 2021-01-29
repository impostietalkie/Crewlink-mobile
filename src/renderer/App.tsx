import React, {
	Dispatch,
	ErrorInfo,
	ReactChild,
	SetStateAction,
	useReducer,
	useState,
} from 'react';
import ReactDOM from 'react-dom';
import Voice from './Voice';
import { AmongUsState, Player } from '../common/AmongUsState';
import Settings, {
	settingsReducer,
	lobbySettingsReducer,
} from './settings/Settings';
import {
	GameStateContext,
	SettingsContext,
	LobbySettingsContext,
} from './contexts';
import { ThemeProvider } from '@material-ui/core/styles';
// import {
// 	AutoUpdaterState,
// 	IpcHandlerMessages,
// 	IpcRendererMessages,
// 	IpcSyncMessages,
// } from '../common/ipc-messages';
import theme from './theme';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
// import Dialog from '@material-ui/core/Dialog';
import makeStyles from '@material-ui/core/styles/makeStyles';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
// import prettyBytes from 'pretty-bytes';
import './css/index.css';
import Typography from '@material-ui/core/Typography';
import SupportLink from './SupportLink';
import SelectColorMenu from './SelectColorMenu';
import EnterRoomCodeMenu from './EnterRoomCodeMenu';

// let appVersion = '';
// if (typeof window !== 'undefined' && window.location) {
// 	const query = new URLSearchParams(window.location.search.substring(1));
// 	appVersion = ' v' + query.get('version') || '';
// }

const useStyles = makeStyles(() => ({
	root: {
		position: 'absolute',
		width: '100vw',
		height: theme.spacing(3),
		backgroundColor: '#1d1a23',
		top: 0,
		WebkitAppRegion: 'drag',
	},
	title: {
		width: '100%',
		textAlign: 'center',
		display: 'block',
		height: theme.spacing(3),
		lineHeight: `${theme.spacing(3)}px`,
		color: theme.palette.primary.main,
	},
	button: {
		WebkitAppRegion: 'no-drag',
		marginLeft: 'auto',
		padding: 0,
		position: 'absolute',
		top: 0,
	},
}));

interface TitleBarProps {
	settingsOpen: boolean;
	setSettingsOpen: Dispatch<SetStateAction<boolean>>;
}

const TitleBar: React.FC<TitleBarProps> = function ({
	settingsOpen,
	setSettingsOpen,
}: TitleBarProps) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<span className={classes.title}>CrewLink</span>
			<IconButton
				className={classes.button}
				style={{ left: 0 }}
				size="small"
				onClick={() => setSettingsOpen(!settingsOpen)}
			>
				<SettingsIcon htmlColor="#777" />
			</IconButton>
		</div>
	);
};

interface ErrorBoundaryProps {
	children: ReactChild;
}
interface ErrorBoundaryState {
	error?: Error;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {};
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		// Update state so the next render will show the fallback UI.
		return { error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('React Error: ', error, errorInfo);
	}

	render(): ReactChild {
		if (this.state.error) {
			return (
				<div style={{ paddingTop: 16 }}>
					<Typography align="center" variant="h6" color="error">
						REACT ERROR
					</Typography>
					<Typography
						align="center"
						style={{
							whiteSpace: 'pre-wrap',
							fontSize: 12,
							maxHeight: 200,
							overflowY: 'auto',
						}}
					>
						{this.state.error.stack}
					</Typography>
					<SupportLink />
					<Button
						style={{ margin: '10px auto', display: 'block' }}
						variant="contained"
						color="secondary"
						onClick={() => window.location.reload()}
					>
						Reload App
					</Button>
				</div>
			);
		}

		return this.props.children;
	}
}

const App: React.FC = function () {
	const [gameState, ] = useState<AmongUsState>({} as AmongUsState);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [error, ] = useState('');
	const [roomCode, setRoomCode] = useState<string>('');
	const [player, setPlayer] = useState<Player | undefined>(undefined);

	const settings = useReducer(settingsReducer, {
		alwaysOnTop: false,
		microphone: 'Default',
		speaker: 'Default',
		pushToTalk: false,
		serverURL: 'http://impostietalkie.herokuapp.com/',
		pushToTalkShortcut: 'V',
		deafenShortcut: 'RControl',
		muteShortcut: 'RAlt',
		hideCode: false,
		enableSpatialAudio: true,
		localLobbySettings: {
			maxDistance: 5.32,
			haunting: false,
			hearImpostorsInVents: false,
			commsSabotage: true,
		},
	});
	const lobbySettings = useReducer(
		lobbySettingsReducer,
		settings[0].localLobbySettings
	);

	let page;
	if (player) {
		page = <Voice error={error} player={player}/>;
	} else if (roomCode) {
		page = <SelectColorMenu setPlayer={setPlayer}/>;
	} else {
		page = <EnterRoomCodeMenu setRoomCode={setRoomCode}/>;
	}

	return (
		<GameStateContext.Provider value={gameState}>
			<LobbySettingsContext.Provider value={lobbySettings}>
				<SettingsContext.Provider value={settings}>
					<ThemeProvider theme={theme}>
						<TitleBar
							settingsOpen={settingsOpen}
							setSettingsOpen={setSettingsOpen}
						/>
						<ErrorBoundary>
							<>
								<Settings
									open={settingsOpen}
									onClose={() => setSettingsOpen(false)}
								/>
								{page}
							</>
						</ErrorBoundary>
					</ThemeProvider>
				</SettingsContext.Provider>
			</LobbySettingsContext.Provider>
		</GameStateContext.Provider>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
