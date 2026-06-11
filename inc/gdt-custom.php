<?php
/**
 * Per-project custom functions.
 * Drop project-specific code here.
 */


/**
 * Set $content_width — used by some plugins (e.g. Stackable) to constrain media widths.
 * Must run inside after_setup_theme so it's available before wp_head.
 */
function launchpad_content_width() {
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = 1180;
}
add_action( 'after_setup_theme', 'launchpad_content_width', 0 );


// ---- Project-specific functions below ----------------------------------------

// Example: ACF icon picker path override
// add_filter( 'acf_icon_path_suffix', function( $path_suffix ) {
// 	return 'img/icons/';
// } );


/**
 * Language selector shortcode for the FSE header.
 *
 * Detects the active language via WPML → Polylang → WP locale fallback.
 * Usage: [mpsf_lang_selector]
 */
function mpsf_lang_selector_shortcode(): string {
	if ( defined( 'ICL_LANGUAGE_CODE' ) ) {
		$current_lang = ICL_LANGUAGE_CODE;
	} elseif ( function_exists( 'pll_current_language' ) ) {
		$current_lang = pll_current_language();
	} else {
		$current_lang = substr( get_locale(), 0, 2 );
	}

	// Inline SVG flags wrapped in a circular clip span — compact (no whitespace)
	// to prevent wpautop adding <br> tags.
	$flags = [
		'en' => '<span class="c-lang-selector__flag" aria-hidden="true"><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false"><rect width="20" height="14" fill="#B22234"/><rect y="1.08" width="20" height="1.08" fill="white"/><rect y="3.23" width="20" height="1.08" fill="white"/><rect y="5.38" width="20" height="1.08" fill="white"/><rect y="7.54" width="20" height="1.08" fill="white"/><rect y="9.69" width="20" height="1.08" fill="white"/><rect y="11.85" width="20" height="1.08" fill="white"/><rect width="8" height="7.54" fill="#3C3B6E"/></svg></span>',
		'es' => '<span class="c-lang-selector__flag" aria-hidden="true"><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false"><rect width="20" height="14" fill="white"/><rect width="6.67" height="14" fill="#006847"/><rect x="13.33" width="6.67" height="14" fill="#CE1126"/></svg></span>',
	];

	$lang_items = [
		'en' => [ 'label' => 'EN',  'aria' => 'English',  'hreflang' => 'en' ],
		'es' => [ 'label' => 'ESP', 'aria' => 'Español', 'hreflang' => 'es' ],
	];

	$html = '<div class="c-lang-selector" role="navigation" aria-label="' . esc_attr__( 'Select language', 'mpsf-theme' ) . '">';

	foreach ( $lang_items as $code => $item ) {
		$is_active = ( $code === substr( $current_lang, 0, 2 ) );

		if ( function_exists( 'pll_home_url' ) ) {
			$lang_url = pll_home_url( $code );
		} elseif ( defined( 'ICL_LANGUAGE_CODE' ) ) {
			$lang_url = apply_filters( 'wpml_permalink', home_url( '/' ), $code );
		} else {
			$lang_url = home_url( '/' );
		}

		$classes  = 'c-lang-selector__item' . ( $is_active ? ' is-active' : '' );
		$current  = $is_active ? ' aria-current="true"' : '';

		// Single unbroken line — no newlines inside the <a> so wpautop can't inject <br>.
		$html .= '<a href="' . esc_url( $lang_url ) . '" class="' . esc_attr( $classes ) . '" lang="' . esc_attr( $code ) . '" hreflang="' . esc_attr( $item['hreflang'] ) . '" aria-label="' . esc_attr( $item['aria'] ) . '"' . $current . '>' . $flags[ $code ] . '<span>' . esc_html( $item['label'] ) . '</span></a>';
	}

	$html .= '</div>';
	return $html;
}
add_shortcode( 'mpsf_lang_selector', 'mpsf_lang_selector_shortcode' );
