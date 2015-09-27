/**古代战争
 * 作者：YYC
 * 日期：2014-02-13
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var EntityLayer = YYC.Class(YE.Layer, {
    Private: {
    },
    Public: {
        onstartLoop: function () {
            this.sort(function (a, b) {
                if (shadeAlgorithm.isShade(a, b)) {
                    return 1;
                }
                return  -1;
            });
            shadeAlgorithm.reSort(this.getChilds());

            shadeAlgorithm.setZOrder(this.getChilds(), this);
        },
        addChild: function (sprite, zOrder, tag) {
            this.base(sprite, zOrder, tag);

            window.mapLayer.buildBuildableGrid();
        }
//        remove: function (sprite) {
//            this.base(sprite);
//
//            if (sprite.hasTag("building") || sprite.hasTag("resource")) {
//                window.mapLayer.buildPassableGrid();
//            }
//        },
//        produce: function (produceName, produceClass) {
//            var buildings = null,
//                invoker = null,
//                command = null,
//                cost = 0;
//
//            buildings = window.mapLayer.getSelectItems();
//
//            cost = buildings.length * config.spriteConfig[produceName].cost;
//
//            //判断资源是否足够
//            if (this.getParent().meat < cost) {
//                ui.showMessageBox("meat不足！需要" + cost + "个meat");
//                return;
//            }
//
//            YE.Director.getInstance().getCurrentScene().meat -= cost;
//
//            invoker = new Invoker();
//            command = new ProduceCommand(buildings, produceName, produceClass);
//
//            invoker.setCommand(command);
//            invoker.action();
//        }
    }
});