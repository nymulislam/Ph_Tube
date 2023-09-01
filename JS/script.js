// get Json data from API
const playCard = async () => {
    const apiCatch = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const res = await apiCatch.json();
    const data = res.data;
    eachCard(data)

}
playCard()


// get card object from array
const eachCard = data => {
    for (card of data) {
        dynamicSection(card)
    }

}

// show card by dynamic dom creation
const dynamicSection = card => {
    const cardContainer = document.getElementById('card_container');
    const createElement = document.createElement('div')
    createElement.innerHTML = `
    
        <div class="card w-full bg-base-100 shadow-xl mt-20">
        <figure>
            <img src="${card.thumbnail}" alt="Thumbnail" />
            <p class="absolute top-40 left-40 px-3 py-1 bg-black rounded-md text-white">${card.others.posted_date}</p>
        </figure>
            <div class="flex my-5 gap-3">
                <div>
                    <img class="rounded-full w-[50px] h-[50px]" src="${card.authors[0].profile_picture}" alt="">
                </div>
                <div>
                    <h2 class="card-title mb-3">${card.title}</h2>
                    <div class="flex gap-1">
                        <h4 class="mb-1 text-gray-500">${card.authors[0].profile_name}</h4>
                        <h4 class="mb-1">${card.authors[0].verified}</h4>
                    </div>
                    <h4">${card.others.views}</h4>
                </div>
            </div>
        </div>

    `
    cardContainer.appendChild(createElement)
}

