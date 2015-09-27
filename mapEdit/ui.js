/**地图编辑器 ui类
 * 作者：YYC
 * 日期：2014-05-10
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var ui = {
    getResourceNum: function () {
        return Number($("#resource").nextAll("input").val());
    }        ,
    getSelectTeam:function(){
        if(mapData.selectCategory === category.BUILDING){
            return $("#building option:checked").attr("team")  ;
        }
        else if(mapData.selectCategory === category.UNIT ){
            return $("#unit option:checked").attr("team") ;
        }
        else{
            throw new Error("没有team")
        }
    }
};