/**YEngine2D
 * 作者：YYC
 * 日期：2014-01-17
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */


var EffectLayer = YYC.Class(YE.Layer, {
    Private: {
        _canPlace: false,
        _placementGrid: null,

        _drawTerrainBox: function () {
            var mapLayer = window.mapLayer,
                offsetX = mapLayer.getOffsetX(),
                offsetY = mapLayer.getOffsetY(),
                gridSize = tool.getGridSize(),
                mouseGridPos = null,
                fillStyle = null,
                originPoint = null;

            mouseGridPos = this._getMouseFloorGridPos();

            //plants和entityLayer的精灵不能位于“水”这个地图元素上
            if (tool.isDestOutOfMap(mouseGridPos) ||
                (this._isSelectWater() &&
                    (  this._canNotPlaceByBuildableGrid(mouseGridPos) || this._isPlants(mouseGridPos)))) {
                fillStyle = "rgba(255,0,0,0.6)";
                this._canPlace = false;
            }
            else {
                fillStyle = "rgba(0,0,255,0.3)";
                this._canPlace = true;
            }

            originPoint = tool.convertToPix(mouseGridPos[0], mouseGridPos[1]);
            this.getGraphics().fillDiamondBox(fillStyle,
                [originPoint[0] - offsetX, originPoint[1] - offsetY], mapLayer.getLeftHalfAngle(),
                gridSize);
        },
        _isPlants: function (gridPos) {
            return window.mapLayer.getChildsByTag("plants").filter(function (sprite) {
                return sprite.gridX === gridPos[0] && sprite.gridY === gridPos[1]
            }).length > 0;
        },
        _isSelectWater: function () {
            return mapData.selectValue === "water";
        },
        _drawSpriteBox: function () {
            var mapLayer = window.mapLayer,
                offsetX = mapLayer.getOffsetX(),
                offsetY = mapLayer.getOffsetY(),
                gridSize = tool.getGridSize(),
                mouseGridPos = null,
                fillStyle = null,
                originPoint = null;

            mouseGridPos = this._getMouseFloorGridPos();

            for (var i = this._placementGrid.length - 1; i >= 0; i--) {
                for (var j = this._placementGrid[i].length - 1; j >= 0; j--) {
                    //不可放置
                    if (this._placementGrid[i][j] === 0) {
                        fillStyle = "rgba(255,0,0,0.6)";
                    }
                    else {
                        fillStyle = "rgba(0,0,255,0.3)";
                    }

                    originPoint = tool.convertToPix(mouseGridPos[0] + j, mouseGridPos[1] + i);
                    this.getGraphics().fillDiamondBox(fillStyle,
                        [originPoint[0] - offsetX, originPoint[1] - offsetY], mapLayer.getLeftHalfAngle(),
                        gridSize);
                }
            }
        },
        _getBuildableGrid: function (spriteName) {
            return config.spriteConfig[spriteName].buildableGrid;
        },
        _drawUnit: function () {
            var x = mapLayer.getX(),
                y = mapLayer.getY(),
                gridPos = tool.convertToGrid(x, y),
                mouseGridPos = this._getMouseFloorGridPos();


            if (!mapData.selectUnit || mapData.isSelectUnitChange) {
                this._createSelectUnit(gridPos);
                mapData.isSelectUnitChange = false;
            }

            this._drawFrame(mapData.selectUnit.getShowFrame(), x, y, mapData.selectUnit.getWidth(), mapData.selectUnit.getHeight());

            if (tool.isDestOutOfMap(mouseGridPos) || this._canNotPlaceByBuildableGrid(mouseGridPos)) {
                this._canPlace = false;
            }
            else {
                this._canPlace = true;
            }
        },
        _createSelectUnit: function (gridPos) {
            var Class = this._getClassByValue(mapData.selectValue),
                spriteData = {gridX: gridPos[0], gridY: gridPos[1], team: ui.getSelectTeam()};

            mapData.selectUnit = new Class(spriteData);
        },
        _drawFrame: function (frame, x, y, width, height) {
            this.getContext().drawImage(
                frame.getImg(),
                frame.getX(), frame.getY(), frame.getWidth(), frame.getHeight(),
                x - frame.getPixelOffsetX(), y - frame.getPixelOffsetY(), width, height
            );
        },
        _setFlagAndPlacementGrid: function (gameGridPos) {
            this._placementGrid = this._getBuildableGrid(mapData.selectValue);
            this._canPlace = true;

            for (var i = 0; i < this._placementGrid.length; i++) {
                for (var j = 0; j < this._placementGrid[i].length; j++) {
                    if (tool.isDestOutOfMap([gameGridPos[0] + j, gameGridPos[1] + i]) ||
                        this._canNotPlaceByBuildableGrid([gameGridPos[0] + j, gameGridPos[1] + i])) {
                        this._canPlace = false;
                        this._placementGrid[i][j] = 0;
                    }
                    else {
                        this._placementGrid[i][j] = 1;
                    }
                }
            }
        },
        _canNotPlaceByBuildableGrid: function (gridPos) {
            return mapLayer.currentMapBuildableGrid[gridPos[1]][gridPos[0]] === 1;
        },
        _getMouseFloorGridPos: function () {
            var gameX = mapLayer.getGameX(),
                gameY = mapLayer.getGameY(),
                mouseGridPos = tool.convertToGrid(gameX, gameY);

            return [Math.floor(mouseGridPos[0]), Math.floor(mouseGridPos[1])];
        },
        _initPlacementGrid: function () {
            var mouseGridPos = this._getMouseFloorGridPos();

            if (tool.isDestOutOfMap(mouseGridPos)) {
                this._canPlace = false;
            }
            else {
                this._canPlace = true;
            }

            mapLayer.buildBuildableGrid();

            this._setFlagAndPlacementGrid(mouseGridPos);
        },
        _addTerrain: function () {
            var mouseGridPos = this._getMouseFloorGridPos();

            if (this._canPlace) {
                window.mapLayer.drawTerrain(mapData.selectValue, mouseGridPos);
            }
        },
        _addItem: function () {
            if (!this._canPlace) {
                return;
            }
            var mouseGridPos = this._getMouseFloorGridPos(),
                spriteData = {gridX: mouseGridPos[0], gridY: mouseGridPos[1]};

            if (mapData.selectValue === "moutain") {
                this._addSprite(spriteData, "terrain");
                this._setMapData(spriteData, "terrain", "moutain", "terrain", "terrain");
            }
            else if (mapData.selectValue === "plants") {
                this._addSprite(spriteData, "terrain", window.mapLayer);
                this._setMapData(spriteData, "terrain", "plants", "terrain", "terrain");
            }
            else if (mapData.selectValue === "food") {
                spriteData.total = ui.getResourceNum();

                this._addSprite(spriteData, "resource");
                this._setMapData(spriteData, "resource", "food", "resource", "resource");
            }
            else if (mapData.selectCategory === category.BUILDING) {
                spriteData.team = ui.getSelectTeam();

                this._addSprite(spriteData, "building");
                this._setMapData(spriteData, "building", mapData.selectValue, "building", mapData.selectValue);
            }
            else if (mapData.selectCategory === category.UNIT) {
                spriteData = this._getUnitSpriteData();

//                mapData.selectUnit.gridX = spriteData.gridX;
//                mapData.selectUnit.gridY = spriteData.gridY;
//                mapData.selectUnit.team = spriteData.team;
//
//                window.entityLayer.addChild(mapData.selectUnit, 0, "unit");

                this._addSprite(spriteData, "unit");
                this._setMapData(spriteData, "unit", mapData.selectValue, "unit", mapData.selectValue);
            }
        },
        _getUnitSpriteData: function () {
            var gameX = mapLayer.getGameX(),
                gameY = mapLayer.getGameY(),
                mouseGridPos = tool.convertToGrid(gameX, gameY);

            return {gridX: mouseGridPos[0], gridY: mouseGridPos[1], team: ui.getSelectTeam()};
        },
        _getClassByValue: function (selectValue) {
            var Class = null;

            switch (selectValue) {
                case "moutain" :
                    Class = MoutainSprite;
                    break;
                case "plants" :
                    Class = PlantsSprite;
                    break;
                case "food" :
                    Class = FoodSprite;
                    break;
                case "base" :
                    Class = BaseSprite;
                    break;
                case "shootingRange" :
                    Class = ShootingRangeSprite;
                    break;
                case "tower" :
                    Class = TowerSprite;
                    break;
                case "archer":
                    Class = ArcherSprite;
                    break;
                case "farmer":
                    Class = FarmerSprite;
                    break;
                default :
                    throw new Error(selectValue + "错误");
                    break;
            }

            return Class;
        },
        _setMapData: function (spriteData, itemCategory1, itemCategory2, requirementCategory, requirementValue) {
            mapData.items[itemCategory1][itemCategory2].push(spriteData);

            if (YYC.Tool.judge.isArray(mapData.requirements[requirementCategory])) {
                mapData.requirements[requirementCategory].pushNoRepeat(requirementValue);
            }
            else {
                mapData.requirements[requirementCategory] = requirementValue;
            }

            if (requirementValue === "archer") {
                mapData.requirements.bullet.pushNoRepeat("arrow");
            }
        },
        _addSprite: function (spriteData, spriteTag, layer) {
            var sprite = null,
                layer = layer || window.entityLayer,
                Class = this._getClassByValue(mapData.selectValue);


            sprite = new Class(spriteData);

            layer.addChild(sprite, 0, spriteTag);
            layer.setStateChange();
        }
    },
    Public: {
        draw: function () {
            if (mapData.selectCategory === category.NULL) {
                return;
            }

            if (mapData.selectCategory === category.TERRAIN) {
                this._drawTerrainBox();
            }
            else if (mapData.selectCategory === category.UNIT) {
                this._drawUnit();
            }
            else {
                this._drawSpriteBox();
            }
        },
        onclick: function () {
            if (mapData.selectCategory === category.NULL) {
                return;
            }

            if (mapData.selectCategory === category.TERRAIN) {
                this._addTerrain();
            }
            else {
                this._addItem();
            }
        },
        onstartLoop: function () {
            if (mapData.selectCategory === category.TERRAINSPRITE ||
                mapData.selectCategory === category.RESOURCE ||
                mapData.selectCategory === category.BUILDING) {
                this._initPlacementGrid();
            }
        },
        onendLoop: function () {
        }
    }
});