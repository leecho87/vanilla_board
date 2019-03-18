/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function(){\n    document.addEventListener('DOMContentLoaded', function(){\n        var model = new Model();\n        var view = new View(model);\n        var controller = new Controller(model, view);\n    });\n})();\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/Controller.js":
/*!***************************!*\
  !*** ./src/Controller.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Controller = function (model, view) {\n    this.model = model;\n    this.view = view;\n    this.router();\n    window.addEventListener('hashchange', this.router.bind(this))\n}\nController.prototype = {\n    router : function(){\n        var regExpHash = /\\#\\w+/;\n        var regExpKey = /\\d+/\n        var hash = (location.hash.length <= 0) ? '' : regExpHash.exec(location.hash)[0].replace('#','');\n        var key = (!location.hash.match(/\\?key/)) ? '' : regExpKey.exec(location.hash)[0]\n\n        switch(hash){\n            case '' :\n                this.listHandler();\n                break;\n            case 'list' :\n                this.listHandler();\n                break;\n            case 'write' :\n                this.writeHandler();\n                break;\n            case 'detail' :\n                this.detailHandler(key);\n                break;\n            case 'modify' :\n                this.modifyHandler(key);\n                break;\n            default :\n                alert('페이지가 올바르지 않습니다.');\n                this.listHandler();\n        }\n        // if(!hash || hash === 'list'){\n        //     this.listHandler();\n        // }else if(hash === 'write'){\n        //     this.writeHandler();\n        // }else if(hash === 'detail'){\n        //     this.detailHandler(key);\n        // }else if(hash === 'modify'){\n        //     this.modifyHandler(key)\n        // }\n    },\n    getKey : function(){\n        var key = location.hash.match(/\\d+/);\n        return key;\n    },\n    writeHandler: function () {\n        this.view.writeRender();\n        this.view.container.querySelector('form').addEventListener('submit', this.validator.bind(this))\n    },\n    validator: function (e) {\n        e.preventDefault();\n        var form = this.view.container.querySelector('form');\n        var name = form.querySelector('[name=name]');\n        var title = form.querySelector('[name=title]');\n        var contents = form.querySelector('[name=contents]');\n        var key = form.querySelector('[name=dataKey]');\n\n        if (!name.value) {\n            alert('이름을 입력해주세요.');\n            name.focus();\n            return false;\n        }\n        if (!title.value) {\n            alert('제목을 입력해주세요.');\n            title.focus();\n            return false;\n        }\n        if (!contents.value) {\n            alert('내용을 입력해주세요.');\n            contents.focus();\n            return false;\n        }\n\n        if (form.id === \"WriteForm\") {\n            var data = {\n                title: title.value,\n                contents: contents.value,\n                name: name.value,\n            };\n            return this.createHandler(data);\n        } else {\n            var data = {\n                title: title.value,\n                contents: contents.value,\n                name: name.value\n            }\n            return this.updateHandler(key.value, data)\n        }\n    },\n    createHandler: function (data) {\n        // 정보만들기\n        this.model.createData(data);\n        // 리스트 만드는 함수 호출\n        this.listHandler();\n    },\n    listHandler: function () {\n        // 리스트만들기\n        this.view.createItem(this.model.data);\n        location.hash = '#list';\n    },\n    detailHandler: function (key) {\n        this.view.detailRender(key, this.model.data);\n        this.view.container.querySelector('#delete').addEventListener('click', this.deleteHandler.bind(this));\n    },\n    modifyHandler: function (key) {\n        this.view.modifyRender(key, this.model.data[key]);\n        this.view.container.querySelector('#update').addEventListener('click', this.validator.bind(this));\n    },\n    updateHandler: function (key, data) {\n        this.model.updateData(key, data)\n        this.listHandler();\n    },\n    deleteHandler: function () {\n        var useKey = this.view.container.querySelector('[name=dataKey]').value;\n        this.model.deleteData(useKey);\n        this.listHandler();\n    }\n}\n\n//# sourceURL=webpack:///./src/Controller.js?");

/***/ }),

/***/ "./src/Model.js":
/*!**********************!*\
  !*** ./src/Model.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Model = function () {\n    this.data = {\n        \"1324\": {\n            title: '제목원',\n            contents: '내용원',\n            name: '이름원'\n        }\n    }\n}\nModel.prototype = {\n    createData: function (data) {\n        var randomKey = Math.round(Math.random() * 1000);\n        this.data[randomKey] = {\n            title: data.title,\n            contents: data.contents,\n            name: data.name\n        };\n    },\n    updateData: function (key, data) {\n        this.data[key] = {\n            title: data.title,\n            contents: data.contents,\n            name: data.name\n        };\n    },\n    deleteData: function (key) {\n        delete this.data[key];\n    },\n    getData: function () {\n        return this.data;\n    }\n};\n\n//# sourceURL=webpack:///./src/Model.js?");

/***/ }),

