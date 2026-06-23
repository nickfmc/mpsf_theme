/**
 * Impact Slider — parent block.
 *
 * Two content modes:
 *  - "manual": holds any number of mpsf/impact-slide children inside a Swiper carousel.
 *  - "posts": pulls slides from WordPress posts (selected, or latest 4 when none selected).
 * Section-level controls (heading, description, CTA) live in InspectorControls.
 * All front-end output is handled by render.php; save() stores InnerBlocks HTML (manual mode only).
 */

import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	FormTokenField,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';

const ALLOWED_BLOCKS = [ 'mpsf/impact-slide' ];

const TEMPLATE = [
	[ 'mpsf/impact-slide', { title: 'Impact Report 2024', ctaLabel: 'Read Report' } ],
	[ 'mpsf/impact-slide', { title: 'Impact Report 2023', ctaLabel: 'Read Report' } ],
];

const tokenForPost = ( id, title ) => `${ title } (#${ id })`;
const idFromToken = ( token ) => {
	const match = String( token ).match( /\(#(\d+)\)\s*$/ );
	return match ? parseInt( match[ 1 ], 10 ) : null;
};

function PostSelector( { selectedPosts, setAttributes } ) {
	const [ titleMap, setTitleMap ] = useState( {} );
	const [ suggestions, setSuggestions ] = useState( [] );

	// Fetch titles for already-selected posts (e.g. on load).
	useEffect( () => {
		const missing = selectedPosts.filter( ( id ) => ! ( id in titleMap ) );
		if ( ! missing.length ) {
			return;
		}
		apiFetch( {
			path: `/wp/v2/posts?include=${ missing.join( ',' ) }&per_page=100&_fields=id,title`,
		} ).then( ( results ) => {
			const next = { ...titleMap };
			results.forEach( ( post ) => {
				next[ post.id ] = post.title.rendered;
			} );
			setTitleMap( next );
		} ).catch( () => {} );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ selectedPosts ] );

	const onInputChange = ( input ) => {
		if ( ! input ) {
			setSuggestions( [] );
			return;
		}
		apiFetch( {
			path: `/wp/v2/posts?search=${ encodeURIComponent( input ) }&per_page=20&_fields=id,title`,
		} ).then( ( results ) => {
			setTitleMap( ( prev ) => {
				const next = { ...prev };
				results.forEach( ( post ) => {
					next[ post.id ] = post.title.rendered;
				} );
				return next;
			} );
			setSuggestions( results.map( ( post ) => tokenForPost( post.id, post.title.rendered ) ) );
		} ).catch( () => {} );
	};

	const value = selectedPosts.map( ( id ) =>
		titleMap[ id ] ? tokenForPost( id, titleMap[ id ] ) : `Post #${ id }`
	);

	const onChange = ( tokens ) => {
		const ids = [];
		tokens.forEach( ( token ) => {
			const id = idFromToken( token );
			if ( id !== null ) {
				ids.push( id );
			}
		} );
		setAttributes( { selectedPosts: ids } );
	};

	return (
		<FormTokenField
			label="Posts"
			value={ value }
			suggestions={ suggestions }
			onChange={ onChange }
			onInputChange={ onInputChange }
			__experimentalExpandOnFocus
			help="Search and select posts. Leave empty to show the latest 4 posts — when posts are selected, all of them are shown with no limit."
		/>
	);
}

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const {
			sectionHeading,
			sectionDescription,
			ctaLabel,
			ctaUrl,
			contentMode,
			selectedPosts,
		} = attributes;
		const isPostsMode = contentMode === 'posts';
		// Posts mode renders ServerSideRender, whose output already includes
		// render.php's own ".c-impact-slider" section — don't double-wrap it.
		const blockProps = useBlockProps(
			isPostsMode ? {} : { className: 'c-impact-slider c-impact-slider--editor' }
		);

		return (
			<>
				<InspectorControls>
					<PanelBody title="Section Settings" initialOpen={ true }>
						<TextControl
							label="Section Heading"
							value={ sectionHeading }
							onChange={ ( value ) => setAttributes( { sectionHeading: value } ) }
						/>
						<TextareaControl
							label="Section Description"
							value={ sectionDescription }
							onChange={ ( value ) => setAttributes( { sectionDescription: value } ) }
							help="Optional — brief paragraph below the heading."
						/>
					</PanelBody>
					<PanelBody title="Call to Action" initialOpen={ false }>
						<TextControl
							label="Button Label"
							value={ ctaLabel }
							onChange={ ( value ) => setAttributes( { ctaLabel: value } ) }
						/>
						<TextControl
							label="Button URL"
							value={ ctaUrl }
							onChange={ ( value ) => setAttributes( { ctaUrl: value } ) }
							type="url"
						/>
					</PanelBody>
					<PanelBody title="Content Source" initialOpen={ true }>
						<SelectControl
							label="Slides"
							value={ contentMode }
							options={ [
								{ label: 'Manual Content', value: 'manual' },
								{ label: 'Show Posts', value: 'posts' },
							] }
							onChange={ ( value ) => setAttributes( { contentMode: value } ) }
						/>
						{ isPostsMode && (
							<PostSelector
								selectedPosts={ selectedPosts }
								setAttributes={ setAttributes }
							/>
						) }
					</PanelBody>
				</InspectorControls>

				{ isPostsMode ? (
					// ServerSideRender outputs real <a> links (CTA + per-post "Read
					// Report"). Inside the editor canvas iframe a real click would
					// navigate the iframe to that URL, so clicks are disabled here —
					// see ".c-impact-slider--ssr-preview a" in editor-styles.scss.
					<div { ...blockProps } className={ `${ blockProps.className || '' } c-impact-slider--ssr-preview`.trim() }>
						<ServerSideRender
							block={ metadata.name }
							attributes={ attributes }
						/>
					</div>
				) : (
					<section { ...blockProps }>
						<div className="c-impact-slider__inner">
							<header className="c-impact-slider__header">
								<h2 className="c-impact-slider__heading">{ sectionHeading }</h2>
								{ sectionDescription && (
									<p className="c-impact-slider__desc">{ sectionDescription }</p>
								) }
								{ ctaLabel && (
									<a className="c-impact-slider__cta" href={ ctaUrl }>
										{ ctaLabel }
									</a>
								) }
							</header>

							{ /* Editor preview — slides stack vertically; Swiper wrapping is front-end only */ }
							<div className="c-impact-slider__slides-editor">
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ TEMPLATE }
									orientation="horizontal"
								/>
							</div>
						</div>
					</section>
				) }
			</>
		);
	},

	save() {
		// render.php owns the full front-end shell (section, swiper wrapper, nav).
		// We only need to persist the inner blocks so render.php receives them as $content.
		// In "posts" mode, render.php ignores $content and queries posts instead.
		return <InnerBlocks.Content />;
	},
} );
