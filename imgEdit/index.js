/**YImgEdit
 * 作者：YYC
 * 日期：2014-05-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var index = {
      init:function(){
          var manager = YE.LoaderManager.getInstance();

          manager.preload([
              {type: "image", url: "../imgEdit/content/bg_canvas.gif", id: "transparentBackground" }
          ]);

          manager.onload = function () {
              upload.initEvent();
              download.initEvent();
              removeBackground.initEvent();
              imgOperate.initEvent();
          }
      }
};