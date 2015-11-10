var testingModel = {};
var Promise = require('promise');

/**
 * Testing module model
 * 
 * Handles the mechanisms for running test suites using Mocha.
 * 
 * @author Kashi Samaraweera <kashi@kashis.com.au>
 */

var CONFIG_FILE_PATH = '../config/config.testing.json',
    environment = process.env.NODE_ENV || 'development',
    nodeGit = require('nodegit'),
    config = require(CONFIG_FILE_PATH),
    reposPath = config[environment].reposPath;

/**
 * This method will look within the repositories directory (configured using
 * the testing config file) to see if the repository identified exists.
 * @param {string}  The name of the repository to test. This will typically be
 *                  identical to the repository's name on BitBucket/GitHub.
 * @param {function(err, repo)} callback    A callback function that is called
 *                                          once the repository data has been
 *                                          retrieved.
 * @throws {Error}  Thrown if the repository for which we're trying to retrieve
 *                  data does not exist in the repos folder.
 */
testingModel.getRepository = function(repoIdentifier, callback) {
    var repoPath = reposPath + repoIdentifier,
        nodeGitRepo;
    
    nodeGit.Repository.open(repoPath)
        .then(function(repo) {
            nodeGitRepo = repo;
            return new Promise(
                function(resolve, reject) {
                    repo.getReferenceNames(nodeGit.Reference.TYPE.LISTALL)
                    .then(function(referenceNames) { resolve(referenceNames) })
                    .catch(function(err) { reject(err) });
                }
            );
        })
        .then(function(referenceNames) {
            return Promise.all(
                referenceNames
                .filter(_isLocalBranch)
                .map(
                    function(branch) { return _getLastCommit(branch, nodeGitRepo) }
                )
            );
        })
        .then(function(referenceNames) {
            callback(undefined, referenceNames);
        })  
        .catch(function(err) {
            var repoOpenError = new Error("There was an error retireiving " +
                "the repository details (" + repoIdentifier + ").");
            repoOpenError.innerError = err;
            repoOpenError.code = "repo_not_found";          
            
            callback(repoOpenError);
        });
};

/**
 * Array filter for removing non-local branches from a list of references. This
 * should be used with the Array.filter(...) prototype to remove unneccessary
 * branches from a list of testing options.
 * @param {string} branchReference  The name of a branch for the repository.
 * @return {bool}   Returns TRUE if the branch is local, FALSE if not.
 */
function _isLocalBranch(branchReference) {
    var branchNameParts = branchReference.split('/');
    return branchNameParts[1] === 'heads';
}

/**
 * Resolves the last commit date of the specified branch. This method uses
 * Promises instead of callbacks.
 * @param {string} branchName   The name of the branch to look up the latest
 *                              commit date.
 * @param {NodeGit.Repository}  A NodeGit Repository instance from which to
 *                              retrieve the branch information.
 * @return {Promise}    Returns a promise which should resolve to an object
 *                      containing details of the branch and its latest commit.
 */
function _getLastCommit(branchName, repo) {
    return new Promise(
        function(resolve, reject) {
            repo
                .getReferenceCommit(branchName)
                .then(function(commit) {
                    var branchInfo = {
                        name: branchName.split('/').pop(),
                        id: commit.id().tostrS(),
                        date: commit.date()
                    }
                    resolve(branchInfo);
                })
                .catch(function(err) {
                    err.branchName = branchName;
                    reject(err);
                });
        }
    );
}

module.exports = testingModel;