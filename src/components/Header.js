import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Button, Drawer, Icon } from 'antd';
import { DEALER, COMMERCE, START_DVOLADA, ACTIVE_CLASSNAME } from '../data/ConstanstNavbar';
import { PRIMARY_COLOR } from '../data/ConstansStyles';

import { Logo } from './Logo';

const handleReedirect = () => {
	window.open(START_DVOLADA, '_blank');
};

const style = {
	linkFormat: {
		textDecoration: 'none',
		padding: '0 1em',
		color: '#212121',
	},
	isActiveLink: {
		color: PRIMARY_COLOR,
	},
	buttonPrimary: {
		margin: '0 1em',
		background: PRIMARY_COLOR,
		borderColor: PRIMARY_COLOR,
	},
	paddingNavbar: {
		padding: '32px 0px',
		position: 'absolute',
		width: '100%',
	},
	positionRelative: {
		position: 'relative',
	},
};

export const Header = () => {
	const [isShowDrawer, setShowDrawer] = useState(false);
	const [mode, setMode] = useState('inline');

	useEffect(() => {
		const getDimensions = () => {
			let mode = window.innerWidth < 999 ? 'horizontal' : 'inline';
			setMode(mode);
		};

		getDimensions();

		window.addEventListener('resize', getDimensions);
		return () => window.removeEventListener('resize', getDimensions);
	}, [mode]);

	const onClose = () => {
		setShowDrawer(false);
	};

	const showDrawer = () => {
		setShowDrawer(true);
	};

	let WrapperContent;
	switch (mode) {
		case 'inline':
			WrapperContent = DefaultWrapper;
			break;
		case 'horizontal':
			WrapperContent = DrawerWrapper;
			break;
		default:
			console.log('aa');
			break;
	}

	return (
		<WrapperContent showDrawer={showDrawer} onClose={onClose} visible={isShowDrawer}>
			<Row style={style.paddingNavbar} middle="xs" className="p-none--mobile">
				<Col md={6}>
					<Logo />
				</Col>
				<Col md={6}>
					<Row middle="xs" end="xs" className="menu--drawer">
						<NavLink
							to={DEALER}
							activeClassName={ACTIVE_CLASSNAME}
							style={style.linkFormat}
							activeStyle={style.isActiveLink}
							className="mdc-typography--subtitle1"
						>
							Repartidor
						</NavLink>
						<a
							href={COMMERCE}
							target="_blank"
							activeClassName={ACTIVE_CLASSNAME}
							style={style.linkFormat}
							activeStyle={style.isActiveLink}
							className="mdc-typography--subtitle1"
						>
							Comercio
						</a>

						<Button type="primary" onClick={handleReedirect} style={style.buttonPrimary}>
							ENTRAR
						</Button>
					</Row>
				</Col>
			</Row>
		</WrapperContent>
	);
};

const DrawerWrapper = (props) => (
	<nav className="menuBar">
		<Col xs={12}>
			<Row>
				<Col xs={6}>
					<Row start="xs" middle="xs">
						<Col xs={12}>
							<Logo />
						</Col>
					</Row>
				</Col>
				<Col xs={6}>
					<Row end="xs">
						<Col xs={12}>
							<Button type="primary" onClick={props.showDrawer} style={{ margin: 0 }}>
								<Icon type="menu-fold" style={{ color: 'white' }} />
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
		</Col>
		<Drawer
			title="Menú"
			placement="right"
			closable={false}
			onClose={props.onClose}
			visible={props.visible}
			closable
		>
			{props.children}
		</Drawer>
	</nav>
);

const DefaultWrapper = (props) => {
	return <Grid style={style.positionRelative}>{props.children}</Grid>;
};
