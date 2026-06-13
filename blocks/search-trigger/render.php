<?php
/**
 * Search Trigger block render template.
 *
 * Outputs the search popup trigger button and the hidden dialog panel.
 * Requires the initSearchPopup JS module to handle open/close behaviour.
 */
?>
<button id="search-button" aria-label="<?php esc_attr_e( 'Open search', 'launchpad' ); ?>" aria-expanded="false" aria-controls="search-popup">
	<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <circle cx="6" cy="6" r="5.25" stroke="#8C3641" stroke-width="1.5"/>
  <path d="M10 10L13 13" stroke="#8C3641" stroke-width="1.5" stroke-linecap="round"/>
</svg>
</button>

<div id="search-popup" role="dialog" aria-label="<?php esc_attr_e( 'Search', 'launchpad' ); ?>" aria-hidden="true" inert="true">
	<button type="button" id="close-search-popup" class="c-search-close-button" aria-label="<?php esc_attr_e( 'Close search popup', 'launchpad' ); ?>">
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path fill="currentColor" d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"/>
		</svg>
	</button>
	<form role="search" method="get" id="search-form" class="c-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
		<div>
			<label for="s" class="u-visually-hidden"><?php esc_html_e( 'Search for:', 'launchpad' ); ?></label>
			<input type="search" id="s" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" class="search-input" placeholder="<?php esc_attr_e( 'Search...', 'launchpad' ); ?>" />
			<button type="submit" id="search-submit" class="search-submit"><?php esc_html_e( 'Search', 'launchpad' ); ?></button>
		</div>
	</form>
</div>
