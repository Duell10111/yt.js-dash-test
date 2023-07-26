var express = require('express');
var router = express.Router();

const { Innertube } = require('youtubei.js');
var xmlescape = require('xml-escape');
var decode = require('unescape');
const path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/dash*", async function(req, res, next) {
  const youtube = await Innertube.create({ /* setup - see above */ });
  const videoInfo = await youtube.getInfo("hBsnb6M-lr0")

  const manifest = await videoInfo.toDash();

  res.set('Content-Type', 'application/dash+xml');
  res.send(manifest)
})

router.get("/xml", (req, res, next) => {
  res.set('Content-Type', 'application/dash+xml');
  res.sendFile((path.join(path.dirname(__dirname), 'xml', "dash.xml")))
})

module.exports = router;
