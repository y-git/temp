/**古代战争
 * 作者：YYC
 * 日期：2014-02-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var MapLayer = YYC.Class(YE.Layer, {
//    Init: function (id, zIndex, position) {
//        this.base(id, zIndex, position);
//    },
    Private: {
        _buttonPressed: false,
        _mapRoll: null,
        _mapSelect: null,

        _handleRoll: function () {
            var result = this._mapRoll.handleRoll();

            if (result === "update") {
                this.setStateChange();
            }
        },
        _createMapRoll: function (canvasWidth, canvasHeight) {
            return new MapRoll(canvasWidth, canvasHeight);
        },
//        _isDrag: function () {
//            return Math.abs(this.getDragX() - this.getGameX()) > 4
//                || Math.abs(this.getDragY() - this.getGameY()) > 4;
//        },
        _createAndSetBufferCanvas: function () {
            var configMap = config.map;
            var width = mapData.mapGridWidth * configMap.gridWidth;
            var height = mapData.mapGridHeight * configMap.gridHeight;

            window.mapBufferCanvas = document.createElement("canvas");
            //地图的上下左右四个角与画布边缘留出一段距离（pixOffsetX、pixOffsetY）
            window.mapBufferCanvas.width = width + configMap.pixOffsetX * 2;
            window.mapBufferCanvas.height = height + configMap.pixOffsetY * 2;
        },
        _buildMap: function () {
            var configMap = config.map,
                imgId = mapData.backgroundElement,
                i = 0,
                j = 0;

            for (i = 0; i < mapData.mapGridHeight; i++) {
                for (j = 0; j < mapData.mapGridWidth; j++) {
                    this._drawMapBufferGrid(imgId, [j, i]);
                }
            }


        },
        _initPassableGrid: function (isWithUnit) {
            if (isWithUnit) {
                this.currentMapPassableGridWithUnit = YYC.Tool.extend.extendDeep(mapData.terrain);
            }
            else {
                this.currentMapPassableGrid = YYC.Tool.extend.extendDeep(mapData.terrain);
            }
        },
        _initBuildableGrid: function () {
            this.currentMapBuildableGrid = YYC.Tool.extend.extendDeep(mapData.terrain);
        },
//        /**
//         * When the player right-clicks inside the game map, we first check to see whether the mouse is above an object.
//         If the player has not clicked an object, we call the game.sendCommand() method to send a move order to all
//         friendly vehicles and aircraft that are selected.
//         If the player has clicked an object, we similarly send either an attack, guard, or deploy command to the
//         appropriate units. We also pass the UID of the clicked item as a parameter called toUid within the order.
//         With the right-click logic in place, we now have to implement methods for sending and receiving game
//         commands.
//         * @private
//         */
//        _handleRightClick: function (clickItem) {
//            var unitItems = [],
//                selectItems = this._mapSelect.getSelectItems(),
//                entityLayer = window.entityLayer,
//                invoker = null,
//                command = null,
//                currentScene = YE.Director.getInstance().getCurrentScene();
//
//            window.effectLayer.cancelDeployBuilding();
//
//            invoker = new Invoker();
//
//            selectItems = selectItems.filter(function (item) {
//                return item.team === currentScene.playerTeam && !item.isDead();
//            });
//
//            if (selectItems.length === 0) {
//                return;
//            }
//
//            unitItems = selectItems.filter(function (item) {
//                return item.hasTag("unit");
//            });
//
//            this.rightClickItem = clickItem;
//
//            if (clickItem) {
//                if (clickItem.team && clickItem.team !== selectItems[0].team) {
//                    command = new AttackCommand(selectItems.filter(function (item) {
//                        return !!item.canAttack;
//                    }), clickItem);
//                }
//                else if (clickItem.isInstanceOf(BuildingSprite) && clickItem.isBuildState()) {
//                    command = new BuildCommand(unitItems.filter(function (item) {
//                        return item.isInstanceOf(FarmerSprite);
//                    }), clickItem);
//                }
//                else if (clickItem.isInstanceOf(FoodSprite)) {
//                    command = new GatherMeatCommand(unitItems.filter(function (item) {
//                        return item.isInstanceOf(FarmerSprite);
//                    }), clickItem);
//                }
//                else if (clickItem.isInstanceOf(BaseSprite)) {
//                    command = [
//                        this._toMove(unitItems.filter(function (item) {
//                            return !item.isInstanceOf(FarmerSprite) || (item.isInstanceOf(FarmerSprite) && item.gather_meat <= 0);
//                        }), invoker),
//                        new ReturnMeatCommand(unitItems.filter(function (item) {
//                            return item.isInstanceOf(FarmerSprite) && item.gather_meat > 0;
//                        }), clickItem)
//                    ];
//                }
//                else {
//                    command = this._toMove(unitItems, invoker);
//                }
//            }
//            else {
//                command = this._toMove(unitItems, invoker);
//            }
//
//            if (command) {
//                invoker.setCommand(command);
//                invoker.action();
//            }
//        },
//        _toMove: function (items, invoker) {
//            var gridPos = null;
//
//
//            if (items.length > 0) {
//                gridPos = tool.convertToGrid(this.getGameX(), this.getGameY());
//
////                return new MoveCommand(items, [
////                    Math.floor(gridPos[0]),
////                    Math.floor(gridPos[1])
////                ]);
//                return new MoveCommand(items, gridPos);
//            }
//
//            return null;
//        },
        _createInstance: function () {
            var canvasData = this.getCanvasData();

            this._mapRoll = this._createMapRoll(canvasData.width, canvasData.height);
            this._mapRoll.init();

//            this._mapSelect = new MapSelect();
        },
        _initViewPoint: function () {
//            var data = LevelManager.getInstance().getLevelData();

            var data = mapData;
//
//
            this._mapRoll.offsetX = data.startX;
            this._mapRoll.offsetY = data.startY;
        },
        _initMapData: function () {
            var x = 0,
                y = 0;

            for (y = 0; y < mapData.mapGridHeight; y++) {
                mapData.mapElement[y] = [];
                mapData.terrain[y] = [];
                for (x = 0; x < mapData.mapGridWidth; x++) {
                    mapData.mapElement[y][x] = 0;
                    mapData.terrain[y][x] = 0;
                }
            }
        },
        _drawMapBufferGrid: function (imgId, gridPos) {
            var configMap = config.map,
                context = window.mapBufferCanvas.getContext("2d"),
                img = YE.ImgLoader.getInstance().get(imgId),
                i = gridPos[1],
                j = gridPos[0],
                halfSize = tool.computeOnePixSize() / 2;

            if (tool.isDestOutOfMap(gridPos)) {
                return;
            }

            context.drawImage(img,
                (j + i) * configMap.gridWidth / 2 + configMap.pixOffsetX - halfSize * i - halfSize * j,
                (mapData.mapGridWidth - j + i - 1) * configMap.gridHeight / 2 + configMap.pixOffsetY - halfSize * i + halfSize * j,
                configMap.gridWidth,
                configMap.gridHeight);

            this._setMapData(imgId, gridPos);
        },
        _setMapData: function (imgId, gridPos) {
            var imgIndex = this._getTerrainImgIndex(imgId);

            mapData.mapElement[gridPos[1]][gridPos[0]] = imgIndex;

            if (this._isTerrainCanNotPass(imgIndex)) {
                mapData.terrain[gridPos[1]][gridPos[0]] = 1;
            }
        },
        _isTerrainCanNotPass: function (imgIndex) {
            return imgIndex === 3;
        },
        _getTerrainImgIndex: function (imgId) {
            var index = 0;

            switch (imgId) {
                case "grass":
                    index = 0;
                    break;
                case "desert":
                    index = 1;
                    break;
                case "road":
                    index = 2;
                    break;
                case "water":
                    index = 3;
                    break;
                default :
                    throw new Error(imgId + "错误");
                    break;
            }

            return index;
        },
        _isUnit: function (item) {
            return item.hasTag("unit");
        }
    },
    Public: {
//        dragSelect: false,
        currentMapPassableGrid: [],
        currentMapPassableGridWithUnit: [],
        currentMapBuildableGrid: [],
//        rightClickItem: null,

//        onclick: function (e) {
//            var clickedItem = this._mapSelect.itemUnderMouse(this.getGameX(), this.getGameY(), window.entityLayer.getChilds());
//
//            this._mapSelect.onclick(e, clickedItem);
//            this.dragSelect = false;
//
//            return false;
//        },
        onmousemove: function (e) {
            this._mapRoll.onmousemove(e);

//            if (this._buttonPressed) {
//                if (this._isDrag()) {
//                    this.dragSelect = true
//                }
//            } else {
//                this.dragSelect = false;
//            }
        },
//        onmousedown: function (e) {
//            this._mapSelect.onmousedown(e, this.getGameX(), this.getGameY());
//
//            if (e.mouseButton == 1) {
//                this._buttonPressed = true;
////                this.dragX = this.getGameX();
////                this.dragY = this.getGameY();
//                e.preventDefault();
//            }
//            return false;
//        },
//        onmouseup: function (e) {
//            this._mapSelect.onmouseup(e, this.dragSelect, this.getGameX(), this.getGameY(), window.entityLayer.getChilds());
//
//            if (e.mouseButton == 1) {
//                this._buttonPressed = false;
//                this.dragSelect = false;
//            }
//            return false;
//        },
        onmouseout: function (e) {
            this._mapRoll.onmouseout(e);
        },
        onmouseover: function (e) {
            this._mapRoll.onmouseover(e);
        },
//        oncontextmenu: function (e) {
//            this._handleRightClick(this._mapSelect.itemUnderMouse(this.getGameX(), this.getGameY(),
//                window.entityLayer.getChilds()));
////            this._handleRightClick();
//            e.preventDefault();
//            return false;
//        },
        draw: function (context) {
            var canvasData = this.getCanvasData();

            tool.drawBackgroundBlack(context, canvasData);

            context.drawImage(window.mapBufferCanvas,
                this.getOffsetX(), this.getOffsetY(),
                canvasData.width, canvasData.height,
                0, 0, canvasData.width, canvasData.height);

            this.base(context);
        },
        drawTerrain: function (imgId, gridPos) {
            this._drawMapBufferGrid(imgId, gridPos);

            this.setStateChange();
        },
        getOffsetX: function () {
            return this._mapRoll.offsetX;
//            return 0;
        },
        getOffsetY: function () {
            return this._mapRoll.offsetY;
//            return 0;
        },
        getGameX: function () {
            return this._mapRoll.gameX;
        },
        getGameY: function () {
            return this._mapRoll.gameY;
        },
//        getDragX: function () {
//            return this._mapSelect.dragX;
//        },
//        getDragY: function () {
//            return this._mapSelect.dragY;
//        },
        getX: function () {
            return this._mapRoll.x;
        },
        getY: function () {
            return this._mapRoll.y;
        },
//        getSelectionBorderColor: function () {
//            return this._mapSelect.selectionBorderColor;
//        },
//        getSelectionFillColor: function () {
//            return this._mapSelect.selectionFillColor;
//        },
//        getLifeBarHeight: function () {
//            return this._mapSelect.lifeBarHeight;
//        },
//        getHealthBarHealthyFillColor: function () {
//            return this._mapSelect.healthBarHealthyFillColor;
//        },
//        getHealthBarDamagedFillColor: function () {
//            return this._mapSelect.healthBarDamagedFillColor;
//        },
        getLeftHalfAngle: function () {
            return Math.atan(config.map.gridHeight / config.map.gridWidth);
        },
        getUpHalfAngle: function () {
            return Math.atan(config.map.gridWidth / config.map.gridHeight);
        },
        isChange: function () {
            return false;
        },
        onstartLoop: function () {
            this._handleRoll();
        },
        onenter: function () {
            this._initMapData();

            this._createAndSetBufferCanvas();
            this._buildMap();

            this._createInstance();

            this._initViewPoint();

            this._initBuildableGrid();

            this.setStateChange();
        },
//        buildPassableGrid: function (isWithUnit, uid) {
//            var items = null;
//            var x = 0,
//                y = 0,
//                self = this;
//
//            if (isWithUnit) {
//                items = window.entityLayer.getChilds();
//                items = items.filter(function (item) {
//                    if (item.isDead()) {
//                        return false;
//                    }
//
//                    return true;
//                });
//
//                this._initPassableGrid(isWithUnit);
//
//                items.forEach(function (item) {
//                    if (item.getUid() === uid) {
//                        return;
//                    }
//                    if (self._isUnit(item)) {
//                        self.currentMapPassableGridWithUnit[Math.floor(item.gridY)][Math.floor(item.gridX)] = 1;
//                    }
//                    else {
////                        if (!item.passableGrid) {
////                            return;
////                        }
//
//                        for (y = 0; y < item.passableGrid.length; y++) {
//                            for (x = 0; x < item.passableGrid[y].length; x++) {
//                                if (item.passableGrid[y][x] === 1) {
//                                    self.currentMapPassableGridWithUnit[
//                                        Math.floor(item.gridY) + y][Math.floor(item.gridX) + x] = 1;
//                                }
//                            }
//                        }
//                    }
//                });
//            }
//            else {
//                items = window.entityLayer.getChildsByTag(["building", "terrain", "resource"]);
//                items = items.filter(function (item) {
//                    if (item.isDead()) {
//                        return false;
//                    }
////                if (item.hasTag("building") && !item.isBuildState() ) {
////                    return false;
////                }
//
//                    return true;
//                });
//
//                this._initPassableGrid();
//
//                items.forEach(function (item) {
////                    if (!item.passableGrid) {
////                        return;
////                    }
//
//                    for (y = 0; y < item.passableGrid.length; y++) {
//                        for (x = 0; x < item.passableGrid[y].length; x++) {
//                            if (item.passableGrid[y][x] === 1) {
//                                self.currentMapPassableGrid[
//                                    Math.floor(item.gridY) + y][Math.floor(item.gridX) + x] = 1;
//                            }
//                        }
//                    }
//                });
//            }
//        },
        buildBuildableGrid: function () {
            var items = window.entityLayer.getChilds();
            var self = this;

            items = items.filter(function (item) {
                if (item.isDead) {
                    return !item.isDead();
                }
                return true;
            });

            this._initBuildableGrid();

            items.forEach(function (item) {
                if (self._isUnit(item)) {
                    self.currentMapBuildableGrid[Math.floor(item.gridY)][Math.floor(item.gridX)] = 1;
                }
                else {
                    for (var y = item.buildableGrid.length - 1; y >= 0; y--) {
                        for (var x = item.buildableGrid[y].length - 1; x >= 0; x--) {
                            if (item.buildableGrid[y][x]) {
                                self.currentMapBuildableGrid[item.gridY + y][item.gridX + x] = 1;
                            }
                        }
                    }
                }
            });
        }
//        getSelectItems: function () {
//            return this._mapSelect.getSelectItems();
//        },
//        notSelectItem: function (item) {
//            this._mapSelect.notSelectItem(item);
//        }
    }
});