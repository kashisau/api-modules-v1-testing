var express = require('express');
var router = express.Router();

/**
 * Testing router - test method
 * 
 * Initiates the testing process for a specified repository, supplying callback
 * identifiers so that the progress of testing can be checked.
 * 
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 * @version 0.1.0
 */
router
    .post('.json', function(req, res, next) {
        var scenarioData = req.body;
        
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