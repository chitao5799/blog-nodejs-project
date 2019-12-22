var fs=require('fs');
var content=fs.readFileSync(__dirname+"/vanban.txt","utf8");
//ko để dấu chấm khi cùng forder trong đg dẫn "./vanban.txt"
console.log(content);
//đọc file ko đồng bộ
fs.readFile(__dirname+"/vanban.txt",'utf8',function(err,data){
    if(err)
        throw err;
    console.log(data);
});