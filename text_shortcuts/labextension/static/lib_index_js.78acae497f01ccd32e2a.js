"use strict";
(self["webpackChunktext_shortcuts"] = self["webpackChunktext_shortcuts"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_fp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/fp */ "./node_modules/lodash/fp.js");
/* harmony import */ var lodash_fp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_fp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./lib/utils.js");



const PLUGIN_ID = "text-shortcuts:plugin";
const insertText = (tracker) => (args) => {
    const widget = tracker.currentWidget;
    if (!widget)
        return;
    // If a kernel name is specified in args, compare with current kernel name.
    const kernel = (0,lodash_fp__WEBPACK_IMPORTED_MODULE_0__.get)("sessionContext.session.kernel", widget);
    if (args.kernel && kernel.name !== args.kernel)
        return;
    const active_editor = (0,lodash_fp__WEBPACK_IMPORTED_MODULE_0__.get)("content.activeCell.editor", widget);
    const { text, autoPad } = args;
    const insertionText = autoPad ? (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getPaddedTextToInsert)(active_editor, text) : text;
    active_editor.replaceSelection(insertionText);
};
const handleActivation = (app, tracker) => {
    app.commands.addCommand("text-shortcuts:insert-text", {
        label: "Insert Text",
        execute: insertText(tracker),
    });
};
/**
 * text-shortcuts extension.
 */
const extension = {
    id: PLUGIN_ID,
    autoStart: true,
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.INotebookTracker],
    activate: handleActivation,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);


/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPaddedTextToInsert: () => (/* binding */ getPaddedTextToInsert)
/* harmony export */ });
/* harmony import */ var lodash_fp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/fp */ "./node_modules/lodash/fp.js");
/* harmony import */ var lodash_fp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_fp__WEBPACK_IMPORTED_MODULE_0__);

const getPaddingText = (pos1, pos2, lastPos, ch) => {
    const pickPos = (0,lodash_fp__WEBPACK_IMPORTED_MODULE_0__.pick)(["line", "column"]);
    // End of line
    if ((0,lodash_fp__WEBPACK_IMPORTED_MODULE_0__.isEqual)(pickPos(pos2), pickPos(lastPos)))
        return " ";
    // Nothing selected
    if ((0,lodash_fp__WEBPACK_IMPORTED_MODULE_0__.isEqual)(pickPos(pos1), pickPos(pos2)))
        return "";
    // Already padded
    if (ch === " ")
        return "";
    // Not yet padded
    return " ";
};
const getPaddedTextToInsert = (editor, textToInsert) => {
    const lastLineIndex = editor.lastLine();
    const lastLine = editor.getLine(lastLineIndex);
    const lastLineSize = lastLine ? lastLine.length : 0;
    const lastPos = {
        line: lastLineIndex,
        column: lastLineSize,
    };
    const firstPos = {
        line: 0,
        column: 0,
    };
    const selection = editor.getSelection();
    const from = selection.start;
    const to = selection.end;
    let extFrom = from;
    if (from.line != firstPos.line || from.column != firstPos.column) {
        extFrom = { line: from.line, column: from.column - 1 };
    }
    let extTo = to;
    if (to.line != lastPos.line || to.column != lastPos.column) {
        extTo = { line: from.line, column: from.column + 1 };
    }
    const extSelectedText = editor.getRange({ line: extFrom.line, ch: extFrom.column }, { line: extTo.line, ch: extTo.column });
    const leftCh = getPaddingText(from, extFrom, lastPos, extSelectedText.slice(0, 1));
    const rightCh = getPaddingText(to, extTo, lastPos, extSelectedText.slice(-1));
    const paddedTextToInsert = `${leftCh}${textToInsert}${rightCh}`;
    return paddedTextToInsert;
};


/***/ })

}]);
//# sourceMappingURL=lib_index_js.78acae497f01ccd32e2a.js.map