<?php
/**
 * Accordion Item — front-end render template.
 *
 * Variables available:
 *   $attributes  array     Block attributes
 *   $content     string    (unused — no inner blocks)
 *   $block       WP_Block
 */

$title     = wp_kses_post( $attributes['title'] ?? '' );
$body      = wp_kses_post( $attributes['body'] ?? '' );
$image_id  = absint( $attributes['imageId'] ?? 0 );
$image_url = esc_url( $attributes['imageUrl'] ?? '' );
$image_alt = esc_attr( $attributes['imageAlt'] ?? '' );

// Determine this item's index within its parent's inner_blocks.
$item_index = 0;
if ( isset( $block->context['mpsf/accordionItemIndex'] ) ) {
	$item_index = (int) $block->context['mpsf/accordionItemIndex'];
} else {
	// Walk the parent's inner_blocks to find our position.
	$parent = $block->parsed_block['parentBlockClientId'] ?? null;
	// Fallback: rely on JS to assign index via DOM order.
}
?>

<div class="c-accordion-item"
	data-item-index="<?php echo esc_attr( $item_index ); ?>"
	data-image-url="<?php echo $image_url; ?>"
	data-image-alt="<?php echo $image_alt; ?>"
	data-image-id="<?php echo esc_attr( $image_id ); ?>">

	<button
		class="c-accordion-item__trigger"
		aria-expanded="false"
		type="button">
		<span class="c-accordion-item__title"><?php echo $title; ?></span>
		<span class="c-accordion-item__icon" aria-hidden="true">
			<svg class="c-accordion-item__icon-plus" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
				<path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
			<svg class="c-accordion-item__icon-minus" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
				<path d="M4 10H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
		</span>
	</button>

	<div class="c-accordion-item__body" hidden>
		<div class="c-accordion-item__body-inner">
			<?php /* Mobile-only image — hidden on desktop via CSS */ ?>
			<?php if ( $image_id || $image_url ) : ?>
				<div class="c-accordion-item__mobile-image">
					<?php if ( $image_id ) : ?>
						<?php echo wp_get_attachment_image( $image_id, 'large', false, [
							'class'   => 'c-accordion-item__mobile-img',
							'loading' => 'lazy',
						] ); ?>
					<?php else : ?>
						<img
							src="<?php echo $image_url; ?>"
							alt="<?php echo $image_alt; ?>"
							class="c-accordion-item__mobile-img"
							loading="lazy"
							decoding="async"
						/>
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<?php if ( $body ) : ?>
				<div class="c-accordion-item__text">
					<p><?php echo $body; ?></p>
				</div>
			<?php endif; ?>
		</div>
	</div>

</div>
