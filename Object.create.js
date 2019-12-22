var person={
    firtName:'',
    lastName:'',
    getFullName:function(){
        return this.firtName+" "+this.lastName;
    }
}
var hoa=Object.create(person);
hoa.firtName="hoa";
hoa.lastName='Mai';
var yen=Object.create(person);
yen.firtName='Yến';
yen.lastName='Phượng';

console.log(hoa.getFullName());//hoa Mai
console.log(yen.getFullName());//Yến Phượng