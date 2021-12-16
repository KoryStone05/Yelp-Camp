mapboxgl.accessToken =
	'pk.eyJ1Ijoia3N0b25lNSIsImEiOiJja3g3bWprbWMyeGhlMnZwMmhrbGI5ZnNlIn0.H7lcVXyk7FAE1vgbP37m5Q';
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v11', // style URL
	center: [-74.5, 40], // starting position [lng, lat]
	zoom: 4, // starting zoom
});
