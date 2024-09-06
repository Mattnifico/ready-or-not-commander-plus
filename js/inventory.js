const inventoryList = document.getElementById("inventoryList");

function loadPurchasedItems() {
    let purchasedItems = localStorage.getItem("purchasedItems");

    if (purchasedItems === null) {
        inventoryList.innerHTML = "<li>No items purchased yet.</li>";
        return;
    }

    purchasedItems = JSON.parse(purchasedItems);

    inventoryList.innerHTML = "";
    purchasedItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        inventoryList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", loadPurchasedItems);