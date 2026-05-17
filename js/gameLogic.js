document.addEventListener("DOMContentLoaded", () => {
    loadUserInfo();
    updateLastVisit();
    document.querySelector("#betForm").addEventListener("submit", handleBet);
    document.querySelector("#exitGame").addEventListener("click", endGame);
    document.querySelector("#changeUser").addEventListener("click", () => {
        localStorage.clear();
        // Small delay to ensure storage is cleared before redirect
        setTimeout(() => {
            window.location.href = "intro.html";
        }, 100);
    });
});

function loadUserInfo() {
    const fullName = `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`;
    const phone = localStorage.getItem("phoneNumber");
    const postal = localStorage.getItem("postal");
    const bank = parseFloat(localStorage.getItem("bank")).toFixed(2);
    const lastVisit = localStorage.getItem("lastVisit");

    document.querySelector("#welcomeMsg").textContent = `Welcome back, ${fullName}.`;
    document.querySelector("#contactMsg").textContent = `Your phone number is: ${phone} and your postal code is ${postal}.`;
    document.querySelector("#bankMsg").textContent = `You have $${bank} left in your bank roll.`;
    document.querySelector("#visitMsg").textContent = `Your last visit was ${lastVisit}.`;
}


function updateLastVisit() {
    const now = new Date().toLocaleString();
    localStorage.setItem("lastVisit", now);
}

function handleBet(event) {
    event.preventDefault();

    const bank = parseFloat(localStorage.getItem("bank"));
    const betAmount = parseFloat(document.querySelector("#betAmount").value);
    const betType = document.querySelector("#betType").value;
    const errorDiv = document.querySelector("#betError");

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > bank) {
        errorDiv.textContent = "Enter a valid bet between $1 and your available bank.";
        return;
    } else {
        errorDiv.textContent = "";
    }

    const roll1 = rollDice();
    const roll2 = rollDice();
    const total = roll1 + roll2;

    const dice1 = document.querySelector("#dice1");
    const dice2 = document.querySelector("#dice2");
    dice1.src = `images/dice${roll1}.png`;
    dice2.src = `images/dice${roll2}.png`;

    // Animate dice roll
    $(dice1).hide().fadeIn(150);
    $(dice2).hide().fadeIn(150);

    let won = false;
    let winnings = 0;

    if (betType === "exactly7" && total === 7) {
        won = true;
        winnings = betAmount * 4;
    } else if (betType === "over7" && total > 7) {
        won = true;
        winnings = betAmount * 1.5;
    } else if (betType === "under7" && total < 7) {
        won = true;
        winnings = betAmount * 1.5;
    } else {
        winnings = -betAmount;
    }

    const newBank = bank + winnings;
    localStorage.setItem("bank", newBank.toFixed(2));
    document.querySelector("#bankMsg").textContent = `You have $${newBank.toFixed(2)} left in your bank roll.`;


    const result = document.querySelector("#gameResult");

    result.textContent = won
        ? `🎉 You rolled ${total}. You won $${winnings.toFixed(2)}!`
        : `😢 You rolled ${total}. You lost $${betAmount.toFixed(2)}.`;

    result.classList.remove("win-animation");
    void result.offsetWidth;
    if (won) {
        result.classList.add("win-animation");
    }

    $(result).hide().fadeIn(300);


    if (newBank <= 0) {
        endGame();
    }
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function endGame() {
    document.querySelector("#gameArea").style.display = "none";
    document.querySelector("#gameControls").style.display = "none";
    document.querySelector("#endMessage").style.display = "block";

    const finalBank = localStorage.getItem("bank");
    document.querySelector("#finalBank").textContent = parseFloat(finalBank).toFixed(2);
}
