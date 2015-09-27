/**YImgEdit
 * 作者：YYC
 * 日期：2014-05-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    function _setCanvasSize(scaleSize) {
        imgOperate.originImgCanvas.width *= scaleSize;
        imgOperate.originImgCanvas.height *= scaleSize;

        imgOperate.editImgCanvas.width = imgOperate.originImgCanvas.width;
        imgOperate.editImgCanvas.height = imgOperate.originImgCanvas.height;

        imgOperate.editBackgroundCanvas.width = imgOperate.originImgCanvas.width;
        imgOperate.editBackgroundCanvas.height = imgOperate.originImgCanvas.height;
    }

    function _drawScale(scaleSize) {
        imgOperate.canvasWidth = imgOperate.originImgCanvas.width;
        imgOperate.canvasHeight = imgOperate.originImgCanvas.height;

        _setCanvasSize(scaleSize);

        _drawImg(scaleSize);

//        imgOperate.originImgCanvas.getContext("2d").scale(scaleSize, scaleSize);
//        imgOperate.editImgCanvas.getContext("2d").scale(scaleSize, scaleSize);
//        imgOperate.editBackgroundCanvas.getContext("2d").scale(scaleSize, scaleSize);
    }

    function _getCanvasImgData() {
        imgOperate.originImgData = imgOperate.originImgCanvas.getContext("2d").getImageData(0, 0, imgOperate.originImgCanvas.width, imgOperate.originImgCanvas.height);
        imgOperate.editImgData = imgOperate.editImgCanvas.getContext("2d").getImageData(0, 0, imgOperate.editImgCanvas.width, imgOperate.editImgCanvas.height);
        imgOperate.editBackgroundData = imgOperate.editBackgroundCanvas.getContext("2d").getImageData(0, 0, imgOperate.editBackgroundCanvas.width, imgOperate.editBackgroundCanvas.height);
    }

    function _drawImg(scaleSize) {
        imgOperate.bufferCanvas.width = imgOperate.canvasWidth;
        imgOperate.bufferCanvas.height = imgOperate.canvasHeight;

        imgOperate.bufferCanvas.getContext("2d").putImageData(imgOperate.originImgData, 0, 0);
        imgOperate.originImgCanvas.getContext("2d").drawImage(imgOperate.bufferCanvas, 0, 0,
            imgOperate.canvasWidth * scaleSize, imgOperate.canvasHeight * scaleSize);

        imgOperate.bufferCanvas.getContext("2d").putImageData(imgOperate.editImgData, 0, 0);
        imgOperate.editImgCanvas.getContext("2d").drawImage(imgOperate.bufferCanvas, 0, 0,
            imgOperate.canvasWidth * scaleSize, imgOperate.canvasHeight * scaleSize);

        imgOperate.bufferCanvas.getContext("2d").putImageData(imgOperate.editBackgroundData, 0, 0);
        imgOperate.editBackgroundCanvas.getContext("2d").drawImage(imgOperate.bufferCanvas, 0, 0,
            imgOperate.canvasWidth * scaleSize, imgOperate.canvasHeight * scaleSize);
    }

    var imgOperate = {
        originImgCanvas: null,
        editImgCanvas: null,
        editBackgroundCanvas: null,
        bufferCanvas:null,
        canvasWidth: 0,
        canvasHeight: 0,
        originImgData: null,
        editImgData: null,
        editBackgroundData: null,

        initEvent: function () {
            this.originImgCanvas = document.getElementById("originImgCanvas");
            this.editImgCanvas = document.getElementById("editImgCanvas");
            this.editBackgroundCanvas = document.getElementById("editBackgroundCanvas");
            this.bufferCanvas = document.createElement("canvas");

            $("#zoomIn").click(function () {
                _getCanvasImgData();
                _drawScale(2, 2);
//                _drawImg(2);
            });
            $("#zoomOut").click(function () {
                _getCanvasImgData();
                _drawScale(0.5, 0.5);
//                _drawImg();
            });
        }
    };

    window.imgOperate = imgOperate;
}
    ()
    )
;