/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Roboto);", ""]);

	// module
	exports.push([module.id, "::selection {\n  background: #F44336;\n  color: #FFFFFF; }\n\n::-moz-selection {\n  background: #F44336;\n  color: #FFFFFF; }\n\nhtml {\n  height: 100%; }\n\nbody {\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  margin: 0px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif !important;\n  font-weight: 350;\n  font-size: 16px; }\n\nbody * {\n  box-sizing: border-box; }\n\na {\n  color: #F44336;\n  text-decoration: none; }\n\n.header {\n  position: fixed;\n  background: #FFFFFF;\n  width: 100%;\n  height: 100px;\n  padding: 0px 20px 0px 20px;\n  z-index: 99999; }\n\n.site-nav-container {\n  position: relative;\n  height: 100%;\n  border-bottom: 1px solid #EEEEEE; }\n\n.site-nav-container .logo-container {\n  padding: 10px;\n  position: absolute;\n  bottom: 0px; }\n\n.site-nav-container .logo-container .logo {\n  height: 50px;\n  width: 50px; }\n\n.site-nav {\n  position: absolute;\n  bottom: 10px;\n  width: 100%;\n  padding-left: 70px;\n  text-transform: uppercase; }\n\n.site-nav .left-aligned {\n  float: left; }\n\n.site-nav .right-aligned {\n  float: right; }\n\n.site-nav a {\n  transition: color 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  color: #8f8f8f; }\n\n.site-nav a:hover, .header .site-nav a.selected,\n.footer .container .icons a:hover, .footer .container .icons a.selected {\n  color: #F44336; }\n\n.site-nav a,\n.site-nav p {\n  float: left;\n  padding: 10px; }\n\n/*.header {\n  position: fixed;\n  z-index: 999;\n  background: #FFFFFF;\n  top: 0px;\n  width: 100%;\n  height: 100px;\n  padding: 20px;\n}\n.header .container {\n  width: 100%;\n  border-bottom: 1px solid #EEEEEE;\n}\n.header .site-nav {\n  display: inline-block;\n  position: relative;\n  width: 100%;\n}\n.header .container .site-nav .logo-container {\n  padding-right: 10px;\n}\n.header .container .site-nav .logo {\n  display: inline-block;\n  height: 50px;\n  width: 50px;\n  margin-bottom: 10px;\n\n}\n.header .site-nav .menu-container {\n  display: inline-block;\n}\n.header .site-nav .menu-container .float-left {\n  float: left;\n}\n.header .site-nav .menu-container .float-right {\n  float: right;\n  padding-bottom: 10px;\n}\n.header .site-nav .menu-container .float-right .name {\n  padding-right: 10px;\n}\n.header .site-nav a {\n  display: inline-block;\n  text-decoration: none;\n  text-transform: uppercase;\n  color: #8f8f8f;\n  transition: color 0.3s cubic-bezier(.55,0,.1,1);\n  padding: 10px 20px 10px 0;\n}\n.header .site-nav a:hover, .header .site-nav a.selected,\n.footer .container .icons a:hover, .footer .container .icons a.selected {\n  color: #F44336;\n}\n.header .site-nav .divider {\n  padding-left: 20px;\n  border-left: 1px solid;\n}\n.header .site-nav .float-right {\n  position: absolute;\n  right: 0px;\n  bottom: 0px;\n}*/\n.main {\n  flex: 1;\n  z-index: 1;\n  width: 800px;\n  margin: 150px auto;\n  margin-bottom: 0px; }\n\n.main .content .front-matter {\n  background: #f66258;\n  padding: 20px;\n  margin-bottom: 2rem;\n  color: #fff; }\n\n.main .content .page-heading {\n  font-size: 175%;\n  font-weight: 700;\n  margin-bottom: 2rem; }\n\n.main .content .meta,\n.main .content .github {\n  line-height: 1.4;\n  margin-bottom: 1.5rem; }\n\n.main .content .github a {\n  color: #ffffff;\n  border-bottom: 1px solid; }\n\n.main .content .tags {\n  margin-bottom: 0.5rem; }\n\n.main .content .tags > a {\n  display: inline-block;\n  color: #FFFFFF;\n  padding: 10px;\n  border: 1px solid #FFFFFF;\n  margin-right: 10px;\n  margin-bottom: 10px; }\n\n.main .content .tags > a .material-icons {\n  font-size: 100%;\n  margin-right: 5px; }\n\n.main .content .tags > a:hover {\n  color: #f66258;\n  background: #FFFFFF; }\n\n.main .content .cta-back {\n  padding: 10px; }\n\n.main .content .cta-back:hover {\n  border: 1px solid;\n  padding: 9px; }\n\n.footer {\n  position: relative;\n  background: #f8f8f8;\n  bottom: 0px;\n  width: 100%;\n  padding: 20px;\n  border-top: 1px solid #EEEEEE; }\n\n.footer .container {\n  position: relative;\n  width: 100%;\n  text-align: center;\n  line-height: 1.8; }\n\n.footer .container .icons > a {\n  display: inline-block;\n  text-decoration: none;\n  text-transform: uppercase;\n  color: #8f8f8f;\n  transition: color 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n  padding: 10px 20px 18px 0; }\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);