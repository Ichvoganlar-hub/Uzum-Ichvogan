
const catalogMenu = document.getElementById("catalog-menu")

function catalogBtn() {
    catalogMenu.classList.toggle("open")

    if (!catalogMenu.classList.contains("open")) {
        let box = document.querySelector('.boxxx')
        if (box) {
            box.innerHTML = ""
        }
    }
}



let allProducts = [];


async function fetchData() {
    try {
        let response = await fetch('http://localhost:3001/products');
        let data = await response.json();
        console.log(data);
        allProducts = data;

        let wrapper = document.querySelector('.wrapper');
        wrapper.innerHTML = "";

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




<div class="p-4">
<h3 class="text-sm font-semibold leading-snug">
Podguznik Huggies Elite Soft, 1 size, 50 dona
</h3>


<div class="mt-2">
<span class="text-lg font-bold text-purple-600">${product.price}</span>
<span class="text-sm text-gray-400 line-through ml-2">${product.monthlyPrice}</span>
</div>


<div class="mt-1 text-sm text-gray-600">
<span class="font-semibold text-yellow-600">${product.imageLabel}</span>
</div>


<button class="korzinkaBtn  mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-sm font-medium transition">
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




fetchData();



let wrapper123 = document.querySelector('.wrapper123')
console.log(wrapper123);

let btn1 = document.querySelector('.btn1')
let btn2 = document.querySelector('.btn2')
let btn3 = document.querySelector('.btn3')
let btn4 = document.querySelector('.btn4')
let btn5 = document.querySelector('.btn5')
let btn6 = document.querySelector('.btn6')
let kym = document.querySelector(`.Itachibtn`)
let elec = document.querySelector(`#elec`)
let smartp = document.querySelector(`#smartp`)
let aksesur = document.querySelector(`#aksesur`)

kym.addEventListener(`click`, (e) => {
    let kymlar = allProducts.filter((product) => product.category === "Kiyim")
    renderCategorymain(kymlar)
})

elec.addEventListener(`click`, (e) => {
    let eleclar = allProducts.filter((product) => product.category === "Elektronika")
    renderCategorymain(eleclar)
})

smartp.addEventListener(`click`, (e) => {
    let smartplar = allProducts.filter((product) => product.category === "Smartfonlar")
    renderCategorymain(smartplar)
})
aksesur.addEventListener(`click`, (e) => {
    let aksesurlar = allProducts.filter((product) => product.category === "Aksessuarlar")
    renderCategorymain(aksesurlar)
})

btn1.addEventListener('click', (e) => {
    let kiyimlar = allProducts.filter((product) => product.category === "Kiyim")

    renderCategory(kiyimlar)
})

btn2.addEventListener('click', (e) => {
    let kiyimlar = allProducts.filter((product) => product.category === "Poyabzallar")

    renderCategory(kiyimlar)
})

btn3.addEventListener('click', (e) => {
    let kiyimlar = allProducts.filter((product) => product.category === 'Elektronika')

    renderCategory(kiyimlar)
})

btn4.addEventListener('click', (e) => {
    let kiyimlar = allProducts.filter((product) => product.category === "Smartfonlar")

    renderCategory(kiyimlar)
})

btn5.addEventListener('click', (e) => {
    let kiyimlar = allProducts.filter((product) => product.category === 'Aksessuarlar')

    renderCategory(kiyimlar)
})

btn6.addEventListener('click', (e) => {
    let kiyimlar = allProducts.filter((product) => product.category === "Aksessuarlar")

    renderCategory(kiyimlar)
})



function renderCategorymain(data) {
    let wrappermain = document.querySelector(`.wrapper`)
    wrappermain.innerHTML = "";

    data.forEach((product) => {
        let divcha = document.createElement(`div`)
        divcha.classList.add(`card`)
        divcha.innerHTML = `
                    <div class="bg-white rounded-2xl shadow-lg w-[260px] overflow-hidden">
                <div class="p-4">
                    <img src="${product.image}" />
                    <p class="font-bold mt-2">${product.name}</p>
                    <p class="text-purple-600">${product.price}</p>
                </div>
            </div>
        `
        wrappermain.appendChild(divcha)
    })
}
function renderCategory(data) {
    let wrapper = document.querySelector('.boxxx');
    wrapper.innerHTML = "";

    data.forEach((product) => {
        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <div class="bg-white rounded-2xl shadow-lg w-[260px] overflow-hidden">
                <div class="p-4">
                    <img src="${product.image}" />
                    <p class="font-bold mt-2">${product.name}</p>
                    <p class="text-purple-600">${product.price}</p>
                </div>
            </div>
        `;
        wrapper.appendChild(div);
    });
}


function renderCategory(data) {
    let wrapper = document.querySelector('.boxxx');
    wrapper.innerHTML = "";

    data.forEach((product) => {
        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <div class="bg-white rounded-2xl shadow-lg w-[260px] overflow-hidden">
                <div class="p-4">
                    <img src="${product.image}" />
                    <p class="font-bold mt-2">${product.name}</p>
                    <p class="text-purple-600">${product.price}</p>
                </div>
            </div>
        `;
        wrapper.appendChild(div);
    });
}





function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("korzinkaBtn")) {

        const card = e.target.closest(".card");
        const img = card.querySelector("img").src;
        const price = card.querySelector(".text-purple-600").innerText;
        const monthly = card.querySelector(".line-through").innerText;
        const imageLabel = card.querySelector(".text-yellow-600").innerText;
        const name = card.querySelector("h1, h2, h3, p").innerText || "";

        let cart = getCart();

        cart.push({
            image: img,
            price: price,
            monthlyPrice: monthly,
            imageLabel: imageLabel,
            name: name,
            count: 1
        });

        saveCart(cart);

        alert("Mahsulot savatga qo‘shildi ✅");
    }
});

