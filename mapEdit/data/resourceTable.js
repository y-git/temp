/**古代战争 总的资源对应表
 * 作者：YYC
 * 日期：2014-02-25
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var resourceTable = {
    map: [
        {type: "image", url: "../content/image/map/terrain_grass.png", id: "grass" },
        {type: "image", url: "../content/image/map/terrain_desert.png", id: "desert" },
        {type: "image", url: "../content/image/map/terrain_road.png", id: "road" },
        {type: "image", url: "../content/image/map/terrain_water.png", id: "water" }
    ],
    building: [
        {type: "image", url: "../content/image/sprite/building/building.png", id: "building_image" },
        {type: "json", url: "../script/war/data/building.json", id: "building_json" }
    ],
    archer: [
        {type: "image", url: "../content/image/sprite/soldier/archer.png", id: "archer_image"},
        {type: "json", url: "../script/war/data/archer.json", id: "archer_json"}
    ],
    farmer: [
        {type: "image", url: "../content/image/sprite/farmer/farmer.png", id: "farmer_image"},
        {type: "json", url: "../script/war/data/farmer.json", id: "farmer_json"}
    ],
    terrain: [
        {type: "image", url: "../content/image/sprite/terrain/terrain.png", id: "terrain_image" },
        {type: "json", url: "../script/war/data/terrain.json", id: "terrain_json"}
    ],
    resource: [
        {type: "image", url: "../content/image/sprite/resource/resource.png", id: "resource_image" },
        {type: "json", url: "../script/war/data/resource.json", id: "resource_json" }
    ]
};