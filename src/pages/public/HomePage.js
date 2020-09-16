import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Input, Avatar, Button, Carousel, Tag } from 'antd';
import { PRIMARY_COLOR } from '../../data/ConstansStyles';
import { BASE_URL } from '../../data/Constans';
import { Logo } from '../../components/Logo';
import IOS_ICON from '../../images/svg/apple-store_app-store-es.svg';
import ANDROID_ICON from '../../images/svg/play-store_play-store-es.png';
import DELIVERY_MAN from '../../images/home-page/delivery_man.png';
import MOCKUP_MOBILE from '../../images/mockup-mobile.png';
import axios from 'axios';

const style = {
	sizeIcon: {
		width: 148,
	},
	colorPrimary: {
		color: PRIMARY_COLOR,
	},
	buttonPrimary: {
		background: PRIMARY_COLOR,
		borderColor: PRIMARY_COLOR,
	},
	buttonGray: {
		background: '#ccc',
		borderColor: '#ccc',
		margin: '0 4px',
	},
};

const configCategories = {
	infinite: true,
	speed: 500,
	slidesToShow: 6,
	slidesToScroll: 6,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 320,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};

export class HomePage extends Component {
	state = {
		categories: [],
	};

	handleNext = () => {
		this.slider.next();
	};

	handlePrev = () => {
		this.slider.prev();
	};

	handleSelectPlace = (place) => {
		console.log(place);
	};

	handleSelectCategory = (id) => {
		const currentCategory = this.state.categories.filter((item) => item._id === id);
		console.log(currentCategory);
	};

	handleGenerateNewOrder = () => {
		console.log('Order now');
	};

	componentDidMount() {
		axios.get(`${BASE_URL}/category/all/all_sub_category`).then((response) => {
			if (response.status == 200) {
				this.setState({ categories: response.data.result });
			}
		});
	}

	render() {
		return (
			<Grid fluid className="p-none m-none">
				<Section1 onClick={this.handleGenerateNewOrder} />
				<WrapperContent style={{ padding: '6em 0' }}>
					<Col xs={12}>
						<Row center="xs" start="md" style={{ padding: '0 0 6em 0' }}>
							<Col xs={10} md={12}>
								<p className="mdc-typography--headline5" style={{ margin: 4 }}>
									¿PORQUE ELEGIR DVOLADA?
								</p>
								<p className="mdc-typography--body1">
									Descarga la app para conocer el catalogo de comercios
								</p>
							</Col>
						</Row>
					</Col>
					<Col xs={12}>
						<Row>
							<BenefitsCard
								title="Envíos rápidos"
								description="Solo recogeran tu pedido los conductores que se encuentren cerca del comercio."
								background="#e6ac99"
								icon="fire"
							/>
							<BenefitsCard
								title="Ahorra tiempo"
								description="Evita hacer filas, esperar en el trafico, sigue avanzando sin descuidar tu pedido. Monitoreo en tiempo real."
								background="#9dbdf0"
								icon="clock-circle"
							/>
							<BenefitsCard
								title="Precios Justos"
								description="Somos el servicio de entrega con los costos de envíos más accesibles del mercado"
								background="#d8de8d"
								icon="credit-card"
							/>
						</Row>
					</Col>
				</WrapperContent>
				<Row style={{ padding: '4em 0' }}>
					<Grid>
						<Row>
							<Col xs={12}>
								<Row>
									<Col xs={12}>
										<p
											className="mdc-typography--headline5"
											style={{ margin: 0, padding: '0 1em' }}
										>
											Categorías
										</p>
									</Col>
								</Row>
								<Row end="xs">
									<Col xs={12}>
										<Button
											type="primary"
											shape="circle"
											icon="arrow-left"
											size={'large'}
											style={style.buttonGray}
											onClick={this.handlePrev}
										/>
										<Button
											type="primary"
											shape="circle"
											icon="arrow-right"
											size={'large'}
											style={style.buttonGray}
											onClick={this.handleNext}
										/>
									</Col>
								</Row>
								<Carousel
									ref={(slider) => (this.slider = slider)}
									{...configCategories}
									className="wrapper-carousel-categories"
								>
									{this.state.categories.map((item, key) => (
										<ItemCategory
											key={key}
											_id={item._id}
											image={item.thumbnail}
											title={item.name}
											onClick={this.handleSelectCategory}
										/>
									))}
								</Carousel>
							</Col>
						</Row>
					</Grid>
				</Row>
				<WrapperContent style={{ padding: '6em 0' }} center="xs" start="md">
					<Col xs={10} md={12}>
						<Row>
							<Col md={6}>
								<Row>
									<Col xs={12}>
										<p className="mdc-typography--overline">SOLUCIONES EN MOVIMIENTO</p>
									</Col>
									<Col xs={12}>
										<p className="mdc-typography--headline4">¿Qué es dVolada?</p>
									</Col>
									<Col xs={12}>
										<p className="mdc-typography--subtitle1">
											dVolada es una app de entrega innovadora que te conecta con los mejores
											establecimientos de la ciudad al recibir lo que necesitas en la puerta de tu
											casa, causando una experiencia satisfactoria. <br />
											dVolada ofrece diversos productos y servicios en cualquier momento. Busca lo
											que requieres, solamente elige y listo, utilizando dVolada todo es más
											fácil.
										</p>
									</Col>
									{/* <Col xs={12}>
								<p className="mdc-typography--button">BUTTON</p>
							</Col> */}
								</Row>
							</Col>
							<Col md={6}>
								<Row>
									<Col xs={12}>
										<img
											src={DELIVERY_MAN}
											alt="bg-driver"
											className="img-fluid"
											style={{ borderRadius: 16, maxWidth: '480px' }}
										/>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				</WrapperContent>

				<Row style={{ padding: '2em 0' }}>
					<Grid>
						<Row className="content-available-place bg-content-primary" center="xs" start="md">
							<Col md={12}>
								<Row middle="xs">
									<Col md={6}>
										<Row>
											<Col xs={12}>
												<p className="mdc-typography--headline4 c-white">
													Disfruta una mejor experiencia descargando la app
												</p>
											</Col>
											<Col xs={12}>
												<Row center="xs" start="md">
													<a
														href="https://play.google.com/store/apps/details?id=mx.dvolada.cliente&hl=es_MX"
														target="_blank"
														rel="noopener noreferrer"
													>
														<img
															src={ANDROID_ICON}
															alt="download-app"
															style={{ maxWidth: 148 }}
														/>
													</a>
													<a
														href="https://apps.apple.com/id/app/dvolada/id1499224260"
														target="_blank"
														rel="noopener noreferrer"
														style={{ padding: '0.6em' }}
													>
														<img
															src={IOS_ICON}
															alt="download-app"
															style={{ maxWidth: 148 }}
														/>
													</a>
												</Row>
											</Col>
										</Row>
									</Col>
									<Col md={6}>
										<img src={MOCKUP_MOBILE} alt="bg-phone" className="img-fluid" />
									</Col>
								</Row>
							</Col>
						</Row>
					</Grid>
				</Row>
				<AvailablePlaceOfService onClick={this.handleSelectPlace} />
				<Footer />
			</Grid>
		);
	}
}

