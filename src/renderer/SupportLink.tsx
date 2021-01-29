import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const SupportLink: React.FC = function () {
	return (
		<Typography align="center">
			Need help?{' '}
			<Link
				href="https://www.github.com/impostietalkie/Crewlink-mobile/issues"
				color="secondary"
			>
				Get support
			</Link>
		</Typography>
	);
};

export default SupportLink;
