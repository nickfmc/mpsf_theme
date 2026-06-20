/**
 * Accordion Section — parent block.
 *
 * Manages a two-column layout: sticky image panel (left) + accordion list (right).
 * Each child mpsf/accordion-item supplies its own image; the parent swaps which
 * image is visible as items open. Front-end output is handled by render.php.
 */

import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, RadioControl } from '@wordpress/components';
import metadata from './block.json';

const ALLOWED_BLOCKS = [ 'mpsf/accordion-item' ];

const TEMPLATE = [
	[ 'mpsf/accordion-item', { title: 'Step One', body: '' } ],
	[ 'mpsf/accordion-item', { title: 'Step Two', body: '' } ],
	[ 'mpsf/accordion-item', { title: 'Step Three', body: '' } ],
];

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const { sectionHeading, imagePosition } = attributes;
		const isRight = imagePosition === 'right';

		const blockProps = useBlockProps( {
			className: `c-accordion-section c-accordion-section--editor${ isRight ? ' c-accordion-section--image-right' : '' }`,
		} );

		return (
			<>
				<InspectorControls>
					<PanelBody title="Section Settings" initialOpen={ true }>
						<TextControl
							label="Section Heading"
							value={ sectionHeading }
							onChange={ ( value ) =>
								setAttributes( { sectionHeading: value } )
							}
						/>
						<RadioControl
							label="Image Position"
							selected={ imagePosition }
							options={ [
								{ label: 'Left', value: 'left' },
								{ label: 'Right', value: 'right' },
							] }
							onChange={ ( value ) =>
								setAttributes( { imagePosition: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div className="c-accordion-section__editor-layout">
						{ ! isRight && (
							<div className="c-accordion-section__editor-image-panel">
								<p>Images set per item →</p>
							</div>
						) }

						<div className="c-accordion-section__editor-content">
							{ sectionHeading && (
								<h2 className="c-accordion-section__heading">
									{ sectionHeading }
								</h2>
							) }
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
							/>
						</div>

						{ isRight && (
							<div className="c-accordion-section__editor-image-panel">
								<p>← Images set per item</p>
							</div>
						) }
					</div>
				</div>
			</>
		);
	},

	save() {
		return <InnerBlocks.Content />;
	},
} );
