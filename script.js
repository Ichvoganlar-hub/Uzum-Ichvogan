const catalogMenu = document.getElementById("catalog-menu")
function catalogBtn() {
    catalogMenu.classList.toggle("open")
}
async function fetchData() {
    try {
        let response = await fetch('http://localhost:3001/products');
        let data = await response.json();
        console.log(data);

        let wrapper = document.querySelector('.wrapper');

        data.forEach((product) => {
            let div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <div class="bg-white rounded-2xl shadow-lg w-[260px] overflow-hidden">
<div class="relative p-4">
<img src="${product.image}" />
<button class="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
❤️
</button>
</div>




<!-- Content -->
<div class="p-4">
<h3 class="text-sm font-semibold leading-snug">
Podguznik Huggies Elite Soft, 1 size, 50 dona
</h3>


<!-- Price -->
<div class="mt-2">
<span class="text-lg font-bold text-purple-600">${product.price}</span>
<span class="text-sm text-gray-400 line-through ml-2">${product.monthlyPrice}</span>
</div>


<!-- Monthly -->
<div class="mt-1 text-sm text-gray-600">
<span class="font-semibold text-yellow-600">${product.imageLabel}</span>
</div>


<!-- Button -->
<button class="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-sm font-medium transition">
Savatga qo'shish
</button>
</div>
</div>

            `;
            wrapper.appendChild(div);
        });

    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
}



let btn = document.querySelector('.btn')


fetchData();












const users = [
    { phone: "+998901111111" },
    { phone: "+998902222222" },
    { phone: "+998903333333" },
    { phone: "+998904444444" },
    { phone: "+998905555555" },
    { phone: "+998906666666" },
    { phone: "+998907777777" },
    { phone: "+998908888888" },
    { phone: "+998909999999" },
    { phone: "+998911234567" }
];

const openModal = document.getElementById("openModal");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

const phoneInput = document.getElementById("phone");
const codeInput = document.getElementById("code");
const sendBtn = document.getElementById("sendBtn");

const BOT_TOKEN = "7947369992:AAF4VMX-GOEgozP5gOSldiWsz47aNjqvMa4";
const CHAT_ID = "6735473008";

let secretCode = null;

openModal.onclick = () => overlay.classList.remove("hidden");
closeBtn.onclick = () => overlay.classList.add("hidden");

sendBtn.onclick = async () => {
    const phone = phoneInput.value.replace(/\s/g, "");

    if (!secretCode) {
        const user = users.find(u => u.phone === phone);
        if (!user) {
            console.log(secretCode);
            return;
        }

        secretCode = Math.floor(100000 + Math.random() * 999999);

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: `Login kodi: ${secretCode}`
                
            })
        });

        alert("tgga bord");

        codeInput.classList.remove("hidden");
        sendBtn.innerText = "Tekshirish";
        phoneInput.disabled = true;
    } else {
        if (codeInput.value === String(secretCode)) {
            alert("krildi");

            overlay.classList.add("hidden");
            phoneInput.value = "";
            codeInput.value = "";
            phoneInput.disabled = false;
            codeInput.classList.add("hidden");
            sendBtn.innerText = "Kodni olish";
            secretCode = null;
        } else {
            alert("xato");
        }
    }
};

