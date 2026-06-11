/**
 * Impact Slider — Swiper v11 initialisation.
 *
 * Each `.c-impact-slider__swiper` on the page gets its own Swiper instance.
 * Slides are sized to the inner container width (--wrapper-width-base) via CSS;
 * a dynamic `slidesOffsetBefore` aligns the first slide's left edge with the
 * inner container, so the next slide peeks from the right viewport edge.
 */

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

// Core Swiper CSS + Navigation module styles
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * Update the progress bar fill for a given slider wrapper.
 *
 * @param {HTMLElement} wrapper   The .c-impact-slider element
 * @param {Swiper}      swiper    The Swiper instance
 */
function updateProgress( wrapper, swiper ) {
	const fill = wrapper.querySelector( '.c-impact-slider__progress-fill' );
	if ( ! fill ) return;

	const total = swiper.slides.length;
	if ( total <= 1 ) {
		fill.style.width = '100%';
		return;
	}

	// activeIndex is 0-based; show progress as fraction of slides seen
	const pct = ( ( swiper.activeIndex + 1 ) / total ) * 100;
	fill.style.width = `${ pct }%`;
}

/**
 * Compute the offset (px) from the swiper element's left edge to the inner
 * container's left edge. Passed as `slidesOffsetBefore` so the first slide
 * starts aligned with the constrained content column.
 *
 * @param  {HTMLElement} swiperEl  .c-impact-slider__swiper
 * @param  {HTMLElement} inner     .c-impact-slider__inner (header one)
 * @returns {number}
 */
function getSlideOffset( swiperEl, inner ) {
	if ( ! inner ) return 0;
	const swiperLeft = swiperEl.getBoundingClientRect().left;
	const innerLeft  = inner.getBoundingClientRect().left;
	return Math.max( 0, Math.round( innerLeft - swiperLeft ) );
}

/**
 * Initialise all Impact Slider instances on the page.
 * Safe to call on DOMContentLoaded — no-ops if no sliders found.
 */
export function initImpactSliders() {
	const sliders = document.querySelectorAll( '.c-impact-slider' );
	if ( ! sliders.length ) return;

	sliders.forEach( ( wrapper ) => {
		const swiperEl = wrapper.querySelector( '.c-impact-slider__swiper' );
		const prevBtn  = wrapper.querySelector( '.c-impact-slider__prev' );
		const nextBtn  = wrapper.querySelector( '.c-impact-slider__next' );
		// The first __inner is the header row — use it as the alignment reference.
		const inner    = wrapper.querySelector( '.c-impact-slider__inner' );

		if ( ! swiperEl ) return;

		const swiper = new Swiper( swiperEl, {
			modules: [ Navigation ],

			// 'auto' → Swiper reads slide width from CSS (.swiper-slide has
			// width: var(--wrapper-width-base) set in _impact-slider.scss).
			slidesPerView:      'auto',
			spaceBetween:       24,
			slidesOffsetBefore: getSlideOffset( swiperEl, inner ),

			breakpoints: {
				768:  { spaceBetween: 32 },
				1024: { spaceBetween: 40 },
			},

			navigation: {
				prevEl: prevBtn,
				nextEl: nextBtn,
			},

			a11y: {
				prevSlideMessage: 'Previous slide',
				nextSlideMessage: 'Next slide',
			},

			on: {
				init( s ) {
					updateProgress( wrapper, s );
				},
				slideChange( s ) {
					updateProgress( wrapper, s );
				},
			},
		} );

		// Set initial progress
		updateProgress( wrapper, swiper );

		// Recalculate the left-edge offset whenever the section resizes
		// (viewport changes shift how much margin the inner container has).
		const ro = new ResizeObserver( () => {
			swiper.params.slidesOffsetBefore = getSlideOffset( swiperEl, inner );
			swiper.update();
		} );
		ro.observe( wrapper );
	} );
}
