/* eslint react/prop-types: 0 */

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
		if (roomCodeTmp.length !== 6) {
			return;
		}
		// TODO do the error checking
		setRoomCode(roomCodeTmp);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '200px' }}>
			<TextField
				error={hasInputError /*TODO this once we have the backend for it*/}
				spellCheck={false}
				label="Room Code"
				value={roomCodeTmp}
				onChange={(e) => e.target.value.length <= 6 && setRoomCodeTmp(e.target.value.toUpperCase())}
				variant="outlined"
				color="primary"
				helperText={hasInputError ? 'Room not found' : ''}
				onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
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
