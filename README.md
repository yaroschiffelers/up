# Up 

## Getting Started
Inside your terminal, run: 
```bash 
npm link
``` 
and you'll be able to use ```up``` everywhere.

Please mind, the ```#!/usr/bin/env node``` line on top of index.js shouldn't be removed, without it, node can't properly *link* this package to your *bin*.

## Project Structure
An overview of the inner connections between components of ```up```

### Lib
Contains the main application logic. Models, views, controllers, and configuration files. 

### node_modules
Here you'll find the methods that belong to third party API's.

### Modules 
Template files contain the steps (commands) that need to be executed in order to set up a project. 

Filenames should be written in CamelCase with _ (underscores) instead of white spaces. Node will automatically index and add each template in the ./template directory to the template types object. This way, we ensure that a given type always had a corresponding template file. 

_____

# GIF 

![](./docs/media/up-quick-email.gif)

_____

## Refs
https://codeburst.io/building-a-node-js-interactive-cli-3cb80ed76c86
https://www.npmjs.com/package/inquirer
https://github.com/shelljs/shelljs
https://www.npmjs.com/package/chalk

https://github.com/fnobi/php-express
https://codeburst.io/fractal-a-nodejs-app-structure-for-infinite-scale-d74dda57ee11

### WHM CPANEL
https://documentation.cpanel.net/display/DD/WHM+API+1+Functions+-+createacct
https://documentation.cpanel.net/display/DD/WHM+API+1+Functions+-+get_domain_info
https://documentation.cpanel.net/display/DD/Guide+to+API+Authentication
https://documentation.cpanel.net/display/DD/Guide+to+WHM+API+1

____

## Templates (new)
- Design Block Template
- WordPress Pagina Template
