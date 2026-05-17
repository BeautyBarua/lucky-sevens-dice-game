window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const rollMsg = document.getElementById("rollMsg");

  let rollInterval;
  let finalRoll;

  function drawDice(num) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ffcc";
    ctx.fillRect(50, 50, 100, 100);

    ctx.fillStyle = "black";
    const dots = {
      1: [[100, 100]],
      2: [[75, 75], [125, 125]],
      3: [[75, 75], [100, 100], [125, 125]],
      4: [[75, 75], [125, 75], [75, 125], [125, 125]],
      5: [[75, 75], [125, 75], [100, 100], [75, 125], [125, 125]],
      6: [[75, 75], [125, 75], [75, 100], [125, 100], [75, 125], [125, 125]]
    };

    dots[num].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Start rolling
  rollInterval = setInterval(() => {
    finalRoll = Math.floor(Math.random() * 6) + 1;
    drawDice(finalRoll);
  }, 200);

  // Stop after 5 seconds and show message
  setTimeout(() => {
    clearInterval(rollInterval);
    drawDice(finalRoll);
    rollMsg.textContent = `🎉 Wow! You rolled a ${finalRoll}!`;
  }, 5000);

  // Redirect after 7 seconds
  setTimeout(() => {
    window.location.href = "intro.html";
  }, 7000);

  // Skip button
  document.getElementById("skipBtn").addEventListener("click", () => {
    window.location.href = "intro.html";
  });
});
