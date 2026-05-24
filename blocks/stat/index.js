/**
 * Stat Counter block.
 *
 * Displays a bold statistic: large number, a short decorative horizontal rule,
 * and a text label below. Used inside the Quote & Impact section.
 *
 * Static save — no render.php required.
 */

import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const { number, label } = attributes;
		const blockProps = useBlockProps( { className: 'c-stat' } );

		return (
			<div { ...blockProps }>
				<RichText
					tagName="div"
					className="c-stat__number"
					value={ number }
					onChange={ ( value ) => setAttributes( { number: value } ) }
					placeholder="00"
					allowedFormats={ [] }
				/>
				<div className="c-stat__line" aria-hidden="true" />
				<RichText
					tagName="p"
					className="c-stat__label"
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
					placeholder="Stat label…"
					allowedFormats={ [] }
				/>
			</div>
		);
	},

	save( { attributes } ) {
		const { number, label } = attributes;
		const blockProps = useBlockProps.save( { className: 'c-stat' } );

		return (
			<div { ...blockProps }>
				{ number && (
					<RichText.Content
						tagName="div"
						className="c-stat__number"
						value={ number }
					/>
				) }
				<div className="c-stat__line" aria-hidden="true" />
				{ label && (
					<RichText.Content
						tagName="p"
						className="c-stat__label"
						value={ label }
					/>
				) }
			</div>
		);
	},
} );
