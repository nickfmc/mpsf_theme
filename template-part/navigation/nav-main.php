<nav id="site-navigation" class="c-main-navigation" role="navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">

  <?php
  launchpad_nav_menu( 'main-menu', 'c-main-menu', array(
    'walker' => new Accessible_Nav_Walker(),
  ) ); // Adjust using Menus in WordPress Admin
  ?>

  <!-- Search -->
  <button id="search-button" aria-label="Open search" aria-expanded="false" aria-controls="search-popup">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  <div id="search-popup" role="dialog" aria-hidden="true" inert="true">
    <button type="button" id="close-search-popup" class="c-search-close-button" aria-label="Close search popup" onclick="closeSearchPopup()">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"/></svg>
    </button>
    <form role="search" method="get" id="search-form" class="c-search-form" action="<?php echo home_url( '/' ); ?>">
      <div>
        <label for="s" class="u-visually-hidden">Search for:</label>
        <input type="search" id="s" name="s" value="" class="search-input" placeholder="Search..." />
        <button type="submit" id="search-submit" class="search-submit">Search</button>
      </div>
    </form>
  </div>
  <!-- /Search -->

  <!-- Language Selector -->
  <div class="c-lang-selector" role="navigation" aria-label="<?php esc_attr_e( 'Select language', 'mpsf-theme' ); ?>">
    <?php
    // Detect current language: WPML → Polylang → WP locale fallback
    if ( defined( 'ICL_LANGUAGE_CODE' ) ) {
      $current_lang = ICL_LANGUAGE_CODE;
    } elseif ( function_exists( 'pll_current_language' ) ) {
      $current_lang = pll_current_language();
    } else {
      $current_lang = substr( get_locale(), 0, 2 );
    }

    $lang_items = [
      'en' => [ 'label' => 'EN',  'aria' => 'English',  'hreflang' => 'en' ],
      'es' => [ 'label' => 'ESP', 'aria' => 'Español', 'hreflang' => 'es' ],
    ];

    foreach ( $lang_items as $code => $item ) :
      $is_active = ( $code === substr( $current_lang, 0, 2 ) );

      if ( function_exists( 'pll_home_url' ) ) {
        $lang_url = pll_home_url( $code );
      } elseif ( defined( 'ICL_LANGUAGE_CODE' ) ) {
        $lang_url = apply_filters( 'wpml_permalink', home_url( '/' ), $code );
      } else {
        $lang_url = home_url( '/' );
      }
    ?>
    <a href="<?php echo esc_url( $lang_url ); ?>"
       class="c-lang-selector__item<?php echo $is_active ? ' is-active' : ''; ?>"
       lang="<?php echo esc_attr( $code ); ?>"
       hreflang="<?php echo esc_attr( $item['hreflang'] ); ?>"
       aria-label="<?php echo esc_attr( $item['aria'] ); ?>"
       <?php echo $is_active ? 'aria-current="true"' : ''; ?>>
      <?php if ( $code === 'en' ) : ?>
        <span class="c-lang-selector__flag" aria-hidden="true">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
            <rect width="20" height="14" fill="#B22234"/>
            <rect y="1.08" width="20" height="1.08" fill="white"/>
            <rect y="3.23" width="20" height="1.08" fill="white"/>
            <rect y="5.38" width="20" height="1.08" fill="white"/>
            <rect y="7.54" width="20" height="1.08" fill="white"/>
            <rect y="9.69" width="20" height="1.08" fill="white"/>
            <rect y="11.85" width="20" height="1.08" fill="white"/>
            <rect width="8" height="7.54" fill="#3C3B6E"/>
          </svg>
        </span>
      <?php elseif ( $code === 'es' ) : ?>
        <span class="c-lang-selector__flag" aria-hidden="true">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
            <rect width="20" height="14" fill="white"/>
            <rect width="6.67" height="14" fill="#006847"/>
            <rect x="13.33" width="6.67" height="14" fill="#CE1126"/>
          </svg>
        </span>
      <?php endif; ?>
      <span><?php echo esc_html( $item['label'] ); ?></span>
    </a>
    <?php endforeach; ?>
  </div>
  <!-- /Language Selector -->

  <!-- Contact Us -->
  <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="c-header-contact-btn">
    <?php esc_html_e( 'Contact Us', 'mpsf-theme' ); ?>
  </a>
  <!-- /Contact Us -->

</nav>
