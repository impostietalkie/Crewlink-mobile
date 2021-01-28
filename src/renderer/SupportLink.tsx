import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { shell } from 'electron';

const SupportLink: React.FC = function () {
	return (
		<Typography align="center">
			Need help?{' '}
			<Link
				href="#"
				color="secondary"
				onClick={() => shell.openExternal('https://www.github.com/impostietalkie/Crewlink-mobile/issues')}
			>
				Get support
			</Link>
		</Typography>
	);
};

export default SupportLink;
