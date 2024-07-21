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

function addCustomer() {
    const customerId = document.getElementById("customerId").value;
    const name = document.getElementById("name").value;
    const phoneNum = document.getElementById("phoneNum").value;
    const email = document.getElementById("email").value;

    const customer = new Customer(customerId, name, phoneNum, email);
    customers.push(customer);
    custCount++;

    localStorage.setItem('customers', JSON.stringify(customers));

    console.log(customers);

    document.getElementById("name").value = '';
    document.getElementById("phoneNum").value = '';
    document.getElementById("email").value = '';

    generateId();
}

function generateId() {
    const id = "C0" + (custCount + 1).toString().padStart(3, '0');
    console.log(id);
    document.getElementById("customerId").value = id;
}

function loadCustomers() {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
        customers = JSON.parse(storedCustomers);
        custCount = customers.length;
    }
    generateId();
}

document.addEventListener("DOMContentLoaded", loadCustomers);

function clearCustomerData() {
    localStorage.removeItem('customers');
    console.log('Customer data cleared');
    
}