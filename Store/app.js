class Item {
    itemId;
    name;
    date;
    qty;
    suplier;

    constructor(itemId, name, date, qty, suplier) {
        this.itemId = itemId;
        this.name = name;
        this.date = date;
        this.qty = qty;
        this.suplier = suplier;
    }

}

let items = [];
let itemCount = 0;

function addItem() {
    const itemId = document.getElementById("itemId").value;
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const qty = parseInt(document.getElementById("qty").value, 10);
    const suplier = document.getElementById("suplier").value;

   
    if (!name || !date || isNaN(qty) || !suplier) {
        alert("Some fields are empty or invalid!");
    } else if (qty <= 0) {
        document.getElementById("qty").value = "";
        alert("Invalid Quantity");
    } else {
        const item = new Item(itemId, name, date, qty, suplier);
        items.push(item);
        itemCount++;

        localStorage.setItem('items', JSON.stringify(items));

        console.log(items);

       
        document.getElementById("name").value = "";
        document.getElementById("date").value = "";
        document.getElementById("qty").value = "";
        document.getElementById("suplier").value = "";

        alert("Item added successfully");

        
        generateId();
    }
}


function generateId() {
    const id = "I0" + (itemCount + 1).toString().padStart(2, '0');
    console.log(id);
    document.getElementById("itemId").value = id;
}

function loadItems() {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        items = JSON.parse(storedItems);
        itemCount = items.length;
    }
    generateId();
}

document.addEventListener("DOMContentLoaded", loadItems);

let foundElement = -1;

function searchCustomer(data) {
    const value = data;

    document.getElementById("viewId").value = "";
    document.getElementById("viewName").value = "";
    document.getElementById("viewPhoneNum").value = "";
    document.getElementById("viewEmail").value = "";

    for (let index = 0; index < customers.length; index++) {
        let customer = customers[index];
        if (customer.name === value | customer.customerId == value | customer.phoneNum == value | customer.email == value) {
            document.getElementById("viewId").value = customer.customerId;
            document.getElementById("viewName").value = customer.name;
            document.getElementById("viewPhoneNum").value = customer.phoneNum;
            document.getElementById("viewEmail").value = customer.email;

            document.getElementById('search-input').value = "";

            console.log("Found");
            foundElement = index;
            console.log(foundElement);
            alert('Customer Found!');
        } else {
            document.getElementById("viewId").value = "";
            document.getElementById("viewName").value = "";
            document.getElementById("viewPhoneNum").value = "";
            document.getElementById("viewEmail").value = "";

            document.getElementById('search-input').value = "";

            alert('Customer Not Found!');
        }

    }
}

document.getElementById('search-button').addEventListener('click', function () {
    const data = document.getElementById('search-input').value;
    if (data) {
        searchCustomer(data);
    } else {
        alert('Please search for a Customer!');
    }
});

document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('search-button').click();
    }
});

function deleteCustomer() {
    if (foundElement !== -1) {
        customers.splice(foundElement, 1);
        localStorage.setItem('customers', JSON.stringify(customers));

        foundElement = -1;
        document.getElementById("viewId").value = "";
        document.getElementById("viewName").value = "";
        document.getElementById("viewPhoneNum").value = "";
        document.getElementById("viewEmail").value = "";
        alert("Customer deleted successfully.");
    } else {
        alert("No customer selected to delete.");
    }

}

function updateCustomer() {
    if (foundElement !== -1) {
        const name = document.getElementById("viewName").value;
        const phoneNum = document.getElementById("viewPhoneNum").value;
        const email = document.getElementById("viewEmail").value;

        customers[foundElement].name = name;
        customers[foundElement].phoneNum = phoneNum;
        customers[foundElement].email = email;

        localStorage.setItem('customers', JSON.stringify(customers));
        alert("Customer updated successfully.");
        document.getElementById("viewId").value = "";
        document.getElementById("viewName").value = "";
        document.getElementById("viewPhoneNum").value = "";
        document.getElementById("viewEmail").value = "";
        foundElement = -1;
    } else {
        alert("No customer selected to update.");
    }
}

function getHistory() {
    const value = document.getElementById("value").value;

    document.getElementById("viewId").value = "";

    for (let index = 0; index < customers.length; index++) {
        let customer = customers[index];
        if (customer.name === value | customer.customerId == value | customer.phoneNum == value | customer.email == value) {
            document.getElementById("viewId").value = customer.customerId;

            console.log("Found");
            console.log(foundElement);
        } else {
            document.getElementById("viewId").value = "Customer Not Found";
        }

    }
}









function clearCustomerData() {
    localStorage.removeItem('customers');
    console.log('Customer data cleared');
}