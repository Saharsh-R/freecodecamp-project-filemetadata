var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'),  (req, res) => {
  if (!req.file) return res.send('Error. Please choose a file.')
  var result = {name: req.file.originalname, type: req.file.mimetype, size: req.file.size}
  if (!!req.body.comment) result.comment = req.body.comment
  res.send(result)
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
