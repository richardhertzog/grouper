const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('client sent a GET request');
})

router.post('/', (req, res) => {
  res.json(req.body);
})

module.exports = router;
