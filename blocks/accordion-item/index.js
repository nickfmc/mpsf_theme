/**
 * Accordion Item — child block of mpsf/accordion-section.
 *
 * Editable title, body text, and an image (shown in the parent's sticky panel
 * on desktop, inline inside the item body on mobile).
 * Front-end output is handled by render.php; save() returns null.
 */

import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const { title, body, imageId, imageUrl, imageAlt } = attributes;

		const blockProps = useBlockProps( {
			className: 'c-accordion-item c-accordion-item--editor',
		} );

		return (
			<>
				<InspectorControls>
					<PanelBody title="Item Image" initialOpen={ true }>
						<p style={ { fontSize: '12px', color: '#757575', marginBottom: '8px' } }>
							Shown in the image panel (desktop) or inside this item (mobile).
						</p>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										imageId:  media.id,
										imageUrl: media.url,
										imageAlt: media.alt || '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ imageId }
								render={ ( { open } ) => (
									<>
										{ imageUrl ? (
											<>
												<img
													src={ imageUrl }
													alt={ imageAlt }
													style={ { maxWidth: '100%', marginBottom: '8px', borderRadius: '4px' } }
												/>
												<Button
													variant="secondary"
													size="small"
													onClick={ open }
													style={ { marginRight: '8px' } }
												>
													Replace image
												</Button>
												<Button
													variant="link"
													isDestructive
													size="small"
													onClick={ () =>
														setAttributes( { imageId: 0, imageUrl: '', imageAlt: '' } )
													}
												>
													Remove
												</Button>
											</>
										) : (
											<Button variant="secondary" onClick={ open }>
												Select image
											</Button>
										) }
									</>
								) }
							/>
						</MediaUploadCheck>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div className="c-accordion-item__trigger-preview">
						<RichText
							tagName="span"
							className="c-accordion-item__title"
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							placeholder="Accordion title…"
							allowedFormats={ [] }
						/>
						<span className="c-accordion-item__icon" aria-hidden="true">+</span>
					</div>
					<RichText
						tagName="p"
						className="c-accordion-item__body-preview"
						value={ body }
						onChange={ ( value ) => setAttributes( { body: value } ) }
						placeholder="Item body text…"
						allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
					/>
				</div>
			</>
		);
	},

	save() {
		// render.php handles all front-end output.
		return null;
	},
} );
