/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/server-side-render"
/*!******************************************!*\
  !*** external ["wp","serverSideRender"] ***!
  \******************************************/
(module) {

module.exports = window["wp"]["serverSideRender"];

/***/ },

/***/ "./blocks/impact-slider/block.json"
/*!*****************************************!*\
  !*** ./blocks/impact-slider/block.json ***!
  \*****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"mpsf/impact-slider","title":"Impact Slider","category":"myblocks","description":"Your Giving In Action — a full-width section with a heading, description, CTA link, and a horizontal Swiper carousel of impact/resource slides.","keywords":["slider","carousel","impact","resources","giving"],"supports":{"html":false,"align":["full"],"spacing":{"margin":true,"padding":false}},"attributes":{"sectionHeading":{"type":"string","default":"Your Giving In Action"},"sectionDescription":{"type":"string","default":""},"ctaLabel":{"type":"string","default":"Learn More"},"ctaUrl":{"type":"string","default":"#"},"contentMode":{"type":"string","default":"manual"},"selectedPosts":{"type":"array","default":[],"items":{"type":"number"}}},"textdomain":"mpsf","editorScript":"file:../../build/impact-slider.js","render":"file:./render.php"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./blocks/impact-slider/index.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/server-side-render */ "@wordpress/server-side-render");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./block.json */ "./blocks/impact-slider/block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
/**
 * Impact Slider — parent block.
 *
 * Two content modes:
 *  - "manual": holds any number of mpsf/impact-slide children inside a Swiper carousel.
 *  - "posts": pulls slides from WordPress posts (selected, or latest 4 when none selected).
 * Section-level controls (heading, description, CTA) live in InspectorControls.
 * All front-end output is handled by render.php; save() stores InnerBlocks HTML (manual mode only).
 */









const ALLOWED_BLOCKS = ['mpsf/impact-slide'];
const TEMPLATE = [['mpsf/impact-slide', {
  title: 'Impact Report 2024',
  ctaLabel: 'Read Report'
}], ['mpsf/impact-slide', {
  title: 'Impact Report 2023',
  ctaLabel: 'Read Report'
}]];
const tokenForPost = (id, title) => `${title} (#${id})`;
const idFromToken = token => {
  const match = String(token).match(/\(#(\d+)\)\s*$/);
  return match ? parseInt(match[1], 10) : null;
};
function PostSelector({
  selectedPosts,
  setAttributes
}) {
  const [titleMap, setTitleMap] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)({});
  const [suggestions, setSuggestions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([]);

  // Fetch titles for already-selected posts (e.g. on load).
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const missing = selectedPosts.filter(id => !(id in titleMap));
    if (!missing.length) {
      return;
    }
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
      path: `/wp/v2/posts?include=${missing.join(',')}&per_page=100&_fields=id,title`
    }).then(results => {
      const next = {
        ...titleMap
      };
      results.forEach(post => {
        next[post.id] = post.title.rendered;
      });
      setTitleMap(next);
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPosts]);
  const onInputChange = input => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
      path: `/wp/v2/posts?search=${encodeURIComponent(input)}&per_page=20&_fields=id,title`
    }).then(results => {
      setTitleMap(prev => {
        const next = {
          ...prev
        };
        results.forEach(post => {
          next[post.id] = post.title.rendered;
        });
        return next;
      });
      setSuggestions(results.map(post => tokenForPost(post.id, post.title.rendered)));
    }).catch(() => {});
  };
  const value = selectedPosts.map(id => titleMap[id] ? tokenForPost(id, titleMap[id]) : `Post #${id}`);
  const onChange = tokens => {
    const ids = [];
    tokens.forEach(token => {
      const id = idFromToken(token);
      if (id !== null) {
        ids.push(id);
      }
    });
    setAttributes({
      selectedPosts: ids
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    label: "Posts",
    value: value,
    suggestions: suggestions,
    onChange: onChange,
    onInputChange: onInputChange,
    __experimentalExpandOnFocus: true,
    help: "Search and select posts. Leave empty to show the latest 4 posts \u2014 when posts are selected, all of them are shown with no limit."
  });
}
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_6__.name, {
  edit({
    attributes,
    setAttributes
  }) {
    const {
      sectionHeading,
      sectionDescription,
      ctaLabel,
      ctaUrl,
      contentMode,
      selectedPosts
    } = attributes;
    const isPostsMode = contentMode === 'posts';
    // Posts mode renders ServerSideRender, whose output already includes
    // render.php's own ".c-impact-slider" section — don't double-wrap it.
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)(isPostsMode ? {} : {
      className: 'c-impact-slider c-impact-slider--editor'
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "Section Settings",
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "Section Heading",
            value: sectionHeading,
            onChange: value => setAttributes({
              sectionHeading: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
            label: "Section Description",
            value: sectionDescription,
            onChange: value => setAttributes({
              sectionDescription: value
            }),
            help: "Optional \u2014 brief paragraph below the heading."
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "Call to Action",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "Button Label",
            value: ctaLabel,
            onChange: value => setAttributes({
              ctaLabel: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "Button URL",
            value: ctaUrl,
            onChange: value => setAttributes({
              ctaUrl: value
            }),
            type: "url"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "Content Source",
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: "Slides",
            value: contentMode,
            options: [{
              label: 'Manual Content',
              value: 'manual'
            }, {
              label: 'Show Posts',
              value: 'posts'
            }],
            onChange: value => setAttributes({
              contentMode: value
            })
          }), isPostsMode && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(PostSelector, {
            selectedPosts: selectedPosts,
            setAttributes: setAttributes
          })]
        })]
      }), isPostsMode ?
      /*#__PURE__*/
      // ServerSideRender outputs real <a> links (CTA + per-post "Read
      // Report"). Inside the editor canvas iframe a real click would
      // navigate the iframe to that URL, so clicks are disabled here —
      // see ".c-impact-slider--ssr-preview a" in editor-styles.scss.
      (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        ...blockProps,
        className: `${blockProps.className || ''} c-impact-slider--ssr-preview`.trim(),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_5___default()), {
          block: _block_json__WEBPACK_IMPORTED_MODULE_6__.name,
          attributes: attributes
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("section", {
        ...blockProps,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "c-impact-slider__inner",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("header", {
            className: "c-impact-slider__header",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h2", {
              className: "c-impact-slider__heading",
              children: sectionHeading
            }), sectionDescription && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
              className: "c-impact-slider__desc",
              children: sectionDescription
            }), ctaLabel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("a", {
              className: "c-impact-slider__cta",
              href: ctaUrl,
              children: ctaLabel
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            className: "c-impact-slider__slides-editor",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
              allowedBlocks: ALLOWED_BLOCKS,
              template: TEMPLATE,
              orientation: "horizontal"
            })
          })]
        })
      })]
    });
  },
  save() {
    // render.php owns the full front-end shell (section, swiper wrapper, nav).
    // We only need to persist the inner blocks so render.php receives them as $content.
    // In "posts" mode, render.php ignores $content and queries posts instead.
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {});
  }
});
})();

/******/ })()
;
//# sourceMappingURL=impact-slider.js.map