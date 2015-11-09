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

    var CONFIG_FILE_PATH = 'config/config.json';

    it("Config file exists in /config/config.json", function(done) {
        var fs = require('fs'),
        configFileStats;

        (function() {
        configFileStats = fs.lstatSync(CONFIG_FILE_PATH);
        (configFileStats.isFile()).should.be.true;
        }).should.not.throw();

        done();
    });

    // Should continue with testing of specific config file parameters.
});