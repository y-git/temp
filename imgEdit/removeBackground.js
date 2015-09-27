/**YImgEdit
 * 作者：YYC
 * 日期：2014-05-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    function _handle() {
        var imgData = null;

        imgData = _editImgData(removeBackground.originImgCanvas);

        _setCanvasSize();

        //绘制去底后的图片的背景
        _drawBackgroundImg(removeBackground.editBackgroundCanvas);
        //绘制去底后的图片
        _drawImg(removeBackground.editImgCanvas, imgData);

        _saveImgData(removeBackground.editImgCanvas);
    }

    function _editImgData(canvas) {
        var context = canvas.getContext("2d"),
            imgData = null,
            edgePixData = null;

        imgData = context.getImageData(0, 0, canvas.width, canvas.height);

        edgePixData = _setEdgePixData(imgData.data);

        _setBackgroundPixTransparent(imgData.data, edgePixData);

        return imgData;
    }

    function _setEdgePixData(data) {
        var edgePixData = null,
            transparentNum = 0,
            i = 0,
            len = data.length;

        for (i = 0; i < len; i += 4) {
            if (data[i + 3] !== transparentNum) {
                edgePixData = [data[i], data[i + 1], data[i + 2]];
                break;
            }
        }

        return edgePixData;
    }

    function _setBackgroundPixTransparent(data, edgePixData) {
        var i = 0,
            len = data.length;

        for (i = 0; i < len; i += 4) {
            if (data[i] === edgePixData[0] && data[i + 1] === edgePixData[1]
                && data[i + 2] === edgePixData[2]) {
                data[i + 3] = 0;
            }
        }
    }

    function _setCanvasSize() {
        removeBackground.editImgCanvas.width = removeBackground.originImgCanvas.width;
        removeBackground.editImgCanvas.height = removeBackground.originImgCanvas.height;

        removeBackground.editBackgroundCanvas.width = removeBackground.originImgCanvas.width;
        removeBackground.editBackgroundCanvas.height = removeBackground.originImgCanvas.height;
    }

    function _drawBackgroundImg(canvas) {
        var context = canvas.getContext("2d"),
            img = YE.ImgLoader.getInstance().get("transparentBackground");

        context.fillStyle = context.createPattern(img, "repeat");
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function _drawImg(canvas, imgData) {
        var context = canvas.getContext("2d");

        context.putImageData(imgData, 0, 0);
    }

    function _saveImgData(canvas) {
        var context = canvas.getContext("2d");

        exportData.imgDataUrl = canvas.toDataURL("image/png");
    }

    function _setBackground(canvas) {
        var context = canvas.getContext("2d"),
            colorRGB = $("#menu input[type=text]"),
            fillStyle = "rgba(" + colorRGB.eq(0).val()
                + "," + colorRGB.eq(1).val()
                + "," + colorRGB.eq(2).val()
                + "," + colorRGB.eq(3).val() + ")";

        context.fillStyle = fillStyle;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }


    var removeBackground = {
        originImgCanvas: null,
        editImgCanvas: null,
        editBackgroundCanvas: null,

        initEvent: function () {
            this.originImgCanvas = document.getElementById("originImgCanvas");
            this.editImgCanvas = document.getElementById("editImgCanvas");
            this.editBackgroundCanvas = document.getElementById("editBackgroundCanvas");

            $("#removeBackground").click(function () {
                _handle();
            });
            $("#setBackground").click(function () {
                _setBackground(editBackgroundCanvas);
            });
        }
    };

    window.removeBackground = removeBackground;
}());

