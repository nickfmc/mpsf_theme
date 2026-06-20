<?php
/**
 * Navigation menus: registration, helper function, and Walker classes.
 */


/**
 * Register nav menu locations.
 */
function launchpad_register_nav_menus() {
	register_nav_menus(
		array(
			'main-menu'     => 'Primary Menu',
			'tertiary-menu' => 'Tertiary Menu',
			'mobile-menu'   => 'Mobile Menu',
		)
	);
}
add_action( 'after_setup_theme', 'launchpad_register_nav_menus' );


/**
 * Output a nav menu by theme location.
 *
 * Usage: <?php launchpad_nav_menu( 'main-menu', 'c-menu-main' ); ?>
 *
 * @param string $theme_location Registered menu location slug.
 * @param string $class          CSS class applied to the <ul>.
 * @param array  $additional_args Additional args passed to wp_nav_menu().
 */
function launchpad_nav_menu( $theme_location, $class, $additional_args = array() ) {
	if ( ! has_nav_menu( $theme_location ) ) {
		return;
	}

	$default_args = array(
		'container'      => false,
		'theme_location' => $theme_location,
		'menu_class'     => $class,
		'echo'           => 0,
	);

	$args = array_merge( $default_args, $additional_args );
	echo wp_nav_menu( $args ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}


/*------------------------------------*\
    HC WALKER (active/highlight data attrs)
\*------------------------------------*/

// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
$hc_nav_menu_walker = null;

class HC_Walker_Nav_Menu extends Walker_Nav_Menu {

	public function start_lvl( &$output, $depth = 0, $args = array() ) {
		global $hc_nav_menu_walker;
		$hc_nav_menu_walker->start_lvl( $output, $depth, $args );
	}

	public function end_lvl( &$output, $depth = 0, $args = array() ) {
		global $hc_nav_menu_walker;
		$hc_nav_menu_walker->end_lvl( $output, $depth, $args );
	}

	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		global $hc_nav_menu_walker;

		$item_output = '';
		$hc_nav_menu_walker->start_el( $item_output, $item, $depth, $args, $id );

		if ( $item->current_item_parent ) {
			$item_output = preg_replace( '/<li/', '<li data-nav-active', $item_output, 1 );
		}

		if ( $item->current ) {
			$item_output = preg_replace( '/<li/', '<li data-nav-highlight', $item_output, 1 );
		}

		$output .= $item_output;
	}

	public function end_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		global $hc_nav_menu_walker;
		$hc_nav_menu_walker->end_el( $output, $item, $depth, $args, $id );
	}
}

add_filter(
	'wp_nav_menu_args',
	function ( $args ) {
		global $hc_nav_menu_walker;

		$hc_nav_menu_walker = ! empty( $args['walker'] ) ? $args['walker'] : new Walker_Nav_Menu();
		$args['walker']     = new HC_Walker_Nav_Menu();

		return $args;
	}
);


/*------------------------------------*\
    ACCESSIBLE NAV WALKER
\*------------------------------------*/

/**
 * Accessible_Nav_Walker
 *
 * Extends Walker_Nav_Menu to add keyboard-accessible dropdown toggle buttons
 * with aria-expanded and a visible chevron SVG icon.
 */
class Accessible_Nav_Walker extends Walker_Nav_Menu {

	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		$indent      = $depth ? str_repeat( "\t", $depth ) : '';
		$classes     = empty( $item->classes ) ? array() : (array) $item->classes;
		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );

		$output .= $indent . '<li class="' . esc_attr( $class_names ) . '">';

		$attributes  = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) . '"' : '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target ) . '"'     : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="' . esc_attr( $item->xfn ) . '"'           : '';
		$attributes .= ! empty( $item->url )        ? ' href="' . esc_attr( $item->url ) . '"'           : '';

		$item_output  = $args->before;
		$item_output .= '<a' . $attributes . '>';
		$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
		$item_output .= '</a>';

		if ( in_array( 'menu-item-has-children', $classes, true ) ) {
			$item_output .= '<button class="dropdown-toggle" aria-expanded="false">';
			$item_output .= '<span class="screen-reader-text">Show submenu for ' . esc_html( $item->title ) . '</span>';
			$item_output .= '<svg xmlns="http://www.w3.org/2000/svg" width="9" height="5" viewBox="0 0 9 5" fill="none">
  <path d="M-5.60272e-07 4.5C-4.55935e-07 3.30653 0.474105 2.16193 1.31802 1.31802C2.16193 0.474106 3.30653 4.55935e-07 4.5 5.60272e-07C5.69347 6.64609e-07 6.83807 0.474107 7.68198 1.31802C8.52589 2.16193 9 3.30653 9 4.5L4.5 4.5L-5.60272e-07 4.5Z" fill="#F8D2BE"/>
</svg>';
			$item_output .= '</button>';
		}

		$item_output .= $args->after;

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}
}
