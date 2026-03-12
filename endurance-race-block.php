<?php
/**
 * Plugin Name:       Endurance Race Block
 * Description:       Countdown cards for triathlon and endurance events. Live timer, finisher results with split times, race photos, dark/light themes, and clickable card links.
 * Version:           1.1.0
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Author:            Jef van de Graaf
 * Author URI:        https://jefvandegraaf.com
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       endurance-race-block
 *
 * @package EnduranceRaceBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ERB_VERSION', '1.1.0' );
define( 'ERB_PATH', plugin_dir_path( __FILE__ ) );
define( 'ERB_URL', plugin_dir_url( __FILE__ ) );

/**
 * Register block assets and type.
 */
function erb_register_block() {

	wp_register_script(
		'erb-editor',
		ERB_URL . 'editor.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components' ),
		ERB_VERSION,
		true
	);

	wp_register_script(
		'erb-view',
		ERB_URL . 'view.js',
		array(),
		ERB_VERSION,
		true
	);

	wp_register_style(
		'erb-style',
		ERB_URL . 'style.css',
		array(),
		ERB_VERSION
	);

	$attributes = array(
		'eventTitle'    => array( 'type' => 'string',  'default' => 'My Next Race' ),
		'eventLocation' => array( 'type' => 'string',  'default' => '' ),
		'eventDate'     => array( 'type' => 'string',  'default' => '' ),
		'eventType'     => array( 'type' => 'string',  'default' => 'Olympic' ),
		'eventUrl'      => array( 'type' => 'string',  'default' => '' ),
		'theme'         => array( 'type' => 'string',  'default' => 'dark' ),

		'showSwim'      => array( 'type' => 'boolean', 'default' => true ),
		'showBike'      => array( 'type' => 'boolean', 'default' => true ),
		'showRun'       => array( 'type' => 'boolean', 'default' => true ),
		'swimDistance'  => array( 'type' => 'number',  'default' => 1.9 ),
		'bikeDistance'  => array( 'type' => 'number',  'default' => 90 ),
		'runDistance'   => array( 'type' => 'number',  'default' => 21.1 ),

		'resultStatus'  => array( 'type' => 'string',  'default' => '' ),
		'totalTime'     => array( 'type' => 'string',  'default' => '' ),
		'overallRank'   => array( 'type' => 'string',  'default' => '' ),
		'ageGroupRank'  => array( 'type' => 'string',  'default' => '' ),
		'splits'        => array( 'type' => 'string',  'default' => '' ),

		'photoUrl'      => array( 'type' => 'string',  'default' => '' ),
		'photoId'       => array( 'type' => 'number',  'default' => 0 ),
	);

	register_block_type( 'erb/race-countdown', array(
		'api_version'     => 3,
		'editor_script'   => 'erb-editor',
		'view_script'     => 'erb-view',
		'style'           => 'erb-style',
		'render_callback' => 'erb_render_block',
		'attributes'      => $attributes,
	) );
}
add_action( 'init', 'erb_register_block' );


/**
 * Frontend render callback.
 */
