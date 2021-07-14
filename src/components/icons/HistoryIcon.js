import React from 'react';
import theme from 'theme';

/**
 * Post like icon
 *
 * @param {string} width
 * @param {string} color
 */
export const HistoryIcon = ({ width, color }) => {
    const DEFAULT_WIDTH = '22';
    const DEFAULT_COLOR = theme.colors.white;
    return (
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width={width || DEFAULT_WIDTH}
            fill={theme.colors[color] || '#000000'}
            viewBox="0 0 448 448">
            <g>
                <g>
                    <g>
                        <polygon points="234.667,138.667 234.667,245.333 325.973,299.52 341.333,273.6 266.667,229.333 266.667,138.667 			" />
                        <path d="M255.893,32C149.76,32,64,117.973,64,224H0l83.093,83.093l1.493,3.093L170.667,224h-64
				c0-82.453,66.88-149.333,149.333-149.333S405.333,141.547,405.333,224S338.453,373.333,256,373.333
				c-41.28,0-78.507-16.853-105.493-43.84L120.32,359.68C154.987,394.453,202.88,416,255.893,416C362.027,416,448,330.027,448,224
				S362.027,32,255.893,32z"/>
                    </g>
                </g>
            </g>
        </svg>
    );
};
