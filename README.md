# AOP[![npm version](https://badge.fury.io/js/aop-s.svg)](https://badge.fury.io/js/aop-s)

> AOP in JavaScript

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm install aop-s --save
```
###Usage
* register advice
```js
var AOP = require('aop-s');
AOP.before('func',function(args){});
AOP.after(/^func/,function(args){})
AOP.around(/^func/,function(args){},function(ret,args){})
```
* execution
```js
func.exec(args);
```
