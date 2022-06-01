const clc = require("cli-color");
const moment = require("moment")

module.exports = {
    start,
    log,
}

let white = clc.white
let blue = clc.blue
let yellow = clc.yellow
let green = clc.green
let red = clc.red

function start(ip, port) {
    console.log(blue(moment().format("HH:mm")) + " ➤ " + "App running at " + yellow(`${ip}:${port}`))
}

function log(message) {
    console.log(blue(moment().format("HH:mm")) + " ➤ " + white(message))
}

