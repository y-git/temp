/**古代战争
 * 作者：YYC
 * 日期：2014-02-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var CharacterSprite = YYC.Class(EntitySprite, {
    Init: function (data) {
        this.base(data);

        this.setDisplayTarget(this.getShowFrame());
    }
});