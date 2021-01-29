/* eslint react/prop-types: 0 */

import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SettingsContext } from './contexts';
import axios from 'axios';

interface HasRoomCodeResponse {
	isValid: boolean;
}

interface IOwnProps {
	setRoomCode: (roomCode: string) => void;
}

const EnterRoomCodeMenu: React.FC<IOwnProps> = function ({
	setRoomCode,
}) {
	const [roomCodeTmp, setRoomCodeTmp] = useState('');
	const [settings, ] = useContext(SettingsContext);
	const [hasInputError, setHasInputError] = useState(false);

	const onSubmit = () => {
		if (roomCodeTmp.length !== 6) {
			return;
		}

		// Check if the code exists
		const res = axios.get(`${settings.serverURL}hasRoomCode?roomCode=${roomCodeTmp}`);
		res.then((res) => {
			const hasRoomCodeResponse = res.data as HasRoomCodeResponse;
			if (hasRoomCodeResponse.isValid) {
				setRoomCode(roomCodeTmp);
			} else {
				setHasInputError(true);
			}
		})
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
				onKeyDown={(e) => {
					setHasInputError(false);
					if (e.key === 'Enter') {
						onSubmit();
					}
				}}
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
