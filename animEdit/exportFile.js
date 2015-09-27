/**YAnimEdit
 * 作者：YYC
 * 日期：2014-05-15
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var exportFile = {
    initEvent: function () {
        $("#export").click(function () {
            YYC.Html5.file.createFileAndDownload(YYC.Tool.convert.toString(exportData.fileData), "application/json", "anim.json");
        });
    }
};