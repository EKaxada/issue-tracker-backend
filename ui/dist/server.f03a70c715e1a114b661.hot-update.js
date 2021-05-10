exports.id = "server";
exports.modules = {

/***/ "./server/template.js":
/*!****************************!*\
  !*** ./server/template.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return template; });
function template(body) {
  return `<!DOCTYPE HTML>
<html>

<head>
    <meta charset="utf-8">
    <title>issue-tracker</title>

    <style>
        table.bordered-table th,
        td {
            border: 1px solid silver;
            padding: 4px;
        }
        
        table.bordered-table {
            border-collapse: collapse;
        }
        
        a.active {
            background-color: #D8D8F5;
        }
    </style>
</head>

<body>
    <!-- We will add a React element inside this div. -->
    <div id="contents">${body}</div>
    <script src="/env.js"></script>
    <script src="/vendor.bundle.js"></script>
    <script src="/app.bundle.js"></script>
</body>

</html>`;
}

/***/ })

};
//# sourceMappingURL=server.f03a70c715e1a114b661.hot-update.js.map