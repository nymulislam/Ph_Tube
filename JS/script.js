// get category from API
const categoriesApi = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const categoryData = data.data;
    fourButton(categoryData)

    if (categoryData.length> 0){
        playCard(categoryData[0].category_id);
    }
}
categoriesApi()

const fourButton = categories => {
    const categoryContainer = document.getElementById('category_container');

    categories.forEach(category => {
        const newDiv = document.createElement('div');


        newDiv.innerHTML = `
        <button onclick = "playCard('${category.category_id}')"
        class="btn px-9 text-lg bg-gray-200 active:text-white active:bg-red-500 hover:bg-red-100 normal-case rounded-md">${category.category}</button>
        `
        categoryContainer.appendChild(newDiv)
    })
}

// get Json data from API
const playCard = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const cards = data.data;
    dynamicSection(cards)
}

// show card by dynamic dom creation
const dynamicSection = cards => {
    const cardContainer = document.getElementById('card_container');
    cardContainer.textContent = '';

    const error = document.getElementById('find_data');
    if (cards.length > 0) {
        error.classList.add('hidden');
    } else {
        error.classList.remove('hidden');
    }

    cards.forEach(card => {
        const createElement = document.createElement('div')
        createElement.innerHTML = `
    
        <div class="card w-full bg-base-100 shadow-xl mt-20">
        <figure>
            <img class="h-52" src="${card.thumbnail}" alt="Thumbnail" />
            <div class="absolute w-fit top-44 left-40 px-1 py-1 bg-gray-900 rounded-md" style="${card.others.posted_date > 0 ? '' : 'display: none;'}">
                <p class=" text-white text-sm">${card.others.posted_date > 0 ? convertTime(card.others.posted_date) : ''}</p>
            </div>
        </figure>
            <div class="flex my-5 gap-3">
                <div>
                    <img class="rounded-full w-[50px] h-[50px]" src="${card.authors[0].profile_picture}" alt="">
                </div>
                <div>
                    <h2 class="card-title mb-3">${card.title}</h2>
                    <div class="flex items-center gap-1">
                        <h4 class="mb-1 text-gray-500">${card.authors[0].profile_name}</h4>
                        <h4 class="mb-1">${card.authors[0].verified ? '<img src="./Images/verify.png">' : ''}</h4>
                    </div>
                    <h4 class="text-gray-500">${card.others.views}</h4>
                </div>
            </div>
        </div>
    `

        cardContainer.appendChild(createElement)
    });
}

// convert second to hours & minutes
const convertTime = second => {
    const hoursSum = parseInt(second / 3600);
    const minutes = parseInt((second / 60) - hoursSum * 60);
    const hours = hoursSum.toString().slice(0, 1)
    return `${hours}hrs ${minutes}min ago`
}

// Link blog page
const blog = () => {
    window.open('blog.html#')
}



