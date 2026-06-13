<?php
/**
 * Impact Slider — front-end render template.
 *
 * Variables available:
 *   $attributes  array   Block attributes
 *   $content     string  Rendered inner blocks (swiper-slide divs from impact-slide)
 *   $block       WP_Block
 */

$section_heading     = esc_html( $attributes['sectionHeading'] ?? 'Your Giving In Action' );
$section_description = isset( $attributes['sectionDescription'] ) ? esc_html( $attributes['sectionDescription'] ) : '';
$cta_label           = esc_html( $attributes['ctaLabel'] ?? 'Learn More' );
$cta_url             = esc_url( $attributes['ctaUrl'] ?? '#' );

// Legacy save() wrapped InnerBlocks in <section class="wp-block-mpsf-impact-slider c-impact-slider">.
// Strip that wrapper when present so .swiper-slide elements are direct children of .swiper-wrapper.
// Pages saved with the fixed save() (returns <InnerBlocks.Content /> only) are unaffected.
$slides_html = preg_replace(
	'/^\s*<section[^>]*class="[^"]*(?:wp-block-mpsf-impact-slider|c-impact-slider)[^"]*"[^>]*>([\s\S]*)<\/section>\s*$/',
	'$1',
	trim( $content )
);
$slides_html = ( $slides_html !== null && $slides_html !== trim( $content ) ) ? $slides_html : $content;

// Build class list — honour align + className from block supports.
$wrapper_attrs = get_block_wrapper_attributes( [ 'class' => 'c-impact-slider' ] );
?>
<section <?php echo $wrapper_attrs; ?>>

	<?php /* ── Header (constrained to inner width) ── */ ?>
	<div class="c-impact-slider__inner">
		<header class="c-impact-slider__header">
			<h2 class="c-impact-slider__heading h3-style"><?php echo $section_heading; ?></h2>
			<div>
				<?php if ( $section_description ) : ?>
					<p class="c-impact-slider__desc"><?php echo $section_description; ?></p>
				<?php endif; ?>
				<?php if ( $cta_label ) : ?>
					<a class="c-impact-slider__cta" href="<?php echo $cta_url; ?>">
						<?php echo $cta_label; ?>
						<svg class="c-impact-slider__cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
							<path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</a>
				<?php endif; ?>
			</div>
		</header>
	</div>

	<?php /* ── Swiper (full viewport width — overflows __inner on both sides) ── */ ?>
	<div class="swiper c-impact-slider__swiper">
		<div class="swiper-wrapper">
			<?php echo $slides_html; ?>
		</div>
	</div>

	<?php /* ── Nav (constrained to inner width) ── */ ?>
	<div class="c-impact-slider__inner">
		<div class="c-impact-slider__nav">

			<div class="c-impact-slider__nav-btns">
				<button class="c-impact-slider__btn c-impact-slider__prev" aria-label="<?php esc_attr_e( 'Previous slide', 'mpsf' ); ?>">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
						<path d="M17.5405 6.08594L9.74488 6.08594L1.94923 6.08594M5.54722 10.75L0.749903 6.08594L5.54722 1.42187" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<button class="c-impact-slider__btn c-impact-slider__next" aria-label="<?php esc_attr_e( 'Next slide', 'mpsf' ); ?>">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
						<path d="M0 5.41406H7.7957H15.5913M11.9933 0.75L16.7906 5.41406L11.9933 10.0781" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>

			<div class="c-impact-slider__progress" role="progressbar" aria-label="<?php esc_attr_e( 'Slider progress', 'mpsf' ); ?>">
				<div class="c-impact-slider__progress-fill"></div>
			</div>

		</div>
	</div>

</section>
