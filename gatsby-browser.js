import ReactGA from 'react-ga';
// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"

import installFontAwesome from "./src/api/installFontAwesome"

import { url, GA_Measurement_ID } from "./config.json"

installFontAwesome()

const isProduction = () => window && window.location && window.location.origin === url;

if (isProduction()) {
	ReactGA.initialize(GA_Measurement_ID);
	console.log('GA activated');
}

export const onRouteUpdate = ({ location }) => {
	if (isProduction()) {
		ReactGA.pageview(location.pathname);
	} else {
		console.log('Now is not production mode, so ReactGA is not activated');
	}
}