const BenefitsCard = (props) => {
	return (
		<Col md={4}>
			<Row middle="xs" className="wrapper-benefits-card">
				<Col xs={2} md={2}>
					<Avatar size={54} icon={props.icon} style={{ background: props.background }} />
				</Col>
				<Col xs={10} md={10}>
					<Row center="xs">
						<Col xs={11}>
							<Row start="xs">
								<Col xs={12}>
									<p
										className="mdc-typography--headline6"
										style={{ margin: '0 0 8px 0', fontWeight: 600 }}
									>
										{props.title}
									</p>
								</Col>
								<Col xs={12}>
									<p className="mdc-typography--subtitle2">{props.description}</p>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Col>
	);
};

const WrapperContent = (props) => {
	return (
		<Row style={props.style}>
			<Grid>
				<Row start={props.start ? props.start : 'xs'} center={props.center ? props.center : null}>
					{props.children}
				</Row>
			</Grid>
		</Row>
	);
};

const ItemCategory = (props) => {
	const style = {
		coverCategory: { borderRadius: '16px', width: '148px', height: '148px', objectFit: 'cover', margin: 'auto' },
		padding1: { padding: '1em', cursor: 'pointer' },
	};
	return (
		<Row center="xs" style={style.padding1} onClick={() => props.onClick(props._id)}>
			<Col xs={12} className="p-none">
				<img src={props.image} alt="category-image" className="img-fluid" style={style.coverCategory} />
			</Col>
			<p>{props.title}</p>
		</Row>
	);
};

const Section1 = (props) => {
	return (
		<Row className="main-height">
			<Grid>
				<Row middle="xs" className="h-100">
					<Col xs={12}>
						<Row center="xs" start="md">
							<Col xs={12}>
								<Row center="xs" start="md">
									<Col xs={10} md={12}>
										<p className="mdc-typography--headline4 c-primary m-none">dVolada</p>
										<p className="mdc-typography--headline5">
											La App donde tu única preocupación será...
										</p>
										<p className="mdc-typography--headline3">¿Ahora que voy a pedir?</p>
									</Col>
									<Col xs={10} md={12}>
										<Row center="xs" start="md">
											<button
												type="button"
												className="btn-primary color-primary"
												onClick={props.onClick}
											>
												Ordernar Ahora
											</button>
											<p style={{ padding: 16, margin: 0 }} className="mdc-typography--subtitle1">
												Entregas desde 30 min
											</p>
										</Row>
									</Col>
									{/* 
							<Col xs={12}>
								<Row>
									<Col xs>
										<Input
											type="text"
											name="text"
											size="large"
											placeholder="Ingresa la dirección de entrega"
											prefix={<Icon type="environment" style={style.colorPrimary} />}
										/>
									</Col>
									<Col>
										<Button type="primary" size="large" style={style.buttonPrimary}>
											Buscar Comercio
										</Button>
									</Col>
								</Row>
							</Col>
						 */}
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Grid>
		</Row>
	);
};

