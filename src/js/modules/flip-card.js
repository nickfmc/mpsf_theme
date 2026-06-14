/**
 * Flip Card — interaction + height equalization.
 */

function flip( card, force ) {
	const next = force !== undefined ? force : ! card.classList.contains( 'is-flipped' );
	card.classList.toggle( 'is-flipped', next );
	card.querySelectorAll( '.c-flip-card__toggle' ).forEach( ( btn ) => {
		btn.setAttribute( 'aria-expanded', String( next ) );
	} );
}

export function initFlipCards() {
	document.querySelectorAll( '.c-flip-card' ).forEach( ( card ) => {
		const flipOn = card.dataset.flipOn ?? 'click';

		if ( flipOn === 'hover' ) {
			card.addEventListener( 'mouseenter', () => flip( card, true ) );
			card.addEventListener( 'mouseleave', () => flip( card, false ) );
			card.addEventListener( 'focus', () => flip( card, true ), true );
			card.addEventListener( 'blur', () => flip( card, false ), true );
		}

		// Clicking anywhere on the front flips to the back
		const front = card.querySelector( '.c-flip-card__front' );
		if ( front ) {
			front.addEventListener( 'click', () => flip( card, true ) );
		}

		// Only the back close button flips back
		const backToggle = card.querySelector( '.c-flip-card__toggle--back' );
		if ( backToggle ) {
			backToggle.addEventListener( 'click', ( e ) => {
				e.stopPropagation();
				flip( card, false );
			} );
		}
	} );

	equalizeFlipCardRows();

	// Re-equalize whenever the viewport resizes
	const parents = getFlipCardParents();
	parents.forEach( ( parent ) => {
		const ro = new ResizeObserver( () => equalizeFlipCardRows() );
		ro.observe( parent );
	} );
}

/**
 * Returns every unique direct parent element that contains at least 2 flip cards.
 */
function getFlipCardParents() {
	const seen = new Set();
	document.querySelectorAll( '.c-flip-card' ).forEach( ( card ) => {
		const parent = card.closest(
			'.c-flip-card-wrapper, .wp-block-columns, .wp-block-group, .wp-block-column'
		) ?? card.parentElement;
		if ( parent ) seen.add( parent );
	} );
	return [ ...seen ];
}

/**
 * Measures the natural back-face height of each flip card sibling and
 * sets --flip-card-height on every card in the group to the tallest value.
 */
function equalizeFlipCardRows() {
	const parents = getFlipCardParents();

	parents.forEach( ( parent ) => {
		// .c-flip-card-wrapper: cards can be at any depth inside GB containers.
		// WP columns: cards may sit one extra .wp-block div deep.
		const isWrapper = parent.classList.contains( 'c-flip-card-wrapper' );
		const cards = isWrapper
			? [ ...parent.querySelectorAll( '.c-flip-card' ) ]
			: [
					...parent.querySelectorAll(
						':scope > .c-flip-card, :scope > .wp-block > .c-flip-card'
					),
			  ];

		if ( cards.length < 2 ) return;

		// Reset heights so we can measure natural size
		cards.forEach( ( c ) => c.style.removeProperty( '--flip-card-height' ) );

		// Measure tallest back face
		const maxBack = Math.max(
			...cards.map( ( c ) => {
				const back = c.querySelector( '.c-flip-card__back' );
				return back ? back.scrollHeight : 0;
			} )
		);

		const minH =
			parseInt(
				getComputedStyle( cards[ 0 ] ).getPropertyValue( '--flip-card-min-height' )
			) || 340;

		const height = Math.max( maxBack, minH );
		cards.forEach( ( c ) =>
			c.style.setProperty( '--flip-card-height', height + 'px' )
		);
	} );
}
