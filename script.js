const catalogMenu = document.getElementById("catalog-menu")

function catalogBtn() {
    catalogMenu.classList.toggle("open")
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


btn1.addEventListener('click', (e) => {
    let kiyimlar = allProducts.filter((product) => product.category === "Kiyim" || product.category === "Poyabzallar")

    renderCategory(kiyimlar)
})

btn2.addEventListener('click', (e) => {
    let kiyimlar = allProducts.filter((product) => product.category === "Poyabzallar")

    renderCategory(kiyimlar)
})





function renderCategory(data) {
    let wrapper = document.querySelector('.wrapper');
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
    xl:left-[900px]   <!-- katta desktop -->
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
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("korzinkaBtn")) {
       
        location.reload();
    }
});



