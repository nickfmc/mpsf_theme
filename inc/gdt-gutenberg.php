<?php
/**
 * Block editor theme support and customizations.
 */


/**
 * Enqueue block editor customization script.
 * Uses the wp-scripts built file so WP package dependencies are auto-declared
 * via the generated .asset.php file.
 */
function launchpad_block_editor_scripts() {
	$asset_file = get_stylesheet_directory() . '/build/editor.asset.php';
	if ( ! file_exists( $asset_file ) ) {
		return;
	}
	$asset = include $asset_file;
	wp_enqueue_script(
		'launchpad-block-editor',
		get_stylesheet_directory_uri() . '/build/editor.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'launchpad_block_editor_scripts' );


/**
 * Register the patterns/ directory so WP auto-loads theme patterns.
 * Each pattern declares its own title, slug, and categories via file header.
 */
function launchpad_register_patterns() {
	register_block_pattern_category(
		'launchpad',
		array( 'label' => __( 'LaunchPad', 'launchpad' ) )
	);
}
add_action( 'init', 'launchpad_register_patterns' );


/**
 * Add a custom block category.
 *
 * @param array $categories Array of block categories.
 * @return array
 */
function launchpad_block_category( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'myblocks',
				'title' => __( 'Custom Blocks', 'launchpad' ),
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'launchpad_block_category', 10, 2 );


/**
 * Return the filemtime version for a theme asset, or false if file not found.
 *
 * @param string $script_path Path relative to the theme root (e.g. '/src/js/splide.min.js').
 * @return int|false
 */
function launchpad_asset_version( $script_path ) {
	$file_path = get_template_directory() . $script_path;
	if ( file_exists( $file_path ) ) {
		return filemtime( $file_path );
	}
	return false;
}


/**
 * Replace the default WP navigation submenu toggle chevron with the brand icon.
 *
 * @param string $block_content Rendered block HTML.
 * @param array  $block         Block data.
 * @return string
 */
function launchpad_submenu_icon( string $block_content, array $block ): string {
	$custom_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 9 5" fill="none" aria-hidden="true" focusable="false">'
		. '<path d="M-5.60272e-07 4.5C-4.55935e-07 3.30653 0.474105 2.16193 1.31802 1.31802C2.16193 0.474106 3.30653 4.55935e-07 4.5 5.60272e-07C5.69347 6.64609e-07 6.83807 0.474107 7.68198 1.31802C8.52589 2.16193 9 3.30653 9 4.5L4.5 4.5L-5.60272e-07 4.5Z" fill="#F8D2BE" stroke="none"/>'
		. '</svg>';

	// Direct replace of the known WP core SVG (fastest path).
	$wp_default = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false"><path d="M1.50002 4L6.00002 8L10.5 4" stroke-width="1.5"></path></svg>';
	if ( str_contains( $block_content, $wp_default ) ) {
		return str_replace( $wp_default, $custom_svg, $block_content );
	}

	// Regex fallback in case WP tweaks the output slightly.
	return preg_replace(
		'#<svg[^>]+(?:width="12"|viewBox="0 0 12 12")[^>]*>[\s\S]*?</svg>#',
		$custom_svg,
		$block_content
	);
}
add_filter( 'render_block_core/navigation-submenu', 'launchpad_submenu_icon', 10, 2 );


/**
 * Register native block types.
 */
function launchpad_register_blocks() {
	register_block_type( get_stylesheet_directory() . '/blocks/search-trigger/block.json' );
	register_block_type( get_stylesheet_directory() . '/blocks/eyebrow-heading/block.json' );
	register_block_type( get_stylesheet_directory() . '/blocks/impact-slider/block.json' );
	register_block_type( get_stylesheet_directory() . '/blocks/impact-slide/block.json' );
	register_block_type( get_stylesheet_directory() . '/blocks/stat/block.json' );
	register_block_type( get_stylesheet_directory() . '/blocks/flip-card/block.json' );
	register_block_type( get_stylesheet_directory() . '/blocks/accordion-section/block.json' );
	register_block_type( get_stylesheet_directory() . '/blocks/accordion-item/block.json' );
}
add_action( 'init', 'launchpad_register_blocks', 5 );
