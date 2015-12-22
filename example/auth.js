var AOP = require('../aop.js');

var permission = {
    'hingsir':1,
    'huxing':0
}

AOP.before('deleteItem',function(user){
    if(!permission[user]){
        console.log('permission denied: ' + user)
        return false;
    }
})

function deleteItem(user){
    console.log('deleted by: ' + user);
}

deleteItem.exec('hingsir');
deleteItem.exec('huxing')