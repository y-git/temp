/**古代战争
 * 作者：YYC
 * 日期：2014-02-04
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var ArcherSprite = YYC.Class(CharacterSprite, {
    Protected: {
    },
    Public: {
        name: "archer",
        direction: 0,

        getShowFrame: function () {
            var frameName = this.name + "_" + this.team + "_stand_00",
                pixelOffsetX = 40,
                pixelOffsetY = 40,
                frame = null;

            YE.FrameCache.getInstance().addFrameData(this.name + "_json", this.name + "_image");

            frame = YE.FrameCache.getInstance().getFrame(frameName);
            frame.setAnchor(pixelOffsetX, pixelOffsetY);

            return frame;
        },
        onenter: function () {
            this.base();
        }
    }
});


