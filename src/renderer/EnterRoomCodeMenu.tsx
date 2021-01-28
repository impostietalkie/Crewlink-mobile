import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface IOwnProps {
	setRoomCode: (roomCode: string) => void;
}

const EnterRoomCodeMenu: React.FC<IOwnProps> = function ({
	setRoomCode,
}) {
	const [roomCodeTmp, setRoomCodeTmp] = useState('');
	const hasInputError = false;

	const onSubmit = () => {
		// TODO do the error checking
		setRoomCode(roomCodeTmp);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%' }}>
			<TextField
				error={hasInputError /*TODO this once we have the backend for it*/}
				spellCheck={false}
				label="Room Code"
				value={roomCodeTmp}
				onChange={(e) => setRoomCodeTmp(e.target.value)}
				variant="outlined"
				color="primary"
				helperText={hasInputError ? 'Room not found' : ''}
			/>
			<Button
				color="primary"
				disabled={roomCodeTmp.length !== 6}
				onClick={onSubmit}
			>Submit</Button>
		</div>
	);
};

export default EnterRoomCodeMenu;
