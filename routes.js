var express = require('express');
var router = express.Router();
var controllers = require('./controllers');
var passport = require('passport');
var oauth = require('./middleware/oauth');
require('./middleware/passportStrategies');

router.get('/', function(req, res) {
	res.json({
		status: 'available',
		uptime: Math.round(process.uptime())
	});
});

router.post('/oauth/token', oauth.token);
router.all('/api/*', passport.authenticate('bearer', { session: false }));

router.get('/api/series', controllers.series.all);
router.get('/api/series/:id', controllers.series.get);
router.get('/api/series/:id/details', controllers.series.details);
router.get('/api/series/:id/brands', controllers.series.brands);
router.get('/api/series/:id/indicia_publishers', controllers.series.indiciaPublishers);

router.get('/api/issue', controllers.issue.all);
router.get('/api/issue/:id', controllers.issue.get);

module.exports = router;
