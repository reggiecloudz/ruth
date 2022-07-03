const express = require('express');

function socketRouter(io) {
  const router = express.Router();

  router.get('/forecast', (req, res) => {
    const count = req.query.count;
    if (!count) {
      res.status(401).json({
        message: 'Count not provided.'
      });
    }

    io.emit('mod_forecast', count);
    res.status(200).json({
      message: 'Data delivered'
    });
  });

  return router;
}

module.exports = socketRouter;
