import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	RadioControl,
} from '@wordpress/components';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const { imageUrl, imageAlt, imageId, frontLabel, backTitle, flipOn } =
			attributes;

		const blockProps = useBlockProps( {
			className: 'c-flip-card c-flip-card--editor',
		} );

		return (
			<>
				<InspectorControls>
					<PanelBody title="Flip Behaviour" initialOpen={ true }>
						<RadioControl
							label="Reveal on"
							selected={ flipOn }
							options={ [
								{ label: 'Click', value: 'click' },
								{ label: 'Hover', value: 'hover' },
							] }
							onChange={ ( value ) =>
								setAttributes( { flipOn: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>

				{ /* Editor renders both faces stacked so both are editable */ }
				<div { ...blockProps }>
					{ /* Front face */ }
					<div className="c-flip-card__face c-flip-card__face--front">
						<p className="c-flip-card__face-label">
							<strong>Front</strong>
						</p>

						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										imageId: media.id,
										imageUrl: media.url,
										imageAlt: media.alt ?? '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ imageId }
								render={ ( { open } ) => (
									<div className="c-flip-card__image-wrap">
										{ imageUrl ? (
											<>
												<img
													src={ imageUrl }
													alt={ imageAlt }
													className="c-flip-card__image"
												/>
												<Button
													className="c-flip-card__replace-btn"
													onClick={ open }
													variant="secondary"
													size="small"
												>
													Replace image
												</Button>
											</>
										) : (
											<Button
												onClick={ open }
												variant="primary"
											>
												Select image
											</Button>
										) }
									</div>
								) }
							/>
						</MediaUploadCheck>

						<RichText
							tagName="span"
							className="c-flip-card__label"
							value={ frontLabel }
							onChange={ ( value ) =>
								setAttributes( { frontLabel: value } )
							}
							placeholder="Front label…"
							allowedFormats={ [] }
						/>
					</div>

					{ /* Back face */ }
					<div className="c-flip-card__face c-flip-card__face--back">
						<p className="c-flip-card__face-label">
							<strong>Back</strong>
						</p>

						<RichText
							tagName="h3"
							className="c-flip-card__back-title"
							value={ backTitle }
							onChange={ ( value ) =>
								setAttributes( { backTitle: value } )
							}
							placeholder="Back heading…"
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>

						<div className="c-flip-card__back-content">
							<InnerBlocks
								template={ [
									[
										'core/paragraph',
										{ placeholder: 'Back content…' },
									],
								] }
							/>
						</div>
					</div>
				</div>
			</>
		);
	},

	save() {
		// render.php owns all front-end markup; only inner blocks need saving.
		return <InnerBlocks.Content />;
	},
} );
