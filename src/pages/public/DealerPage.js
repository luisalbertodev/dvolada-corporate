import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { BASE_URL } from '../../data/Constans';
import { states } from '../../data/states.json';
import { locaties } from '../../data/locaties.json';
import { AutoCompleteNormal } from '../../components/AutoCompleteNormal';
import { InputNormal } from '../../components/InputNormal';
import VEHICLE_DELIVERY from '../../images/home-page/moto-delivery.png';
import IconPaymentSucces from '../../images/paymentSucces.png';
import NoServiceAvailable from '../../images/NoServiceAvailable.png';
import axios from 'axios';
import { saveData } from '../../config/Helpers';
import { message, Button } from 'antd';

export class DealerPage extends Component {
	state = {
		dataState: [],
		dataLocation: [],
		stateAvailables: [],
		loading: false,
		statusRegister: '',
		type: 'form',
		form: {
			name: '',
			email: '',
			phone: '',
			state: '',
			location: '',
		},
	};

	handleOnChange = (event) => {
		const { name, value } = event.target;

		if (name === 'phone') {
			if (value.length <= 10) {
				if (!isNaN(value)) {
					this.setState({ [this.state.type]: { ...this.state[this.state.type], [name]: parseInt(value) } });
				}
			}
			if (!value.length) {
				this.setState({ [this.state.type]: { ...this.state[this.state.type], [name]: '' } });
			}
		} else {
			this.setState({ [this.state.type]: { ...this.state[this.state.type], [name]: value } });
		}
	};

	handleOnAutoComplete = (value, type) => {
		this.setState({ [this.state.type]: { ...this.state[this.state.type], [type]: value } });
	};

	getStates = async () => {
		const res = await axios(`${BASE_URL}/super_user/states`);
		const data = await res.data.result;

		this.setState({ stateAvailables: data });
	};

	componentDidMount() {
		this.setState({ dataState: states, dataLocation: locaties });
		this.getStates();
	}

	handleOnSubmit = () => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const refState = this.state[this.state.type];
		if (refState.name.length) {
			if (refState.email.length) {
				if (re.test(String(refState.email).toLowerCase())) {
					if (refState.phone) {
						if (refState.state.length) {
							if (refState.location.length) {
								this.setState({ loading: true });
								const isStateAvailable = this.state.stateAvailables.filter((item) => {
									return item.state.toUpperCase() === refState.state;
								});

								if (isStateAvailable.length > 0) {
									const _data = this.state.stateAvailables.filter((item) => {
										return item.state.toUpperCase() === refState.location.toUpperCase();
									});

									if (_data.length || refState.location === 'Chalco') {
										this.setState({ loading: false });
										saveData({ ...refState }, () => {
											this.setState({ statusRegister: 'SERVICE_IN_ZONE' });
										});
									} else {
										this.setState({ loading: false });
										saveData({ ...refState }, () => {
											this.setState({ statusRegister: 'NOT_SERVICE' });
										});
									}
								} else {
									this.setState({ loading: false });
									saveData({ ...refState }, () => {
										this.setState({ statusRegister: 'NOT_SERVICE' });
									});
								}
							} else message.error('Falta ingresar la localidad dónde brindara el servicio');
						} else message.error('Falta ingresar el estado');
					} else message.error('Falta ingresar un número de contacto');
				} else message.error('Correo no valido');
			} else message.error('Falta ingresar un correo');
		} else message.error('Falta ingresar un nombre');
	};

	render() {
		switch (this.state.statusRegister) {
			case 'NOT_SERVICE':
				return <NoServiceInArea />;
				break;
			case 'SERVICE_IN_ZONE':
				return <SuccesFormComplete />;
				break;

			default:
				break;
		}

		return (
			<Grid>
				<Row middle="xs" style={{ minHeight: 800 }}>
					<Col md={6}>
						<Row start="md" center="xs">
							<Col xs={10} md={12}>
								<p className="mdc-typography--headline4">
									<span className="mdc-typography--headline4" style={{ color: 'orange' }}>
										Gana&nbsp;
									</span>
									dinero entregando productos en tu ciudad
								</p>
							</Col>
							<DeliveryForm
								data={this.state[this.state.type]}
								dataState={this.state.dataState}
								dataLocation={this.state.dataLocation[this.state[this.state.type].state]}
								onChange={this.handleOnChange}
								onAutoComplete={this.handleOnAutoComplete}
								onSubmit={this.handleOnSubmit}
							/>
						</Row>
					</Col>
					<Col md={6}>
						<Row end="md">
							<Col xs={12}>
								<img
									src={VEHICLE_DELIVERY}
									alt="vehicle-delivery"
									className="img-fluid"
									style={{ maxWidth: 480 }}
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</Grid>
		);
	}
}

