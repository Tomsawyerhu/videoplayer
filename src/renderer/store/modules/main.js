import {
    remote
} from "electron"
var fs = require("fs")
var Store = require('electron-store')
//var id3=require("node-id3")


let store = new Store()
const postfixs = ['mp3']

const main = {
    state: {
        localRepoFiles: ''
    },
    mutations: {
        set_localRepoFiles: function (state, data) {
            state.localRepoFiles = data
        }
    },
    actions: {
        setLocalRepository: async ({
            state,
            dispatch
        }) => {
            remote.dialog.showOpenDialog({
                title: "选择本地音乐仓库",
                defaultPath: "",
                properties: ["openDirectory"],
                filters: [{
                    name: "All Files",
                    extensions: ["*"]
                }]
            }, function (result) {
                console.log(result)
                if(result!=undefined){
                    //将新的仓库地址保存一下
                let path = String(result).replace("\\\\", "/").replace(/\\/g, "/")
                if (!path.endsWith("/")) {
                    path += '/'
                }
                console.log(path)
                store.set("localRepo", path)
                dispatch('readLocalRepoAsArrays')
                }
            })

        },
        readLocalRepoAsArrays: async ({
            state,
            commit
        }) => {
            //读取本地仓库的音频文件
            var readDirRecursively = function (p, postfixs, arrays) {
                let s=fs.readdirSync(p)

                if (s.length == 0) {
                    return
                }
                let dirs = []
                for (var x in s) {
                    //console.log(p+s[x])
                    let t = s[x].split('.')
                    if (t.length > 1 && postfixs.indexOf(t[t.length - 1]) != -1) {
                        arrays.push(p + s[x])
                    }
                    if (!fs.existsSync(p + s[x])) {
                        dirs.push(p + s[x] + "/")
                    }
                }

                for (var x in dirs) {
                    readDirRecursively(dirs[x], postfixs, arrays)
                }
            }

            let paths = String(store.get("localRepo"))
            let arrays = []

            readDirRecursively(paths, postfixs, arrays)
            console.log(arrays)

            let video_info_list = []
            for (var x in arrays) {
                //记录歌名，路径，时长信息
                let info = {}
                var m = arrays[x].split("/")
                let name = m[m.length - 1]
                if(name.length>14){
                    name=String(name).substring(0,8)+"..."
                }
                info.name=name
                info.path = arrays[x]

                //var tags=id3.read(arrays[x])
                //info.length=tags.userDefinedText[10].value+"s"
                info.length = "100s"
                video_info_list.push(info)
            }
            console.log(video_info_list)
            commit('set_localRepoFiles', video_info_list)
        }
    }
}

export default main