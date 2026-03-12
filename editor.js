( function() {
	'use strict';

	var el = wp.element.createElement;
	var registerBlockType = wp.blocks.registerBlockType;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var BlockControls = wp.blockEditor.BlockControls;
	var MediaUpload = wp.blockEditor.MediaUpload;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;
	var SelectControl = wp.components.SelectControl;
	var ToggleControl = wp.components.ToggleControl;
	var ToolbarGroup = wp.components.ToolbarGroup;
	var ToolbarButton = wp.components.ToolbarButton;
	var Button = wp.components.Button;
	var Fragment = wp.element.Fragment;

	function NumberInput( props ) {
		return el( TextControl, {
			label: props.label,
			type: 'number',
			value: String( props.value ),
			onChange: function( val ) { props.onChange( parseFloat( val ) || 0 ); },
			step: props.step || '0.1',
		} );
	}

	function formatDate( iso ) {
		if ( ! iso ) return '';
		var d = new Date( iso );
		if ( isNaN( d.getTime() ) ) return '';
		var months = [ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ];
		return d.getDate() + ' ' + months[ d.getMonth() ] + ' ' + d.getFullYear();
	}

	function parseSplits( str ) {
		if ( ! str ) return [];
		return str.split( ',' ).map( function( item ) {
			var pos = item.trim().indexOf( ':' );
			if ( pos === -1 ) return null;
			return {
				label: item.trim().substring( 0, pos ).trim(),
				time: item.trim().substring( pos + 1 ).trim()
			};
		} ).filter( Boolean );
	}

	function EnduranceRaceBlockEdit( props ) {
		var attrs = props.attributes;
		var setAttrs = props.setAttributes;

		var blockProps = useBlockProps( {
			className: 'erb-wrapper',
		} );

		var hasResult = !! attrs.resultStatus;
		var isFinisher = attrs.resultStatus === 'Finisher';
		var isDark = attrs.theme !== 'light';

		var legs = [];
		if ( attrs.showSwim ) legs.push( { icon: '🏊', label: 'Swim', value: attrs.swimDistance + ' km' } );
		if ( attrs.showBike ) legs.push( { icon: '🚴', label: 'Bike', value: attrs.bikeDistance + ' km' } );
		if ( attrs.showRun )  legs.push( { icon: '🏃', label: 'Run',  value: attrs.runDistance + ' km' } );

		var splits = parseSplits( attrs.splits );

		// Block Toolbar
		var toolbar = el( BlockControls, {},
			el( ToolbarGroup, {},
				el( ToolbarButton, {
					icon: 'admin-appearance',
					label: isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme',
					onClick: function() {
						setAttrs( { theme: isDark ? 'light' : 'dark' } );
					},
					text: isDark ? '🌙 Dark' : '☀️ Light',
				} )
			)
		);

		// Sidebar
		var inspector = el( InspectorControls, {},

			el( PanelBody, { title: '🎨 Theme', initialOpen: true },
				el( SelectControl, {
					label: 'Card Theme',
					value: attrs.theme || 'dark',
					options: [
						{ label: 'Dark (Black)',  value: 'dark' },
						{ label: 'Light (White)', value: 'light' },
					],
					onChange: function( v ) { setAttrs( { theme: v } ); },
				} )
			),

			el( PanelBody, { title: '🏁 Event Details', initialOpen: true },
				el( TextControl, {
					label: 'Event Title',
					value: attrs.eventTitle,
					onChange: function( v ) { setAttrs( { eventTitle: v } ); },
				} ),
				el( TextControl, {
					label: 'Location',
					placeholder: 'Chiang Mai, Thailand',
					value: attrs.eventLocation,
					onChange: function( v ) { setAttrs( { eventLocation: v } ); },
				} ),
				el( TextControl, {
					label: 'Event Date & Time',
					type: 'datetime-local',
					value: attrs.eventDate,
					onChange: function( v ) { setAttrs( { eventDate: v } ); },
				} ),
				el( SelectControl, {
					label: 'Event Type',
					value: attrs.eventType,
					options: [
						{ label: 'Sprint',       value: 'Sprint' },
						{ label: 'Olympic',      value: 'Olympic' },
						{ label: 'Half-Course',  value: 'Half-Course' },
						{ label: 'Full',         value: 'Full' },
						{ label: 'Ultra',        value: 'Ultra' },
						{ label: 'Trail',        value: 'Trail' },
						{ label: 'Custom',       value: 'Custom' },
					],
					onChange: function( v ) { setAttrs( { eventType: v } ); },
				} ),
				el( TextControl, {
					label: 'Card Link URL',
					placeholder: '/blog/race-recap-slug/',
					value: attrs.eventUrl,
					onChange: function( v ) { setAttrs( { eventUrl: v } ); },
					help: 'Makes entire card clickable on the frontend.',
				} )
			),

			el( PanelBody, { title: '🏊🚴🏃 Disciplines', initialOpen: false },
				el( ToggleControl, {
					label: 'Swim',
					checked: attrs.showSwim,
					onChange: function( v ) { setAttrs( { showSwim: v } ); },
				} ),
				attrs.showSwim && el( NumberInput, {
					label: 'Swim Distance (km)',
					value: attrs.swimDistance,
					step: '0.1',
					onChange: function( v ) { setAttrs( { swimDistance: v } ); },
				} ),
				el( ToggleControl, {
					label: 'Bike',
					checked: attrs.showBike,
					onChange: function( v ) { setAttrs( { showBike: v } ); },
				} ),
				attrs.showBike && el( NumberInput, {
					label: 'Bike Distance (km)',
					value: attrs.bikeDistance,
					step: '1',
					onChange: function( v ) { setAttrs( { bikeDistance: v } ); },
				} ),
				el( ToggleControl, {
					label: 'Run',
					checked: attrs.showRun,
					onChange: function( v ) { setAttrs( { showRun: v } ); },
				} ),
				attrs.showRun && el( NumberInput, {
					label: 'Run Distance (km)',
					value: attrs.runDistance,
					step: '0.1',
					onChange: function( v ) { setAttrs( { runDistance: v } ); },
				} )
			),

			el( PanelBody, { title: '🏆 Results (Post-Race)', initialOpen: false },
				el( SelectControl, {
					label: 'Status',
					value: attrs.resultStatus,
					options: [
						{ label: '— Not completed yet —', value: '' },
						{ label: 'Finisher',              value: 'Finisher' },
						{ label: 'DNF',                   value: 'DNF' },
						{ label: 'DNS',                   value: 'DNS' },
						{ label: 'DQ',                    value: 'DQ' },
					],
					onChange: function( v ) { setAttrs( { resultStatus: v } ); },
					help: 'Set after race day — card auto-switches from countdown to results.',
				} ),
				el( TextControl, {
					label: 'Total Time',
					placeholder: '3:39:02',
					value: attrs.totalTime,
					onChange: function( v ) { setAttrs( { totalTime: v } ); },
				} ),
				el( TextControl, {
					label: 'Overall Rank',
					placeholder: '62 of 93',
					value: attrs.overallRank,
					onChange: function( v ) { setAttrs( { overallRank: v } ); },
				} ),
				el( TextControl, {
					label: 'Age Group Rank',
					placeholder: '15 of 23',
					value: attrs.ageGroupRank,
					onChange: function( v ) { setAttrs( { ageGroupRank: v } ); },
				} ),
				el( TextControl, {
					label: 'Splits',
					placeholder: 'Swim:33:42, T1:12:29, Bike:1:28:56',
					value: attrs.splits,
					onChange: function( v ) { setAttrs( { splits: v } ); },
					help: 'Format: Label:Time, Label:Time (comma separated)',
				} )
			),

			el( PanelBody, { title: '📸 Race Photo', initialOpen: false },
				el( MediaUpload, {
					onSelect: function( media ) {
						setAttrs( { photoUrl: media.url, photoId: media.id } );
					},
					allowedTypes: [ 'image' ],
					value: attrs.photoId,
					render: function( obj ) {
						if ( attrs.photoUrl ) {
							return el( 'div', {},
								el( 'img', {
									src: attrs.photoUrl,
									style: { width: '100%', borderRadius: '6px', marginBottom: '8px' },
								} ),
								el( Button, {
									onClick: function() { setAttrs( { photoUrl: '', photoId: 0 } ); },
									variant: 'secondary',
									isDestructive: true,
								}, 'Remove Photo' )
							);
						}
						return el( Button, {
							onClick: obj.open,
							variant: 'secondary',
						}, 'Select Race Photo' );
					},
				} )
			)
		);

		// Card Preview
		var cardClass = 'erb-race-card erb-race-card--' + ( isDark ? 'dark' : 'light' );
		if ( isFinisher ) cardClass += ' erb-race-card--finisher';

		var badge;
		if ( hasResult ) {
			var badgeMap = {
				Finisher: { cls: 'erb-race-card__badge--finisher', text: '✓ Finisher' },
				DNF:      { cls: 'erb-race-card__badge--dnf',      text: 'DNF' },
				DNS:      { cls: 'erb-race-card__badge--dns',      text: 'DNS' },
				DQ:       { cls: 'erb-race-card__badge--dnf',      text: 'DQ' },
			};
			var b = badgeMap[ attrs.resultStatus ] || badgeMap.DNF;
			badge = el( 'span', { className: 'erb-race-card__badge ' + b.cls }, b.text );
		} else {
			badge = el( 'span', { className: 'erb-race-card__badge erb-race-card__badge--upcoming' }, 'Upcoming' );
		}

		var legsEl = legs.length ? el( 'div', { className: 'erb-race-card__legs' },
			legs.map( function( leg, i ) {
				return el( 'div', { className: 'erb-race-card__leg', key: i },
					el( 'span', { className: 'erb-race-card__leg-icon' }, leg.icon ),
					el( 'span', { className: 'erb-race-card__leg-label' }, leg.label ),
					el( 'span', { className: 'erb-race-card__leg-value' }, leg.value )
				);
			} )
		) : null;

		var bottomEl;
		if ( hasResult ) {
			var resultChildren = [];
			if ( attrs.totalTime ) {
				resultChildren.push(
					el( 'div', { className: 'erb-race-card__result-time', key: 'time' }, attrs.totalTime )
				);
			}
			var rankParts = [];
			if ( attrs.overallRank )  rankParts.push( 'Overall: ' + attrs.overallRank );
			if ( attrs.ageGroupRank ) rankParts.push( 'Age group: ' + attrs.ageGroupRank );
			if ( rankParts.length ) {
				resultChildren.push(
					el( 'div', { className: 'erb-race-card__result-rank', key: 'rank' }, rankParts.join( ' · ' ) )
				);
			}
			if ( splits.length ) {
				resultChildren.push(
					el( 'div', { className: 'erb-race-card__splits', key: 'splits' },
						splits.map( function( s, i ) {
							return el( 'div', { className: 'erb-race-card__split', key: i },
								el( 'span', { className: 'erb-race-card__split-label' }, s.label ),
								el( 'span', { className: 'erb-race-card__split-time' }, s.time )
							);
						} )
					)
				);
			}
			bottomEl = el( Fragment, {}, resultChildren );
		} else if ( attrs.eventDate ) {
			var now = Date.now();
			var target = new Date( attrs.eventDate ).getTime();
			var diff = target - now;

			if ( diff > 0 ) {
				var days = Math.floor( diff / 86400000 );
				var hrs  = Math.floor( ( diff / 3600000 ) % 24 );
				var mins = Math.floor( ( diff / 60000 ) % 60 );

				bottomEl = el( 'div', { className: 'erb-race-card__timer' },
					el( 'span', { className: 'erb-race-card__unit' },
						el( 'span', { className: 'erb-race-card__number' }, days ),
						el( 'span', { className: 'erb-race-card__unit-label' }, 'Days' )
					),
					el( 'span', { className: 'erb-race-card__unit' },
						el( 'span', { className: 'erb-race-card__number' }, String( hrs ).padStart( 2, '0' ) ),
						el( 'span', { className: 'erb-race-card__unit-label' }, 'Hours' )
					),
					el( 'span', { className: 'erb-race-card__unit' },
						el( 'span', { className: 'erb-race-card__number' }, String( mins ).padStart( 2, '0' ) ),
						el( 'span', { className: 'erb-race-card__unit-label' }, 'Min' )
					),
					el( 'span', { className: 'erb-race-card__unit' },
						el( 'span', { className: 'erb-race-card__number' }, '--' ),
						el( 'span', { className: 'erb-race-card__unit-label' }, 'Sec' )
					)
				);
			} else {
				bottomEl = el( 'div', { className: 'erb-race-card__awaiting' }, 'Awaiting results...' );
			}
		} else {
			bottomEl = el( 'div', { className: 'erb-race-card__awaiting' }, 'Set a date to start countdown' );
		}

		var linkHint = attrs.eventUrl
			? el( 'div', { className: 'erb-race-card__link-hint' }, '🔗 Linked → ' + attrs.eventUrl )
			: null;

		var photoEl = attrs.photoUrl
			? el( 'img', {
				className: 'erb-race-card__photo',
				src: attrs.photoUrl,
				alt: attrs.eventTitle + ' race photo',
			} )
			: null;

		return el( Fragment, {},
			toolbar,
			inspector,
			el( 'div', blockProps,
				el( 'div', { className: cardClass },
					el( 'div', { className: 'erb-race-card__body' },
						badge,
						el( 'h3', { className: 'erb-race-card__title' }, attrs.eventTitle ),
						attrs.eventType
							? el( 'div', { className: 'erb-race-card__type' }, attrs.eventType )
							: null,
						attrs.eventLocation
							? el( 'div', { className: 'erb-race-card__location' }, '📍 ' + attrs.eventLocation )
							: null,
						attrs.eventDate
							? el( 'div', { className: 'erb-race-card__date' }, formatDate( attrs.eventDate ) )
							: null,
						legsEl,
						bottomEl,
						linkHint
					),
					photoEl
				)
			)
		);
	}

	registerBlockType( 'erb/race-countdown', {
		title: 'Endurance Race Block',
		icon: 'clock',
		category: 'widgets',
		description: 'Countdown card for triathlon and endurance events with live timer, results, splits, and race photo.',
		keywords: [ 'race', 'countdown', 'triathlon', 'running', 'endurance', 'timer', 'ironman' ],
		edit: EnduranceRaceBlockEdit,
		save: function() { return null; },
	} );

} )();
