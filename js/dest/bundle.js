(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
class Dom {
    grab(selector) {
        return document.querySelector(selector);
    }
    spawn(nodeName, attrs, content) {
        let el = document.createElement(nodeName);
        if (content) {
            el.textContent = content;
        }
        if (attrs) {
            this.setAttrs(el, attrs);
        }
        return el;
    }
    setAttrs(el, attrs) {
        Object.keys(attrs).forEach((key) => {
            if (key === 'style') {
                Object.keys(attrs[key]).forEach((subKey) => {
                    el.style[subKey] = attrs[key][subKey];
                });
            }
            else {
                el.setAttribute(key, attrs[key]);
            }
        });
    }
    inject(victim, parasite) {
        victim.appendChild(parasite);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dom;

},{}],2:[function(require,module,exports){
"use strict";
const dom_1 = require('./dom');
let myDom = new dom_1.default(), content = myDom.grab('.content'), textNode = myDom.spawn('p', {
    class: 'ololo',
    style: {
        color: 'red'
    }
}, 'fooBar');
myDom.inject(content, textNode);
console.log(content);

},{"./dom":1}]},{},[2,1]);
