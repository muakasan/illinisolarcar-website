/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)',
		mobilep: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right'
			});

		// Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Header.
		// If the header is using "alt" styling and #banner is present, use scrollwatch
		// to revert it back to normal styling once the user scrolls past the banner.
		// Note: This is disabled on mobile devices.
			if (!skel.vars.mobile
			&&	$header.hasClass('alt')
			&&	$banner.length > 0) {

				$window.on('load', function() {

					$banner.scrollwatch({
						delay:		0,
						range:		0.5,
						anchor:		'top',
						on:			function() { $header.addClass('alt reveal'); },
						off:		function() { $header.removeClass('alt'); }
					});

				});

			}

	});

})(jQuery);


var options = {
	area: { height: null },
	container: "demo",
	data: {
		preloaded: {
			nodes: [
				{ id: "Katherine", coordinates: [132.2715, -14.4521] }, 
				{ id: "Darwin", coordinates: [130.8456, -12.4634] },// long, lat
				{ id: "Daly Waters", coordinates: [133.3692, -16.2533] },
				{ id: "Tennant Creek", coordinates: [134.1900, -19.6484] },
				{ id: "Barrow Creek", coordinates: [133.9756, -21.3799] },
				{ id: "Alice Springs", coordinates: [133.8807, -23.6980] },
				{ id: "Kulgera", coordinates: [133.1760, -25.4959] },
				{ id: "Coober Pedy", coordinates: [134.7533, -29.0139] },
				{ id: "Glendambo", coordinates: [135.7593, -30.9678] },
				{ id: "Port Augusta", coordinates: [137.7894, -32.4952] },
				{ id: "Adelaide", coordinates: [138.6007, -34.9285] }
			],
			links: [
				{ from: "Katherine", to: "Darwin", drivingTime: "13 hours 3 mins" },
				{ from: "Darwin", to: "Daly Waters", drivingTime: "13 hours 3 mins" },
				{ from: "Daly Waters", to: "Tennant Creek", drivingTime: "3 hours 3 mins" },
				{ from: "Tennant Creek", to: "Barrow Creek", drivingTime: "13 hours 3 mins" },
				{ from: "Barrow Creek", to: "Alice Springs", drivingTime: "13 hours 3 mins" },
				{ from: "Alice Springs", to: "Kulgera", drivingTime: "13 hours 3 mins" },
				{ from: "Kulgera", to: "Coober Pedy", drivingTime: "13 hours 3 mins" },
				{ from: "Coober Pedy", to: "Glendambo", drivingTime: "13 hours 3 mins" },
				{ from: "Glendambo", to: "Port Augusta", drivingTime: "13 hours 3 mins" },
				{ from: "Port Augusta", to: "Adelaide", drivingTime: "13 hours 3 mins" },

			]
		}
	},
	events: {
		onClick: function (event, args) {
			if (args.clickNode) alert("You clicked on " + args.clickNode.data.id + ".");
			if (args.clickLink) alert("You clicked on a link.");
		}
	},
	layers: [
		{
			name: "Points",
			type: "items",
			style: {
				nodeStyleFunction: function (node) {
					node.label = node.data.id;
				},
				linkStyleFunction: function (link) {
					link.label = link.data.drivingTime;
				},
				node: {
					fillColor: "#09c",
					lineColor: "#07a",
					lineWidth: 2
				},
				nodeLabel: {
					backgroundStyle: { fillColor: "rgba(0,0,0, 0.6)" },
					textStyle: { fillColor: "white" }
				},
				linkLabel: {
					backgroundStyle: { fillColor: "rgba(232, 74, 39, 0.6)" },
					textStyle: { fillColor: "white" }
				}
			}
		}
	],
	navigation: {
		initialLat: -20,
		initialLng: 135.7751,
		initialZoom: 4.5,
		minZoom: 3
	},
	advanced: { pointer: { noClickOnDoubleClick: false } }
};

chart = new GeoChart(options);
