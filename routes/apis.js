var express         = require('express');
var router          = express.Router();
var request         = require('request');
var config          = require('config');


router.post('/login', function (req, res) {
    const email = req.body.email,
        password = req.body.password;

    if (validateEmailAndPassword()) {
        const userId = findUserIdForEmail(email);

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 120,
            subject: userId
        };

        // send the JWT back to the user
        // set it in the HTTP Response body
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: 120
        });
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
});

module.exports = router;