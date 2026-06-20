<?php
/**
 * Accordion Section — front-end render template.
 *
 * Variables available:
 *   $attributes  array     Block attributes
 *   $content     string    Rendered inner blocks (accordion items)
 *   $block       WP_Block
 */

$section_heading  = esc_html( $attributes['sectionHeading'] ?? 'Process' );
$image_position   = in_array( $attributes['imagePosition'] ?? 'left', [ 'left', 'right' ], true )
	? $attributes['imagePosition']
	: 'left';

// Collect image data from each child accordion-item block so we can build
// the desktop image panel here in the parent.
$images = [];
foreach ( $block->inner_blocks as $index => $child ) {
	if ( 'mpsf/accordion-item' !== $child->name ) {
		continue;
	}
	$attrs      = $child->attributes;
	$image_id   = absint( $attrs['imageId'] ?? 0 );
	$image_url  = esc_url( $attrs['imageUrl'] ?? '' );
	$image_alt  = esc_attr( $attrs['imageAlt'] ?? '' );

	$images[] = [
		'index'     => $index,
		'image_id'  => $image_id,
		'image_url' => $image_url,
		'image_alt' => $image_alt,
	];
}

$extra_class   = 'right' === $image_position ? ' c-accordion-section--image-right' : '';
$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => 'c-accordion-section' . $extra_class,
] );
?>

<div <?php echo $wrapper_attrs; ?>>

	<?php /* ── Left: sticky image panel ── */ ?>
	<div class="c-accordion-section__image-panel" aria-hidden="true">
		<?php foreach ( $images as $i => $img ) : ?>
			<div class="c-accordion-section__image-wrap<?php echo 0 === $i ? ' is-active' : ''; ?>"
				data-item-index="<?php echo esc_attr( $i ); ?>">
				<?php if ( $img['image_id'] ) : ?>
					<?php echo wp_get_attachment_image( $img['image_id'], 'large', false, [
						'class'   => 'c-accordion-section__image',
						'loading' => 'lazy',
					] ); ?>
				<?php elseif ( $img['image_url'] ) : ?>
					<img
						src="<?php echo $img['image_url']; ?>"
						alt="<?php echo $img['image_alt']; ?>"
						class="c-accordion-section__image"
						loading="lazy"
						decoding="async"
					/>
				<?php else : ?>
					<div class="c-accordion-section__image-placeholder"></div>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	</div>

	<?php /* ── Right: heading + accordion items ── */ ?>
	<div class="c-accordion-section__content">
		<?php if ( $section_heading ) : ?>
			<h2 class="c-accordion-section__heading"><?php echo $section_heading; ?></h2>
		<?php endif; ?>

		<div class="c-accordion-section__items">
			<?php echo $content; ?>
		</div>
	</div>

</div>
