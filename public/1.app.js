(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./src/form-elements-permission.jsx":
/*!******************************************!*\
  !*** ./src/form-elements-permission.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UUID__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UUID */ "./src/UUID.js");
/* harmony import */ var _UUID__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_UUID__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var devextreme_react_popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! devextreme-react/popup */ "./node_modules/devextreme-react/popup.js");
/* harmony import */ var devextreme_react_popup__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(devextreme_react_popup__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _axiosClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./axiosClient */ "./src/axiosClient.js");






var FormElementsPermission = function FormElementsPermission(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(props.element),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      element = _useState2[0],
      setElement = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(props.data),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      data = _useState4[0],
      setData = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState5, 2),
      dirty = _useState6[0],
      setDirty = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState7, 2),
      signPermissionData = _useState8[0],
      setSignPermissionData = _useState8[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (!signPermissionData) {
      Object(_axiosClient__WEBPACK_IMPORTED_MODULE_4__["default"])().request({
        url: "/sign-permissions",
        method: 'get'
      }).then(function (response) {
        setSignPermissionData(response.data.data);
      })["catch"](function (err) {
        setSignPermissionData(null);
      })["finally"](function () {});
    }
  }, []); // const editElementProp = (elemProperty, targProperty, e) => {
  //   // elemProperty could be content or label
  //   // targProperty could be value or checked
  //   const this_element = element;
  //   this_element[elemProperty] = e.target[targProperty];
  //   setElement(this_element);
  //   setDirty(true);
  //   if (targProperty === 'checked') this.updateElement();
  // };
  // const updateElement = () => {
  //   const this_element = element;
  //   // to prevent ajax calls with no change
  //   if (dirty) {
  //     props.updateElement.call(props.preview, this_element);
  //     setDirty(false);
  //   }
  // };
  // convertFromHTML(content) {
  //   const newContent = convertFromHTML(content);
  //   if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
  //     // to prevent crash when no contents in editor
  //     return EditorState.createEmpty();
  //   }
  //   const contentState = ContentState.createFromBlockArray(newContent);
  //   return EditorState.createWithContent(contentState);
  // }
  // addOptions() {
  //   const optionsApiUrl = document.getElementById('optionsApiUrl').value;
  //   if (optionsApiUrl) {
  //     get(optionsApiUrl).then((data) => {
  //       this.props.element.options = [];
  //       const { options } = this.props.element;
  //       data.forEach((x) => {
  //         // eslint-disable-next-line no-param-reassign
  //         x.key = ID.uuid();
  //         options.push(x);
  //       });
  //       const this_element = this.state.element;
  //       this.setState({
  //         element: this_element,
  //         dirty: true,
  //       });
  //     });
  //   }
  // }

  if (dirty) {
    props.element.dirty = true;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "edit-permission-panel"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(devextreme_react_popup__WEBPACK_IMPORTED_MODULE_3__["Popup"], {
    visible: true,
    dragEnabled: false,
    hideOnOutsideClick: true,
    showCloseButton: true,
    showTitle: true,
    title: props.element.text,
    container: ".edit-permission-panel",
    width: 600,
    height: 600,
    onHiding: props.manualEditPermissionModeOff
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(devextreme_react_popup__WEBPACK_IMPORTED_MODULE_3__["Position"], {
    at: "center",
    my: "center",
    collision: "fit"
  }), signPermissionData === null || signPermissionData === void 0 ? void 0 : signPermissionData.map(function (item, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h5", {
      className: "UsersPremission",
      key: "sign".concat(i)
    }, item.attributes.name);
  })));
};

FormElementsPermission.defaultProps = {
  className: 'edit-element-fields'
};
/* harmony default export */ __webpack_exports__["default"] = (FormElementsPermission);

/***/ })

}]);
//# sourceMappingURL=1.app.js.map