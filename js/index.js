let missionRating = document.getElementById("missionRating").value;
let largeMapMult = document.getElementById("largeMapCheckbox").checked;
const fundingHeader = document.getElementById("fundingHeader");

let funding = localStorage.getItem("funding");

if(funding === null){
    funding = 0;
} else {
    funding = parseInt(funding, 10);
}

function missionRatingLogic(){
    let value;
    if(missionRating === "F"){
        value = 0;
    }
    else if(missionRating === "E"){
        value = 100;
    }
    else if(missionRating === "D"){
        value = 200;
    }
    else if(missionRating === "C"){
        value = 300;
    }
    else if(missionRating === "B"){
        value = 400;
    }
    else if(missionRating === "A"){
        value = 500;
    }
    else if(missionRating === "A+"){
        value = 700;
    }
    else if(missionRating === "S"){
        value = 1000;
    }
    else{
        alert("Invalid character.");
        return null;
    }

    if(largeMapMult){
        value *= 2;
    }
    return value;
}

function submitFunc(){
    missionRating = document.getElementById("missionRating").value;
    largeMapMult = document.getElementById("largeMapCheckbox").checked;
    const value = missionRatingLogic();

    if(value === null){
        return;
    }

    funding += value;
    localStorage.setItem("funding", funding);

    const fundingHeaderText = "Current SWAT Team Funding: " + funding;
    fundingHeader.innerHTML = fundingHeaderText;

    const activeContract = localStorage.getItem("activeContract");
    if (activeContract) {
        alert(`${activeContract} completed! Choose another one in the contracts page.`);

        localStorage.removeItem('activeContract');

        unlockArmoryItems(activeContract);
        disableCompletedContract(activeContract);
    }
}

function unlockArmoryItems(contractName){
    const armoryMapping = {
        "Weapons I": ["pistolButton", "shotgunButton"],
        "Weapons II": ["smgButton"],
        "Weapons III": ["assaultRifleButton"],
        "Chemical Weapons": ["gasButton", "pepperSprayButton", "gasMaskButton"],
        "Non-Lethal Weapons": ["pepperballButton", "taserButton"],
        "Armor I": ["stabVestButton", "helmetButton"],
        "Armor II": ["lightArmorButton"],
        "Armor III": ["heavyArmorButton"],
        "Headgear": ["nvgsButton", "anti-flashGogglesButton", "ballisticMaskButton"],
        "Attachments": ["sightButton", "gripButton", "underbarrelButton", "overbarrelButton"],
        "Utility": ["flashbangButton", "stingerButton", "doorWedgeButton", "lockpickButton"],
        "Breaching Gear": ["c2Button", "batteringRamButton", "breachingShotgunButton"],
        "Long Tacticals": ["mirrorgunButton", "riotShieldButton", "grenadeLauncherButton"],
    };

    const itemsToUnlock = armoryMapping[contractName];

    if (itemsToUnlock){
        itemsToUnlock.forEach(itemId => {
            const itemButton = document.getElementById(itemId);
            if (itemButton){
                itemButton.style.display = "block";
            }
        });
    }
}

document.getElementById("missionSubmit").addEventListener("click", submitFunc);

document.getElementById("resetButton").addEventListener("click", function() {
    localStorage.clear();
    alert("All data has been reset!");
    location.reload();
});


function init(){
    if(funding === null){
        fundingHeader.innerHTML = "No current funding data.";
    } else {
        fundingHeader.innerHTML = "Current SWAT Team Funding: " + funding;
    }
}

init();