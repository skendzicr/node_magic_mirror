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

To handle screensaver and cursor showing, install `sudo apt-get install x11-xserver-utils unclutter` and then change autostart script `sudo nano .config/lxsession/LXDE-pi/autostart`. Add these lines: 
`@/usr/bin/chromium-browser --kiosk --disable-restore-session-state http://localhost:3000/
@xset s noblank
@xset s off
@xset -dpms
@unclutter -idle 0.1 -root`

To change when Pi is going to sleep run `sudo nano /etc/lightdm/lightdm.conf` and change the line `xserver-command= X -s 0 -dpms` 

Make a script, that will be in charge of running the app on boot. 
` #!/bin/sh
cd /home/pi/projects/node_magic_mirror/
node app.js `
save it in folder scripts, and name it `magicmirror.sh` for example. We are going to use it in cron job. Type `sudo crontab -e` and add this line of code `@reboot /home/pi/scripts/magicmirror.sh`.

Now you should reboot the Pi with `sudo reboot`, and it should automatically open chromium in full screen mode, and our app up and running. 
