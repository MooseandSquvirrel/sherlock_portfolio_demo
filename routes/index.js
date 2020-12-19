var express = require('express');
var router = express.Router();
var cadet_list = require('../cadet_list');
var {spawn} = require('child_process');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('users');
});

router.get('/main', function(req, res, next) {
  answer = "Tis' time to deduce..."
  res.render('index', {answer: answer, cadet: "Who's it gonna be?"});
});

router.post('/magnifying_glass', function(req, res, next) {
  intraLogin = req.body.intraLogin;
  
  // check cadet_list for key (intraLogin)
  var check = cadet_list.some(obj => obj.hasOwnProperty(intraLogin));
  if (check == false) {
    res.render('index', {answer: answer, cadet: "Is that their I.D. ?"});
  };
  cadet_list.forEach(function (item, index){
    if (Object.keys(item) == intraLogin) {
      cadet_id = Object.values(item)
      var dataToSend;

      // spawn new child process to call the python scripts
      const python = spawn('python', ['userIds.py', cadet_id]);

      //collect data from python script
      python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        python.on('close', (code) => {
          console.log(`child process close all stdio with code ${code}`);
        });
        res.render('index', {answer: dataToSend, cadet: intraLogin})
      });
    }
  });
});

module.exports = router;
