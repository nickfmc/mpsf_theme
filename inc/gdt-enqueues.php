<?php
/**
 * Asset registration and enqueuing.
 */


/**
 * Enqueue Google Fonts — DM Sans (body) + Playfair Display (headings).
 * Loaded on front-end and in the block editor for WYSIWYG parity.
 */
function mpsf_enqueue_google_fonts() {
	$fonts_url = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap';
	wp_enqueue_style( 'mpsf-google-fonts', $fonts_url, array(), null );
}
add_action( 'wp_enqueue_scripts', 'mpsf_enqueue_google_fonts', 1 );
add_action( 'enqueue_block_editor_assets', 'mpsf_enqueue_google_fonts', 1 );

/**
 * Register and enqueue front-end scripts and styles.
 */
function launchpad_scripts_and_styles() {
	if ( ! is_admin() ) {
		// Comment reply script for threaded comments.
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		// Main stylesheet (compiled from src/site.scss via wp-scripts).
		$css_ver = filemtime( get_stylesheet_directory() . '/build/site.css' );
		wp_register_style( 'launchpad-styles', get_stylesheet_directory_uri() . '/build/site.css', array(), $css_ver, 'all' );

		// Main JS bundle (compiled from src/site.js via wp-scripts).
		$js_ver = filemtime( get_stylesheet_directory() . '/build/site.js' );
		wp_register_script( 'launchpad-scripts', get_stylesheet_directory_uri() . '/build/site.js', array(), $js_ver, true );

		wp_enqueue_style( 'launchpad-styles' );
		wp_enqueue_script( 'launchpad-scripts' );
	}
}
add_action( 'wp_enqueue_scripts', 'launchpad_scripts_and_styles', 999 );
