var child = require("child_process");
var net = require("net");
var os = require("os");

var pcap = require('./node_pcap/pcap'),
    pcap_session = pcap.createSession("", "tcp");

console.log("Listening on " + pcap_session.device_name);

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
    var ip = packet.payload.payload.saddr.addr;
    var mac = packet.payload.shost.addr;
    check(ip, mac);
});


var macs = {};
function check(ip, mac) {
    var macStr = mac.map(num => '_' + num.toString(16)).join('_');
    var now = (new Date()).getTime();
    if(!macs[macStr] || macs[macStr].date > now + (5 * 60 * 1000)) {
        macs[macStr] = {
          mac: mac,
          date: now,
        };
        var voice = voices[mac.reduce((prev, cur) => prev + cur, 0) % voices.length];
        console.log('new device', ip.join('.'), macStr, voice);
        player.play(voice, function(err){
          console.log('Done playing sound.', err);
        })
    }
}

var voices = require('./voices.json')
var player = require('play-sound')(opts = {})

