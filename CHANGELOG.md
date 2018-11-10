# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

```Up``` is a project by Yaro Schiffelers. For more information take a look at ```README.md``` or send a message to <up@yaroschiffelers.nl>.

## [Unreleased]
- [DOCS] How to write modules 
- [DOCS] How to use the default modules 
- [DOCS] General usage tutorial 
- [FEATURE] Shortcuts (quick access to modules)
- [FEATURE] Work flow support (module and method chaining)
- [FEATURE] Work flow templates 
- See up.todo for a broad overview of MVP (v1.0.0) features. 

## [0.1.12] - 2018-11-11
### Added
- file ```up/make.js```
- Method: changeCommandName in ```up/make.js```. Setup only. Will make it easy for users to change the default ```up``` command into something they prefer.

## [0.1.11] - 2018-11-11
### Added
- resetState method (mutation and action) in store.

## [0.1.10] - 2018-11-11
### Added
- [FEATURE] Empty ```test``` function, callable with the ```-t``` flag. ```up -t```. 

### Changed
- [CHORE] Correct import of new utils object
- [CHORE] Removed sub-module object names (utility). Import each method by hand from now on. Before this you had to pull in the complete sub-module: ```const { f } = require('./../utils')```. Changed the utils module; now contains all the utility methods. Import them like this: ``` const { filter, filterJunk } = require('./../utils').
}
 
## [0.1.9] - 2018-11-11
### Added
- [FEATURE] Core classes: Module, Action, Constructor 

## [0.1.8] - 2018-11-11
### Added
- [FEATURE] Abstract Module Tree setup 

## [0.1.7] - 2018-11-11
### Added 
- [FEATURE] assert methods 
- [FEATURE] file system methods (in ```files.js```)

### Changed 
- [CHORE] Turned utils into one object, use object deconstructing while importing individual methods from now on. 
- [CHORE] Removed duplicate methods in different files. 
- [CHORE] Moved file system methods to ```files.js``` 
- [CHORE] Removed unused imports of unused modules

## [0.1.6] - 2018-11-11 - [7d55d0e65987690c69457409780cfef8d732bbd8]
### Added 
- [FEATURE] Install.sh now installs Node.js (if not installed)
- [FEATURE] Tree-model package

### Changed 
- [CHORE] build.sh moved to ```./scripts``` 
- [CHORE] install.sh moved to ```./scripts``` 
- [CHORE] correct link pointing to ```./srcipts/build.sh``` for ```build``` command.

## [0.1.5] - 2018-11-01 - [1c3454237b9862c79ad253adbc229b496c442ca4]
### Fixed 
- [DOCS] Corrected 'quick-tutorial' link in README.md#Modules

## Added 
- [FEATURE] Change command shortcut method.
- [FEATURE] Setup for ```install.sh``` script.
- [CHORE] ```scripts``` directory. All build/install scripts should be placed here.

## [0.1.4] - 2018-11-01 - [71cc900ab7f5953fe24e5e80fc6520d81cef398c]
### Fixed 
- [DOCS] Corrected invalid link to './media' directory
- [DOCS] Removed empty sub-title ```###``` prefix

## [0.1.3] - 2018-11-01 - [5ab263ca36bb1f3f37d12d309743329709cb9f87]
### Added 
- [DOCS] Site name and description in _config.yml
- [DOCS] Introduction page (index.md) 
- [DOCS] Setup 'writing-modules' page 
- [DOCS] Modules introduction section 
- [DOCS] README.md resembles docs/index.md 
- New items to up.todo  

### Changed 
- Small edit in 'description' (package.json), so it matches the Github description

## [0.1.2] - 2018-11-01 - [d021cd94c183567dd0f46c0a8155a33b2a9325c6]
### Added 
- Github Pages support 

## [0.1.1] - 2018-11-01 - [419b8b59b25cd5b75eda1729d5917774503e9139]
### Added 
- Github issue templates

## [0.1.0] - 2018-10-30 - [28b74780021f2d5ddc945a3b80daeebab6ba736f]
### Added 
- Initial commit
