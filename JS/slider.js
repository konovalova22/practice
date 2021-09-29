document.addEventListener( 'DOMContentLoaded', function () {
	new Splide( '#card-slider', {
		perPage    : 2,
		breakpoints: {
			600: {
				perPage: 1,
			}
		}
	} ).mount();
} );