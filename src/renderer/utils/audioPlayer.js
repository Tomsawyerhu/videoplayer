let fs = require("fs")

var AudioContext =
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext;
var audioContext = new AudioContext()

var analyser = audioContext.createAnalyser()
analyser.fftSize = 2048


//音频句柄
let _source
//是否第一次播放标志
var _isBegin = false
//标志是否在播放
var _ison=false



export function getAnalyser() {
    return analyser
}

export function getContext() {
    return audioContext
}


export function setSource(src) {
    _source = audioContext.createBufferSource()
    fs.readFile(src, function (err, data) {
        let dataTmp = data.buffer //arrayBuffer
        audioContext.decodeAudioData(dataTmp).then((decodeData) => {
            _source.buffer = decodeData
            _source.connect(analyser)
            analyser.connect(audioContext.destination)
        })
    })
}

export function playMusic() {
    if (!_isBegin) {
        if (_source === undefined) {
            throw Error("音频未初始化")
        }
        _source.start()
        _isBegin = true
    } else {
        audioContext.resume()
    }
    _ison=true
}

export function pauseMusic() {
    audioContext.suspend()
    _ison=false
}

export function getByteFrequencyData() {
    var audioArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(audioArray)
    return audioArray
}

export function isOn(){
    return _ison
}

export function getDefaultPlayer() {
    audioContext = new AudioContext()
    analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048
    let _source
    _isBegin = false
    _ison=false
}