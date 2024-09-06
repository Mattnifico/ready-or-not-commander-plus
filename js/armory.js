const fundingHeader = document.getElementById("fundingHeader1");

let funding = localStorage.getItem("funding");

if(funding === null){
    funding = 0;
} else {
    funding = parseInt(funding, 10);
}

function updateFundingHeader(){
    fundingHeader.innerHTML = "Current SWAT Team Funding: " + funding;
}

function purchaseItem(event){
    const button = event.target;
    const value = parseInt(button.getAttribute("data-value"), 10);
    const itemName = button.getAttribute("data-item");

    funding += value;

    localStorage.setItem("funding", funding);
    updateFundingHeader();

    let purchasedItems = localStorage.getItem("purchasedItems");

    if (purchasedItems === null){
        purchasedItems = [];
    } else {
        purchasedItems = JSON.parse(purchasedItems);
    }

    if(!purchasedItems.includes(itemName)){
        purchasedItems.push(itemName);
        localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
    }
    
    localStorage.setItem(`button_${itemName}_clicked`, "true");

    button.style.display = "none";
}

function hidePurchasedButtons() {
    let purchasedItems = localStorage.getItem("purchasedItems");

    if (purchasedItems === null) {
        return;
    }

    purchasedItems = JSON.parse(purchasedItems);

    const buttons = document.querySelectorAll(".purchase-button");
    buttons.forEach(button => {
        const itemName = button.getAttribute("data-item");

        const isClicked = localStorage.getItem(`button_${itemName}_clicked`)
        if (isClicked === "true") {
            button.style.display = "none";
        }
    });
}

function init(){
    updateFundingHeader();
    hidePurchasedButtons();

    const buttons = document.querySelectorAll(".purchase-button");
    buttons.forEach(button => {
        button.addEventListener("click", purchaseItem);
    });
}

init();