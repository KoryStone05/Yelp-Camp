const Campground = require('../models/campground');
const mapBoxToken =
	'pk.eyJ1Ijoia3N0b25lNSIsImEiOiJja3g3bWprbWMyeGhlMnZwMmhrbGI5ZnNlIn0.H7lcVXyk7FAE1vgbP37m5Q';
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mbxGeocoding = `https://api.mapbox.com/tokens/v2/kstone5?access_token=${mapBoxToken}`;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

console.log(process.env.MAPBOX_TOKEN);

module.exports.index = async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
	res.render('campgrounds/new');
};

module.exports.createCampground = async (req, res, next) => {
	const geoData = await geocoder
		.forwardGeocode({
			query: 'Yosemite, CA',
			limit: 1,
		})
		.send();
	console.log(geoData);
	res.send('OK!!!');
	// const campground = new Campground(req.body.campground);
	// campground.author = req.user._id;
	// await campground.save();
	// req.flash('success', 'Successfully made a new campground!');
	// res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
	const campground = await Campground.findById(req.params.id)
		.populate({
			path: 'reviews',
			populate: {
				path: 'author',
			},
		})
		.populate('author');
	if (!campground) {
		req.flash('error', 'Cannot find that campground!');
		return res.redirect('/campgrounds');
	}
	res.render('campgrounds/show', { campground });
};

module.exports.renderEditForm = async (req, res) => {
	const { id } = req.params;
	const campground = await Campground.findById(id);
	if (!campground) {
		req.flash('error', 'Cannot find that campground!');
		return res.redirect('/campgrounds');
	}
	res.render('campgrounds/edit', { campground });
};

module.exports.updateCampground = async (req, res) => {
	const { id } = req.params;
	const campground = await Campground.findByIdAndUpdate(id, {
		...req.body.campground,
	});
	req.flash('success', 'Successfully updated campground!');
	res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
	const { id } = req.params;
	await Campground.findByIdAndDelete(id);
	req.flash('success', 'Successfully deleted campground');
	res.redirect('/campgrounds');
};
