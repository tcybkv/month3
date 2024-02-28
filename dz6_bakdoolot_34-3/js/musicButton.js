document.addEventListener("DOMContentLoaded", () => {
    const musicBtn = document.getElementById("music-btn");
    const additionalButtonsContainer = document.getElementById("additional-buttons-container");
    let additionalButtonsVisible = false;

    musicBtn.addEventListener("click", () => {
        additionalButtonsVisible = !additionalButtonsVisible;
        toggleAdditionalButtons();
    });

    const toggleAdditionalButtons = () => {
        if (additionalButtonsVisible) {
            createButtons();
        } else {
            removeButtons();
        }
    };

    const createButtons = () => {
        additionalButtonsContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const newBtn = document.createElement("button");
            newBtn.textContent = `Button ${i + 1}`;
            additionalButtonsContainer.appendChild(newBtn);
        }
    };

    const removeButtons = () => {
        additionalButtonsContainer.innerHTML = '';
    };
});
