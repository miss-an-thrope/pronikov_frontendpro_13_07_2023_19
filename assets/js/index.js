/* Homework_19 */

let productsData = {
    'Plato': [
        { name: '1301', price: 9000 },
        { name: '1302', price: 11000 },
        { name: '1303', price: 10000 },
        { name: '1304', price: 9000 },
        { name: '1305', price: 12000 },
        { name: '1306', price: 13000 },
        { name: '1307', price: 20000 },
        { name: '1308', price: 25000 },
        { name: '1309', price: 13123 }
    ],
    'Linea': [
        { name: '2001', price: 10000 },
        { name: '2002', price: 11000 },
        { name: '2003', price: 12000 },
        { name: '2004', price: 13000 },
        { name: '2005', price: 11000 },
        { name: '2006', price: 12000 },
        { name: '2007', price: 13000 },
        { name: '2008', price: 14000 },
        { name: '2009', price: 15000 },
    ],
    'Barcelona': [
        { name: '201', price: 11000 },
        { name: '202', price: 16000 },
        { name: '203', price: 15000 },
        { name: '204', price: 13000 },
        { name: '205', price: 12000 },
        { name: '206', price: 11000 },
        { name: '207', price: 14000 },
        { name: '208', price: 13000 },
        { name: '209', price: 12000 },
    ]
};

const showProducts = (category) => {
    let productList = document.getElementById('product-list');
    productList.innerHTML = '';
    let products = productsData[category];
    
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let li = document.createElement('li');
        li.className = 'product-item';
        li.innerText = product.name;
        li.onclick = showProductInfo.bind(null, product, category);
        productList.appendChild(li);
    }
}

const showProductInfo = (product, category) => {
    let productInfo = document.getElementById('product-info');
    productInfo.innerHTML = '';

    let name = document.createElement('p');
    name.innerText = 'Назва: ' + category + ' ' + product.name;

    let price = document.createElement('p');
    price.innerText = 'Ціна: ' + product.price;

    let buyButton = document.createElement('button');
    buyButton.innerText = 'Купити';
    buyButton.onclick = showOrderForm.bind(null, product, category);
    productInfo.appendChild(buyButton);
    productInfo.appendChild(name);
    productInfo.appendChild(price);
}

const showOrderForm = (product, category) => {
    let orderForm = document.getElementById('order-form');
    orderForm.classList.remove('hidden');
    //data-attr для виводу інформації замовлення
    orderForm.dataset.category = category;
    orderForm.dataset.product = JSON.stringify(product);
};

// Homework_22 (+додаток Homework_23)

const submitOrder = (event) => {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let city = document.getElementById('city').value;
    let postOffice = document.getElementById('post-office').value;
    let paymentType = document.getElementById('payment-type').value;
    let quantity = document.getElementById('quantity').value;
    let comment = document.getElementById('comment').value;

    if (name && city && postOffice && paymentType && quantity) {
        let category = document.getElementById('order-form').dataset.category;
        let product = JSON.parse(document.getElementById('order-form').dataset.product);

        let orderData = {
            date: new Date().toLocaleDateString(),
            category: category,
            product: product,
            name: name,
            city: city,
            postOffice: postOffice,
            paymentType: paymentType,
            quantity: quantity,
            comment: comment,
            price: product.price * quantity,
            categoryName: category,
            modelName: product.name
        };

        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Очищення форми після підтвердження замовлення
        document.getElementById('name').value = '';
        document.getElementById('city').value = '';
        document.getElementById('post-office').value = '';
        document.getElementById('payment-type').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('comment').value = '';

        document.getElementById('order-form').classList.add('hidden');

        showOrders();
    } else {
        alert('Будь ласка, заповніть усі обов\'язкові поля.');
    }
};


//Homework_23

let orders = JSON.parse(localStorage.getItem('orders')) || [];
let isOrderListVisible = false;

const toggleOrderList = () => {
    isOrderListVisible = !isOrderListVisible; // клік = значення навпаки :)
    let orderDetails = document.getElementById('order-details');
    if (isOrderListVisible) {
        showOrders();
        orderDetails.style.display = 'block'; // true = список замовлення
    } else {
        orderDetails.style.display = 'none'; // false = ховаємо список замовленя, або його деталі
    }
};

const showOrders = () => {
    let orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = '';

    if (orders.length === 0) {
        let noOrdersMessage = document.createElement('p');
        noOrdersMessage.textContent = 'У вас немає замовлень.';
        orderDetails.appendChild(noOrdersMessage);
    } else {
        for (let i = 0; i < orders.length; i++) {
            let order = orders[i];
            let orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <p>Дата: ${order.date}</p>
                <p>Ціна: ${order.price}</p>
                <button onclick="showOrderDetails(${i})">Деталі</button>
                <button onclick="removeOrder(${i})">Видалити</button>
            `;
            orderDetails.appendChild(orderItem);
        }
    }
    orderDetails.style.display = 'block';
};

const showOrderDetails = (index) => {
    let orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = '';

    let order = orders[index];
    let detailsItem = document.createElement('div');
    detailsItem.className = 'details-item';
    detailsItem.innerHTML = `
        <p>Дата: ${order.date}</p>
        <p>Ціна: ${order.price}</p>
        <p>Категорія: ${order.categoryName}</p>
        <p>Модель: ${order.modelName}</p>
        <p>ПІБ покупця: ${order.name}</p>
        <p>Місто: ${order.city}</p>
        <p>Склад Нової пошти: ${order.postOffice}</p>
        <p>Спосіб оплати: ${order.paymentType}</p>
        <p>Кількість: ${order.quantity}</p>
        <p>Коментар: ${order.comment}</p>
    `;
    orderDetails.appendChild(detailsItem);
}

const removeOrder = (index) => {
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    showOrders();
};

const myOrdersButton = document.querySelector('.header button');
myOrdersButton.addEventListener('click', toggleOrderList);