/***/ "./src/View.js":
/*!*********************!*\
  !*** ./src/View.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var View = function (model) {\n    this.model = model;\n    this.init();\n}\nView.prototype = {\n    init: function () {\n        this.container = document.querySelector('#app');\n    },\n    writeRender: function () {\n        var template = function () {\n            return `\n                <div class=\"container\" id=\"PageWrite\">\n                <form id=\"WriteForm\">\n                    <table>\n                        <tbody>\n                            <tr>\n                                <th>이름</th>\n                                <td><input type=\"text\" name=\"name\" placeholder=\"이름을 입력하세요\" /></td>\n                            </tr>\n                            <tr>\n                                <th>제목</th>\n                                <td><input type=\"text\" name=\"title\" placeholder=\"제목을 입력하세요\" /></td>\n                            </tr>\n                            <tr>\n                                <th>내용</th>\n                                <td><textarea name=\"contents\" placeholder=\"내용을 입력하세요\"></textarea></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                    <div class=\"buttonBox\">\n                        <button type=\"submit\">글등록</button>\n                        <a href=\"#list\">목록보기</a>\n                    </div>\n                </form>\n                </div>\n            `\n        };\n        this.container.innerHTML = template();\n    },\n    createItem: function (data) {\n        var item = ``;\n        if (!(JSON.stringify(data) === '{}')) {\n            for (var key in data) {\n                item += `<tr>`\n                item += `<td><a href=\"#detail?key=${key}\" data-key=\"${key}\">${data[key].title}</a></td>`\n                item += `<td><a href=\"#detail?key=${key}\" data-key=\"${key}\">${data[key].contents}</a></td>`\n                item += `<td>${data[key].name}</td>`\n                item += `</tr>`\n            }\n        } else {\n            item += `<tr><td colspan=\"3\">데이터가 없습니다.</td></tr>`;\n        }\n        return this.listRender(item);\n    },\n    listRender: function (item) {\n        var template = function (item) {\n            return `\n                <div class=\"container\" id=\"PageList\">\n                    <table>\n                        <colgroup>\n                            <col width=\"auto\">\n                            <col width=\"auto\">\n                            <col width=\"15%\">\n                        </colgroup>\n                        <thead>\n                            <tr>\n                                <th scope=\"col\">제목</th>\n                                <th scope=\"col\">내용</th>\n                                <th scope=\"col\">이름</th>\n                            </tr>\n                        </thead>\n                        <tbody id=\"ListRows\">${item}</tbody>\n                    </table>\n                    <div class=\"buttonBox buttonBox--right\">\n                        <a href=\"#write\">작성하기</a>\n                    </div>\n                </div>\n            `\n        }\n        this.container.innerHTML = template(item);\n    },\n    detailRender: function (key, data) {\n        var template = function () {\n            return `\n            <form id=\"DetailForm\">\n                <input type=\"hidden\" name=\"dataKey\" value=\"${key}\"/>\n                <div class=\"container\" id=\"PageDetail\">\n                    <table>\n                        <colgroup>\n                            <col width=\"25%\" />\n                            <col width=\"25%\" />\n                            <col width=\"25%\" />\n                            <col width=\"25%\" />\n                        </colgroup>\n                        <tbody>\n                            <tr>\n                                <th>제목</th>\n                                <td>${data[key].title}</td>\n                                <th>이름</th>\n                                <td>${data[key].name}</td>\n                            </tr>\n                            <tr>\n                                <th>내용</th>\n                                <td colspan=\"3\">${data[key].contents}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n                    <div class=\"buttonBox\">\n                        <a href=\"#modify?key=${key}\">수정하기</a>\n                        <a href=\"#list\">목록으로</a>\n                        <a href=\"#\" id=\"delete\">삭제하기</a>\n                    </div>\n                </div>\n            </form>\n            `\n        }\n        this.container.innerHTML = template();\n    },\n    modifyRender: function (key, data) {\n        var template = function () {\n            return `\n            <div class=\"container\" id=\"PageUpdate\">\n            <form id=\"UpdateForm\">\n                <input type=\"hidden\" name=\"dataKey\" value=\"${key}\" />\n                <table>\n                    <tbody>\n                        <tr>\n                            <th>이름</th>\n                            <td><input type=\"text\" name=\"name\" placeholder=\"이름을 입력하세요\" value=\"${data.name}\" /></td>\n                        </tr>\n                        <tr>\n                            <th>제목</th>\n                            <td><input type=\"text\" name=\"title\" placeholder=\"제목을 입력하세요\" value=\"${data.title}\"/></td>\n                        </tr>\n                        <tr>\n                            <th>내용</th>\n                            <td><textarea name=\"contents\" placeholder=\"내용을 입력하세요\">${data.contents}</textarea></td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class=\"buttonBox\">\n                    <a href=\"#list\" id=\"update\">수정완료</a>\n                    <a href=\"#detail?key=${key}\">취소</a>\n                </div>\n            </form>\n            </div>\n            `\n        }\n        this.container.innerHTML = template();\n    }\n}\n\n//# sourceURL=webpack:///./src/View.js?");

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./src/Model.js ./src/View.js ./src/Controller.js ./src/App.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/Model.js */\"./src/Model.js\");\n__webpack_require__(/*! ./src/View.js */\"./src/View.js\");\n__webpack_require__(/*! ./src/Controller.js */\"./src/Controller.js\");\nmodule.exports = __webpack_require__(/*! ./src/App.js */\"./src/App.js\");\n\n\n//# sourceURL=webpack:///multi_./src/Model.js_./src/View.js_./src/Controller.js_./src/App.js?");

/***/ })

/******/ });