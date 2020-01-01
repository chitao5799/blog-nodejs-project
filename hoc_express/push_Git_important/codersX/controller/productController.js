var db=require('../db');

module.exports.index=function(req,res){
    var page=parseInt(req.query.page) || 1; //n
    var perPage=8; //x

    var start=(page-1)*perPage;
    var end=page*perPage;
    var pd=db.get('products').value().slice(start,end);

    var soTruoc=parseInt(req.query.page)-1 || 1;
    var soHienTai=parseInt(req.query.page);
    var soSau=parseInt(req.query.page)+1;
    var drop=(page-1)*perPage;
    // console.log(pd);
    // console.log(soTruoc);
    
    res.render('products.pug',{
                products:pd,
                soTruoc:soTruoc,
                soHienTai:soHienTai,
                soSau:soSau
            });
    //cách 2
    // res.render('products.pug',{products:db.get('products').drop(drop).take(perPage).value()});
}