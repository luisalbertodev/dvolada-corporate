import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/public/HomePage';
import { DealerPage } from './pages/public/DealerPage';
import { CommercePage } from './pages/public/CommercePage';
import { Header } from './components/Header';
import { HOME, DEALER, COMMERCE } from './data/ConstanstNavbar';
import './css/App.css';
import './css/Responsive.css';
import './css/Typography.css';
import 'antd/dist/antd.css';

export const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path={HOME} component={HomePage} />
				<Route exact path={DEALER} component={DealerPage} />
				{/* <Route exact path={COMMERCE} component={CommercePage} /> */}
			</Switch>
		</Router>
	);
};
