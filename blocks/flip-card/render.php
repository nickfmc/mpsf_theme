<?php
/**
 * Flip Card — front-end render template.
 *
 * Variables available:
 *   $attributes  array    Block attributes
 *   $content     string   Rendered inner blocks (back body content)
 *   $block       WP_Block
 */

$image_url   = esc_url( $attributes['imageUrl'] ?? '' );
$image_alt   = esc_attr( $attributes['imageAlt'] ?? '' );
$front_label = esc_html( $attributes['frontLabel'] ?? '' );
$back_title  = esc_html( $attributes['backTitle'] ?? '' );
$flip_on     = in_array( $attributes['flipOn'] ?? 'click', [ 'click', 'hover' ], true )
	? $attributes['flipOn']
	: 'click';

$wrapper_attrs = get_block_wrapper_attributes( [
	'class'         => 'c-flip-card',
	'data-flip-on'  => $flip_on,
] );
?>

<div <?php echo $wrapper_attrs; ?>>
	<div class="c-flip-card__inner">

		<?php /* Front face */ ?>
		<div class="c-flip-card__front">
			<?php if ( $image_url ) : ?>
				<img
					src="<?php echo $image_url; ?>"
					alt="<?php echo $image_alt; ?>"
					class="c-flip-card__image"
					loading="lazy"
					decoding="async"
				/>
			<?php endif; ?>

			<?php if ( $front_label ) : ?>
				<span class="c-flip-card__label"><?php echo $front_label; ?></span>
			<?php endif; ?>

			<button
				class="c-flip-card__toggle"
				aria-expanded="false"
				aria-label="<?php esc_attr_e( 'Reveal back of card', 'mpsf' ); ?>"
				type="button"
			>+</button>
		</div>

		<?php /* Back face */ ?>
		<div class="c-flip-card__back">
			<button
				class="c-flip-card__toggle c-flip-card__toggle--back"
				aria-expanded="true"
				aria-label="<?php esc_attr_e( 'Close back of card', 'mpsf' ); ?>"
				type="button"
			>&minus;</button>

			<?php if ( $back_title ) : ?>
				<h3 class="c-flip-card__back-title"><?php echo $back_title; ?></h3>
			<?php endif; ?>

			<div class="c-flip-card__back-content">
				<?php echo wp_kses_post( $content ); ?>
			</div>
		</div>

	</div>
</div>
