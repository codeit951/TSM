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
window.registerOutsideClick2 = (dotnetHelper) => {
    document.addEventListener("mousedown", (event) => {
        
        let coinsbaldown = document.getElementById("coinsbalarea");
        let coinsbalButton = document.querySelector(".amount_select");

        if (coinsbaldown && !coinsbaldown.contains(event.target) && !coinsbalButton.contains(event.target)) {
            dotnetHelper.invokeMethodAsync("CloseCoinsAndBalanceDropdown");
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
