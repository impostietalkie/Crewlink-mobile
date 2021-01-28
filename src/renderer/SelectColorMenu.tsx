import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from './Avatar';
import { Player } from '../common/AmongUsState';

const useStyles = makeStyles((theme) => ({
	otherplayers: {
		width: 225,
		height: 225,
		margin: '60px auto',
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

interface IOwnProps {
	setPlayer: (player: Player) => void;
}

const SelectColorMenu: React.FC<IOwnProps> = function ({
	setPlayer,
}) {
	const classes = useStyles();
	const otherPlayers: Player[] = [{
		ptr: 1,
		id: 1,
		clientId: 1,
		name: 'Carter',
		colorId: 1,
		hatId: 1,
		petId: 1,
		skinId: 1,
		disconnected: false,
		isImpostor: false,
		isDead: false,
		taskPtr: 1,
		objectPtr: 1,
		isLocal: false,
	
		x: 1,
		y: 1,
		inVent: false,
	}, {
		ptr: 1,
		id: 1,
		clientId: 1,
		name: 'Mikey',
		colorId: 2,
		hatId: 2,
		petId: 2,
		skinId: 2,
		disconnected: false,
		isImpostor: false,
		isDead: false,
		taskPtr: 1,
		objectPtr: 1,
		isLocal: false,
	
		x: 1,
		y: 1,
		inVent: false,
	}, {
		ptr: 1,
		id: 1,
		clientId: 1,
		name: 'Tommy',
		colorId: 3,
		hatId: 3,
		petId: 3,
		skinId: 3,
		disconnected: false,
		isImpostor: false,
		isDead: false,
		taskPtr: 1,
		objectPtr: 1,
		isLocal: false,
	
		x: 1,
		y: 1,
		inVent: false,
	},
	{
		ptr: 1,
		id: 1,
		clientId: 1,
		name: 'Lizzy',
		colorId: 4,
		hatId: 4,
		petId: 4,
		skinId: 4,
		disconnected: false,
		isImpostor: false,
		isDead: false,
		taskPtr: 1,
		objectPtr: 1,
		isLocal: false,
	
		x: 1,
		y: 1,
		inVent: false,
	},{
		ptr: 1,
		id: 1,
		clientId: 1,
		name: 'Benj',
		colorId: 5,
		hatId: 5,
		petId: 5,
		skinId: 5,
		disconnected: false,
		isImpostor: false,
		isDead: false,
		taskPtr: 1,
		objectPtr: 1,
		isLocal: false,
	
		x: 1,
		y: 1,
		inVent: false,
	},{
		ptr: 1,
		id: 1,
		clientId: 1,
		name: 'KT',
		colorId: 6,
		hatId: 6,
		petId: 6,
		skinId: 6,
		disconnected: false,
		isImpostor: false,
		isDead: false,
		taskPtr: 1,
		objectPtr: 1,
		isLocal: false,
	
		x: 1,
		y: 1,
		inVent: false,
	},{
		ptr: 1,
		id: 1,
		clientId: 1,
		name: 'David',
		colorId: 7,
		hatId: 7,
		petId: 7,
		skinId: 7,
		disconnected: false,
		isImpostor: false,
		isDead: false,
		taskPtr: 1,
		objectPtr: 1,
		isLocal: false,
	
		x: 1,
		y: 1,
		inVent: false,
	}]; // TODO get this somehow
	
	return (
		<Grid
			container
			spacing={1}
			className={classes.otherplayers}
			alignItems="flex-start"
			alignContent="flex-start"
			justify="flex-start"
		>
			{otherPlayers.map((player) => {
				return (
					<Grid
						item
						key={player.id}
						xs={getPlayersPerRow(otherPlayers.length)}
						style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%' }}
					>
						<Avatar
							style={{ cursor: 'pointer' }}
							connectionState={'connected'}
							player={player}
							talking={false}
							borderColor="#2ecc71"
							isAlive={true}
							size={50}
							onSelect={setPlayer}
						/>
					</Grid>
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
