﻿

/************************************ 继承 ***************************************/

YYC.namespace("Tool").extend = (function () {
    return {
        //复制source到destination中(包括source的原型链和Object的原型链)
        //不用中间对象， 貌似有问题！
        //浅拷贝
        extend: function (destination, source) {
            //            var temp = {};

            var property = "";

            for (property in source) {
                //                temp[property] = source[property];  //用中间对象来保存source
                destination[property] = source[property];
            }
            return destination;
        },
        //destination中没有的属性不拷贝
        extendByExist: function (destination, source) {
            var property = "";

            for (property in source) {
                if (destination[property]) {
                    destination[property] = source[property];
                }
            }
            return destination;
        },
        //复制source到destination中(不包括source的原型链)
        //浅拷贝
        extendNoPrototype: function (destination, source) {
            //            var temp = {};
            var property = "";

            for (property in source) {
                if (source.hasOwnProperty(property)) {
                    destination[property] = source[property];
                }
            }
            return destination;
        },
        ///* 深拷贝

        //来自汤姆大叔
        //9-24

        //使用例子：
        //var dad = {    
        //counts: [1, 2, 3],   
        //reads: { paper: true }
        //};
        //var kid = extendDeepNoPrototype(dad);
        //kid.counts.push(4);
        //console.log(kid.counts.toString()); // "1,2,3,4"
        //console.log(dad.counts.toString()); // "1,2,3"
        //console.log(dad.reads === kid.reads); // false
        //kid.reads.paper = false;

        //*/
        //extendDeepNoPrototype: function (parent, child) {
        //    var i = null,
        //       len = 0,
        //             toStr = Object.prototype.toString,
        //             sArr = "[object Array]",
        //             sOb = "[object Object]",
        //             type = "",
        //      child = null;

        //    //数组的话，不获得Array原型上的成员。
        //    if (toStr.call(parent) === sArr) {
        //        child = _child || [];

        //        for (i = 0, len = parent.length; i < len; i++) {
        //            type = toStr.call(parent[i]);
        //            if (type === sArr || type === sOb) {    //如果为数组或object对象
        //                child[i] = type === sArr ? [] : {};
        //                this.extendDeep(parent[i], child[i]);
        //            } else {
        //                child[i] = parent[i];
        //            }
        //        }
        //    }
        //        //对象的话，要获得原型链上的成员。因为考虑以下情景：
        //        //类A继承于类B，现在想要拷贝类A的实例a的成员（包括从类B继承来的成员），那么就需要获得原型链上的成员。
        //    else if (toStr.call(parent) === sOb) {
        //        child = _child || {};

        //        for (i in parent) {
        //            if (parent.hasOwnProperty && parent.hasOwnProperty(i)) {

        //                //                if (typeof parent[i] === 'object') {    //null === 'object'也为true！

        //                type = toStr.call(parent[i]);
        //                if (type === sArr || type === sOb) {    //如果为数组或object对象
        //                    child[i] = type === sArr ? [] : {};
        //                    this.extendDeep(parent[i], child[i]);
        //                } else {
        //                    child[i] = parent[i];
        //                }
        //            }
        //        }
        //    }
        //    else {
        //        child = parent;
        //    }


        //    return child;
        //},
        extendDeep: function (parent, child) {
            var i = null,
                len = 0,
                      toStr = Object.prototype.toString,
                      sArr = "[object Array]",
                      sOb = "[object Object]",
                      type = "",
               _child = null;

            //数组的话，不获得Array原型上的成员。
            if (toStr.call(parent) === sArr) {
                _child = child || [];

                for (i = 0, len = parent.length; i < len; i++) {
                    type = toStr.call(parent[i]);
                    if (type === sArr || type === sOb) {    //如果为数组或object对象
                        _child[i] = type === sArr ? [] : {};
                        this.extendDeep(parent[i], _child[i]);
                    } else {
                        _child[i] = parent[i];
                    }
                }
            }
                //对象的话，要获得原型链上的成员。因为考虑以下情景：
                //类A继承于类B，现在想要拷贝类A的实例a的成员（包括从类B继承来的成员），那么就需要获得原型链上的成员。
            else if (toStr.call(parent) === sOb) {
                _child = child || {};

                for (i in parent) {
                    //if (parent.hasOwnProperty && parent.hasOwnProperty(i)) {

                    //                if (typeof parent[i] === 'object') {    //null === 'object'也为true！

                    type = toStr.call(parent[i]);
                    if (type === sArr || type === sOb) {    //如果为数组或object对象
                        _child[i] = type === sArr ? [] : {};
                        this.extendDeep(parent[i], _child[i]);
                    } else {
                        _child[i] = parent[i];
                    }
                }
                //}
            }
            else {
                _child = parent;
            }


            return _child;
        },
        /**
            *原型继承对象
           **/
        inherit: function (child, parent) {
            var func = function () { };
            func.prototype = parent.prototype;
            child.prototype = new func();
            child.prototype.constructor = child;
            child.prototype.parent = parent;
        }
    }
}());
