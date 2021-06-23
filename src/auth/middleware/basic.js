'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  let basic = req.headers.authorization;
  
  let splitHeader = basic.split(' ');
  let [username, pass] = base64.decode(splitHeader[1]).split(':');

  try {
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

};

