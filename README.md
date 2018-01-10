node-red-contrib-sails
======================

A <a href="http://nodered.org" target="_new">Node-RED</a> node to send data to a <a href="https://sailsjs.com/" target="_new"> sails.js</a> server, using the <a href="https://github.com/balderdashy/sails.io.js" target="_new">sails.io.js</a> library.

### Install

Either use the Menu - Palette Manager - Install,  or run the following command in your Node-RED user directory - typically `~/.node-red`

        npm i --save node-red-contrib-sails

### Usage

If **Path** is not specified the required sails url path should be set by using `msg.topic`.

`msg.payload` should contain the data you wish to send.

The default method is **post**, but you can override this using `msg.method`.

Sails accepts *get, post, put, delete* and *patch*.

You may also set headers by using `msg.headers` if required.
