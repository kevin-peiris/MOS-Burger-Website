class Order {
    orderId;
    customer;
    dateAndTime;
    items;
    total;
    discount;

    constructor(orderId, customer, dateAndTime, items, total, discount) {
        this.orderId = orderId;
        this.customer = customer;
        this.dateAndTime = dateAndTime;
        this.items = items;
        this.total = total;
        this.discount = discount;
    }
}

class CartItem {
    itemId;
    name;
    qty;
    price;
    discount;
    total;

    constructor(itemId, name, qty, price, discount,total) {
        this.itemId = itemId;
        this.name = name;
        this.qty = qty;
        this.price = price;
        this.discount = discount;
        this.total = total;
    }
}

let orders = [];
let customers = [];
let items = [];
let cart = [];
let orderCount = 0;

function placeOrder() {
    const customerId = document.getElementById("viewCustomerId").value;

    if (!customerId) {
        alert('Please select a Customer.');
        return;
    
    }else if (cart.length==0) {
        alert("Add items to the cart to place the Order!");
        return;
    }else{
        
        const customerIndex = customers.findIndex(customer => customer.customerId === customerId);
        const orderId = document.getElementById("orderId").value;
        let total=0;
        let discount=0;
        const dateAndTime = new Date();

        for (let index = 0; index < cart.length; index++) {
            total+=cart[index].total;
            discount+=cart[index].discount;
        }

        const order = new Order(orderId,customers[customerIndex],dateAndTime,cart,total,discount);
        orders.push(order);
        orderCount++;

        localStorage.setItem('orders', JSON.stringify(orders));

        console.log(orders);
        

        document.getElementById("viewCustomerId").value = "";
        document.getElementById("viewName").value = "";
        document.getElementById("viewPhoneNum").value = "";

        document.getElementById('itemCount').textContent = `Item Count: 0`;
        document.getElementById('subTotal').textContent = `Sub Total: 0/-`;

        alert("Order placed successfully");
        clearInputFields();
        generateId();
        window.location.reload();
    }    

}

function addCustomer() {
    const customerId = document.getElementById("customerId").value;
    const name = document.getElementById("name").value;
    const phoneNum = document.getElementById("phoneNum").value;
    const email = document.getElementById("email").value;

    if (name.length == 0 || phoneNum.length == 0 || email.length == 0) {
        alert("TextField empty!!!");
    } else if (phoneNum.length != 10) {

        document.getElementById("phoneNum").value = "";
        alert("Inavlid Phone Number");

    } else {

        const customer = new Customer(customerId, name, phoneNum, email);
        customers.push(customer);
        custCount++;

        localStorage.setItem('customers', JSON.stringify(customers));

        console.log(customers);

       

    }
}

function generateId() {
    const id = "O0" + (orderCount + 1).toString().padStart(2, '0');
    console.log(id);
    document.getElementById("orderId").value = id;
}

function loadOrders() {
    const storedOrders = localStorage.getItem('orders');

    if (storedOrders) {
        orders = JSON.parse(storedOrders);
        orderCount = orders.length;
    }

    loadCustomers();
    loadItems();
    generateId();
    updateDateTime();

}

function loadCustomers() {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
        customers = JSON.parse(storedCustomers);
    }

    const list = document.getElementById('customerList');
    list.innerHTML = '';

    customers.forEach(customer => {
        const listItem = document.createElement('li');
        listItem.classList.add('dropdown-item');

        listItem.innerHTML = `<a href="#">${customer.name}</a>`;


        listItem.addEventListener('click', function () {
            searchCustomer(customer.customerId);
        });

        list.appendChild(listItem);
    });
}

function loadItems() {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        items = JSON.parse(storedItems);
    }

    const lists = ['Burgers', 'Submarines', 'Fries', 'Pasta', 'Chicken', 'Beverages',];

    lists.forEach(listItem => {
        const list = document.getElementById(listItem);
        list.innerHTML = '';

        items.forEach(item => {
            if (item.category == listItem) {
                const listItem = document.createElement('li');
                listItem.classList.add('dropdown-item');

                listItem.innerHTML = `<a href="#">${item.name}</a>`;


                listItem.addEventListener('click', function () {
                    searchItem(item.itemId)
                });

                list.appendChild(listItem);
            }
        });
    });
}

function updateDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById('dateDisplay').textContent = date;
    document.getElementById('timeDisplay').textContent = time;
}

setInterval(updateDateTime, 1000);

document.addEventListener("DOMContentLoaded", loadOrders);

let foundElement = -1;

