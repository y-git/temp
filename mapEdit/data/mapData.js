/**地图编辑器 地图数据
 * 作者：YYC
 * 日期：2014-05-10
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var category = {
    NULL: 0,
    TERRAIN: 1,
    TERRAINSPRITE: 2,
    RESOURCE: 3,
    BUILDING: 4,
    UNIT: 5
};
var mapData = {
    selectCategory: category.NULL,
    selectValue: null,
    isSelectUnitChange: false,
    meat:0,
    startX: 0,
    startY: 0,
    backgroundElement: "",
    mapGridHeight:0,
    mapGridWidth:0,
    //地图元素数据
    mapElement: [],
    //地形数据
    terrain: [],

    requirements: {
        interface: ["main"],
        building:[],
        unit: [],
        bullet: []
//        terrain: "terrain",
//        resource: "resource"
    },

    //实体
    items: {
        building: {
            shootingRange: [
            ],
            base: [
            ],

            tower: [
            ]
        },
        unit: {
            archer: [
            ],
            farmer: [
            ]
        },
        resource: {
            food: [
            ]
        },
        terrain: {
            moutain: [
            ],
            plants: [
            ]
        }
    }
};
