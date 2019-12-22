module.exports.validate=function(req,res,next){
      //validation -xác thực thông tin người dùng nhập vào
   /**validate ở server là cái bắt buộc phải có, validate ở client có thì sẽ làm trải nghiệm
    *  người dùng tốt hơn vì họ thấy feedback ngay lập tức, ko phải chờ request lên server.
    *  Nếu không có server-side validation thì sẽ dễ bị inject dữ liệu linh tinh vào db, 
    * vì người dùng có thể gửi dữ liệu lên server mà ko cần thông qua UI. Never trust your users. */
   var clientErrors=[];
   if(!req.body.name){
       clientErrors.push('Name is required.');
   }
   if(!req.body.đt){
       clientErrors.push('Phone is required.');
   }
   if(clientErrors.length){
       res.render('nguoi/createUser',{
           errors:clientErrors,
           value_Da_Nhap:req.body
       });
       return;
   }
   next();
}