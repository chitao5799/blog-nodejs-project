var express=require('express');
//khi sử dụng npm config phải có forder config và trong đó chứa file default.json
var config=require('config');
var bodyParser=require("body-parser");

var app=express();
app.use(bodyParser.json());

app.set("views",__dirname+'/app/view');
app.set("view engine","ejs");/*sau câu lệnh này thì tất cả các file có đuôi .ejs trong 
                        thư mục view thì đều được nhận là templete sẽ được render ra trong biến respon*/
//static forder
app.use("/static",express.static(__dirname+"/public"));
var controllers=require(__dirname+'/app/controllers');
app.use(controllers);

 var host=config.get("server.host");
 var port=config.get("server.port");
app.listen(port,host,function(){
    console.log('server is running on port:',port);
})