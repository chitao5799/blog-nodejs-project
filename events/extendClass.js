var Dialog=require('./dialogClass');
var dialog=new Dialog();
dialog.on("xin chào",function(data){
    console.log('có 1 lời chào mới!:',data);
});
dialog.sayHello('mai hoa');
/** hello world:mai hoa
    có 1 lời chào mới!: mai hoa */