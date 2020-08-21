import React from 'react';
import { Col } from 'react-flexbox-grid';
import { WrapperInput } from './WrapperInput';
import { Input } from 'antd';

export const InputNormal = (props) => {
	// value={props.value}
	return (
		<WrapperInput xs={props.xs} md={props.md} label={props.label} className={props.className}>
			<Col xs={12}>
				{props.type === 'TextArea' ? (
					<Input.TextArea
						disabled={props.disabled}
						size={props.size}
						rows={4}
						name={props.name}
						placeholder={props.placeholder}
						value={props.value}
						onChange={props.onChange}
					/>
				) : (
					<Input
						disabled={props.disabled}
						size={props.size}
						type={props.type ? props.type : 'text'}
						name={props.name}
						value={props.value}
						placeholder={props.placeholder}
						onChange={props.onChange}
					/>
				)}
			</Col>
		</WrapperInput>
	);
};
