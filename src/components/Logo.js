import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import { HOME, ACTIVE_CLASSNAME } from '../data/ConstanstNavbar';
import Logotipo from '../images/logo.png';

export const Logo = (props) => {
	const style = {
		maxWidthLogo: {
			maxWidth: props.maxWidth,
		},
	};
	return (
		<Row center={props.center} start={props.start} end={props.end} middle={props.middle}>
			<Col
				xs={props.xs}
				md={props.md}
				lg={props.lg}
				xl={props.lg}
				style={style.maxWidthLogo}
				className={props.className}
			>
				<NavLink to={HOME} activeClassName={ACTIVE_CLASSNAME}>
					<img src={Logotipo} alt="logotipo" className="img-fluid" />
				</NavLink>
			</Col>
		</Row>
	);
};

Logo.propTypes = {
	center: PropTypes.string,
	start: PropTypes.string,
	middle: PropTypes.string,
	xs: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number,
	maxWidth: PropTypes.number,
};

Logo.defaultProps = {
	center: null,
	end: null,
	start: 'xs',
	middle: 'xs',
	xs: 12,
	md: 12,
	lg: 12,
	xl: 12,
	maxWidth: 148,
};
