const show_all_pets = document.getElementById("show_all_pets");
const like_div = document.getElementById("likediv");
const my_modal_5 = document.getElementById('my_modal_5');
const adopt_modal = document.getElementById('adopt_modal');
let petsData = [];


function AllPets(category='pets') {
    show_all_pets.innerHTML = "";

    const load_div = document.createElement("div");
    show_all_pets.classList.remove("sm:grid-cols-2", "lg:grid-cols-3");
    load_div.innerHTML = `
        <div id="page_load" class=" flex justify-center items-center">
            <div class="w-full flex items-center justify-between">
                <div class="grid gap-3">
                    <div class="flex items-center justify-center">
                        <svg class="animate-spin border-indigo-600" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                            <g id="Group 1000003710">
                            <circle id="Ellipse 717" cx="26.0007" cy="25.9994" r="22.7221" stroke="#D1D5DB" stroke-width="6" stroke-dasharray="4 4" />
                            <path id="Ellipse 715" d="M32.6373 47.7311C38.0288 46.0843 42.6156 42.4922 45.5067 37.6526C48.3977 32.8129 49.3864 27.0714 48.2808 21.5435C47.1751 16.0156 44.054 11.0961 39.5239 7.74084C34.9938 4.38554 29.3781 2.83406 23.768 3.38782" stroke="#4F46E5" stroke-width="6" />
                            </g>
                        </svg>
                    </div>
                </div>   
            </div>
        </div>
    `;
    show_all_pets.appendChild(load_div);

    
    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/${category !== 'pets' ? `category/${category}/` : `${category}/`}`)
            .then(response => response.json())
            .then(data => { 
                show_all_pets.innerHTML = "";
                show_all_pets.classList.add("sm:grid-cols-2", "lg:grid-cols-3");
                data = category !== 'pets' ? data.data : data.pets;
                petsData = data;
                
                if(petsData.length <= 0){
                    document.getElementById('sort-btn-btn').disabled = true;
                    const div = document.createElement('div');
                    show_all_pets.classList.remove("sm:grid-cols-2", "lg:grid-cols-3");
                    div.classList.add('flex', 'justify-center', 'items-center', 'w-full', 'h-full');
                    div.innerHTML = `
                        <img class="w-1/5" src="images/error.webp" alt="">
                    `;
                    show_all_pets.appendChild(div);
                }
                else{
                    document.getElementById('sort-btn-btn').disabled = false;
                    displayPets(petsData);

                    
                    document.getElementById('sort-btn').addEventListener('click', () => {
                        const sortedPets = [...petsData].sort((a, b) => b.price - a.price);
                        displayPets(sortedPets);
                    });
                    
                }
            })
            .catch(error => console.error('Error fetching pets:', error));
    }, 1000);
}
    

function displayPets(data) {
    show_all_pets.innerHTML = "";
    show_all_pets.classList.add("sm:grid-cols-2", "lg:grid-cols-3");
    data.forEach(pet => {
        const div = document.createElement('div');
        div.classList.add('border-2', 'rounded-md', 'max-w-72');
        div.innerHTML = `
            <div class="p-3 space-y-3">
                <img src="${pet.image}" alt="">
                <div class="border-b-2">
                    <h1>${pet.pet_name ? pet.pet_name : 'xxx'}</h1>
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-people-line"></i>
                        <p>Breed: <span>${pet.breed ? pet.breed : 'Unknown Breed'}</span></p>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fa-regular fa-calendar"></i>
                        <p>Birth: <span>${pet.birth ? pet.birth: 'Unknown Birth Date'}</span></p>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-venus-mars"></i>
                        <p>Gender: <span>${pet.gender ? pet.gender : 'Unknown Gender'}</span></p>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p>Price: <span>${pet.price? `${pet.price}$`: 'Price Not Available'}</span></p>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                
                    <div><button onclick="Like(this, '${pet.image}')" class="like-btn px-3 py-1 text-teal-700 rounded-md border"><i class="fa-regular fa-thumbs-up"></i></button></div>
                    <div><button onclick=AdoptButtonClick(this) class="adopt-btn px-3 py-1 text-teal-700 rounded-md border">Adopt</button></div>
                    <div><button onclick=DetailsButtonClick(${pet.petId}) class="details_btn px-3 py-1 text-teal-700 rounded-md border">Details</button></div>
                </div>
            </div>
        `;
        show_all_pets.appendChild(div);
    });
}


function Like(likebtn, image){
    like_div.classList.add('border-2', 'rounded-md', 'p-1');
    if(!likebtn.classList.contains('disabled')){
        likebtn.classList.add('disabled', 'bg-gray-300', 'cursor-not-allowed');
        div = document.createElement('div');
        div.innerHTML = `
            <img class="w-[100px] lg:w-[75px]" src="${image}" alt="">
        `;
        like_div.appendChild(div);
    }
    
}


function DetailsButtonClick(id) {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(response => response.json())
        .then(data => {
            const pet = data.petData;
            div = document.createElement('div');
            div.classList.add('p-3', 'space-y-3', 'bottom-2');

            div.innerHTML = `
                <div class="p-3 space-y-3 bottom-2">
                    <img class="w-full" src="${pet.image}" alt="">
                    <div class="border-b-2 pb-3">
                        <h1>${pet.pet_name? pet.pet_name:'xxx'}</h1>
                        <div class="sm:grid sm:grid-cols-2 sm:grid-flow-row">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-people-line"></i>
                                <p>Breed: <span>${pet.breed? pet.breed: 'Unknown Breed'}</span></p>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fa-regular fa-calendar"></i>
                                <p>Birth: <span>${pet.date_of_birth? pet.date_of_birth:"Unknown Birth Date"}</span></p>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-venus-mars"></i>
                                <p>Gender: <span>${pet.gender? pet.gender: "Unknown Gender"}</span></p>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-dollar-sign"></i>
                                <p>Price: <span>${pet.price? `${pet.price}$`: "Price Not Available"}</span></p>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-syringe"></i>
                                <p>Vaccinated status: <span>${pet.vaccinated_status}</span></p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1>Details Information</h1>
                        <p class="max-w-[20em]">${pet.pet_details}</p>
                    </div>

                    <div class="modal-action">
                        <button onclick="ClosoModal()" class="w-full bg-teal-400 btn border py-2 px-4 rounded-md">Close</button>
                    </div>
                </div>
                `;
                my_modal_5.appendChild(div);
        });
        my_modal_5.showModal();
};


function ClosoModal() {
    document.getElementById('my_modal_5').innerHTML = '';
    my_modal_5.close();
}


function AdoptButtonClick(button) {
    document.querySelector('.time-count').innerText = 3;
    if(!button.classList.contains('disabled')){
        adopt_modal.showModal();
        let n = 2;
        const intervalId = setInterval(() => {
            const timeCountElement = document.querySelector('.time-count');
            if (timeCountElement) {
                timeCountElement.innerText = n;
            }
            n--;
        }, 1000);
    
        setTimeout(() => {
            clearInterval(intervalId); 
            adopt_modal.close();
        }, 3000);
    }
    
    button.classList.add('disabled', 'bg-gray-300', 'cursor-not-allowed');
}

AllPets();
