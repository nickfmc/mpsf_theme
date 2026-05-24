<?php
/**
 * Impact Slide — front-end render template.
 *
 * Output is a .swiper-slide wrapper so the parent impact-slider's $content
 * is a series of swiper-slide elements ready for Swiper.js to consume.
 *
 * Variables available:
 *   $attributes  array   Block attributes
 *   $content     string  Inner block content (unused — no InnerBlocks in this block)
 *   $block       WP_Block
 */

$title     = isset( $attributes['title'] )    ? wp_kses_post( $attributes['title'] )    : '';
$body      = isset( $attributes['body'] )     ? wp_kses_post( $attributes['body'] )     : '';
$cta_label = esc_html( $attributes['ctaLabel'] ?? 'Read Report' );
$cta_url   = esc_url( $attributes['ctaUrl']   ?? '#' );
$image_url = esc_url( $attributes['imageUrl'] ?? '' );
$image_id  = intval( $attributes['imageId']   ?? 0 );
$image_alt = esc_attr( $attributes['imageAlt'] ?? '' );

// Prefer WP-managed srcset when an attachment ID is available.
$image_html = '';
if ( $image_id ) {
	$image_html = wp_get_attachment_image(
		$image_id,
		'large',
		false,
		[
			'class'   => 'c-impact-slide__img',
			'loading' => 'lazy',
		]
	);
} elseif ( $image_url ) {
	$image_html = sprintf(
		'<img class="c-impact-slide__img" src="%s" alt="%s" loading="lazy">',
		$image_url,
		$image_alt
	);
}
?>
<div class="swiper-slide">
	<article class="c-impact-slide">

		<div class="c-impact-slide__content">
			<?php if ( $title ) : ?>
				<h3 class="c-impact-slide__title"><?php echo $title; ?></h3>
			<?php endif; ?>

			<?php if ( $body ) : ?>
				<p class="c-impact-slide__body"><?php echo $body; ?></p>
			<?php endif; ?>

			<?php if ( $cta_label ) : ?>
				<a class="c-btn c-impact-slide__cta" href="<?php echo $cta_url; ?>">
					<?php echo $cta_label; ?>
				</a>
			<?php endif; ?>
		</div>

		<?php if ( $image_html ) : ?>
			<div class="c-impact-slide__media">
				<?php echo $image_html; ?>
			</div>
		<?php endif; ?>

	</article>
</div>
