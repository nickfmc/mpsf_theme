/**
 * Impact Slider — parent block.
 *
 * Holds any number of mpsf/impact-slide children inside a Swiper carousel.
 * Section-level controls (heading, description, CTA) live in InspectorControls.
 * All front-end output is handled by render.php; save() stores InnerBlocks HTML.
 */

import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import metadata from './block.json';

const ALLOWED_BLOCKS = [ 'mpsf/impact-slide' ];

const TEMPLATE = [
	[ 'mpsf/impact-slide', { title: 'Impact Report 2024', ctaLabel: 'Read Report' } ],
	[ 'mpsf/impact-slide', { title: 'Impact Report 2023', ctaLabel: 'Read Report' } ],
];

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const { sectionHeading, sectionDescription, ctaLabel, ctaUrl } = attributes;
		const blockProps = useBlockProps( { className: 'c-impact-slider' } );

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
				</InspectorControls>

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
			</>
		);
	},

	save() {
		// render.php owns the full front-end shell (section, swiper wrapper, nav).
		// We only need to persist the inner blocks so render.php receives them as $content.
		return <InnerBlocks.Content />;
	},
} );
