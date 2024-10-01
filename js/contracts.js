let activeContract = localStorage.getItem("activeContract");

function updateContractStatus(){
    const contractStatus = document.getElementById("contractStatus");
    if (activeContract){
        contractStatus.innerHTML = `Current contract: ${activeContract}`;
    } else {
        contractStatus.innerHTML = "No contract selected.";
    }
}

document.querySelectorAll("button.contract-button").forEach(button => {
    button.addEventListener("click", function() {
        const contractName = button.getAttribute("data-contract");

        if (activeContract) {
            alert("No other contracts can be started until the current contract is finished.")
        } else {
            activeContract = contractName;
            localStorage.setItem("activeContract", activeContract);
            alert(`This contract will be completed once the next mission completion form is submitted.`);

            document.querySelectorAll("button.contract-button").forEach(b => b.disabled = true);
        }

        updateContractStatus();
    });
});

function disableCompletedContract(contractName){
    const button = document.querySelector(`button[data-contract="${contractName}"]`);
    if (button){
        const buttonContainer = button.parentNode;
        const completedText = document.createElement("p");
        completedText.textContent = `${contractName} (Completed)`;
        buttonContainer.replaceChild(completedText, button);
    }
}

function init(){
    document.querySelectorAll("button.contract-button").forEach(b => b.disabled = true);
}

init();
updateContractStatus();