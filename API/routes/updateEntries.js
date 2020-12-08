const router = require('express').Router();
const User = require('../Models/User');
router.put('/:id', async (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      { $inc: { entries: 1 } },
      { new: true },
      function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result.entries);
        res.send(result);
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});
module.exports = router;
