function person(){
    this.message="heello world 4...";
    this.sayHello=function(){
        console.log(this.message);
    }
}
module.exports=person;