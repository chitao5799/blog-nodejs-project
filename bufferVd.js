// var buffer=new Buffer("xin chào","utf8");
// console.log(buffer);//<Buffer 78 69 6e 20 63 68 c3 a0 6f>
// console.log(buffer.toString());//xin chào
// console.log(buffer.toString("ascii"));//xin chC o
// console.log(buffer.toJSON());
// /*{
//   type: 'Buffer',
//   data: [
//     120, 105, 110,  32,
//      99, 104, 195, 160,
//     111
//   ]
// }*/
// console.log(buffer[2]);//110
// buffer.write("hoa");
// console.log(buffer.toString());//hoa chào

var buffers=new ArrayBuffer(8);//8 byte
var view=new Int32Array(buffers);//int32 thì mỗi phần tử chiếm 4 byte.
//khi thay đổi typearray là thay đổi arraybuffer,khi đọc typearray cũng chính là đọc arraybuffer
view[0]=5;//chiếm 4 byte
view[1]=10;//chiếm 4 byte
//view[2]=15;//không tồn tại
console.log(view);//Int32Array [ 5, 10 ]