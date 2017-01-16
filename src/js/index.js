import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Route from './router/route.js';
import configureStore from './store/configureStore';

const store = configureStore({},window.devToolsExtension && window.devToolsExtension());
render(
	<Provider store = {store}>
		<Route/>
	</Provider>
	,document.getElementById('container')
);