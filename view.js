( function() {
	'use strict';

	function pad( n ) {
		return String( n ).padStart( 2, '0' );
	}

	function initCountdown( card ) {
		var targetDate = card.getAttribute( 'data-event-date' );
		if ( ! targetDate ) return;

		var timerEl = card.querySelector( '.erb-race-card__timer' );
		if ( ! timerEl ) return;

		function render() {
			var now  = new Date().getTime();
			var diff = new Date( targetDate ).getTime() - now;

			if ( diff <= 0 ) {
				timerEl.innerHTML = '<span class="erb-race-card__awaiting">Awaiting results...</span>';
				return false;
			}

			var days = Math.floor( diff / 86400000 );
			var hrs  = Math.floor( ( diff / 3600000 ) % 24 );
			var mins = Math.floor( ( diff / 60000 ) % 60 );
			var secs = Math.floor( ( diff / 1000 ) % 60 );

			timerEl.innerHTML =
				'<span class="erb-race-card__unit">' +
					'<span class="erb-race-card__number">' + days + '</span>' +
					'<span class="erb-race-card__unit-label">Days</span>' +
				'</span>' +
				'<span class="erb-race-card__unit">' +
					'<span class="erb-race-card__number">' + pad( hrs ) + '</span>' +
					'<span class="erb-race-card__unit-label">Hours</span>' +
				'</span>' +
				'<span class="erb-race-card__unit">' +
					'<span class="erb-race-card__number">' + pad( mins ) + '</span>' +
					'<span class="erb-race-card__unit-label">Min</span>' +
				'</span>' +
				'<span class="erb-race-card__unit">' +
					'<span class="erb-race-card__number">' + pad( secs ) + '</span>' +
					'<span class="erb-race-card__unit-label">Sec</span>' +
				'</span>';
			return true;
		}

		if ( render() !== false ) {
			var interval = setInterval( function() {
				if ( render() === false ) {
					clearInterval( interval );
				}
			}, 1000 );
		}
	}

	document.addEventListener( 'DOMContentLoaded', function() {
		var cards = document.querySelectorAll( '.erb-race-card' );
		cards.forEach( initCountdown );
	} );
} )();