const AvailablePlaceOfService = (props) => {
	const placeOfService = ['Tlaxcala', 'Apizaco', 'Huamantla', 'Chalco', 'Cholula'];

	return (
		<Row style={{ padding: '6em 0' }}>
			<Grid>
				<Row className="content-available-place">
					<Col xs={12}>
						<p className="mdc-typography--headline5">Tenemos servicio en estas ciudades</p>
					</Col>
					<Col xs={12}>
						{placeOfService.map((item) => (
							<Tag
								key={item}
								className="wrapper-tag--places"
								onClick={() => props.onClick(item.toLowerCase())}
							>
								{item}
							</Tag>
						))}
					</Col>
				</Row>
			</Grid>
		</Row>
	);
};

const Footer = (props) => {
	const style = {
		paddingTopFooter: { padding: '6em 0 0' },
	};

	return (
		<Row style={style.paddingTopFooter}>
			<Grid>
				<Row center="xs" start="md">
					<Col xs={10} md={12}>
						<Row>
							<Col md={8}>
								<Row start="xs">
									<ColumnItemListGrid />
								</Row>
							</Col>
							<Col md={4} className="padding-logo-footer--mobile">
								<Logo maxWidth={'260px'} end="md" center="xs" className="logotipo" />
							</Col>
						</Row>
						<Row style={style.paddingTopFooter} className="padding-footer-mobile--legal">
							<Col md={6}>
								<Row>
									<Col xs={12}>
										<p>© VENTAS DVOLADA LATINOAMERICA S.A.S</p>
									</Col>
								</Row>
							</Col>
							<Col md={6}>
								<Row end="md">
									<Col xs={12}>
										<a
											href="https://dvolada.firebaseapp.com/aviso-de-privacidad"
											className="item-footer--list"
										>
											Politicas de privacidad
										</a>
									</Col>
									<Col xs={6}>
										<a href="https://dvolada.firebaseapp.com/terminos-y-condiciones">
											Términos y condiciones
										</a>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Grid>
		</Row>
	);
};

const ColumnItemListGrid = () => {
	const data = [
		{
			title: 'DVOLADA',
			items: [
				{ label: 'Soy Aliado', href: 'http://aliado.dvolada.com.mx/', target: true },
				{ label: 'Beneficios', href: 'http://aliado.dvolada.com.mx/#proceso', target: true },
				{ label: 'Membresia', href: 'http://aliado.dvolada.com.mx/#membresia', target: true },
			],
		},
		{
			title: 'SOBRE NOSOTROS',
			items: [
				{ label: '¿Qué es dVolada?', href: '#' },
				{ label: 'Ciudades dVolada', href: '#' },
				{ label: 'Servicios', href: '#' },
			],
		},
		{
			title: 'REDES SOCIALES',
			items: [
				{ label: 'Facebook', href: 'https://www.facebook.com/dVolada.Mx', target: true },
				{ label: 'Instagram', href: 'https://www.instagram.com/dvolada_oficial', target: true },
				{ label: 'Linkedin', href: 'https://www.linkedin.com/company/dvolada-oficial', target: true },
			],
		},
		{
			title: 'CONTACTO',
			items: [
				{ label: 'hola@dvolada.com.mx', href: 'mailto:hola@dvolada.com.mx', target: true },
				{ label: 'Número de contacto', href: 'tel:+522215634029', target: true },
				{ label: 'Oficinas', href: '#' },
			],
		},
	];

	return data.map((element, key) => <ColumnItemList title={element.title} items={element.items} key={key} />);
};

const ColumnItemList = (props) => {
	const style = {
		formatUl: { margin: '0', padding: '0', listStyle: 'none' },
		spaceItemDown: { padding: '0 0 12px' },
	};

	return (
		<Col md={3}>
			<Row>
				<p className="mdc-typography--subtitle2">{props.title}</p>
			</Row>
			<ul style={style.formatUl}>
				{props.items.map((item, key) => (
					<li key={key} style={style.spaceItemDown}>
						<a href={item.href} target={item.target ? '_blank' : ''} className="item-footer--list">
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</Col>
	);
};
