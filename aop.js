;(function(global,undefined){

    var AOP = {};

    Function.prototype.exec = function(){
        var self = this,
            funcName = self.name,
            args = [].slice.call(arguments),
            beforeAdvice = AOP.getBeforeAdvice(funcName),
            afterAdvice = AOP.getAfterAdvice(funcName),
            ret;
        if(beforeAdvice){
            ret = beforeAdvice.apply(self,arguments)
            if(ret === undefined){
                ret = self.apply(self,arguments);
            }
        }else{
            ret = self.apply(self,arguments);
        }

        if(afterAdvice){
            args.unshift(ret);
            var afterRet = afterAdvice.apply(self,args);
            if(afterRet !== undefined){
                return afterRet;
            }else{
                return ret;
            }
        }else{
            return ret;
        }
    }

    AOP.beforeAdvices = [];
    AOP.afterAdvices = [];
    AOP.before = function(pointcut,beforeAdvice){
        AOP.beforeAdvices.push({
            pointcut:pointcut,
            advice:beforeAdvice
        });
    }
    AOP.after = function(pointcut,afterAdvice){
        AOP.afterAdvices.push({
            pointcut:pointcut,
            advice:afterAdvice
        });
    }
    AOP.around = function(pointcut,beforeAdvice,afterAdvice){
        AOP.beforeAdvices.push({
            pointcut:pointcut,
            advice:beforeAdvice
        });
        AOP.afterAdvices.push({
            pointcut:pointcut,
            advice:afterAdvice
        });
    }
    AOP.getBeforeAdvice = _getAdvice(AOP.beforeAdvices);
    AOP.getAfterAdvice = _getAdvice(AOP.afterAdvices);

    function _getAdvice(advices){
        return function(funcName){
            for(var i in advices){
                var pointcut = advices[i].pointcut;
                if(pointcut instanceof RegExp){
                    if(pointcut.test(funcName)){
                        return advices[i].advice;
                    }
                }else{
                    if(pointcut == funcName){
                        return advices[i].advice;
                    }
                }
            }
        }
    }

    if (typeof module !== 'undefined' && module && typeof module.exports !== 'undefined') {
        module.exports = AOP;
    }else{
        global.AOP = AOP;
    }

})(this);