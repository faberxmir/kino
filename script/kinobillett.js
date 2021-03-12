let lsOrdersName = "localOrders";
let orders;
//localStorage.clear();

initPage();
buy2();
//------------------------------------------------------------------------------------------------------------\\
function initPage(){
    orders = localStorage.getItem(lsOrdersName);
    
    if(orders==null){
        orders = [];
    } else {
        orders = JSON.parse(orders);
    }
    console.log(`The page was initiated!`);
    console.log(orders);
}

//This function is used for callbacks by the onpage form by id="orderform"
function buy(){
    let order = {
        film: document.getElementById("filmmeny").value,
        navn: document.getElementById("navn").value,
        antall: document.getElementById("antall").value,
        telefonnummer: document.getElementById("telefonnummer").value,
        epost: document.getElementById("email").value
    }

    let jsonString = JSON.stringify(order);

    //returns false if no orders are equal
    if(!checkForEqualOrder(jsonString)){
        let insertPosition = orders.length;
        orders[insertPosition] = order;
        localStorage.setItem(lsOrdersName, JSON.stringify(orders));
        console.log("an order was placed");
    } else {
        alert("Duplicate order!");
    }
}

function buy2(){
    const nodelist = document.querySelectorAll("form input");

    const order = {};
    nodelist.forEach(node => {
       order[node.id] = node.value;
    });
}

function getOrdersToHTML(){

    let sectionOrders=document.getElementById("orderList");
    let htmlString;
    if(orders.length > 0){
        console.log(sectionOrders);
        orders.forEach(order => {
            sectionOrders.innerHTML += generateTemplate(order.navn, order.film, order.antall, order.telefonnummer, order.epost);
        });
    } else {
        sectionOrders.innerHTML=`<h1> No good movies, no orders! </h1>`
    }
}

function generateTemplate(name, film, antall, tlf, epost){
    const html = `
        <li class="order">
            <span class="movietitle">${film}</span>
            <span class="customer">${name}</span>
            <span class="ticketNumber">${antall} Billetter</span>
        </li>
    `;
    return html;
}

function checkForEqualOrder(jsonString){
    let isEqual = false;
    if(orders.length > 0){
        orders.forEach(order => {
            if(JSON.stringify(order) == jsonString){
                isEqual = true;
            }
        });
    }
    return isEqual;
}