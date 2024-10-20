const categorydiv = document.getElementById('show_all_categories');


function AllCategories() {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(response => response.json())
        .then(data => {
            data.categories.forEach(category => {
                const button = document.createElement('button');
                button.classList.add('category_btn', 'flex', 'justify-center', 'items-center', 'gap-2', 'border-2', 'rounded-md', 'px-8', 'py-2');
                button.innerHTML =`
                    <img width="30" src="${category.category_icon}" alt=""> <span class="font-bold text-lg ">${category.category}</span>
                `;
                button.onclick = function() {
                    categoryClick(this, category.id, category.category);
                };
                categorydiv.appendChild(button);
            });
        })
        .catch(error => console.error('Error fetching pets:', error));
}


function categoryClick(button ,id, category) {
    document.querySelectorAll('.category_btn').forEach(btn => {
        if(btn != button){
            btn.classList.remove('rounded-full', 'bg-teal-100', 'border-teal-400');
        }
        button.classList.add('rounded-full', 'bg-teal-100', 'border-teal-400');
    });

    AllPets(category);
}

AllCategories();