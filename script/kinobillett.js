let lsOrdersName = "localOrders";
let orders;

//localStorage.clear();

initPage();

//------------------------------------------------------------------------------------------------------------\\
function initPage(){
    orders = localStorage.getItem(lsOrdersName);
    
    if(orders==null){
        orders = [];
    } else {
        orders = JSON.parse(orders);
    }
}

//This funciton is used for callbacks by the onpage form by id="orderform"
function buy(){
    let insertPosition = orders.length;
    orders[insertPosition] = {
        film: document.getElementById("filmmeny").value,
        navn: document.getElementById("navn").value,
        telefonnummer: document.getElementById("telefonnummer").value,
        epost: document.getElementById("email").value
    }
    let jsonString = JSON.stringify(orders);
    localStorage.setItem(lsOrdersName, jsonString);
}
