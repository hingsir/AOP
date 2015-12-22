;
(function(global, undefined) {

    var AOP = {},
        beforeAdvices = [],
        afterAdvices = [],
        _getBeforeAdvice = _getAdvice(beforeAdvices),
        _getAfterAdvice = _getAdvice(afterAdvices);

    Function.prototype.exec = Function.prototype.invoke = function() {
        var self = this,
            funcName = self.name,
            args = [].slice.call(arguments),
            beforeAdvice = _getBeforeAdvice(funcName),
            afterAdvice = _getAfterAdvice(funcName),
            ret;
        if (beforeAdvice) {
            ret = beforeAdvice.apply(self, arguments)
            ret === undefined && (ret = self.apply(self, arguments));
        } else {
            ret = self.apply(self, arguments);
        }

        if (afterAdvice) {
            args.unshift(ret);
            var afterRet = afterAdvice.apply(self, args);
            return afterRet !== undefined ? afterRet : ret;
        } else {
            return ret;
        }
    }

    AOP.before = function(pointcut, beforeAdvice) {
        beforeAdvices.push({
            pointcut: pointcut,
            advice: beforeAdvice
        });
    }
    AOP.after = function(pointcut, afterAdvice) {
        afterAdvices.push({
            pointcut: pointcut,
            advice: afterAdvice
        });
    }
    AOP.around = function(pointcut, beforeAdvice, afterAdvice) {
        beforeAdvices.push({
            pointcut: pointcut,
            advice: beforeAdvice
        });
        afterAdvices.push({
            pointcut: pointcut,
            advice: afterAdvice
        });
    }

    function _getAdvice(advices) {
        return function(funcName) {
            for (var i in advices) {
                var pointcut = advices[i].pointcut;
                if (pointcut instanceof RegExp) {
                    if (pointcut.test(funcName)) {
                        return advices[i].advice;
                    }
                } else {
                    if (pointcut == funcName) {
                        return advices[i].advice;
                    }
                }
            }
        }
    }

    if (typeof module !== 'undefined' && module && typeof module.exports !== 'undefined') {
        module.exports = AOP;
    } else {
        global.AOP = AOP;
    }

})(this);
