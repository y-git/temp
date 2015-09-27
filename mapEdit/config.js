/**古代战争
 * 作者：YYC
 * 日期：2014-02-02
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var config = {
    map: {
        //方格大小
        gridWidth: 60,
        gridHeight: 30,
        //地图大小
        mapGridWidth: 90,
        mapGridHeight: 90,
        /**
         * 地图四个角距离画布的距离
         * @type {number}
         */
        pixOffsetX: 300,
        pixOffsetY: 300
    },
    spriteConfig: {
        base: {
            width: 170,
            height: 135,
            baseSize: 100,

            pixelOffsetX: 0,
            pixelOffsetY: 110,
            buildableGrid: [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ],
            passableGrid: [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ],
//            canAttack: false,
//            cost: 5,
//            build_speed: 0.5,
            hitPoints: 800
//            sight: 8
        },
        shootingRange: {
            width: 170,
            height: 135,
            baseSize: 100,

            pixelOffsetX: -5,
            pixelOffsetY: 95,

            buildableGrid: [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ],
            passableGrid: [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ],
//            canAttack: false,
            hitPoints: 600
//            sight: 8,
//            cost: 5,
//            build_speed: 0.05
        },
        tower: {
            width: 60,
            height: 100,
            baseSize: 33,

            pixelOffsetX: 0,
            pixelOffsetY: 88,

            buildableGrid: [
                [1]
            ],
            passableGrid: [
                [1]
            ],
            hitPoints: 6
//            canAttack: true,
//            sight: 10,
//            attackDistance: 8,
//            damage: 1,
//            reloadTime: 40,
//            cost: 20,
//            build_speed: 0.05
        },
        farmer: {
            width: 30,
            height: 40,
//            gather_width: 35,
//            gather_height: 40,
//            build_width: 35,
//            build_height: 40,
//            attack_width: 55,
//            attack_height: 55,
//            dead_width: 60,
//            dead_height: 60,
//            defaultAnim: "normal_stand_4",

            hitPoints: 200,
            radius: 10
//            speed: 60,
//            gather_maxMeat: 5,
//            gather_speed: 0.05,
//            canAttack: true,
//            attackDistance: 0.5,
//            sight: 5,
//            reloadTime: 100,
//            damage: 1,
//            damageFrameIndex: 7,
//            produce_speed: 2,
//            cost: 5
        },
        archer: {
            width: 60,
            height: 60,
//            attack_width: 70,
//            attack_height: 75,
//            dead_width: 120,
//            dead_height: 120,

            hitPoints: 4,
            radius: 12
//            speed: 50,
//            canAttack: true,
//            attackDistance: 5,
//            sight: 6,
//            reloadTime: 40,
//            damage: 1,
//            damageFrameIndex: 3,
//            produce_speed: 2,
//            cost: 5
        },
        food: {
            width: 60,
            height: 60,
            baseSize: 33,

            pixelOffsetX: 0,
            pixelOffsetY: 45,


//            selectRangeWidth: 50,
//            selectRangeHeight: 50,

            buildableGrid: [
                [1]
            ],
            passableGrid: [
                [1]
            ]
        },
        moutain: {
            width: 120,
            height: 120,
            pixelOffsetX: -10,
            pixelOffsetY: 80,
            buildableGrid: [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ],
            passableGrid: [
                [1, 1, 1],
                [1, 1, 1],
                [1, 0, 0]
            ]
        },
        plants: {
            width: 30,
            height: 30,
            pixelOffsetX: -15,
            pixelOffsetY: 18,
            buildableGrid: [
                [0]
            ],
            passableGrid: [
                [0]
            ]
        }
    }
};