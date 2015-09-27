/**YImgEdit
 * 作者：YYC
 * 日期：2014-05-19
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    function _loadImg(imgUrlData, name) {
        var manager = YE.LoaderManager.getInstance();

        manager.preload([
            {type: "image", url: imgUrlData, id: name }
        ]);

        manager.onload = function () {
            exportData.imgDataUrl = imgUrlData;
            exportData.imgName = name;

            _drawImg(name);

            tool.showInfo("加载图片成功");
        }
    }

    function _drawImg(imgId) {
        var canvas = document.getElementById("originImgCanvas"),
            context = canvas.getContext("2d"),
            img = YE.ImgLoader.getInstance().get(imgId);

        _setCanvasSize(canvas, img);

        context.drawImage(img, 0, 0, img.width, img.height);
    }

    function _setCanvasSize(canvas, img) {
        canvas.width = img.width;
        canvas.height = img.height;
    }

    var upload = {
        initEvent: function () {
            $("#file").change(function (e) {
                var files = e.target.files,
                    i = 0,
                    len = files.length;

                YYC.Html5.file.readFile(files[0], function (e) {
                    if (/image/.test(this.file.type)) {
                        _loadImg(this.result, this.file.name);

                        return;
                    }
                    else {
                        tool.showError("只能上传图片");
                    }
                });
            });
            $("#upload").click(function () {
                $("#file").click();
            });
        }
    };

    window.upload = upload;
}());