import React from 'react';
import theme from 'theme';

/**
 * Post like icon
 *
 * @param {string} width
 * @param {string} color
 */
export const TeamIcon = ({ width, color }) => {
    const DEFAULT_WIDTH = '22';
    const DEFAULT_COLOR = theme.colors.white;
    return (
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width={width || DEFAULT_WIDTH}
            fill={theme.colors[color] || '#000000'}
            viewBox="0 0 511.998 511.998">
            <g>
                <g>
                    <path d="M247.193,152.538H188.3c-3.859,0-7.886,2.013-7.886,5.872v110.906c0,4.029,4.53,5.875,8.893,5.875
			c4.53,0,8.892-1.846,8.892-5.873v-48.49h26.007c4.027,0,5.704-3.691,5.704-6.879c0-3.86-2.013-7.216-5.704-7.216h-26.007v-38.422
			h48.994c3.691,0,5.705-3.692,5.705-8.054C252.898,156.565,251.22,152.538,247.193,152.538z"/>
                </g>
            </g>
            <g>
                <g>
                    <path d="M328.065,235.593c-4.866,0-8.39,1.509-8.725,5.872c-0.671,7.383-2.182,18.96-19.296,18.96
			c-13.254,0-20.47-6.879-20.47-21.644v-48.825c0-14.766,7.216-21.644,20.135-21.644c17.282,0,19.296,12.08,19.631,17.953
			c0.168,4.026,3.524,5.872,8.893,5.872c6.041,0,8.893-1.678,8.893-9.228c0-17.785-15.101-30.369-38.088-30.369
			c-20.302,0-37.248,10.234-37.248,37.416v48.825c0,27.182,16.778,37.416,37.08,37.416c22.987,0,38.255-12.919,38.255-31.376
			C337.125,237.439,334.273,235.593,328.065,235.593z"/>
                </g>
            </g>
            <g>
                <g>
                    <path d="M456.42,112.807c-1.271-8.299-8.867-14.355-17.27-13.791c-1.925,0.13-3.059,0.158-3.67,0.158
			c-17.179,0-33.574-5.77-46.167-16.247c-12.329-10.258-19.949-24.134-21.458-39.069c-0.756-7.488-7.032-13.134-14.599-13.134
			h-194.51c-7.567,0-13.843,5.646-14.599,13.133c-1.508,14.936-9.129,28.812-21.458,39.07
			c-12.594,10.476-28.99,16.246-46.169,16.246c-0.892,0-2.154-0.055-3.75-0.163c-8.415-0.588-15.996,5.486-17.269,13.79
			c-4.442,28.994-4.981,58.44-1.603,87.521c0.449,3.858,3.721,6.7,7.513,6.7c0.291,0,0.587-0.017,0.883-0.051
			c4.154-0.483,7.13-4.241,6.647-8.395c-3.222-27.737-2.707-55.824,1.53-83.481c0.091-0.589,0.651-1.013,1.276-0.975
			c1.963,0.133,3.525,0.198,4.774,0.198c20.71,0,40.546-7.014,55.852-19.75c15.265-12.701,24.765-29.979,26.788-48.7h193.677
			c2.023,18.72,11.522,35.999,26.788,48.7c15.307,12.737,35.142,19.75,55.853,19.75c1.23,0,2.811-0.065,4.692-0.192
			c0.616-0.054,1.189,0.384,1.28,0.974c4.236,27.644,4.756,55.72,1.546,83.449c-0.481,4.154,2.496,7.911,6.651,8.392
			c4.15,0.492,7.911-2.496,8.392-6.651C461.406,171.219,460.861,141.785,456.42,112.807z"/>
                </g>
            </g>
            <g>
                <g>
                    <path d="M508.81,404.094c2.646-2.529,3.739-6.168,2.924-9.735c-0.813-3.561-3.374-6.36-6.845-7.485
			c-16.711-5.423-33.767-10.408-50.807-14.85l5.257-22.746c1.309-5.68-2.237-11.393-7.905-12.736
			c-11.956-2.834-23.928-5.403-35.912-7.714c16.764-29.345,29.009-60.572,36.413-92.994c0.932-4.077-1.619-8.137-5.695-9.067
			c-4.076-0.933-8.136,1.619-9.067,5.695c-7.462,32.673-20.073,64.093-37.484,93.478c-6.603-1.146-13.208-2.219-19.818-3.206
			c8.878-14.22,16.606-29.032,22.995-44.192c17.891-42.449,25.86-88.89,23.046-134.3c-0.409-6.621-5.211-12.144-11.678-13.431
			c-33.162-6.594-60.509-28.082-73.152-57.481c-2.322-5.401-7.587-8.89-13.415-8.89H184.33c-5.828,0-11.093,3.489-13.414,8.889
			c-12.643,29.4-39.99,50.89-73.152,57.483c-6.465,1.286-11.267,6.808-11.678,13.429c-2.813,45.413,5.156,91.853,23.046,134.301
			c6.39,15.161,14.118,29.974,22.996,44.193c-6.616,0.989-13.229,2.065-19.839,3.212c-17.399-29.347-30.009-60.72-37.485-93.34
			c-0.934-4.076-4.997-6.618-9.072-5.689c-4.076,0.935-6.623,4.995-5.689,9.072c7.418,32.366,19.662,63.543,36.411,92.844
			c-12.038,2.322-24.062,4.905-36.071,7.755c-5.669,1.347-9.212,7.062-7.898,12.74l5.26,22.741
			c-16.985,4.432-33.985,9.402-50.633,14.804c-3.474,1.126-6.034,3.924-6.847,7.485c-0.815,3.567,0.278,7.206,2.923,9.735
			c6.887,6.583,13.733,13.357,20.377,20.161c-1.904,9.709-3.669,19.546-5.252,29.28c-0.579,3.562,0.71,7.091,3.45,9.443
			c1.903,1.634,4.262,2.49,6.678,2.49c1.068,0,2.148-0.168,3.203-0.51c37.8-12.253,75.163-21.434,114.222-28.066
			c0.004-0.001,0.008-0.001,0.012-0.002c0.026-0.004,0.051-0.009,0.077-0.013c0.329-0.056,0.645-0.139,0.956-0.234
			c0.07-0.022,0.14-0.045,0.21-0.069c0.68-0.23,1.309-0.55,1.88-0.947c0.051-0.036,0.103-0.07,0.154-0.107
			c0.276-0.202,0.538-0.42,0.783-0.655c0.049-0.048,0.095-0.099,0.143-0.147c0.217-0.221,0.421-0.453,0.609-0.698
			c0.034-0.044,0.07-0.084,0.103-0.128c0.205-0.279,0.384-0.575,0.549-0.879c0.035-0.065,0.07-0.129,0.104-0.196
			c0.162-0.322,0.303-0.655,0.418-0.999c0.006-0.019,0.016-0.035,0.022-0.053c0.018-0.057,0.029-0.114,0.046-0.171
			c0.047-0.156,0.092-0.314,0.129-0.474c0.022-0.096,0.04-0.192,0.059-0.288c0.027-0.142,0.052-0.283,0.071-0.427
			c0.016-0.118,0.027-0.236,0.037-0.354c0.01-0.12,0.019-0.24,0.023-0.362c0.005-0.141,0.005-0.282,0.002-0.423
			c-0.002-0.101-0.004-0.201-0.011-0.302c-0.009-0.157-0.025-0.313-0.044-0.468c-0.007-0.057-0.008-0.113-0.016-0.17l-3.638-25.039
			c1.327-0.189,2.653-0.383,3.98-0.565c14.45,14.72,30.282,28.438,47.142,40.789l47.656,34.912c2.595,1.901,5.636,2.851,8.677,2.851
			c3.041,0,6.083-0.95,8.679-2.852l47.656-34.911c16.863-12.354,32.693-26.073,47.138-40.79c1.328,0.182,2.655,0.375,3.983,0.564
			l-3.638,25.04c-0.008,0.055-0.009,0.11-0.016,0.165c-0.02,0.158-0.036,0.316-0.045,0.475c-0.006,0.099-0.008,0.198-0.01,0.297
			c-0.003,0.142-0.003,0.284,0.002,0.427c0.004,0.121,0.013,0.24,0.023,0.36c0.01,0.118,0.021,0.236,0.037,0.355
			c0.019,0.144,0.044,0.286,0.071,0.427c0.018,0.096,0.036,0.192,0.059,0.288c0.037,0.161,0.082,0.32,0.13,0.477
			c0.017,0.056,0.027,0.112,0.046,0.168c0.006,0.018,0.016,0.034,0.022,0.052c0.116,0.345,0.256,0.678,0.419,1.001
			c0.033,0.066,0.069,0.13,0.104,0.195c0.165,0.305,0.345,0.601,0.549,0.88c0.033,0.045,0.069,0.085,0.103,0.128
			c0.188,0.245,0.391,0.476,0.608,0.697c0.049,0.049,0.095,0.101,0.144,0.149c0.244,0.236,0.506,0.453,0.782,0.655
			c0.051,0.037,0.102,0.072,0.154,0.107c0.571,0.397,1.201,0.717,1.88,0.947c0.069,0.024,0.138,0.047,0.209,0.069
			c0.311,0.095,0.627,0.179,0.956,0.234c0.026,0.004,0.052,0.009,0.078,0.014c0.003,0.001,0.007,0.001,0.01,0.002
			c39.057,6.633,76.421,15.814,114.222,28.066c1.056,0.343,2.135,0.511,3.204,0.511c2.414,0,4.774-0.857,6.676-2.489
			c2.74-2.35,4.029-5.88,3.451-9.444c-1.583-9.74-3.348-19.576-5.251-29.28C495.089,417.437,501.935,410.663,508.81,404.094z
			 M123.086,272.66c-16.936-40.183-24.51-84.12-21.91-127.088c37.745-7.653,68.928-32.283,83.533-65.988h142.578
			c14.605,33.705,45.79,58.335,83.534,65.988c2.6,42.967-4.974,86.903-21.91,127.088c-6.94,16.466-15.535,32.511-25.546,47.779
			c-71.478-9.247-143.255-9.246-214.731,0.002C138.623,305.174,130.027,289.128,123.086,272.66z M34.569,448.128
			c1.344-7.823,2.799-15.673,4.342-23.427c0.66-3.318-0.351-6.745-2.703-9.168c-5.449-5.616-11.041-11.219-16.692-16.727
			c13.751-4.322,27.702-8.312,41.646-11.957l5.695,24.62c0.455,1.967,1.677,3.67,3.394,4.733c0.979,0.605,2.073,0.96,3.196,1.077
			c13.509,3.19,26.674,6.635,39.729,10.386C86.662,433.178,60.681,439.932,34.569,448.128z M107.299,410.29
			c8.75-1.73,17.508-3.311,26.272-4.735l1.885,12.974C126.101,415.615,116.74,412.877,107.299,410.29z M303.384,431.292
			l-47.385,34.712l-47.385-34.712c-13.014-9.534-25.396-19.907-36.958-30.946c8.332-0.93,16.667-1.728,25.005-2.382
			c7.389,6.421,15.078,12.591,22.93,18.342l27.778,20.351c2.581,1.89,5.605,2.835,8.63,2.835c3.025,0,6.049-0.945,8.63-2.836
			l27.776-20.349c7.849-5.749,15.539-11.92,22.931-18.344c8.338,0.654,16.673,1.451,25.004,2.381
			C328.781,411.383,316.4,421.756,303.384,431.292z M218.684,396.559c24.872-1.227,49.759-1.227,74.631,0
			c-3.254,2.573-6.537,5.101-9.858,7.533l-27.458,20.116l-27.458-20.117C225.219,401.658,221.937,399.131,218.684,396.559z
			 M373.124,389.387c-0.047-0.007-0.094-0.007-0.142-0.014c-4.956-0.754-9.914-1.463-14.874-2.121
			c-0.202-0.037-0.405-0.062-0.608-0.083c-14.491-1.912-28.995-3.411-43.506-4.503c-0.36-0.057-0.723-0.08-1.087-0.085
			c-37.935-2.8-75.92-2.799-113.854,0.003c-0.336,0.007-0.672,0.028-1.004,0.079c-14.559,1.095-29.11,2.6-43.649,4.52
			c-0.168,0.019-0.336,0.038-0.503,0.069c-4.956,0.658-9.91,1.367-14.863,2.121c-0.054,0.007-0.107,0.007-0.161,0.015
			c-0.066,0.01-0.128,0.027-0.193,0.038c-19.626,2.996-39.225,6.726-58.782,11.228L68.25,350.298
			c124.55-28.873,250.763-28.886,375.32-0.044l-11.637,50.36c-19.51-4.487-39.063-8.206-58.643-11.194
			C373.234,389.411,373.181,389.395,373.124,389.387z M378.427,405.552c8.765,1.424,17.523,3.007,26.274,4.737
			c-9.441,2.587-18.803,5.326-28.159,8.24L378.427,405.552z M475.79,415.533c-2.354,2.425-3.365,5.855-2.703,9.17
			c1.542,7.749,2.997,15.599,4.341,23.426c-26.112-8.197-52.092-14.951-78.606-20.462c13.309-3.824,26.727-7.332,40.511-10.574
			c0.033-0.008,0.064-0.02,0.097-0.028c0.125-0.031,0.247-0.07,0.371-0.107c0.122-0.037,0.245-0.073,0.365-0.115
			c0.102-0.036,0.2-0.08,0.3-0.121c0.137-0.056,0.274-0.111,0.405-0.174c0.079-0.038,0.156-0.082,0.234-0.123
			c0.146-0.076,0.291-0.152,0.43-0.237c0.016-0.01,0.033-0.017,0.048-0.027c0.055-0.034,0.106-0.075,0.16-0.111
			c0.139-0.091,0.277-0.183,0.409-0.282c0.071-0.053,0.138-0.111,0.207-0.167c0.122-0.099,0.243-0.198,0.358-0.303
			c0.073-0.067,0.142-0.139,0.213-0.209c0.102-0.101,0.204-0.203,0.3-0.309c0.074-0.082,0.142-0.168,0.212-0.253
			c0.084-0.103,0.169-0.205,0.247-0.312c0.069-0.094,0.133-0.191,0.198-0.288c0.071-0.106,0.142-0.212,0.207-0.321
			c0.06-0.101,0.115-0.204,0.171-0.308c0.061-0.114,0.121-0.227,0.177-0.344c0.048-0.102,0.091-0.205,0.135-0.309
			c0.053-0.126,0.104-0.252,0.15-0.381c0.035-0.098,0.066-0.198,0.097-0.298c0.044-0.14,0.085-0.28,0.12-0.423
			c0.01-0.039,0.024-0.076,0.033-0.116l5.69-24.62c13.997,3.656,28.003,7.661,41.813,12.001
			C486.839,404.306,481.246,409.909,475.79,415.533z"/>
                </g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
        </svg>
    );
};
