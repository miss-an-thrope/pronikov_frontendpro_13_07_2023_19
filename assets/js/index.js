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

// Homework_22

const submitOrder = (event) => {
    // Змінюю стандартну дію submit форми
    event.preventDefault();

    let name = document.getElementById('name').value;
    let city = document.getElementById('city').value;
    let postOffice = document.getElementById('post-office').value;
    let paymentType = document.getElementById('payment-type').value;
    let quantity = document.getElementById('quantity').value;
    let comment = document.getElementById('comment').value;

    // Перевірка, чи вказані дані
    if (name && city && postOffice && paymentType && quantity) {
        //data-attr для виводу інформації замовлення
        let category = document.getElementById('order-form').dataset.category;
        let product = JSON.parse(document.getElementById('order-form').dataset.product);
        
        let orderInfo = document.createElement('div');
        orderInfo.innerHTML = `
            <h3>Інформація про замовлення:</h3>
            <p>Номер: ${product.name}</p>
            <p>Категорія: ${category}</p>
            <p>ПІБ покупця: ${name}</p>
            <p>Місто: ${city}</p>
            <p>Склад Нової пошти: ${postOffice}</p>
            <p>Спосіб оплати: ${paymentType}</p>
            <p>Кількість: ${quantity}</p>
            <p>Коментар: ${comment}</p>
        `;

        document.getElementById('product-info').appendChild(orderInfo);

        // Очищення форми після підтвердження замовлення
        document.getElementById('name').value = '';
        document.getElementById('city').value = '';
        document.getElementById('post-office').value = '';
        document.getElementById('payment-type').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('comment').value = '';

        document.getElementById('order-form').classList.add('hidden');
    } else {
        alert('Будь ласка, заповніть усі обов\'язкові поля.');
    }
};


//Homework_23

// const showOrders = () => {
//     document.querySelector('.categories').style.display = 'none';
//     const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
//     const ordersList = document.createElement('ul');
// }