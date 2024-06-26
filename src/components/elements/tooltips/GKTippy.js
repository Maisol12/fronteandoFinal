// import node module libraries
import { useContext } from 'react';
import PropTypes from 'prop-types';

// import tippy tooltip
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';

// import context file
import { AppConfigContext } from 'context/Context';

const GKTippy = ({ children, content, placement }) => {
	const ConfigContext = useContext(AppConfigContext);
	return (
<p></p>
		);
};
// ** PropTypes
GKTippy.propTypes = {
	placement: PropTypes.oneOf([
		'top',
		'top-start',
		'top-end',
		'right',
		'right-start',
		'right-end',
		'bottom',
		'bottom-start',
		'bottom-end',
		'left',
		'left-start',
		'left-end'
	])
};

// ** Default Props
GKTippy.defaultProps = {
	placement: 'top',
	content: 'Tool Tip Text'
};

export default GKTippy;
