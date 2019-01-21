'use strict';


/**
 * Log a user out by closing session, sends back JSON response.
 */
module.exports = (req, res) => {
  req.logout();
  res.send({ loggedIn: false });
};
