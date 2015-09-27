/**YAnimEdit
 * 作者：YYC
 * 日期：2014-05-15
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    var defaultAnimData = {
        "flipX": false,
        "flipY": false,
        "pixelOffsetX": 0,
        "pixelOffsetY": 0,
        "repeatNum": -1,
        "duration": 0.1,
        "width": 0,
        "height": 0
    };
//    animMultipleSelect
    var Anim = YYC.Class({
            Init: function () {
                this._multipleSelect = new MultipleSelect();
            },
            Private: {
                _multipleSelect: null,

                _addAnimRemoveIco: function (li) {
                    var span = $("<span>[删除]</span>");

                    span.bind("click", {context: this}, this._removeAnim);
                    li.append(span);
                },
                _removeAnim: function (e) {
                    var target = $(e.target),
                        self = e.data.context,
                        animName = self.getAnimNameWithLi(target.parent());

                    if (self._hasFrame(target.parent())) {
                        target.parent().next().remove();
                    }

                    target.parent().remove();

                    self._removeAnimData(animName);
                },
                _hasFrame: function (anim) {
                    return anim.next().length > 0 && anim.next().is("ul");
                },
                _removeAnimData: function (animName) {
                    var fileData = exportData.fileData;

                    if (fileData) {
                        fileData[animName] = undefined;
                        exportData.fileData = fileData;
                    }
                },
                _showAnim: function (animName, li) {
                    if (this._multipleSelect.isMultipleSelect()) {
                        this._showMultipleAnimData();
//                _handleMultipleAnim();
                    }
                    else {
                        this._showSingleAnimData();
                        this._handleSingleAnim(animName, li);
                    }
                },
                _handleSingleAnim: function (animName, li) {
                    showAnimFrameImg.showAnimFrameImg(animName);
                    //设置当前选中动画的动画名
                    this.setCurrentSelectedAnimData(animName);

                    MultipleSelect.allLiRemoveSelectedClass(li);
                    MultipleSelect.addSelectedClass(li);
                },
//        _handleMultipleAnim: function () {
//
//        },
                _showSingleAnimData: function () {
                    $("#singleAnimData").show();
                    $("#multipleAnimData").hide();
                },
                _showMultipleAnimData: function () {
                    $("#multipleAnimData").show();
                    $("#singleAnimData").hide();

                    $("#multipleAnimData div").show();
                    $("#multipleAnimData p").hide();
                },
                _isSetPixel: function () {
                    return this._isShow($("#multi_pixelX").parent());
                },
                _isSetFlip: function () {
                    return this._isShow($("#multi_flipX").parent());
                },
                _isSetDuration: function () {
                    return this._isShow($("#multi_duration").parent());
                },
                _isSetRepeatNum: function () {
                    return this._isShow($("#multi_repeatNum").parent());
                },
                _isSetShowSize: function () {
                    return this._isShow($("#multi_showWidth").parent());
                },
                _isShow: function (jq) {
                    return jq.css("display") !== "none";
                },
                _setAnimShowSize: function (animName) {
                    var size = this.getAnimShowSize(animName),
                        frames = null,
                        frameData = null;

                    if (this._isNoAnimSize(size)) {
                        frames = this.getAnimFrames(animName);
                        frameData = Frame.getInstance().getFrameDataWithFrameLi(frames.eq(0));
                        size = {width: frameData[2], height: frameData[3]};
                    }


                    $("#showWidth").val(size.width);
                    $("#showHeight").val(size.height);
                },
                _saveMultiAnimData: function () {
                    var self = this,
                        pixelX, pixelY, flipX, flipY, duration, repeatNum, animName, isNumber, animData, width, height;

                    isNumber = YYC.Tool.judge.isNumber;

                    animData = {
                    };

                    if (this._isSetPixel()) {
                        pixelX = Number($("#multi_pixelX").val());
                        pixelY = Number($("#multi_pixelY").val());
                        animData.pixelOffsetX = isNumber(pixelX) ? pixelX : defaultAnimData.pixelOffsetX;
                        animData.pixelOffsetY = isNumber(pixelY) ? pixelY : defaultAnimData.pixelOffsetY;
                    }
                    if (this._isSetFlip()) {
                        flipX = YYC.Tool.checkbox.isCheck("multi_flipX");
                        flipY = YYC.Tool.checkbox.isCheck("multi_flipY");
                        animData.flipX = flipX;
                        animData.flipY = flipY;
                    }
                    if (this._isSetDuration()) {
                        duration = Number($("#multi_duration").val());
                        animData.duration = isNumber(duration) ? duration : defaultAnimData.duration;
                    }
                    if (this._isSetRepeatNum()) {
                        repeatNum = Number($("#multi_repeatNum").val());
                        animData.repeatNum = isNumber(repeatNum) ? repeatNum : defaultAnimData.repeatNum;
                    }
                    if (this._isSetShowSize()) {
                        width = Number($("#multi_showWidth").val());
                        height = Number($("#multi_showHeight").val());
                        animData.width = isNumber(width) ? width : defaultAnimData.width;
                        animData.height = isNumber(height) ? height : defaultAnimData.height;
                    }

                    this._multipleSelect.nodes.forEach(function (nodeDom) {
                        animName = self.getAnimNameWithLi($(nodeDom));

                        animData.frames = [];

                        self.getAnimFrames(animName).each(function () {
                            animData.frames.push(Frame.getInstance().getFrameNameWithLi($(this)));  //获得帧名称
                        });

                        self.saveAnimData(animName, animData);
                    });
                },
                _isNoAnimSize: function (animSize) {
                    return !animSize.width || !animSize.height;
                }
            },
            Public: {
                getAnimFrames: function (animName) {
                    return this.getAnimLi(animName).next("ul").children("li");
                },
                getAnimLi: function (animName) {
                    return $("#animList li[name=" + animName + "]");
                },
                getAnimNameWithLi: function (animLi) {
                    return animLi.attr("name");
                },
                getAnimShowSize: function (animName, frameData) {
                    var animData = null,
                        animShowSize = null;

                    animData = this.getAnimData(arguments[0]);
                    animShowSize = {
                        width: animData.width,
                        height: animData.height
                    };

                    if (arguments.length === 1) {
                    }
                    else if (arguments.length === 2) {
                        if (this._isNoAnimSize(animData)) {
                            animShowSize = {width: frameData[2], height: frameData[3]};
                        }
                    }

                    return animShowSize;
                },
                setCurrentSelectedAnimData: function (animName) {
                    var copyDefaultConfig = null,
                        animData = null;

                    copyDefaultConfig = YYC.Tool.extend.extend({}, defaultAnimData);
                    animData = YYC.Tool.extend.extend(copyDefaultConfig, this.getAnimData(animName));

                    this.setAnimData(animName, animData);
                },
                setAnimData: function (animName, animData) {
                    $("#pixelX").val(animData.pixelOffsetX);
                    $("#pixelY").val(animData.pixelOffsetY);

                    if (animData.flipX) {
                        YYC.Tool.checkbox.check("flipX");
                    }
                    else {
                        YYC.Tool.checkbox.unCheck("flipX");
                    }

                    if (animData.flipY) {
                        YYC.Tool.checkbox.check("flipY")
                    }
                    else {
                        YYC.Tool.checkbox.unCheck("flipY");
                    }

                    $("#duration").val(animData.duration);
                    $("#repeatNum").val(animData.repeatNum);

                    this._setAnimShowSize(animName);
                },
                getAnimData: function (animName) {
                    var fileData = exportData.fileData ? exportData.fileData
                        : {};

                    return fileData[animName] ? fileData[animName] : defaultAnimData;
                },
                saveAnimData: function (animName, animData) {
                    var temp = null;

                    if (exportData.fileData) {
                        exportData.fileData[animName] = exportData.fileData[animName] || {};
                        YYC.Tool.extend.extend(exportData.fileData[animName], animData);
                    }
                    else {
                        temp = {};
                        temp[animName] = temp[animName] || {};
                        YYC.Tool.extend.extend(temp[animName], animData);
                        exportData.fileData = temp;
                    }

                    //没有设置的动画数据则使用默认动画数据
                    YYC.Tool.extend.extendNoExist(exportData.fileData[animName], defaultAnimData);
                },
                saveSingleAnimData: function (animName) {
                    var pixelX, pixelY, flipX, flipY, duration, repeatNum, isNumber, animData,
                        width, height;

                    isNumber = YYC.Tool.judge.isNumber;

                    pixelX = Number($("#pixelX").val());
                    pixelY = Number($("#pixelY").val());
                    flipX = YYC.Tool.checkbox.isCheck("flipX");
                    flipY = YYC.Tool.checkbox.isCheck("flipY");
                    duration = Number($("#duration").val());
                    repeatNum = Number($("#repeatNum").val());
                    width = Number($("#showWidth").val());
                    height = Number($("#showHeight").val());

                    animData = {
                        "flipX": flipX,
                        "flipY": flipY,
                        "pixelOffsetX": isNumber(pixelX) ? pixelX : defaultAnimData.pixelOffsetX,
                        "pixelOffsetY": isNumber(pixelY) ? pixelY : defaultAnimData.pixelOffsetY,
                        "repeatNum": isNumber(repeatNum) ? repeatNum : defaultAnimData.repeatNum,
                        "duration": isNumber(duration) ? duration : defaultAnimData.duration,
                        "width": width,
                        "height": height,
                        "frames": []
                    };
                    this.getAnimFrames(animName).each(function () {
                        animData.frames.push(Frame.getInstance().getFrameNameWithLi($(this)));  //获得帧名称
                    });

                    this.saveAnimData(animName, animData);

                    showAnimFrameImg.showAnimFrameImg(animName);

                    this.setCurrentSelectedAnimData(animName);
                },
                addAnim: function (animName) {
                    var li = $("<li name='" + animName + "' class='animLi'>" + animName + "</li>");

                    this._addAnimRemoveIco(li);

                    $("#animList > ul").append(li);

                    //多选绑定的clickLi在_showAnim之前调用

                    this._multipleSelect.multipleSelect(li);

                    li.bind("click", {context: this}, function (e) {
                        var self = e.data.context;

                        self._showAnim(animName, $(this));
                    });
                },
                initEvent: function () {
                    var self = this;

                    $("#createAnim").click(function () {
                        var animName = $(this).prev("input").val();

                        self.addAnim(animName);

                        tool.showInfo("新建动画" + animName);
                    });

                    $("#multipleAnimData input[type=button]").click(function () {
                        $(this).parent().next().show();
                        $(this).parent().hide();
                    });

                    //保存动画数据
                    $("#saveAnimData").bind("click", {context: this}, function (e) {
                        var self = e.data.context;

                        if (self._multipleSelect.isMultipleSelect()) {
                            self._saveMultiAnimData();
                        }
                        else {
                            self.saveSingleAnimData(self.getAnimNameWithLi($(self._multipleSelect.nodes[0])));
                        }

                        tool.showInfo("保存成功");
                    });
                }
            },
            Static: {
                getInstance: function () {
                    if (_instance === null) {
                        _instance = new this();
                    }
                    return _instance;
                }
            }
        })
        ;

    window.Anim = Anim;
}());
