# Magic Mirror (a.k.a Smart Mirror)

[![Build Status](https://travis-ci.org/skendzicr/node_magic_mirror.svg?branch=master)](https://travis-ci.org/skendzicr/node_magic_mirror)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Usage
----

First you should install NodeJS. Binaries, installers, and source tarballs are available at https://nodejs.org, or you can alternately use [nvm ](https://github.com/creationix/nvm) for installation.

This repository is using Yarn, and I recommend you to [install it](https://yarnpkg.com/en/docs/install) although you can use NPM if you are used to it.

The project is being bundled by [WebPack](https://webpack.github.io/docs/tutorials/getting-started/), and you should install it: `npm install webpack -g`

Clone the repository and give folder a preferred name(e.g. magic-mirror) `git clone https://github.com/skendzicr/node_magic_mirror magic-mirror`

Enter the folder: `cd magic-mirror` and run `npm start`
This should start the dev enviorment, with server running on `localhost:3000` and application should be live on `localhost:8080`

Deployment on Raspberry PI
-------------
Run command `npm run build:d`. This will create **dist** folder.
If you have NodeJS installed on your Raspberry PI, running `node app.js` will serve your MagicMirror application on `localhost:3000`

#ToDo
* Check this deployment and implementation on Raspberry PI.
*  Find out how to rotate screen to portrait.
*  Decide if there is need for bash script for Raspberry PI deployment

Table of contents
-------------------


[TOC]
