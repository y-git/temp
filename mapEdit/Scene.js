/**古代战争
 * 作者：YYC
 * 日期：2014-02-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var Scene = YYC.Class(YE.Scene, {
    Private: {
//        _levelData: null,

        _initScene: function () {
            this._addLayer();
//            this._addElements();
//            this._setInitResource();
        },
//        _setInitResource: function () {
//            this.meat = this._levelData.meat;
//        },
        _addLayer: function () {
            window.mapLayer = new MapLayer("mapLayerCanvas");
            window.entityLayer = new EntityLayer("entityLayerCanvas");
            window.effectLayer = new EffectLayer("effectLayerCanvas");

//            window.mapLayer.setPosition(0, 0);
//            window.effectLayer.setPosition(0, 0);

//            window.bulletLayer = YE.Layer.create("bulletLayerCanvas", {x: 0, y: 25});
//            window.fogLayer = new FogLayer("fogLayerCanvas", {x: 0, y: 25});

            this.addChild(window.mapLayer, 1);
            this.addChild(window.entityLayer, 2);
//            this.addChild(window.bulletLayer, 3);
//            this.addChild(window.fogLayer, 4);
            this.addChild(window.effectLayer, 3);
        },
//        _addElements: function () {
//            window.mapLayer.addChilds(
//                this._createSprites(
//                    this._levelData.items.terrain.plants, PlantsSprite
//                )
//            );
//            window.entityLayer.addChilds(this._createBuildingSprites(), 0, "building");
//            window.entityLayer.addChilds(this._createTiles(), 0, "terrain");
//            window.entityLayer.addChilds(this._createUnitSprites(), 0, "unit");
//            window.entityLayer.addChilds(this._createRourceSprites(), 0, "resource");
//        },
//        _createTiles: function () {
//            var moutain = this._createSprites(
//                this._levelData.items.terrain.moutain, MoutainSprite
//            );
//
//            return moutain;
//        },
//        _createBuildingSprites: function () {
//            var shootingRangeSprite = this._createSprites(
//                this._levelData.items.building.shootingRange, ShootingRangeSprite
//            );
//            var baseSprite = this._createSprites(
//                this._levelData.items.building.base, BaseSprite
//            );
//            var towerSprite = this._createSprites(
//                this._levelData.items.building.tower, TowerSprite
//            );
//
//            return shootingRangeSprite.concat(baseSprite, towerSprite);
//        },
//        _createUnitSprites: function () {
//            var ancherSprite = this._createSprites(
//                this._levelData.items.unit.archer, ArcherSprite
//            );
//            var farmerSprite = this._createSprites(
//                this._levelData.items.unit.farmer, FarmerSprite
//            );
//
//            return ancherSprite.concat(farmerSprite);
////                return ancherSprite;
//        },
//        _createRourceSprites: function () {
//            var foodSprite = this._createSprites(
//                this._levelData.items.resource.food, FoodSprite
//            );
//
//            return foodSprite;
//        },
//        _createSprites: function (items, Class) {
//            var i = 0,
//                len = 0,
//                sprites = [],
//                sprite = null;
//
//            for (i = 0, len = items.length; i < len; i++) {
////                sprite = new Class(items[i], imgId && YE.Bitmap.create(window.imgLoader.get(imgId)));
//                sprite = new Class(items[i]);
//                sprites.push(sprite);
//            }
//
//            return sprites;
//        },
        _initEvent: function () {
            var effectLayerCanvas = document.getElementById("effectLayerCanvas");

            var mapLayer = window.mapLayer,
                effectLayer = window.effectLayer;

            YE.EventManager.addListener(YE.Event.MOUSE_MOVE, mapLayer.onmousemove, effectLayerCanvas, mapLayer);
            YE.EventManager.addListener(YE.Event.CLICK, effectLayer.onclick, effectLayerCanvas, effectLayer);
//            YE.EventManager.addListener(YE.Event.CLICK, mapLayer.onclick, effectLayerCanvas, mapLayer);
//            YE.EventManager.addListener(YE.Event.MOUSE_DOWN, mapLayer.onmousedown, effectLayerCanvas, mapLayer);
//            YE.EventManager.addListener(YE.Event.CONTEXTMENU, mapLayer.oncontextmenu, effectLayerCanvas, mapLayer);
//            YE.EventManager.addListener(YE.Event.MOUSE_UP, mapLayer.onmouseup, effectLayerCanvas, mapLayer);
            YE.EventManager.addListener(YE.Event.MOUSE_OUT, mapLayer.onmouseout, effectLayerCanvas, mapLayer);
            YE.EventManager.addListener(YE.Event.MOUSE_OVER, mapLayer.onmouseover, effectLayerCanvas, mapLayer);

        }
    },
    Public: {
//        meat: 10,
//        playerTeam: "blue",

        onstartLoop: function () {
//            ui.showResource(this.meat);
        },
        onenter: function () {
//            this._levelData = LevelManager.getInstance().getLevelData();

            this._initScene();
            this._initEvent();

//            setInterval(function(){
//                ui.showSystemInfo("FPS:" + Math.floor(YE.Director.getInstance().getFps()));
//            }, 1000);
        },
        onexit: function () {
            YE.EventManager.removeAllListener();
        }
    }
});
