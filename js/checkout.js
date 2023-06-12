let order = JSON.parse(sessionStorage.getItem('order'));
let totalPrice = 0;
let discountUsed = false;

orderLoad = () => {
    let priceText = document.getElementById('costText');
    let area = document.getElementById('orderList');
    for(let i = 0; i < order.length; i++){
        let subName = order[i].subName;
        let subBread = order[i].subBread;
        let subToppings = order[i].subToppings;
        let subSauce = order[i].subSauce;
        let subPrice = order[i].subPrice;

        totalPrice += subPrice;

        area.innerHTML += `
        <div class="order">
            <div class="subName"><p>${subName}</p></div>
            <div class="subBread"><p>${subBread}</p></div>
            <div class="subToppings"><p>${subToppings.join(', ')}</p></div>
            <div class="subSauces"><p>${subSauce.join(', ')}</p></div>
            <div class="subPrice"><p>R ${subPrice},00</p></div>
        </div>`
    }

    priceText.innerHTML = `<p>R ${totalPrice},00</p>`
}

verifyCode = () => {
    let code = +document.getElementById('couponCode').value;
    let area = document.getElementById('couponCode');
    let discount = 0;
    let discounted = 0;
    let saRand = new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
    });
    let priceText = document.getElementById('costText');
    if (!discountUsed){
        if (code % 2 === 0 && code < 10000 && code > 5000) {
            discount = code/10000;
            alert(discount*100 +"% discount");
            discounted = totalPrice * discount;
            totalPrice -= discounted;
            priceText.innerHTML = `<p>${saRand.format(totalPrice)}</p>`
        } else {
            alert("Invalid Code")
        }
        discountUsed = true
    } else {
        alert("Only one code per order")
    }
    area.value = null;
}

processOrder = () => {
    alert("Thank you for ordering! You will receive confirmation shortly")
    sessionStorage.removeItem('order');
    window.location.href = '../index.html';
}