/* Homework_19 

Реалізувати подобу інтернет-магазину

Дано 3 блоки

    У лівій частині сторінки – перелік категорій.
    При натисканні на категорію виводиться у середній блок список товарів цієї категорії.
    Клік на товар – інформацію про товар у правому блоці.
    В інформації товару - кнопка "купити"
    При натисканні на “купити” з'являється повідомлення, що товар куплено та повернення у вихідний стан програми (коли відображається лише список категорій)

*/

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
        
        // li.onclick = function() {
        //     showProductInfo(product);
        // }
        // li.onclick = (() => showProductInfo(product));
        // нарешті момент використання bind :D
        li.onclick = showProductInfo.bind(null, product, category);
        productList.appendChild(li);
    }
}

const showProductInfo = (product, category) => {
    let productInfo = document.getElementById('product-info');
    productInfo.innerHTML = '';

    let name = document.createElement('p');
    name.innerText = 'Назва: ' + product.name;

    let price = document.createElement('p');
    price.innerText = 'Ціна: ' + product.price;

    let buyButton = document.createElement('button');
    buyButton.innerText = 'Купити';
    buyButton.onclick = buyProduct.bind(null, product, category);


    productInfo.appendChild(name);
    productInfo.appendChild(price);
    productInfo.appendChild(buyButton);
}

const buyProduct = (product, category) => {
    alert(`Модель ${product.name} категорії ${category} куплено.`);
    let productInfo = document.getElementById('product-info');
    productInfo.innerHTML = '';
}