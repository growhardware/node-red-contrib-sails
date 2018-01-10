module.exports = function(RED) {
    'use strict';
    var socketIOClient = require('socket.io-client');
    var sailsIOClient = require('sails.io.js');

    /* Connection node */
    function SailsConfig(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;
        this.port = n.port;
    }
    RED.nodes.registerType('sails-config', SailsConfig);

    /* Client node */
    function SailsOut(n) {
        RED.nodes.createNode(this, n);
        this.server = RED.nodes.getNode(n.server);
        this.path = n.namespace;
        this.method = n.method;
        this.name = n.name;
        this.uri = this.server.host;
        if (this.server.port != '') { this.uri += ':' +  this.server.port; }
        var node = this;

        var io = sailsIOClient(socketIOClient);
        io.sails.environment = 'production';
        io.sails.url = node.uri;

        node.on('input', function(msg) {
            var top = node.path || msg.topic || "";
            var method = node.method || msg.method || "post";
            node.status({shape:"dot",fill:"blue"});
            io.socket.request({method:method, url:top, data:msg.payload, headers:msg.headers}, function(body, JWR) {
                node.status({});
                msg.rc = JWR.statusCode;
                msg.payload = body;
                node.send(msg);
            });
        });

        node.on('close', function(done) {
            io.socket.disconnect();
            delete io.sails;
            io = null;
            node.status({});
            done();
        });
      }
      RED.nodes.registerType('sails-out', SailsOut);
}
