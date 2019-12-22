function person(){
    this.message="heello world 3...";
    this.sayHello=function(){
        console.log(this.message);
    }
}
module.exports=new person();