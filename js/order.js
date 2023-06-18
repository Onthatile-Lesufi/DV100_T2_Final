let order = [];
let overallTotal = 0;

orderAdd = () => {
    let breadTotal = 0;
    let area = document.getElementById("ordersCards");
    let total = document.getElementById("orderTotal")
    area.innerHTML = ""

    let breadOption = document.getElementsByName("breadRadio");
    let breadValue; 
    for(let i = 0; i < breadOption.length; i++){
        if(breadOption[i].checked){
            breadValue = breadOption[i].value
            breadTotal += +breadOption[i].dataset.cost
        }
    }

    let toppingOptions = document.getElementsByName("toppings");
    let topArray = [];
    for(let i = 0; i < toppingOptions.length; i++){
        if(toppingOptions[i].checked){
            topArray.push(toppingOptions[i].value);
            breadTotal = breadTotal + +toppingOptions[i].dataset.cost
        }
    }

    if (topArray.length < 5) {
        alert("Your sandwich is looking kind of empty, load that bad boy up with some more toppings")
        return;
    }

    let sauceOptions = document.getElementsByName("sauces");
    let sauceArray = [];
    for(let i = 0; i < sauceOptions.length; i++){
        if(sauceOptions[i].checked){
            sauceArray.push(sauceOptions[i].value);
            breadTotal += +sauceOptions[i].dataset.cost
        }
    }

    if (sauceArray.length === 0) {
        alert("Your sandwich is looking kind of dry, consider adding a sauce")
        return;
    }

    let name = document.getElementById("subName");

    order.push ({
        subBread : breadValue,
        subName : name.value,
        subToppings : topArray,
        subSauce : sauceArray,
        subPrice : breadTotal
    })
    for (let i = 0; i<order.length;i++){
        let subBread = order[i].subBread;
        let subName = order[i].subName;
        let subToppings = order[i].subToppings;
        let subSauce = order[i].subSauce;
    
        let subPrice = order[i].subPrice; 
        
        area.innerHTML += `
            <div class="col-3 card">
                <div class="card-body">
                    <h5 class="card-title">${subName}</h5>
                    <p class="card-text"><strong>Bread:</strong> ${subBread}</p>
                    <p class="card-text"><strong>Toppings:</strong> ${subToppings.join(', ')}</p>
                    <p class="card-text"><strong>Sauces:</strong> ${subSauce.join(', ')}</p>
                    <p class="card-text"><strong>Cost:</strong> R${subPrice}.00</p>
                </div>
            </div>`
            
        overallTotal += subPrice; 

        total.innerHTML = `<h3>R ${overallTotal},00</h3>`
    }
} 

checkout = () => {
    if (order.length > 0){
        let data = JSON.stringify(order);
        localStorage.setItem('order' , data);
        window.location.href = 'pages/checkout.html'
    } else {
        alert("Please place an order before proceeding to checkout")
    }
}