function searchCustomer(data) {
    const value = data;
    let found = false;

    document.getElementById("viewCustomerId").value = "";
    document.getElementById("viewName").value = "";
    document.getElementById("viewPhoneNum").value = "";

    for (let index = 0; index < customers.length; index++) {
        let customer = customers[index];
        if (customer.name == value || customer.customerId == value) {
            document.getElementById("viewCustomerId").value = customer.customerId;
            document.getElementById("viewName").value = customer.name;
            document.getElementById("viewPhoneNum").value = customer.phoneNum;

            document.getElementById('search-input').value = "";

            console.log("Found");
            foundElement = index;
            console.log(foundElement);
            found = true;
        }
    }

    if (found) {

    } else {
        alert('Customer Not Found!');

        document.getElementById("viewCustomerId").value = "";
        document.getElementById("viewName").value = "";
        document.getElementById("viewPhoneNum").value = "";

        document.getElementById('search-input').value = "";
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

function searchItem(data) {
    const value = data;
    let found = false;

    document.getElementById("viewItemId").value = "";
    document.getElementById("viewItemName").value = "";
    document.getElementById("viewDate").value = "";
    document.getElementById("viewQty").value = "";
    document.getElementById("viewPrice").value = "";
    document.getElementById("viewDiscount").value = "";


    for (let index = 0; index < items.length; index++) {
        let item = items[index];
        if (item.name === value || item.itemId == value) {
            document.getElementById("viewItemId").value = item.itemId;
            document.getElementById("viewItemName").value = item.name;
            document.getElementById("viewDate").value = item.date;
            document.getElementById("viewQty").value = item.qty;
            document.getElementById("viewPrice").value = item.price + ".00";
            document.getElementById("viewDiscount").value = item.discount + "%";

            console.log("Found");
            found = true;
        }
    }

    if (found) {

    } else {
        document.getElementById("viewItemId").value = "";
        document.getElementById("viewName").value = "";
        document.getElementById("viewDate").value = "";
        document.getElementById("viewQty").value = "";
        document.getElementById("viewPrice").value = "";
        document.getElementById("viewDiscount").value = "";

        alert('Item Not Found!');
    }
}

document.getElementById('cart-button').addEventListener('click', function () {
    let inpQTY = parseInt(document.getElementById('inp-QTY').value, 10);
    let qty = parseInt(document.getElementById("viewQty").value, 10);
    let itemId = document.getElementById("viewItemId").value;
    let customerId = document.getElementById("viewCustomerId").value;

    if (!customerId) {
        alert('Please select a Customer.');
    } else if (!itemId) {
        alert('Please select an item to add!');
    } else if (isNaN(inpQTY) || inpQTY <= 0) {
        alert('Please enter a valid Quantity to add!');
    } else if (qty <= 0) {
        alert('Item ran out of stock!');
        clearInputFields();
    } else if (inpQTY > qty) {
        alert("Invalid Quantity: You cannot add more than available stock.");
        document.getElementById("inp-QTY").value = "";
    } else {

        for (let index = 0; index < items.length; index++) {
            let item = items[index];
            if (item.itemId == itemId) {
                items[index].qty -= inpQTY;
                localStorage.setItem('items', JSON.stringify(items));

                let total = inpQTY * item.price;
                let finalAmount = total - (total * (item.discount / 100));    

                const cartItem = new CartItem(item.itemId, item.name, inpQTY, item.price, item.discount, finalAmount);
                cart.push(cartItem);

                alert("Item added successfully."); 
                clearInputFields();
                addItemTbl();
            }
        }
    }
});

document.getElementById('inp-QTY').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('cart-button').click();
    }
});

function clearInputFields() {
    document.getElementById("viewItemId").value = "";
    document.getElementById("viewItemName").value = "";
    document.getElementById("viewDate").value = "";
    document.getElementById("viewQty").value = "";
    document.getElementById("viewPrice").value = "";
    document.getElementById("viewDiscount").value = "";
    document.getElementById("inp-QTY").value = "";
}

function addItemTbl() {
    let subTotal = 0;
    let table = document.getElementById("tbl");

    let body = `<thead style="position: sticky; top: 0; z-index: 1;">
                <tr style="background-color: #FFBD59;">
                    <th scope="col">Item-ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody class="table-group-divider">`;

    cart.forEach(item => {
        subTotal+=item.total;
        body += `
        <tr>
            <th scope="row">${item.itemId}</th>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.price}.00</td>
            <td>${item.discount}%</td>
            <td>${item.total}.00</td>
            <td><button type="button" class="btn btn-danger w-100" onclick="deleteFromTbl('${item.itemId}')" style="background-color: #FF3132; color: #FFBD59;">X</button></td>
        </tr>`;
    });
    table.innerHTML = body;

    document.getElementById('itemCount').textContent = `Item Count: ${cart.length}`;
    document.getElementById('subTotal').textContent = `Sub Total: ${subTotal.toFixed(2)}/-`;
    
}

function deleteFromTbl(itemId) {
    if (itemId) {
        const confirmation = confirm('Are you sure you want to remove this item from the cart?');
        if (confirmation) {
            const qtyId = items.findIndex(item => item.itemId === itemId);
            const index = cart.findIndex(item => item.itemId === itemId);

            items[qtyId].qty+=cart[index].qty;

            cart.splice(index, 1);
            addItemTbl();
        }
    }
}

function returnItems() {
    const confirmation = confirm('Are you sure you want to exit?');
        if (confirmation) {

            cart.forEach(cartItem => {
                const qtyId = items.findIndex(item => item.itemId === cartItem.itemId);

                items[qtyId].qty+=cartItem.qty;
                localStorage.setItem('items', JSON.stringify(items));
                console.log(items);
                
                window.location.href = `OrderMain.html`;

            });
        }
}
