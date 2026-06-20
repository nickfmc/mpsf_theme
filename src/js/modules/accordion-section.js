/**
 * Accordion Section — one-open-at-a-time accordion with image panel swap.
 *
 * Desktop: the parent's sticky image panel shows the active item's image.
 * Mobile:  the image panel is hidden; the image lives inside the item body.
 */

export function initAccordionSections() {
	document.querySelectorAll( '.c-accordion-section' ).forEach( initSection );
}

function initSection( section ) {
	const items      = [ ...section.querySelectorAll( '.c-accordion-item' ) ];
	const imagePanel = section.querySelector( '.c-accordion-section__image-panel' );

	if ( ! items.length ) return;

	// Stamp each item with its DOM-order index (handles cases where render.php
	// couldn't determine the index server-side).
	items.forEach( ( item, i ) => {
		item.dataset.itemIndex = i;
	} );

	// Open the first item by default.
	openItem( items[ 0 ], imagePanel );

	items.forEach( ( item ) => {
		const trigger = item.querySelector( '.c-accordion-item__trigger' );
		if ( ! trigger ) return;

		trigger.addEventListener( 'click', () => {
			const isOpen = trigger.getAttribute( 'aria-expanded' ) === 'true';

			// Close all.
			items.forEach( ( other ) => closeItem( other ) );

			// Toggle: if it was closed, open it.
			if ( ! isOpen ) {
				openItem( item, imagePanel );
			}
		} );
	} );
}

function openItem( item, imagePanel ) {
	const trigger = item.querySelector( '.c-accordion-item__trigger' );
	const body    = item.querySelector( '.c-accordion-item__body' );
	const index   = parseInt( item.dataset.itemIndex ?? '0', 10 );

	if ( trigger ) trigger.setAttribute( 'aria-expanded', 'true' );
	if ( body )    body.removeAttribute( 'hidden' );
	item.classList.add( 'is-active' );

	swapImage( imagePanel, index );
}

function closeItem( item ) {
	const trigger = item.querySelector( '.c-accordion-item__trigger' );
	const body    = item.querySelector( '.c-accordion-item__body' );

	if ( trigger ) trigger.setAttribute( 'aria-expanded', 'false' );
	if ( body )    body.setAttribute( 'hidden', '' );
	item.classList.remove( 'is-active' );
}

function swapImage( imagePanel, activeIndex ) {
	if ( ! imagePanel ) return;

	imagePanel.querySelectorAll( '.c-accordion-section__image-wrap' ).forEach( ( wrap ) => {
		const idx = parseInt( wrap.dataset.itemIndex ?? '-1', 10 );
		wrap.classList.toggle( 'is-active', idx === activeIndex );
	} );
}
