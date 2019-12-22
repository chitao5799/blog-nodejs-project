//tích hợp lowdb - database cơ bản dùng json
var express=require('express');
var app=express();
var port=3000;

app.set('view engine', 'pug');//mặc định phải có
app.set('views', './show');//views là mặc định; ./show chỉ định nơi chứa file pug
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ persons: []})
  .write();

app.get('/',function(req,res){
    res.render('index',{ //index là tên file pug
        name:'hoa'
    });
});

app.get('/users',function(req,res){
    res.render('nguoi/user',{
        persons:db.get('persons').value()
    });
});
app.get('/users/search',function(req,res){
    /*q tương ứng ở q sau dấu ? trong url của browser và q trong trường name 
    của thẻ input trong file user.pug,có thể thay bằng ký tự hoặc từ khác*/
    var a=req.query.q;
    var persons=db.get('persons').value();
    var matcheUsers=persons.filter(function(user){
        return user.name.toLowerCase().indexOf(a.toLowerCase()) !== -1;
    });
    res.render('nguoi/user',{
        persons:matcheUsers,
        question: a 
    });
    console.log(req.query);
});
app.get('/users/create',function(req,res){
    res.render('nguoi/createUser');
});
/**get('/users/:id' phải đặt ở dưới get('/users/create'. nếu không sẽ hiểu nhầm create là id và lỗi  */
app.get('/users/:id',function(req,res){
   var id=parseInt(req.params.id ) ;
   var timUser=db.get('persons').find({id: id}).value();
   res.render('nguoi/view',{
       varUser:timUser
   });
});
app.post('/users/create',function(req,res){
    var temp=req.body;//body này trả về object của client khi post
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
    temp.id=db.get('persons').size()+1;
    db.get('persons')
  .push(temp).write();
    res.redirect('/users');
});
app.listen(port,function(){
    console.log('server is listening on port:',port);
});
