import React from 'react';
import { WrapperInput } from './WrapperInput';
import { AutoComplete } from 'antd';

export const AutoCompleteNormal = (props) => {
	return (
		<WrapperInput xs={props.xs} md={props.md} label={props.label} className={props.className}>
			<AutoComplete
				className="w-100 wrapper-autocomplete"
				dataSource={props.dataSource}
				placeholder={props.placeholder}
				value={props.value}
				disabled={props.disabled}
				onChange={props.onChange}
				filterOption={(inputValue, option) =>
					option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
				}
			/>
		</WrapperInput>
	);
};
