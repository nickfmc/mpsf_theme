/**
 * Impact Slide — child block of mpsf/impact-slider.
 *
 * Two-column card: text content (title + body + CTA button) on the left,
 * featured image on the right. CTA link attrs live in InspectorControls.
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
import { PanelBody, TextControl, Button } from '@wordpress/components';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const { title, body, ctaLabel, ctaUrl, imageId, imageUrl, imageAlt } = attributes;
		const blockProps = useBlockProps( { className: 'c-impact-slide' } );

		return (
			<>
				<InspectorControls>
					<PanelBody title="Call to Action" initialOpen={ true }>
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
					<PanelBody title="Image" initialOpen={ false }>
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
													style={ { maxWidth: '100%', marginBottom: '8px' } }
												/>
												<Button
													variant="secondary"
													isSmall
													onClick={ open }
													style={ { marginRight: '8px' } }
												>
													Replace image
												</Button>
												<Button
													variant="link"
													isDestructive
													isSmall
													onClick={ () =>
														setAttributes( { imageId: 0, imageUrl: '', imageAlt: '' } )
													}
												>
													Remove
												</Button>
											</>
										) : (
											<Button variant="secondary" onClick={ open }>
												Select slide image
											</Button>
										) }
									</>
								) }
							/>
						</MediaUploadCheck>
					</PanelBody>
				</InspectorControls>

				<article { ...blockProps }>
					<div className="c-impact-slide__content">
						<RichText
							tagName="h3"
							className="c-impact-slide__title"
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							placeholder="Slide title…"
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>
						<RichText
							tagName="p"
							className="c-impact-slide__body"
							value={ body }
							onChange={ ( value ) => setAttributes( { body: value } ) }
							placeholder="Short description of this report or initiative…"
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
						/>
						{ ctaLabel && (
							<span className="c-impact-slide__cta-preview">
								{ ctaLabel } →
							</span>
						) }
					</div>

					<div className="c-impact-slide__media">
						{ imageUrl ? (
							<img
								className="c-impact-slide__img"
								src={ imageUrl }
								alt={ imageAlt }
							/>
						) : (
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
										<button
											className="c-impact-slide__media-placeholder"
											onClick={ open }
											type="button"
										>
											<span>+ Add image</span>
										</button>
									) }
								/>
							</MediaUploadCheck>
						) }
					</div>
				</article>
			</>
		);
	},

	save() {
		// render.php handles all front-end output.
		return null;
	},
} );
