/**YAnimEdit
 * 作者：YYC
 * 日期：2014-05-15
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var MultipleSelect = YYC.Class({
        Private: {
            _lastSelectedFrameIndex: 0,

            _clickLi: function (e) {
                var self = e.data.context;

                //最关键的一步 确定shift 和 ctrl 是否被按住
                var bSHIFT = e.shiftKey;
                var bCTRL = e.ctrlKey;

                //如果ctrl 为 true
                if (bCTRL) {
                    MultipleSelect.addSelectedClass($(this));
                    self.nodes.push(this);
                }
                //如果shift 为 true
                if (bSHIFT) {

                    MultipleSelect.addSelectedClass($(this));

                    var index = $(this).index();

                    var minIndex = Math.min(self._lastSelectedFrameIndex, index),
                        maxIndex = Math.max(self._lastSelectedFrameIndex, index);

                    self.nodes = $(this).parent().children().slice(minIndex, maxIndex + 1).not("ul").toArray();
                    MultipleSelect.allLiRemoveSelectedClass($(this));
                    MultipleSelect.addSelectedClass(self.nodes);
                }
                //shift 和 ctril 都为 false 时
                if ((!bCTRL) && (!bSHIFT)) {
//        $(this).parent().removeClass("multipleSelect");
                    MultipleSelect.allLiRemoveSelectedClass($(this));
                    MultipleSelect.addSelectedClass($(this));

//        nodes = $().add($(this));
                    self.nodes = [this];
                }

                self._lastSelectedFrameIndex = $(this).index();
            }
        },
        Public: {
            nodes: [],

            multipleSelect: function (lis) {
                //解除之前绑定的_clickLi
                lis.unbind(".multipleSelect");

                lis.bind("click.multipleSelect", {context:this}, this._clickLi);
            },
            isMultipleSelect: function () {
                return this.nodes.length > 1;
            }
        },
        Static: {
            addSelectedClass: function (li) {
                $(li).addClass("multipleSelect");
            },
            allLiRemoveSelectedClass: function (currentLi) {
                $(currentLi).parent().children().removeClass("multipleSelect");
            }
        }
    });

    window.MultipleSelect = MultipleSelect;
}());