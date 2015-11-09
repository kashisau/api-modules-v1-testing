var express = require('express');
var router = express.Router();

/**
 * Website API module template router - init method
 * 
 * This is a sample Express.js router that is designed to handle requests to a
 * particular method of the module-init module (called init).
 * 
 * Note the filename of the route handler, which matches the end-user
 * documentation in the views folder.
 * 
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 * @version 0.1.0
 */
router
    .post('.json', function(req, res, next) {
        // Handle the website-api-module-template/module-init.json POST request
        // JSON API spec: http://jsonapi.org/
        res.json(
            {
                data: {
                    "okay": true
                }
            }
        );
    })
    .get('json', function(req, res, next) {
        // Handle the website-api-module-template/module-init.json GET request
        // JSON API spec: http://jsonapi.org/
        res.json(
            {
                data: {
                    "okay": true
                }
            }
        );
    });