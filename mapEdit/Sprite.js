/**古代战争
 * 作者：YYC
 * 日期：2014-02-06
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var Sprite = YYC.AClass(YE.Sprite, {
    Init: function (data) {
        var positionPix = null;

        this._getSettingFromConfig();

        this.base(null);

        if (data) {
            positionPix = tool.convertToPix(data.gridX, data.gridY);

            this.setPosition(positionPix[0], positionPix[1]);

            this.gridX = data.gridX;
            this.gridY = data.gridY;
        }

        //设置精灵大小
        this.setWidth(this.width);
        this.setHeight(this.height);
    },
    Private: {
        _getSettingFromConfig: function () {
            if (config.spriteConfig[this.name]) {
                YYC.Tool.extend.extendDeep(config.spriteConfig[this.name], this);
            }
        }
    },
    Protected: {
        P_createAndSetDisplayTarget: function (jsonId, imgId, frameName, pixelOffsetX, pixelOffsetY) {
            YE.FrameCache.getInstance().addFrameData(jsonId, imgId);

            var frame = YE.FrameCache.getInstance().getFrame(frameName);
            frame.setAnchor(pixelOffsetX, pixelOffsetY);
            this.setDisplayTarget(frame);
        }
    },
    Public: {
        onstartLoop: function () {
            var mapLayer = window.mapLayer,
                offsetX = mapLayer.getOffsetX(),
                offsetY = mapLayer.getOffsetY();

            this.setOffsetX(offsetX);
            this.setOffsetY(offsetY);
        }
    }
});