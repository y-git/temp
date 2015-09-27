/**YAnimEdit
 * 作者：YYC
 * 日期：2014-05-15
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    var Frame = YYC.Class({
        Init: function () {
            this._multipleSelect = new MultipleSelect();
        },
        Private: {
            _multipleSelect: null,

            _getAnimFrameUl: function (anim) {
                if (anim.next().length === 0 || !anim.next().is("ul")) {
                    return $("<ul/>");
                }

                return anim.next();
            },
            _addFrameRemoveIco: function (li) {
                var span = $("<span onclick='javascript:$(this).parent().remove();'>[删除]</span>");
                li.append(span);
            }
        },
        Public: {
            multipleSelect: function (lis) {
                this._multipleSelect.multipleSelect(lis);
            },
            moveFrameToAnim: function (animName, framesLi) {
                var anim = Anim.getInstance().getAnimLi(animName),
                    ul = null,
                    self = this;

                if (anim.length === 0) {
                    tool.showError("请选择输入正确的动画名");
                    return;
                }

                ul = this._getAnimFrameUl(anim);

                framesLi.each(function () {
                    self._addFrameRemoveIco($(this));

                    ul.append($(this).removeClass("multipleSelect"));
                });


                anim.after(ul);

                framesLi.click(function () {
                    Anim.getInstance().setCurrentSelectedAnimData(animName);
                });
            },
            getFrameDataWithFrameLi: function (frameLi) {
                return globalData.frames.frames[this.getFrameNameWithLi(frameLi)];
            },
            getFrameNameWithLi: function (frameLi) {
                return frameLi.attr("name");
            },
            initEvent: function () {
                $("#moveFrame").bind("click", {context:this}, function (e) {
                    var self = e.data.context,
                        startIndex = Number($("#firstMenu input:first").val()),
                        endIndex = Number($("#firstMenu input:eq(1)").val()),
                        animName = $("#firstMenu input:eq(2)").val(),
                        frames = null,
                        ul = null;

                    if (isNaN(startIndex) || isNaN(endIndex)) {
                        if (self._multipleSelect.nodes.length === 0) {
                            tool.showError("请选择帧");
                            return;
                        }

                        self._multipleSelect.nodes = tool.changeArrToJqueryCollection(self._multipleSelect.nodes);
                        frames = self._multipleSelect.nodes.clone();
                    }
                    else {
                        frames = $("#allFrameList li").slice(startIndex - 1, endIndex).clone();
                    }

                    self.moveFrameToAnim(animName, frames);
                    Anim.getInstance().setCurrentSelectedAnimData(animName);
                    Anim.getInstance().saveSingleAnimData(animName);
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
    });

    window.Frame = Frame;
}());
