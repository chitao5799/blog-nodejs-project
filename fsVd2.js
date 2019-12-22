var fs=require('fs');
var zlib=require('zlib');

//đọc từng phần dũ liệu
var readable=fs.createReadStream(__dirname+'/vanban.txt',{
    encoding:'utf8',
    highWaterMark:8*1024 // 8KB đọc mỗi lần
});
// var data='';
// readable.on('data',function(chunk){
//     data+=chunk;
// });
// readable.on('error',function(err){
//     console.log(err.stack);
// });
// readable.on('end',function(){
//     console.log(data);
// });
//-----------------
// var dl="hello world, xin chào thế giới";
// var writeStream=fs.createWriteStream(__dirname+'/vanban3.txt');
// writeStream.write(dl,'utf8');
// writeStream.end();//đánh dấu kết thúc
// //handle stream events finish
// writeStream.on('finish',function(){
//     console.log('ghi file hoàn tất');
// });
// writeStream.on('error',function(err){
//     console.log(err.stack);
// });
//--------------
var writeable=fs.createWriteStream(__dirname+'/vanban2.txt');
var compressed=fs.createWriteStream(__dirname+'/vanban2.txt.gz'); 

var gzip=zlib.createGzip();//nén file
//copy
// readable.pipe(writeable);
//compress
// readable.pipe(gzip).pipe(compressed);
//decompress
fs.createReadStream(__dirname+'/vanban2.gz')
.pipe(zlib.createGunzip())
.pipe(fs.createWriteStream(__dirname+'/vanban2Unzip.txt'));
