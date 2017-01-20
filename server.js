var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var songs = require('./data.json');

var app = express();

app.use(express.static('public'));
// convert any url encoded body into a JS object
// added to req.body
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/songs', function(req, res) {
  res.send(songs);
});

app.post('/songs', function(req, res) {
  console.log('req.body', req.body);

  if (!isValidSong(req.body)) {
    res.status(400).send('invalid song');
  }
  else if (isDuplicate(req.body)) {
    res.status(400).send('duplicate song');

  } else {
    req.body.dateAdded = new Date();
    songs.push(req.body);
    res.sendStatus(200);
  }
});
function isValidSong(newSong) {
  return newSong.title.trim() && newSong.artist && newSong.album;

}
// do not allow duplicate songs
function isDuplicate(newSong){
  return songs.some(function(song)  {
    return song.title === newSong.title &&
    song.artist === newSong.artist &&
    song.album === newSong.album;
  });

}//Dpmt a;;pw tje iser tp add spmgs wotj a b;aml srjtist or title
app.listen(3000);
