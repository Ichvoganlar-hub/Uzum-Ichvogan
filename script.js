
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



function renderCategorymain(data){
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


const searchInput = document.querySelector('input[placeholder="Искать товары и категории"]');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (query === "") {
        document.querySelector('.boxxx').innerHTML = "";
        return;
    }

    const filteredProducts = allProducts.filter(product => {
        return product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query);
    });

    renderCategory(filteredProducts);
});


const kiyimlarbtn1 = document.querySelector(".Itachibtn")
console.log(kiyimlarbtn1);
