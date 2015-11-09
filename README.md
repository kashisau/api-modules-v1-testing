# Website API Module template

This repository may be cloned to quickly create a new module for Kashi's API server, running on Express.js.
Modules are loosely coupled files consisting of (at minimum) an Express.js route handler, documentation and tests. Most modules will also use one or more models for data storage, module development docs and configuration data.

## Folder structure

Modules for the API server use the following conventions for the storage of each of the abovementioned components:
```
+-- module-name/
    +-- config/
        +-- config.json # Excluded from version control
        +-- config.sample.json # Included in version control
    +-- models/
        +-- module-model0.js
        +-- module-model1.js
        +-- ...
    +-- node_modules/ # Excluded from version control
    +-- routes/
        +-- method0.js
        +-- method1.js
        +-- ...
    +-- test/
        +-- test-suite0/
            +-- test-suite0-test-group0.js
            +-- test-suite0-test-group1.js
            +-- ...
        +-- test-suite0.js # Coordinates each test group from test-suite0/
        +-- test-suite1/
            +-- test-suite1-test-group0.js
            +-- test-suite1-test-group1.js
            +-- ...
        +-- test-suite1.js
        +-- ...
        +-- mocha.opts # Mocha testing options
    +-- views/
        +-- module-name.md # API module user documentation
        +-- method0.md # Module method user documentation
        +-- method1.md 
        +-- ...
        +-- errors.md # Module-specific error documentation
    +-- .gitignore # Excludes config files, node_modules, etc.
    +-- package.json # Node.js package configuration for this module
    +-- README.md # Sample read-me file (this file). To be replaced.
+--

## Testing

_[To be finalised]_

API modules should be unit tested and integration tested within this module. Mocha and should.js are typically used for unit testing as planned API modules (`deployment` and `testing`) will aim to automate the testing and CI processes for this server.

## Deployment

_[Planned]_

The idea here is to use GIT branching to manage the deployment process for modules to the API server (hosted on a virtual server somewhere). This is pending implementation of the deployment module however a commit to the `master` branch (and subsequent push to the API server's GIT host) will allow a mechanism for continuous integration.