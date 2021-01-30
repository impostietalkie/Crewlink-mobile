/* eslint react/prop-types: 0 */

import React, { useContext, useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from './Avatar';
import { Player } from '../common/AmongUsState';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { SettingsContext } from './contexts';
import Cookies from 'universal-cookie';

const useStyles = makeStyles(() => ({
	otherplayers: {
		width: 225,
		height: 225,
		margin: '20px auto',
		'& .MuiGrid-grid-xs-1': {
			maxHeight: '8.3333333%',
		},
		'& .MuiGrid-grid-xs-2': {
			maxHeight: '16.666667%',
		},
		'& .MuiGrid-grid-xs-3': {
			maxHeight: '25%',
		},
		'& .MuiGrid-grid-xs-4': {
			maxHeight: '33.333333%',
		},
	},
}));

interface AvailablePlayersResponse {
	players: Player[];
}

interface IOwnProps {
	setPlayer: (player: Player) => void;
	roomCode: string;
}

const SelectColorMenu: React.FC<IOwnProps> = function ({
	setPlayer,
	roomCode,
}) {
	const classes = useStyles();
	const [otherPlayers, setOtherPlayers] = useState<Player[]>([]);
	const [settings, ] = useContext(SettingsContext);

	useEffect(() => {
		const interval = setInterval(() => {
			axios.get(`${settings.serverURL}availablePlayers?roomCode=${roomCode}`).then((res) => {
				const players = (res.data as AvailablePlayersResponse).players;
				setOtherPlayers(players);
			})
		}, 1000);
		return () => clearInterval(interval);
	}, [roomCode]);
	
	const onSubmit = (player: Player) => {
		setPlayer(player);
		const cookies = new Cookies();
		cookies.set('selectedPlayer', player, { path: '/' });
		cookies.set('selectedRoomCode', roomCode, { path: '/' });
		axios.put(`${settings.serverURL}selectedPlayer?roomCode=${roomCode}&playerName=${player.name}`)
	}

	return (
		<Grid
			container
			spacing={1}
			className={classes.otherplayers}
			alignItems="center"
			alignContent="flex-start"
			justify="center"
		>
			<DialogTitle>Select your player</DialogTitle>
			{otherPlayers.map((player) => {
				return (
					<>
						<Grid
							item
							key={player.id}
							xs={getPlayersPerRow(otherPlayers.length)}
						>
							<Avatar
								style={{ cursor: 'pointer' }}
								connectionState={'connected'}
								player={player}
								talking={false}
								borderColor="#2ecc71"
								isAlive={true}
								size={50}
								onSelect={onSubmit}
							/>
						</Grid>
					</>
				);
			})}
		</Grid>
	);
};

type ValidPlayersPerRow = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
function getPlayersPerRow(playerCount: number): ValidPlayersPerRow {
	if (playerCount <= 9) return 4 as ValidPlayersPerRow;
	else
		return Math.min(
			12,
			Math.floor(12 / Math.ceil(Math.sqrt(playerCount)))
		) as ValidPlayersPerRow;
}

export default SelectColorMenu;
