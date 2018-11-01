# Up [BETA] 

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modular command line framework to automate tasks and common work flows.

**Up is currently in beta, there will be breaking changes by the time v1.0.0 is released** 

## Introduction 
Up makes it easy to define and run common tasks, both stand-alone or interactively (asking some predefined questions). Tasks can be chained to create a work flow. 

## Getting Started

### Prerequisites

You need to install Node.js and npm. Take a look at their [installation guide](https://www.npmjs.com/get-npm) for more information.

### Installing

After installing node and npm, add ```up``` to your global npm packages. 

```
npm install -g up
```

Check if Up is installed correctly

```
up -v 
```

If you run into troubles, check the [npm package docs](https://docs.npmjs.com/getting-started/installing-npm-packages-globally) or open a new [issue](https://www.github.com/yaroschiffelers/up/blob/master/README.md#issues). 

### Credentials 

Check out the ```.env.example``` file in the root directory of this project, change its name to ```.env```, and add your own module specific credentials. 

These credentials are globally available for all modules in the ```./modules``` directory. The variables are accessible via ```__env.VARIABLE_NAME```. 

For example: 

```node
const username = __env.GMAIL_USER 

console.log(username)
// Output: someone@gmail.com 
``` 

## Examples
**Write a quick email**

![](./docs/media/up-quick-email.gif)

**Create a new Trello board** 

... 

## Issues

Please make sure to read the [Issue Reporting Checklist](https://github.com/yaroschiffelers/up/blob/dev/.github/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Changelog

Detailed changes for each release are documented in the [changelog](https://github.com/yaroschiffelers/up/blob/dev/CHANGELOG.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Contribution

Please make sure to read the [Contributing Guide](https://github.com/yaroschiffelers/up/blob/dev/.github/CONTRIBUTING.md) before making a pull request.

See also the list of [contributors](https://github.com/yaroschiffelers/up/contributors) who participated in this project.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Yaro Schiffelers
