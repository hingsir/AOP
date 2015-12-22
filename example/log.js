var AOP = require('../aop.js');


AOP.after(/^log/,function(ret,user){
    console.log(user + ' ' + this.name + ' at '+ new Date);
})

function login(user){}

function logout(user){}

login.exec('hingsir');
logout.exec('huxing');