const DeliveryForm = (props) => {
	return (
		<Col xs={10} md={12} style={{ maxWidth: 420 }}>
			<form onSubmit={(e) => e.preventDefault()} noValidate>
				<Row>
					<InputNormal
						md={12}
						label={`Nombre Completo`}
						name={`name`}
						value={props.data.name || ''}
						onChange={props.onChange}
					/>
					<InputNormal
						md={6}
						label={`Correo eléctronico`}
						name={`email`}
						value={props.data.email || ''}
						onChange={props.onChange}
					/>
					<InputNormal
						md={6}
						label={`Número de celular`}
						name={`phone`}
						type={'tel'}
						value={props.data.phone || ''}
						onChange={props.onChange}
					/>
					<AutoCompleteNormal
						md={6}
						label={`Estado`}
						dataSource={props.dataState || []}
						placeholder={'¿Desde cuál estado nos comunicas?'}
						value={props.data.state || ''}
						onChange={(e) => props.onAutoComplete(e, 'state')}
					/>
					<AutoCompleteNormal
						md={6}
						label={`Localidad`}
						dataSource={props.dataLocation || []}
						placeholder={'¿En cuál localidad deseas repartir?'}
						value={props.data.location || ''}
						disabled={!props.data.state.length}
						onChange={(e) => props.onAutoComplete(e, 'location')}
					/>
					<button
						onClick={props.onSubmit}
						className="bg-content-primary btn-primary"
						style={{ width: '100%', margin: '2em 0em' }}
					>
						POSTULARME AHORA
					</button>
				</Row>
			</form>
		</Col>
	);
};

const SuccesFormComplete = () => {
	return (
		<Grid>
			<Row middle="xs" style={{ minHeight: 800 }}>
				<Col xs={12}>
					<Row center="xs">
						<Col xs={12} style={{ maxWidth: 600 }}>
							<img
								src={IconPaymentSucces}
								alt="payment-succes"
								className="img-fluid"
								style={{ maxWidth: 560, padding: '4em' }}
							/>

							<p className="mdc-typography--headline5">Se ha registrado con exito</p>
							<p className="mdc-typography--subtitle1">
								Su información pasara al proceso de validación, normalmente tarda de 24 - 48 horas este
								proceso. Puede monitorear el seguimiento de su registro por correo.
							</p>

							<Button
								type="primary"
								onClick={() => window.open('https://dvolada.com.mx/', '_blank')}
								style={{ background: 'orange', borderColor: 'orange' }}
							>
								Conocer más de dVolada
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
		</Grid>
	);
};

const NoServiceInArea = () => {
	return (
		<Grid>
			<Row middle="xs" style={{ minHeight: 800 }}>
				<Col xs={12}>
					<Row center="xs">
						<Col xs={12}>
							<img
								src={NoServiceAvailable}
								alt="payment-succes"
								className="img-fluid"
								style={{ maxWidth: 560, padding: '4em' }}
							/>

							<p className="mdc-typography--headline5">
								Ups por el momento no tenemos servicio en tu zona
							</p>
							<p className="mdc-typography--subtitle1">
								En cuanto brindemos servicio en tu zona te notificaremos vía correo electrónico
							</p>
						</Col>
					</Row>
				</Col>
			</Row>
		</Grid>
	);
};
