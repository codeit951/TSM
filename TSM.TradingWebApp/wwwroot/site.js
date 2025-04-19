window.registerOutsideClick = (dotnetHelper) => {
    document.addEventListener("mousedown", (event) => {
        let dropdown = document.getElementById("dropdownMenu");
        let userButton = document.querySelector(".user");

        if (dropdown && !dropdown.contains(event.target) && !userButton.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseDropdown");
        }

        let notidown = document.getElementById("notiarea");
        let notiButton = document.querySelector(".bell_wrapper");

        if (notidown && !notidown.contains(event.target) && !notiButton.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseTransform");
        }

        let settingsdown = document.getElementById("settingsarea");
        let settingsButton = document.querySelector(".settings_link");

        if (settingsdown && !settingsdown.contains(event.target) && !settingsButton.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseSettingsTransform");
        }

    });
};
window.registerOutsideClick2 = (dotnetHelper, id) => {
    document.addEventListener("mousedown", (event) => {
        
        let coinsbaldown = document.getElementById(id);
        let coinsbalButton = document.querySelector(".buy");

        if (coinsbaldown && !coinsbaldown.contains(event.target) && !coinsbalButton.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseCoinsAndBalanceDropdown");
        }
    });
};
window.registerOutsideClickSell = (dotnetHelper, id) => {
    document.addEventListener("mousedown", (event) => {

        let coinsbaldown = document.getElementById(id);
        let coinsbalButton = document.querySelector(".sell");

        if (coinsbaldown && !coinsbaldown.contains(event.target) && !coinsbalButton.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseCoinsAndBalanceDropdownSell");
        }
    });
};
window.registerOutsideClickConvertFrom = (dotnetHelper, id) => {
    document.addEventListener("mousedown", (event) => {

        let coinsbaldown = document.getElementById(id);
        let coinsbalButton = document.querySelector(".from");

        if (coinsbaldown && !coinsbaldown.contains(event.target) && !coinsbalButton.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseCoinsAndBalanceDropdownFrom");
        }
    });
};
window.registerOutsideClickConvertTo = (dotnetHelper, id) => {
    document.addEventListener("mousedown", (event) => {

        let coinsbaldown = document.getElementById(id);
        let coinsbalButton = document.querySelector(".to");

        if (coinsbaldown && !coinsbaldown.contains(event.target) && !coinsbalButton.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseCoinsAndBalanceDropdownTo");
        }
    });
};

window.registerOutsideClick3 = (dotnetHelper) => {
    document.addEventListener("mousedown", (event) => {

        let settingsdown = document.getElementById("settingsarea");
        let settingsButton = document.querySelector(".settings_link");

        if (settingsdown && !settingsdown.contains(event.target) && !settingsButton.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseSettingsTransform");
        }
    });
};

window.registerOutsideClickMining = (dotnetHelper) => {
    document.addEventListener("mousedown", (event) => {

        let mininghistory = document.getElementById("mininghistory");
        let stake_balance_button = document.querySelector(".stake_balance_button");

        if (mininghistory && !mininghistory.contains(event.target) && !stake_balance_button.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseHistory");
        }
    });
};

window.registerOutsideClickSubscribe = (dotnetHelper) => {
    document.addEventListener("mousedown", (event) => {

        let subscribehistory = document.getElementById("subscribehistory");
        let view_history = document.querySelector(".view_history");

        if (subscribehistory && !subscribehistory.contains(event.target) && !view_history.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseHistory");
        }
    });
};

window.registerOutsideClickReferal = (dotnetHelper) => {
    document.addEventListener("mousedown", (event) => {

        let referalPanel = document.getElementById("referalPanel");
        let referal_link = document.querySelector(".referal_link");

        if (referalPanel && !referalPanel.contains(event.target) && !referal_link.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseReferalTransform");
        }
    });
};
