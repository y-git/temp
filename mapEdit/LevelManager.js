/**古代战争
 * 作者：YYC
 * 日期：2014-02-03
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    var LevelManager = YYC.Class({
        Private: {
            _getLevelResource: function () {
                var resource = [],
                    i = null;

                for (i in resourceTable) {
                    if (resourceTable.hasOwnProperty(i)) {
                        resource = resource.concat(resourceTable[i]);
                    }
                }

                return resource;
            }
        },
        Public: {
            start: function () {
                this.startCurrentLevel();
            },
            startCurrentLevel: function () {
                var loaderManager = YE.LoaderManager.getInstance();

                var self = this;

//                        this._resetLevel();

//                        ui.showLevelBrif(this.getLevelData().brief);

//                        loaderManager.onloading = function (currentLoad, resCount) {
//                            ui.showLoadingMessage("正在加载第" + currentLoad + "/" + resCount + "个资源");
//                        };
                loaderManager.onload = function () {
//                            ui.showLoadingMessage("正在初始化动画");
//
//
//                            YE.FrameCache.getInstance().addFrameData("arrow_json", "arrow_image");
//                            YE.AnimationCache.getInstance().addAnimWithFile("anim_arrow_json");
//
//                            YE.FrameCache.getInstance().addFrameData("archer_json", "archer_image");
//                            YE.AnimationCache.getInstance().addAnimWithFile("anim_archer_json");
//
//                            YE.FrameCache.getInstance().addFrameData("farmer_json", "farmer_image");
//                            YE.AnimationCache.getInstance().addAnimWithFile("anim_farmer_json");
//
//
//                            //延迟50ms执行，从而在显示"正在初始化弓箭手和农民动画"后再执行初始化；
//                            //如果不延迟，初始化会阻塞ui线程，从而“ui.showLoadingMessage("正在初始化弓箭手和农民动画");”会在完成初始化后才执行
//                            setTimeout(function () {
//                                var animPool = AnimPool.getInstance();
//
////                        animPool.initWithFile("anim_archer_json");
////
////                        animPool.initWithFile("anim_farmer_json");
//
//                                ui.showLoadingMessage("加载完成，点击进入游戏");
//                            }, 50);


                    self.enterGame();
                };

                loaderManager.preload(this._getLevelResource());
            },
            enterGame: function () {
//                    var triggers = this.getLevelData().triggers,
//                            i = 0;

//                ui.showGameArea();
                YE.Director.getInstance().runWithScene(new Scene());

//                    for (i = triggers.length - 1; i >= 0; i--) {
//                        this.initTrigger(triggers[i]);
//                    }
            }
        },
        Static: {
            getInstance: function () {
                if (_instance === null) {
                    _instance = new this();
                }
                return _instance;
            },
            forTest_clearInstance: function () {
                _instance = null;
            }
        }
    });

    window.LevelManager = LevelManager;
}());