const korzinkaDiv = document.querySelector(".korzinkadiv");
const cart = getCart();

korzinkaDiv.innerHTML = "";



if (cart.length === 0) {
    korzinkaDiv.innerHTML = `<p class="text-gray-500 text-lg">Savatingiz bo‘sh</p>`;
} else {

    cart.forEach(product => {
        korzinkaDiv.innerHTML += `
        <div class="border border-gray-300 w-[700px] rounded-xl mb-6">
            <div class="border-b p-[20px] border-gray-200">
                <div class="flex items-center gap-2">
                    <input type="checkbox">
                    <h1>Hamasini yechish</h1>
                </div>
            </div>

            <div class="px-[20px] py-[30px]">
                <div class="pb-5">
                    <p class="text-gray-400 font-medium">Uzum market yetkazib berishi</p>
                    <h1 class="text-gray-800 font-medium text-[20px]">Ertaga yetkazib beramiz</h1>
                </div>

                <div class="flex items-center gap-[15px]">
                    <input type="checkbox">
                    <img class="w-[100px] h-[100px]" src="${product.image}" />
                    <div class="flex flex-col gap-2">
                        <p class="font-medium">${product.name}</p>
                        <div class="flex items-center gap-6">
                            <p class="text-gray-400">sotuvchi: <span class="text-black">Uzum</span></p>
                            <div class="flex border border-gray-300 rounded-md w-[120px] h-[35px]">
                                <button class="w-1/3">−</button>
                                <span class="w-1/3 text-center">${product.count}</span>
                                <button class="w-1/3">+</button>
                            </div>
                            <div class="text-right">
                                <h1 class="font-bold text-purple-800">${product.price} so'm</h1>
                                <p class="text-gray-500 text-sm">${product.monthlyPrice} so'm / oy</p>
                            </div>
                        </div>
                        <p class="text-yellow-600 font-semibold">${product.imageLabel}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    const totalPrice = cart.reduce((sum, product) => {
        const priceNumber = Number(product.price.replace(/\s|so'm/g, ''));
        return sum + priceNumber * product.count;
    }, 0);
    korzinkaDiv.innerHTML += `
   <div class="w-[450px] flex flex-col justify-center z-[99] items-start gap-2 fixed top-[200px]
    left-[50px]       <!-- mobil uchun left -->
    sm:left-[100px]   <!-- kichik ekran -->
    md:left-[300px]   <!-- planshet -->
    lg:left-[600px]   <!-- kichik desktop -->
    xl:left-[900px]   <!-- katta dsktop -->
">

        <div class="border bg-white  border-gray-200 w-[450px] h-[90px] flex flex-col justify-center items-center px-[20px] rounded-xl">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-semibold text-lg text-gray-800">Topshirish punktiga bepul</h2>
                    <p class="text-sm text-gray-500">Yana 845 010 so‘m va kuryer orqali bepul bo‘ladi</p>
                </div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-purple-600 h-2 rounded-full w-1/4"></div>
            </div>
        </div>
        <div class="border bg-white  border-gray-200 w-[450px] flex flex-col justify-center gap-[10px] items-start px-[20px] py-[20px] rounded-xl">
            <div>
                <h3 class="font-semibold text-lg mb-2">Buyurtmangiz</h3>
                <div class="flex justify-between text-sm">
                    <span>Mahsulotlar (${cart.length})</span>

                </div>
            </div>
            <div class="space-y-1 text-sm">
                <div class="flex justify-between">

                </div>
                <div class="flex justify-between">

                </div>
            </div>
            <hr />
            <div class="flex justify-between items-center">
                <div>
                </div>
                <div class="text-right flex justify-center items-center gap-3">
                    <p class="text-sm text-gray-500">Jami:</p>
                    <p class="text-2xl font-bold">${totalPrice.toLocaleString()} so'm</p>
                </div>
            </div>
            <button class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition">Rasmiylashtirishga o‘tish</button>
        </div>
    </div>
    `;



}
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("korzinkaBtn")) {

        location.reload();
    }
});











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

