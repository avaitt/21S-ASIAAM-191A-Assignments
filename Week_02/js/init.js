
// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// JavaScript let variable declaration to create a marker
let marker = L.marker([34.0689, -118.445]).addTo(map)
		.bindPopup('UCLA')
		.openPopup();
let marker1 = L.marker([32.7157, -117.1611]).addTo(map)
		.bindPopup('San Diego')
		.openPopup();
let marker2 = L.marker([12.9716, -77.5946]).addTo(map)
		.bindPopup('Bengaluru')
		.openPopup();


fetch("js/map.geojson")
		.then(response => {
			return response.json();
			})
	.then(data =>{

			L.geoJSON(data, {
				style: function (feature) {
					return {color: feature.properties.color};
					}
			}).bindPopup(function (layer) {
					return layer.feature.properties.Place;
			}).addTo(map);
		});