var AOP = require('../aop.js');

var cache = {};

AOP.around(/^(query|find|get)/,function(condition){
    if(cache[condition]){
        console.log('reads data from cache.')
        return cache[condition]
    }
},function(ret,condition){
    if(!cache[condition]){
        console.log('puts data to cache')
        cache[condition] = ret;
    }
})

function queryUsers(condition){
    console.log('query users from database: ' + condition);
    return 'userlist';
}

var userlist1 = queryUsers.exec('top10');
var userlist2 = queryUsers.exec('top10');
console.log(userlist1,userlist2);