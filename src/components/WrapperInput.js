import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

export const WrapperInput = (props) => {
	return (
		<Col xs={props.xs ? props.xs : 12} md={props.md ? props.md : 6} className={`wrapper--input ${props.className}`}>
			<Row center="xs">
				<Col xs={12}>
					<Row start="xs">
						<Col xs={12} style={{ margin: '12px 0' }}>
							<label>{props.label}</label>
						</Col>
						{props.children}
					</Row>
				</Col>
			</Row>
		</Col>
	);
};
