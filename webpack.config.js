/**
 * Extends @wordpress/scripts webpack config with theme-specific entry points.
 * Run:  npm run build   (production)
 *       npm run start   (watch / dev)
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		// Front-end bundle: JS + SCSS → build/site.js + build/site.css
		site: path.resolve( __dirname, 'src/site.js' ),
		// Block editor styles → build/editor-styles.css
		'editor-styles': path.resolve( __dirname, 'src/editor-styles.js' ),
		// Block editor customizations (block styles, unregister unused blocks)
		'editor': path.resolve( __dirname, 'src/editor.js' ),
		// Theme blocks
		'search-trigger':  path.resolve( __dirname, 'blocks/search-trigger/index.js' ),
		'eyebrow-heading': path.resolve( __dirname, 'blocks/eyebrow-heading/index.js' ),
		'impact-slider':   path.resolve( __dirname, 'blocks/impact-slider/index.js' ),
		'impact-slide':    path.resolve( __dirname, 'blocks/impact-slide/index.js' ),
		'stat':            path.resolve( __dirname, 'blocks/stat/index.js' ),
		'flip-card':         path.resolve( __dirname, 'blocks/flip-card/index.js' ),
		'accordion-section': path.resolve( __dirname, 'blocks/accordion-section/index.js' ),
		'accordion-item':    path.resolve( __dirname, 'blocks/accordion-item/index.js' ),
	},
};
