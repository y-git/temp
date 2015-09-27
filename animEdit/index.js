/**动画编辑器
 * 作者：YYC
 * 日期：2014-05-06
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
function _displayList() {
    $("#allFrameList").click(function () {
        $("#firstMenu").show();
        $("#secondMenu").hide();
    });
    $("#animList").click(function () {
        $("#firstMenu").hide();
        $("#secondMenu").show();
    });
}

var index = (function () {
    return {
        init: function () {
            open.initEvent();
            Anim.getInstance().initEvent();
            Frame.getInstance().initEvent();
            exportFile.initEvent();
            _displayList();
        }
    };
}());
