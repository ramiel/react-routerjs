'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var RouterContext = React__default.createContext(null);
var initialized = false;
var RouterProvider = function (_a) {
    var router = _a.router, children = _a.children;
    var _b = React.useState(null), currentPath = _b[0], setCurrentPath = _b[1];
    if (!initialized) {
        initialized = true;
        router.always(function (path) {
            setCurrentPath(path);
        });
    }
    return (React__default.createElement(RouterContext.Provider, { value: {
            options: router._getOptions(),
            path: currentPath,
            navigate: router.navigate,
        } }, children));
};
//# sourceMappingURL=RouterProvider.js.map

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var Link = function (_a) {
    var children = _a.children, href = _a.href, props = __rest(_a, ["children", "href"]);
    var ctx = React.useContext(RouterContext);
    if (!ctx) {
        console.warn('Link must be descendant of a RouterProvider. Fallback to a regular anchor');
        return (React__default.createElement("a", __assign({ href: href }, props), children));
    }
    var newHref = "" + ctx.options.basePath + href;
    return (React__default.createElement("a", __assign({ href: newHref }, props, { "data-routerjs-ignore": true, onClick: function (e) {
            e.preventDefault();
            ctx.navigate(newHref);
        } }), children));
};

exports.Link = Link;
exports.RouterProvider = RouterProvider;
