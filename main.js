const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const overlay = document.getElementById("overlay");
const sendCode = document.getElementById("sendCode");
const phoneInput = document.getElementById("phone");
git 
const BOT_TOKEN = "7947369992:AAF4VMX-GOEgozP5gOSldiWsz47aNjqvMa4";
const CHAT_ID = "6735473008";

openModal.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

sendCode.addEventListener("click", async () => {
  const phone = phoneInput.value.trim();

  if (!phone) {
    alert("Telefon raqam kiriting!");
    return;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const payload = {
    chat_id: CHAT_ID,
    text: `📞 Yangi telefon raqam: ${phone}`
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.ok) {
      alert("Telegramga yuborildi!");
      overlay.classList.add("hidden");
      phoneInput.value = "";
    } else {
      alert("Xato: " + data.description);
    }
  } catch (err) {
    alert("Xatolik: " + err.message);
  }
});
