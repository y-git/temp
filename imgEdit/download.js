/**YImgEdit
 * 作者：YYC
 * 日期：2014-05-19
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var download = {
        initEvent: function () {
            $("#download").click(function () {
                var file = YYC.Html5.file;

                file.createFileAndDownload(file.dataURLToBlob(exportData.imgDataUrl), exportData.imgName);
            });
        }
    };

    window.download = download;
}());