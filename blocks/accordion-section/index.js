/**
 * Accordion Section — parent block.
 *
 * Manages a two-column layout: sticky image panel (left) + accordion list (right).
 * Each child mpsf/accordion-item supplies its own image; the parent swaps which
 * image is visible as items open. The editor preview shows the image belonging
 * to whichever item is currently selected/being edited (falling back to the
 * first item), so authors can see the image-swap behaviour without leaving
 * the canvas. Front-end output is handled by render.php.
 */

import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, RadioControl, Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import metadata from './block.json';

const ALLOWED_BLOCKS = [ 'mpsf/accordion-item' ];

const TEMPLATE = [
	[ 'mpsf/accordion-item', { title: 'Step One', body: '' } ],
	[ 'mpsf/accordion-item', { title: 'Step Two', body: '' } ],
	[ 'mpsf/accordion-item', { title: 'Step Three', body: '' } ],
];

function ImagePanel( { clientId } ) {
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const activeItem = useSelect(
		( select ) => {
			const { getBlocks, getSelectedBlockClientId, getBlockParents } = select( 'core/block-editor' );
			const innerBlocks = getBlocks( clientId );
			if ( ! innerBlocks.length ) {
				return null;
			}

			const selectedClientId = getSelectedBlockClientId();
			if ( selectedClientId ) {
				const selectedAncestry = [ selectedClientId, ...getBlockParents( selectedClientId, true ) ];
				const match = innerBlocks.find( ( block ) => selectedAncestry.includes( block.clientId ) );
				if ( match ) {
					return match;
				}
			}

			return innerBlocks[ 0 ];
		},
		[ clientId ]
	);

	if ( ! activeItem ) {
		return <div className="c-accordion-section__editor-image-panel" />;
	}

	const { imageId, imageUrl, imageAlt } = activeItem.attributes;

	const onSelect = ( media ) => {
		updateBlockAttributes( activeItem.clientId, {
			imageId: media.id,
			imageUrl: media.url,
			imageAlt: media.alt || '',
		} );
	};

	return (
		<div className="c-accordion-section__editor-image-panel">
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ onSelect }
					allowedTypes={ [ 'image' ] }
					value={ imageId }
					render={ ( { open } ) =>
						imageUrl ? (
							<>
								<img src={ imageUrl } alt={ imageAlt } onClick={ open } />
								<span className="c-accordion-section__editor-image-caption">
									{ activeItem.attributes.title || 'Untitled item' }
								</span>
							</>
						) : (
							<Button
								className="c-accordion-section__editor-image-empty"
								onClick={ open }
							>
								+ Add image for “{ activeItem.attributes.title || 'this item' }”
							</Button>
						)
					}
				/>
			</MediaUploadCheck>
		</div>
	);
}

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes, clientId } ) {
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
						{ ! isRight && <ImagePanel clientId={ clientId } /> }

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

						{ isRight && <ImagePanel clientId={ clientId } /> }
					</div>
				</div>
			</>
		);
	},

	save() {
		return <InnerBlocks.Content />;
	},
} );
