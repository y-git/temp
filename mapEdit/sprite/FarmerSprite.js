/**古代战争
 * 作者：YYC
 * 日期：2014-02-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var FarmerSprite = YYC.Class(CharacterSprite, {
    Public: {
        name: "farmer",
        direction: 0,

        getShowFrame: function () {
            var frameName = this.name + "_" + this.team + "_normal_stand_00",
                pixelOffsetX = 15,
                pixelOffsetY = 35,
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