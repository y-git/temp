/**古代战争
 * 作者：YYC
 * 日期：2014-02-12
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var SelectableSprite = YYC.AClass(Sprite, {
    Init: function (data) {
        this.base(data);
    },
    Protected: {
//        P_drawDiamondBox: function (x, y) {
//            this.getGraphics().drawDiamondBox(mapLayer.getSelectionBorderColor(), 1, [x, y],
//                window.mapLayer.getLeftHalfAngle(),
//                this.baseSize);
//        },
//
//        Abstract: {
//            P_createSelectRange: function (x, y) {
//            }
//        }
    },
    Private: {
//        __beforeDraw: function (context) {
//            if (this.selected) {
//                this.drawSelection(context);
//            }
//        }
//        _setToCurrentRoll: function (selectRange) {
//            var offsetX = window.mapLayer.getOffsetX(),
//                offsetY = window.mapLayer.getOffsetY();
//
//            selectRange.forEach(function (point) {
//                point.x = point.x - offsetX;
//                point.y = point.y - offsetY;
//            });
//
//            return selectRange;
//        }
    },
    Public: {
//        selected: false,
//        selectRange: [],
//
//        draw: function (context) {
//            this.base(context);
//        },
//        clearInfo: function () {
//            ui.clearInfo();
//        },
//        onenter: function () {
//            this.base();
//            this.selectRange = this.P_createSelectRange(this.getPositionX(), this.getPositionY());
//        },
//        onbeforeDraw: function (context) {
//            this.__beforeDraw(context);
//        },
//        onstartLoop: function () {
////            var gridPos = null;
//
//            this.base();
//
//            this.drawingX = this.getPositionX() - this.getOffsetX();
//            this.drawingY = this.getPositionY() - this.getOffsetY();
////
////            gridPos = tool.convertToGrid(this.getPositionX(), this.getPositionY());
////
////            this.gridX = Math.floor(gridPos[0]);
////            this.gridY = Math.floor(gridPos[1]);
//
////            toReDraw = shadeAlgorithm.judgeAndReturnToReDraw(this, window.entityLayer.getChilds(),
////                window.mapLayer.getOffsetX(), window.mapLayer.getOffsetY());
////
////            toReDraw && window.entityLayer.toReDraw.push(toReDraw);
//        }
    },
    Abstract: {
//        drawSelection: function (context) {
//        },
//        showInfo: function () {
//        }
    }
});