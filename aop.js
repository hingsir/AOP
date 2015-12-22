;(function(global,undefined){

    var AOP = {};

    Function.prototype.exec = function(){
        var self = this,
            funcName = self.name,
            args = arguments;
        var beforeAdvice = AOP.getBeforeAdvice(funcName),
            afterAdvice = AOP.getAfterAdvice(funcName);
        beforeAdvice && beforeAdvice.apply(self,args);
        self.apply(self,args);
        afterAdvice && afterAdvice.apply(self,args);
    }

    AOP.beforeAdvices = AOP.afterAdvices = [];
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
    AOP.around = function(pointcut,aroundAdvice){
        AOP.beforeAdvices.push({
            pointcut:pointcut,
            advice:aroundAdvice
        });
        AOP.afterAdvices.push({
            pointcut:pointcut,
            advice:aroundAdvice
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

    global.AOP = AOP;

})(this);