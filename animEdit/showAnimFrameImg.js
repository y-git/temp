/**YAnimEdit
 * 作者：YYC
 * 日期：2014-05-15
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */

var SHOWIMAGE_PIXELOFFSETX = 200,
    SHOWIMAGE_PIXELOFFSETY = 200;


function _removeImg() {
    var canvas = _getCanvas(),
        context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    $("#showImage img").remove();
}
function _getCanvas() {
    return document.getElementById("showAnimFrameCanvas");
}

function _setCanvasSize(animName, frames) {
    var height = 0,
        width = 0,
        frameData = null,
        animShowSize = null,
        canvas = _getCanvas();

    if (tool.isNotUploadFramesData()) {
        tool.showError("请先打开帧数据文件");
        return;
    }

    frameData = globalData.frames.frames[Frame.getInstance().getFrameNameWithLi(frames.eq(0))];

    if(!frameData) {
        return;
    }

    animShowSize = Anim.getInstance().getAnimShowSize(animName, frameData);

    width += animShowSize.width;

    frames.each(function () {
        height += animShowSize.height;
    });

    width += SHOWIMAGE_PIXELOFFSETX * 2;
    height += SHOWIMAGE_PIXELOFFSETY * 2;

    canvas.width = width;
    canvas.height = height;
}

function _drawAnimFrames(animName, frames) {
    var animData = Anim.getInstance().getAnimData(animName),
        context = _getCanvas().getContext("2d"),
        img = YE.ImgLoader.getInstance().get(SPRITESHEET_IMGID),
        animShowSize = null,
        frameData = null,
        frameName = null,
        x = 0,
        y = 0;

    if (!img) {
        return;
    }

    frames.each(function (index) {
        frameName = Frame.getInstance().getFrameNameWithLi($(this));

        if (!globalData.frames) {
            return;
        }

        frameData = globalData.frames.frames[frameName];

        animShowSize = Anim.getInstance().getAnimShowSize(animName, frameData);

        x = SHOWIMAGE_PIXELOFFSETX;
        y = SHOWIMAGE_PIXELOFFSETY + index * animShowSize.height;

        _drawBox(context, animShowSize, x, y);
        _drawFrame(context, animData, img, frameData, animShowSize, x, y);
    });
}

function _drawBox(context, animShowSize, x, y) {
    context.strokeStyle = "green";
    context.lineWidth = 1;
    context.strokeRect(x, y, animShowSize.width, animShowSize.height);
}

function _drawFrame(context, animData, img, frameData, animShowSize, x, y) {
    var canvasWidth = _getCanvas().width,
        canvasHeight = _getCanvas().height;

    x = x - animData.pixelOffsetX;
    y = y - animData.pixelOffsetY;

    context.save();

    if (animData.flipX) {
        context.translate(canvasWidth, 0);
        context.scale(-1, 1);
        x = canvasWidth - animShowSize.width - x;
    }
    if (animData.flipY) {
        context.translate(0, canvasHeight);
        context.scale(1, -1);

        y = canvasHeight - animShowSize.height - y;
    }

//        _flip(context, animData);

    context.drawImage(img,
        frameData[0], frameData[1], frameData[2], frameData[3],
        x, y, animShowSize.width, animShowSize.height
    );

    context.restore();
}

//    function _flip(context, animData) {
//        var canvasWidth = _getCanvas().width,
//            canvasHeight = _getCanvas().height;
//
//        if (animData.flipX) {
//            context.translate(canvasWidth, 0);
//            context.scale(-1, 1);
//        }
//        if (animData.flipY) {
//            context.translate(0, canvasHeight);
//            context.scale(1, -1);
//        }
//    }


var showAnimFrameImg = {
    showAnimFrameImg: function (animName) {
        var frames = Anim.getInstance().getAnimFrames(animName);

        _removeImg();
        _setCanvasSize(animName, frames);
        _drawAnimFrames(animName, frames);
    }
};