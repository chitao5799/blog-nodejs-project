var obj={
    name:'mai hoa',
    sayHello: function(param1,param2){
        console.log(`hello ${this.name}`);
        console.log('params:',param1,param2);
    }
}

obj.sayHello.call({name:'yến phượng'},'xin chào','2019');