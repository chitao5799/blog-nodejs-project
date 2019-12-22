//mong muốn khi người dùng chưa login thì phải login mới xem đc các trang
//đây chỉ là demo, trong thực thế ko phải thế này
/**đây là dùng cookie để xác thực, khi đã login vào 1 lần thành công thì browser sẽ lưu lại cookie thì kể cả run lại server
 * thì vẫn sẽ vào xem được ko cần login vì đây chưa thiết lập xóa cookie khi thoát.
 * để test thì phải xóa bỏ cookie ở trình duyệt đi . > nhấn F12 -> và tab application ->phần menu bên phải chỗ 
 * storage > cookies chọn link web rồi xóa cookie ở phần bên phải đi để test
 */
var db=require('../db');

module.exports.requireAuthenticate=function(req,res,next){
    if(!req.cookies.userID){
        res.redirect('/auth/login');
        return;
    }
    // console.log(typeof req.cookies.userID); //kiểm tra, id trong database là number, id từ cookie là string
    var parseIntID=parseInt(req.cookies.userID);
    var user=db.get('persons').find({id:parseIntID}).value();
    //if này để kiểm tra nhỡ đâu ai đó nhập vào id để thử hack
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    next();
}
