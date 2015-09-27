/**YAnimEdit
 * 作者：YYC
 * 日期：2014-05-15
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var SPRITESHEET_IMGID = "spriteSheet";


function _loadImg(imgUrlData) {
    var manager = YE.LoaderManager.getInstance();

    manager.preload([
        {type: "image", url: imgUrlData, id: SPRITESHEET_IMGID }
    ]);

    manager.onload = function () {
        _showSpriteSheet(imgUrlData);
        globalData.spriteSheetUrl = imgUrlData;
        tool.showInfo("打开spriteSheet图片成功");
    }
}
function _showSpriteSheet(imgDataUrl) {
    $("<img src='" + imgDataUrl + "'width='100%', height='100%'/>").prependTo('#showImage');
}

function _isFrameFile(json) {
    return YYC.Tool.judge.isDirectObject(json.frames);
}

function _isAnimFile(json) {
    var i = null,
        result = false;

    for (i in json) {
        if (json.hasOwnProperty(i)) {
            if (YYC.Tool.judge.isArray(json[i].frames)) {
                result = true;
                break;
            }
        }
    }

    return result;
}

function _isAnimFileOpened() {
    return !!exportData.fileData;
}

function _showFrameList(framesData) {
    $("#allFrameList").append(_createFramesOl(framesData));

    Frame.getInstance().multipleSelect($("#allFrameList li.frameLi"));
}

function _addAnims(animJson) {
    var animName = null,
        animData = null;

    for (animName in animJson) {
        if (animJson.hasOwnProperty(animName)) {
            animData = animJson[animName];

            Anim.getInstance().addAnim(animName);
        }
    }
}

function _showAnimLists(animJson) {
    var animName = null,
        animData = null;

    for (animName in animJson) {
        if (animJson.hasOwnProperty(animName)) {
            animData = animJson[animName];

            Frame.getInstance().moveFrameToAnim(animName, _createFramesOl(animData.frames).children("li"));
        }
    }
}

function _setAndSaveAnimDatas(animJson) {
    var animName = null,
        animData = null;

    for (animName in animJson) {
        if (animJson.hasOwnProperty(animName)) {
            animData = animJson[animName];

            //先移动frame到anim中，再setAnimData
            //因为setAnimData中需要获得anim中的frame
            Anim.getInstance().setAnimData(animName, animData);
            Anim.getInstance().saveSingleAnimData(animName);
        }
    }
}

function _moveFrameToAnims(animJson) {
    var animName = null,
        animData = null;

    for (animName in animJson) {
        if (animJson.hasOwnProperty(animName)) {
            animData = animJson[animName];

            Frame.getInstance().moveFrameToAnim(animName, _createFramesOl(animData.frames).children("li"));
        }
    }
}

function _createFramesOl(framesData) {
    var ol = $("<ol/>");

    if (YYC.Tool.judge.isArray(framesData)) {
        framesData.forEach(function (i) {
            ol.append($("<li name='" + i + "' class='frameLi'>" + i + "</li>"));
        })
    }
    else {
        for (var i in framesData) {
            if (framesData.hasOwnProperty(i)) {
                ol.append($("<li name='" + i + "' class='frameLi'>" + i + "</li>"));
            }
        }
    }

    return ol;
}

var open = {
    initEvent: function () {
        $("#file").change(function (e) {
            var files = e.target.files,
                i = 0,
                len = files.length;

            for (i = 0; i < len; i++) {
                YYC.Html5.file.readFile(files[i], function (e) {
                    var json = null;

                    if (/image/.test(this.file.type)) {
                        _loadImg(this.result);

                        return;
                    }

                    json = YYC.Tool.convert.toObject(this.result);

                    if (_isFrameFile(json)) {
                        globalData.frames = json;
                        _showFrameList(json.frames);

                        if (_isAnimFileOpened()) {
                            //先移动frame到anims中，再_setAndSaveAnimDatas
                            //因为_setAndSaveAnimDatas中需要获得anim中的frame

                            _moveFrameToAnims(exportData.fileData);
                            _setAndSaveAnimDatas(exportData.fileData);
                            tool.showError("");  //清空错误信息
                        }

                        tool.showInfo("打开帧数据文件成功");
                    }
                    else if (_isAnimFile(json)) {
                        exportData.fileData = json;

                        _addAnims(json);

                        if (tool.isNotUploadFramesData()) {
                            tool.showError("请打开帧数据文件");
                            return;
                        }

                        _showAnimLists(json);
                        _setAndSaveAnimDatas(json);

                        tool.showInfo("打开动画数据文件成功");
                    }
                    else {
                        tool.showError("只能打开帧数据文件、动画数据文件、spriteSheet图片");
                    }
                });
            }
        });
        $("#open").click(function () {
            $("#file").click();
        });
    }
}