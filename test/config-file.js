'use strict';
/**
 * API Module Template - config file testing
 *
 * This suite of tests verifies that the config file contains the correct
 * parameters for testing purposes. This is a unit test that does not verify
 * credentials, etc.
 *
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 */
describe('Config file checks', function() {

    var CONFIG_FILE_PATH = 'config/config.testing.json',
        environment = process.env.NODE_ENV || 'development',
        fs = require('fs'),
        should = require('should'); 

    it("Config file exists in /config/config.testing.json", function(done) {
        var configFileStats;

        (function() {
        configFileStats = fs.lstatSync(CONFIG_FILE_PATH);
        (configFileStats.isFile()).should.be.true;
        }).should.not.throw();

        done();
    });
    
    it("Config file specifies a valid path for repositories", function(done) {
        var config = require('../' + CONFIG_FILE_PATH)[environment],
            reposPath = config.reposPath,
            reposPathFileStats;

        config.reposPath.should.be.a.string;
        (function() {
            reposPathFileStats = fs.lstatSync(config.reposPath);
            (reposPathFileStats.isDirectory()).should.be.true;
       }).should.not.throw();

       done();
    });

    // Should continue with testing of specific config file parameters.
});