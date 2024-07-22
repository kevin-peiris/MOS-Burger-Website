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

    // Clear input fields after adding a customer
    document.getElementById("name").value = '';
    document.getElementById("phoneNum").value = '';
    document.getElementById("email").value = '';

    // Generate new customer ID
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

let foundElement=-1;

function searchCustomer(){
    const value=document.getElementById("value").value;
    
    document.getElementById("viewId").value = "";
    document.getElementById("viewName").value = "";
    document.getElementById("viewPhoneNum").value = "";
    document.getElementById("viewEmail").value = "";

    

    for (let index = 0; index < customers.length; index++) {
        let customer=customers[index];
        if (customer.name===value) {
            document.getElementById("viewId").value = customer.customerId;
            document.getElementById("viewName").value = customer.name;
            document.getElementById("viewPhoneNum").value = customer.phoneNum;
            document.getElementById("viewEmail").value = customer.email;

            console.log("Found");
            foundElement=index;
            console.log(foundElement);
        }
        
    }
}

function deleteCustomer(){
    if (foundElement!=-1) {
        customers.splice(foundElement, 1);
        console.log(foundElement);
    }
}











function clearCustomerData() {
    localStorage.removeItem('customers');
    console.log('Customer data cleared');
    
}