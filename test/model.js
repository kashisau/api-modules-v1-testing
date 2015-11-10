'use strict';
/**
 * API Module Template - repo testing tests
 *
 * This suite will ensure that NodeGit is working with a basic test for a repo
 * that should be installed on the development machine.
 *
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 */
describe('Repository loading with NodeGit', function() {

    var CONFIG_FILE_PATH = 'config/config.testing.json',
        TEST_REPOSITORY_PATH = "website-api\\api-modules\\v1\\auth",
        environment = process.env.NODE_ENV || 'development',
        fs = require('fs'),
        should = require('should'),
        testingModel = require('../models/testing-model.js'); 

    describe("Basic repository data retrieval", function() {
        
        it("Supplies a list of branches", function(done) {
            testingModel.getRepository(
                TEST_REPOSITORY_PATH,
                function(err, branches) {
                    branches.should.be.a.array;
                    branches.length.should.be.greaterThan(0);
                    done();
                });
        });
        
        it("Branch list contains name, commit ID and date of last commit",
            function(done) {
                testingModel.getRepository(
                    TEST_REPOSITORY_PATH,
                    function(err, branches) {
                        branches.forEach(
                            function(branch) {
                                branch.name.should.be.a.string;
                                branch.id.should.be.a.string;
                                branch.date.should.be.a.date;
                            }
                        );
                        done();
                    });
                }
            );
        }
    );

    // Should continue with testing of specific config file parameters.
});