function erb_render_block( $attributes, $content, $block ) {

	$title    = esc_html( $attributes['eventTitle'] );
	$location = esc_html( $attributes['eventLocation'] );
	$date     = esc_attr( $attributes['eventDate'] );
	$type     = esc_html( $attributes['eventType'] );
	$url      = esc_url( $attributes['eventUrl'] );
	$status   = $attributes['resultStatus'];
	$time     = esc_html( $attributes['totalTime'] );
	$rank     = esc_html( $attributes['overallRank'] );
	$age_rank = esc_html( $attributes['ageGroupRank'] );
	$splits   = $attributes['splits'];
	$photo    = esc_url( $attributes['photoUrl'] );
	$theme    = $attributes['theme'] === 'light' ? 'light' : 'dark';

	$has_result  = ! empty( $status );
	$is_finisher = $status === 'Finisher';

	$card_class = 'erb-race-card erb-race-card--' . $theme;
	if ( $is_finisher ) {
		$card_class .= ' erb-race-card--finisher';
	}

	$wrapper_attributes = get_block_wrapper_attributes();

	// Badge
	$badge = '';
	if ( $has_result ) {
		switch ( $status ) {
			case 'Finisher':
				$badge = '<span class="erb-race-card__badge erb-race-card__badge--finisher">✓ Finisher</span>';
				break;
			case 'DNF':
				$badge = '<span class="erb-race-card__badge erb-race-card__badge--dnf">DNF</span>';
				break;
			case 'DNS':
				$badge = '<span class="erb-race-card__badge erb-race-card__badge--dns">DNS</span>';
				break;
			default:
				$badge = '<span class="erb-race-card__badge erb-race-card__badge--dnf">' . esc_html( $status ) . '</span>';
		}
	} else {
		$badge = '<span class="erb-race-card__badge erb-race-card__badge--upcoming">Upcoming</span>';
	}

	// Legs
	$legs_html = '';
	$legs = array();
	if ( $attributes['showSwim'] ) {
		$legs[] = array( 'icon' => '🏊', 'label' => 'Swim', 'value' => $attributes['swimDistance'] . ' km' );
	}
	if ( $attributes['showBike'] ) {
		$legs[] = array( 'icon' => '🚴', 'label' => 'Bike', 'value' => $attributes['bikeDistance'] . ' km' );
	}
	if ( $attributes['showRun'] ) {
		$legs[] = array( 'icon' => '🏃', 'label' => 'Run', 'value' => $attributes['runDistance'] . ' km' );
	}

	if ( ! empty( $legs ) ) {
		$legs_html .= '<div class="erb-race-card__legs">';
		foreach ( $legs as $leg ) {
			$legs_html .= '<div class="erb-race-card__leg">';
			$legs_html .= '<span class="erb-race-card__leg-icon">' . $leg['icon'] . '</span>';
			$legs_html .= '<span class="erb-race-card__leg-label">' . $leg['label'] . '</span>';
			$legs_html .= '<span class="erb-race-card__leg-value">' . $leg['value'] . '</span>';
			$legs_html .= '</div>';
		}
		$legs_html .= '</div>';
	}

	// Date
	$date_html = '';
	if ( $date ) {
		$ts = strtotime( $date );
		if ( $ts ) {
			$date_html = '<div class="erb-race-card__date">' . date( 'j M Y', $ts ) . '</div>';
		}
	}

	// Results
	$result_html = '';
	if ( $has_result ) {
		if ( $time ) {
			$result_html .= '<div class="erb-race-card__result-time">' . $time . '</div>';
		}
		$rank_parts = array();
		if ( $rank )     $rank_parts[] = 'Overall: ' . $rank;
		if ( $age_rank ) $rank_parts[] = 'Age group: ' . $age_rank;
		if ( ! empty( $rank_parts ) ) {
			$result_html .= '<div class="erb-race-card__result-rank">' . implode( ' &middot; ', $rank_parts ) . '</div>';
		}

		if ( ! empty( $splits ) ) {
			$split_items = array_map( 'trim', explode( ',', $splits ) );
			$result_html .= '<div class="erb-race-card__splits">';
			foreach ( $split_items as $item ) {
				$pos = strpos( $item, ':' );
				if ( $pos !== false ) {
					$label = trim( substr( $item, 0, $pos ) );
					$stime = trim( substr( $item, $pos + 1 ) );
					$result_html .= '<div class="erb-race-card__split">';
					$result_html .= '<span class="erb-race-card__split-label">' . esc_html( $label ) . '</span>';
					$result_html .= '<span class="erb-race-card__split-time">' . esc_html( $stime ) . '</span>';
					$result_html .= '</div>';
				}
			}
			$result_html .= '</div>';
		}
	}

	// Timer placeholder
	$timer_html = '';
	if ( ! $has_result ) {
		$timer_html = '<div class="erb-race-card__timer"></div>';
	}

	// Photo
	$photo_html = '';
	if ( $photo ) {
		$photo_html = '<img class="erb-race-card__photo" src="' . $photo . '" alt="' . $title . ' race photo" loading="lazy" />';
	}

	// Link hint
	$link_hint = '';
	if ( $url ) {
		$link_hint = '<div class="erb-race-card__link-hint">View race details →</div>';
	}

	$loc_html  = $location ? '<div class="erb-race-card__location">📍 ' . $location . '</div>' : '';
	$type_html = $type ? '<div class="erb-race-card__type">' . $type . '</div>' : '';

	// Build card
	$html  = '<div ' . $wrapper_attributes . '>';
	$html .= '<div class="' . esc_attr( $card_class ) . '" data-event-date="' . $date . '">';
	$html .= '<div class="erb-race-card__body">';
	$html .= $badge;
	$html .= '<h3 class="erb-race-card__title">' . $title . '</h3>';
	$html .= $type_html;
	$html .= $loc_html;
	$html .= $date_html;
	$html .= $legs_html;
	$html .= $has_result ? $result_html : $timer_html;
	$html .= $link_hint;
	$html .= '</div>';
	$html .= $photo_html;
	$html .= '</div>';
	$html .= '</div>';

	if ( $url ) {
		$html = '<a class="erb-race-card-link" href="' . $url . '">' . $html . '</a>';
	}

	return $html;
}
