import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/public/HomePage';
import './css/App.css';
import './css/Typography.css';

export const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={HomePage} />
			</Switch>
		</Router>
	);
};
