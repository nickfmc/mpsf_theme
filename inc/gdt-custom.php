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


/**
 * Render the classic PHP header (template-part/header/site-header.php) in place
 * of the FSE "header" template part (parts/header.html), while leaving every
 * other block-theme template/part untouched.
 *
 * parts/header.html still exists and is editable in the Site Editor, but its
 * output is swapped out here on render — this slot is no longer block-editable.
 */
function launchpad_override_header_template_part( string $block_content, array $block ): string {
	if ( ( $block['attrs']['slug'] ?? '' ) !== 'header' ) {
		return $block_content;
	}

	ob_start();
	get_template_part( 'template-part/header/site-header' );
	return ob_get_clean();
}
add_filter( 'render_block_core/template-part', 'launchpad_override_header_template_part', 10, 2 );

/**
 * ACF field group for Team Members.
 * Registers the "position" field programmatically — no DB entry needed.
 */
if ( function_exists( 'acf_add_local_field_group' ) ) {
	acf_add_local_field_group( array(
		'key'      => 'group_mpsf_team',
		'title'    => 'Team Member Details',
		'fields'   => array(
			array(
				'key'           => 'field_6a35fa7d3b3ea',
				'label'         => 'Position / Title',
				'name'          => 'position',
				'type'          => 'text',
				'instructions'  => 'e.g. Executive Director',
				'required'      => 0,
			),
		),
		'location' => array(
			array(
				array(
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'team',
				),
			),
		),
		'menu_order'            => 0,
		'position'              => 'normal',
		'style'                 => 'default',
		'label_placement'       => 'top',
		'instruction_placement' => 'label',
	) );
}

/**
 * Outputs the team member position field.
 * Used via [team_position] shortcode in the single-team FSE template.
 */
function mpsf_team_position_shortcode(): string {
	if ( ! function_exists( 'get_field' ) ) {
		return '';
	}
	$position = get_field( 'position' );
	if ( ! $position ) {
		return '';
	}
	return '<p class="c-team-member__position">' . esc_html( $position ) . '</p>';
}
add_shortcode( 'team_position', 'mpsf_team_position_shortcode' );

// Example: ACF icon picker path override
// add_filter( 'acf_icon_path_suffix', function( $path_suffix ) {
// 	return 'img/icons/';
// } );


/**
 * Force the featured image to render at full size on the team single template.
 * The post-featured-image block's `size` attribute can be unreliable in some
 * WordPress environments, so we override it server-side.
 */
add_filter( 'render_block_core/post-featured-image', function ( string $block_content, array $block ): string {
	if ( ! is_singular( 'team' ) || empty( $block_content ) ) {
		return $block_content;
	}

	$post_id = get_the_ID();
	if ( ! $post_id || ! has_post_thumbnail( $post_id ) ) {
		return $block_content;
	}

	return get_the_post_thumbnail( $post_id, 'full', array( 'style' => 'border-radius:5px' ) );
}, 10, 2 );

/**
 * Disable Gravity Forms' own opinionated CSS so our theme styles take over
 * cleanly without specificity battles.
 */
add_filter( 'gform_disable_print_form_css', '__return_true' );


// Add missing alt tags to images
function add_missing_alt_tags_to_content($content) {
    // Don't process empty content, admin pages, or REST API requests
    if (empty($content) || is_admin() || defined('REST_REQUEST')) {
        return $content;
    }

    // Only process content that actually has images
    if (strpos($content, '<img') === false) {
        return $content;
    }

    return preg_replace_callback(
        '/<img\s[^>]*src="([^"]*)"[^>]*\/?>/i',
        function ($matches) {
            $img_tag = $matches[0];

            // Capture existing alt value (even empty)
            if (preg_match('/alt\s*=\s*"([^"]*)"/i', $img_tag, $alt_match)) {
                // Alt attribute exists and is non-empty — leave it alone
                if ('' !== $alt_match[1]) {
                    return $img_tag;
                }
                // Alt="" — fall through to fill it
            }

            $image_id = null;

            // Try wp-image-{id} class first (fastest, most reliable)
            if (preg_match('/wp-image-(\d+)/', $img_tag, $id_match)) {
                $image_id = absint($id_match[1]);
            } elseif (preg_match('/data-image-id="(\d+)"/', $img_tag, $id_match)) {
                $image_id = absint($id_match[1]);
            } else {
                // Fallback: resolve from URL
                $src = esc_url_raw($matches[1]);
                $image_id = attachment_url_to_postid($src);
            }

            if ($image_id > 0 && 'attachment' === get_post_type($image_id)) {
                $alt_text = get_post_meta($image_id, '_wp_attachment_image_alt', true);
                if (!empty($alt_text)) {
                    // Replace empty alt or inject alt attribute
                    if (preg_match('/alt\s*=\s*""/i', $img_tag)) {
                        $img_tag = preg_replace('/alt\s*=\s*""/i', 'alt="' . esc_attr($alt_text) . '"', $img_tag);
                    } else {
                        $img_tag = str_replace('<img', '<img alt="' . esc_attr($alt_text) . '"', $img_tag);
                    }
                }
            }

            return $img_tag;
        },
        $content
    );
}

// Only apply to standard content
add_filter('the_content', 'add_missing_alt_tags_to_content', 20);


/*------------------------------------*\
    MOBILE MENU BUTTON SHORTCODE
\*------------------------------------*/

/**
 * Shortcode to output the mobile menu button and modal.
 *
 * Usage: [mobile_menu_button style="accordion"]
 * or:    [mobile_menu_button style="sliding"]
 *
 * @param array $atts Shortcode attributes.
 * @return string HTML output.
 */
function launchpad_mobile_menu_button_shortcode( $atts ) {
	$atts = shortcode_atts(
		array(
			'style' => 'accordion', // 'accordion' or 'sliding'
		),
		$atts,
		'mobile_menu_button'
	);

	$menu_style = in_array( $atts['style'], array( 'accordion', 'sliding' ), true ) ? $atts['style'] : 'accordion';

	// Store style globally so the footer hook can use it.
	$GLOBALS['_pp_mobile_menu_style'] = $menu_style;

	ob_start();
	?>
	<button id="open-modal-nav" class="c-modal-nav-button" aria-expanded="false" aria-haspopup="menu" aria-label="Open menu">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path d="M3 12H21M3 6H21M3 18H21" stroke="#414651" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>
	<?php
	return ob_get_clean();
}
add_shortcode( 'mobile_menu_button', 'launchpad_mobile_menu_button_shortcode' );

/**
 * Output the mobile nav panel in wp_footer so it renders at the end of <body>,
 * outside the header FSE wrapper. Avoids clipping / overlay scoping issues.
 */
function launchpad_mobile_nav_to_footer() {
	$menu_style = isset( $GLOBALS['_pp_mobile_menu_style'] )
		? $GLOBALS['_pp_mobile_menu_style']
		: 'accordion';

	get_template_part( 'template-part/navigation/nav-mobile', null, array( 'menu_style' => $menu_style ) );
}
add_action( 'wp_footer', 'launchpad_mobile_nav_to_footer', 20 );
