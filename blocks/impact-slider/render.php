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

// Build class list — honour align + className from block supports.
$wrapper_attrs = get_block_wrapper_attributes( [ 'class' => 'c-impact-slider' ] );
?>
<section <?php echo $wrapper_attrs; ?>>
	<div class="c-impact-slider__inner">

		<header class="c-impact-slider__header">
			<h2 class="c-impact-slider__heading"><?php echo $section_heading; ?></h2>
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
		</header>

		<div class="swiper c-impact-slider__swiper">
			<div class="swiper-wrapper">
				<?php echo $content; ?>
			</div>
		</div>

		<div class="c-impact-slider__nav">
			<button class="c-impact-slider__btn c-impact-slider__prev" aria-label="<?php esc_attr_e( 'Previous slide', 'mpsf' ); ?>">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
					<path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>

			<div class="c-impact-slider__progress" role="progressbar" aria-label="<?php esc_attr_e( 'Slider progress', 'mpsf' ); ?>">
				<div class="c-impact-slider__progress-fill"></div>
			</div>

			<button class="c-impact-slider__btn c-impact-slider__next" aria-label="<?php esc_attr_e( 'Next slide', 'mpsf' ); ?>">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		</div>

	</div>
</section>
