/**古代战争
 * 作者：YYC
 * 日期：2014-02-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var BuildingSprite = YYC.Class(EntitySprite, {
    Init: function (data) {
        this.base(data);
//        bitmap.setAnchor(this.pixelOffsetX, this.pixelOffsetY);

//        this.setNormalState();

//        this.produce_queue = [];
    },
    Private: {
//        ____state: null,

        ____prepareAnim: function () {
            this.P_createAndSetDisplayTarget("building_json", "building_image", this.name + "_" + this.team, this.pixelOffsetX, this.pixelOffsetY);
        }
//        ____setBuildFrameAndSize: function (frame) {
//            if (tool.isSingleGridSprite(this)) {
//                frame.setAnchor(0, 20);
//                this.setHeight(35);
//                this.setWidth(60);
//            }
//            else if (tool.isMiddleSprite(this)) {
//                frame.setAnchor(0, 40);
//                this.setHeight(70);
//                this.setWidth(120);
//            }
//            else if (tool.isLargeSprite(this)) {
//                frame.setAnchor(0, 60);
//                this.setHeight(105);
//                this.setWidth(170);
//            }
//            else {
//                throw new Error("精灵大小类型超出范围");
//            }
//        },
//        ____setRuinFrameAndSize: function (frame) {
//            if (tool.isSingleGridSprite(this)) {
//                frame.setAnchor(0, 18);
//                this.setHeight(35);
//                this.setWidth(60);
//            }
//            else if (tool.isMiddleSprite(this)) {
//                frame.setAnchor(0, 30);
//                this.setHeight(65);
//                this.setWidth(120);
//            }
//            else if (tool.isLargeSprite(this)) {
//                frame.setAnchor(-10, 45);
//                this.setHeight(85);
//                this.setWidth(170);
//            }
//            else {
//                throw new Error("精灵大小类型超出范围");
//            }
//        },
//        ____restoreSize: function () {
//            this.setWidth(this.width);
//            this.setHeight(this.height);
//        },
//        ____getFlamingSize: function () {
//            var flamingWidth = 0,
//                flamingHeight = 0;
//
//            if (tool.isSingleGridSprite(this)) {
//                flamingWidth = 50;
//                flamingHeight = 50;
//            }
//            else if (tool.isMiddleSprite(this)) {
//                flamingWidth = 70;
//                flamingHeight = 70;
//            }
//            else if (tool.isLargeSprite(this)) {
//                flamingWidth = 100;
//                flamingHeight = 100;
//            }
//            else {
//                throw new Error("精灵大小类型错误");
//            }
//
//            return [flamingWidth, flamingHeight];
//        },
//        ____buildDiamondRange: function () {
//            var leftHalfAngle = mapLayer.getLeftHalfAngle(),
//                size = this.baseSize,
//                originPoint = [this.getPositionX(), this.getPositionY() ];
//
//            var p1 = originPoint,
//                p2 = [originPoint[0] + size * Math.cos(leftHalfAngle),
//                    originPoint[1] - size * Math.sin(leftHalfAngle)
//                ],
//                p3 = [originPoint[0] + size * Math.cos(leftHalfAngle) * 2,
//                    originPoint[1]
//                ],
//                p4 = [originPoint[0] + size * Math.cos(leftHalfAngle),
//                    originPoint[1] + size * Math.sin(leftHalfAngle)
//                ];
//
//            return [p1, p2, p3, p4];
//        },
//        ____getCenterGridPos: function () {
//            var gridPos = null;
//
//            if (tool.isSingleGridSprite(this)) {
//                gridPos = [this.gridX + 0.5, this.gridY + 0.5];
//            }
//            else if (tool.isMiddleSprite(this)) {
//                gridPos = [this.gridX + 1, this.gridY + 1];
//            }
//            else if (tool.isLargeSprite(this)) {
//                gridPos = [this.gridX + 1.5, this.gridY + 1.5];
//            }
//            else {
//                throw new Error("大小类型错误");
//            }
//
//            return gridPos;
//        },
//        ____addToProduceQueue: function (produceName, produceClass) {
//            this.produce_queue.push({
//                produceName: produceName,
//                produceClass: produceClass
//            });
//        }
    },
    Protected: {
//        P_createSelectRange: function (x, y) {
//            var mapLayer = window.mapLayer;
//
//            var leftHalfAngle = mapLayer.getLeftHalfAngle();
//
//            var p1 = [x, y],
//                p2 = [ x,
//                    y - this.height
//                ] ,
//                p3 = [x + this.width,
//                    y - this.height
//                ] ,
//                p4 = [x + this.width,
//                    y
//                ],
//                p5 = [x + this.baseSize * Math.cos(leftHalfAngle),
//                    y + this.baseSize * Math.sin(leftHalfAngle)
//                ];
//
//            return [p1, p2, p3, p4, p5];
//        },
//        P___showBasicInfo: function () {
//            if (this.isNormalState()) {
//                this.showNormalInfo();
//            }
//            else if (this.isBuildState()) {
//                this.showBuildInfo();
//            }
//            else if (this.isProduceState()) {
//                this.showProduceInfo();
//            }
//        }
    },
    Public: {
//        build_progress: 0,
//        diamondRange: null,
//        produce_progress: 0,
//        produce_queue: null,
//
//        runGuardAction: function () {
//        },
//        runProduceAction: function () {
//            this.runOnlyOneAction(this.getProduceAction());
//        },
//        getProduceAction: function () {
//            return Produce.create(this.produce_queue[0]);
//        },
//        setNormalState: function () {
//            this.____state = BuildingSprite.State.NORMAL;
//        },
//        setBuildState: function () {
//            this.____state = BuildingSprite.State.BUILD;
//        },
//        setProduceState: function () {
//            this.____state = BuildingSprite.State.PRODUCE;
//        },
//        isBuildState: function () {
//            return this.____state === BuildingSprite.State.BUILD;
//        },
//        isNormalState: function () {
//            return this.____state === BuildingSprite.State.NORMAL;
//        },
//        isProduceState: function () {
//            return this.____state === BuildingSprite.State.PRODUCE;
//        },
//        showBuildFrame: function (buildProgress) {
//            var frame = YE.FrameCache.getInstance().getFrame("building_build_0" + buildProgress.toString());
//
//            this.____setBuildFrameAndSize(frame);
//            this.setDisplayTarget(frame);
//        },
//        showRuinFrame: function () {
//            var frame = YE.FrameCache.getInstance().getFrame("building_ruin");
//
//            this.____setRuinFrameAndSize(frame);
//            this.setDisplayTarget(frame);
//        },
//        showBuildInfo: function () {
//            ui.showProgress(this.build_progress);
//        },
//        showNormalInfo: function () {
//            ui.showSpriteInfo(this.name);
//            ui.showSpriteInfo("生命值：" + this.life + "/" + this.hitPoints);
//        },
//        showNormalBuilding: function () {
//            this.P_createAndSetDisplayTarget("building_json", "building_image", this.name + "_" + this.team, this.pixelOffsetX, this.pixelOffsetY);
//            this.____restoreSize();
//            this.showInfo();
//        },
//        drawLifeBar: function (context) {
//            var mapLayer = window.mapLayer;
//            var lifeBarHeight = mapLayer.getLifeBarHeight();
//            var x = this.drawingX;
//            var y = this.drawingY - 2 * lifeBarHeight - this.getHeight() / 2;
//            var fillStyle = this.isHealthy() ? mapLayer.getHealthBarHealthyFillColor() : mapLayer.getHealthBarDamagedFillColor(),
//                fillWidth = this.getWidth() * this.life / this.hitPoints,
//                strokeStyle = mapLayer.getHealthBarHealthyFillColor(),
//                strokeWidth = this.getWidth(),
//                strokeHeight = lifeBarHeight,
//                lineWidth = 1;
//
//            this.getGraphics().drawLifeBar([x, y, strokeWidth, strokeHeight], lineWidth, fillWidth, strokeStyle, fillStyle);
//        },
//
//        drawSelection: function (context) {
//            var x = this.drawingX;
//            var y = this.drawingY;
//            var mapLayer = window.mapLayer;
//
//            this.P_drawDiamondBox(x, y);
//        },
//        clearInfo: function () {
//            ui.showSpriteInfo("");
//        },
//        produce: function (produceName, produceClass) {
//            this.____addToProduceQueue(produceName, produceClass);
//
//            this.runProduceAction();
//        },
//        showProduceInfo: function () {
//            ui.showProgress(this.produce_progress);
//            ui.showProduceNum(this.produce_queue.length);
//        },
//        getAttackedPoint: function () {
//            return this.____getCenterGridPos();
//        },
//        getSightPoint: function () {
//            return this.____getCenterGridPos();
//        },
//        getDeadAction: function () {
//            var callFunc1 = YE.CallFunc.create(this, function () {
//                    this.showRuinFrame();
//                    window.mapLayer.buildPassableGrid();
//                }),
//                callFunc2 = YE.CallFunc.create(this, this.removeSprite);
//
//            return YE.Sequence.create(callFunc1, YE.DelayTime.create(8), callFunc2);
//        },
//        isMoving: function () {
//            return false;
//        },
//        onstartLoop: function () {
//            var flamingSize = null;
//
//            this.base();
//
//            flamingSize = this.____getFlamingSize();
//
//            if (this.isNormalState() && this.isDamaged()) {
//                this.runAnim("flaming", this.getPositionX(), this.getPositionY(), flamingSize[0], flamingSize[1]);
//            }
//            else {
//                this.removeAnim("flaming");
//            }
//
////            this.gridX = Math.round(this.gridX);
////            this.gridY = Math.round(this.gridY);
//        },
        onenter: function () {
            this.____prepareAnim();
            this.base();

//            this.diamondRange = this.____buildDiamondRange();
        }
    },
    Static: {
        State: {
            NORMAL: 0,
            BUILD: 1,
            PRODUCE: 2
        }
    }
});