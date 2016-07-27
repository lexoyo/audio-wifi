
Needs `libpcap-devel` or `libpcap-dev` installed, and [one of these dependencies](https://www.npmjs.com/package/play-sound#options).

Needs Hedgewars installed too for the sounds.

Tested on a raspberry pi 3.

```
$ clone https://github.com/lexoyo/audio-wifi.git --recursive
$ sudo npm i
$ sudo npm start
```

If npm install throws errors try
```
$ sudo npm i
$ cd node_pcap
$ npm i
$ cd ..
$ sudo npm start
```
