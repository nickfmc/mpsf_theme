/**
 * Impact Slider — Swiper v11 initialisation.
 *
 * Each `.c-impact-slider__swiper` on the page gets its own Swiper instance.
 * After each slide change the custom progress bar fill width is updated to
 * reflect position in the deck (0% → 100%).
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

		if ( ! swiperEl ) return;

		const swiper = new Swiper( swiperEl, {
			modules: [ Navigation ],

			slidesPerView: 1,
			spaceBetween:  24,

			// Show a peek of the next slide at larger viewports
			breakpoints: {
				768: {
					slidesPerView: 1.05,
					spaceBetween:  32,
				},
				1024: {
					slidesPerView: 1.1,
					spaceBetween:  40,
				},
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
	} );
}
