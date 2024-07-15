class Customer{
    customerId;
    name;
    phoneNum;
    email;

    constructor(customerId,name,phoneNum,email){
        this.customerId=customerId;
        this.name=name;
        this.phoneNum=phoneNum;
        this.email=email;
    }

    setCustomerId(customerId){
        this.customerId=customerId;
    }

    getCustomerId(){
        return this.name;
    }
    
    setName(name){
        this.name=name;
    }

    getName(){
        return this.name;
    }

    setPhoneNum(phoneNum){
        this.phoneNum=phoneNum;
    }

    getPhoneNum(){
        return this.phoneNum;
    }

    setEmail(email){
        this.email=email;
    }

    getEmail(){
        return this.email;
    }
}

let customers=[];
let custCount=0;
generateId(){
    custCount++;
    setCustomerId(C00+custCount);
    
}