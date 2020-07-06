let fs = require("fs")
import vue from './bus'

var AudioContext =
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext;
var audioContext = new AudioContext()

var analyser = audioContext.createAnalyser()
analyser.fftSize = 2048

var gainNode=audioContext.createGain()
gainNode.gain.value=1


//音频句柄
let _source=null
//是否第一次播放标志
let _isBegin = false
//标志是否在播放
let _ison=false
//时长
var _length=0
//当前进度
let _current=0
//计时器
let _timer=null

let _startTimer=function(){
    _timer=setInterval(function(){
        _current+=1
        vue.$emit("currentChange",[])
    },1000)
}

let _clearTimer=function(){
    if(_timer!=null){
        clearInterval(_timer)
        _timer=null
    }
    
}



export function getAnalyser() {
    return analyser
}

export function getContext() {
    return audioContext
}


export function setSource(src,length) {
    _source = audioContext.createBufferSource()
    _length=length

    fs.readFile(src, function (err, data) {
        let dataTmp = data.buffer //arrayBuffer
        audioContext.decodeAudioData(dataTmp).then((decodeData) => {
            _source.buffer = decodeData
            _source.connect(analyser)
            analyser.connect(gainNode)
            gainNode.connect(audioContext.destination)
        })
    })
}

export function playMusic() {
    if (!_isBegin) {
        if (_source === undefined) {
            throw Error("音频未初始化")
        }
        _current=0
        _source.start()
        _isBegin = true
    } else {
        audioContext.resume()
    }
    _startTimer()
    _ison=true
}

export function pauseMusic() {
    audioContext.suspend()
    _clearTimer()
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


export function getCurrent(){
    return _current
}

export function getLength(){
    return _length
}

export function dropContext(){
    //释放资源
    audioContext.close()
    audioContext=null
    gainNode=null
    analyser=null
    _current=null
    _length=0
    _clearTimer()
}

export function getDefaultPlayer() {
    audioContext = new AudioContext()
    analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048
    gainNode=audioContext.createGain()
    gainNode.gain.value=1
    _source=null
    _isBegin = false
    _length=0
    _ison=false
    _clearTimer()
}

