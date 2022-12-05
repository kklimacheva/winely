const toBuyList = document.getElementsByClassName("form__toBuy")[0];
const toBuyInput = document.getElementsByClassName("form")[0];
let toBuyArray = [];


toBuyInput.addEventListener("submit", function (e){
    e.preventDefault();
    const formData = new FormData(toBuyInput);
    let wine = formData.get("wine");
    if (wine !== "") {
        const toBuy = {
            wine: formData.get("wine"),
            done: false,
            id: Date.now() + Math.random().toString(36).slice(2)
        };
        toBuyArray.push(toBuy);
        toBuyInput.reset();
        store(toBuyArray);
    }
});

function store(toBuyArr){
    localStorage.setItem("listTodo", JSON.stringify(toBuyArr));
    displayToBuyList(toBuyArr);
}

function getFromStorage(){
    const ref = localStorage.getItem("listTodo");
    if (ref){
        toBuyArray = JSON.parse(ref);
        displayToBuyList(toBuyArray);
    }
}

function clearStorage(){
    localStorage.removeItem("listTodo");
    toBuyArray.splice(0, toBuyArray.length);
    displayToBuyList(toBuyArray);
}

function displayToBuyList(toBuyArr){
    toBuyList.innerHTML = '';
    toBuyArr.forEach(function (todo) {
        const div = document.createElement("div");
        div.setAttribute("class", "toBuyList__item")
        div.setAttribute("id", todo.id);
        div.innerHTML = `
            <input type="checkbox" class="checkbox ${todo.id}">
            ${todo.wine}
            <button class="delete__button">Delete</button>
        `;
        toBuyList.append(div);
    })
}

function deleteTodo(id){
    toBuyArray = toBuyArray.filter(function (todo) {
        return todo.id !== id;
    });
    store(toBuyArray);
}

getFromStorage();

toBuyList.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains("delete__button");
    if (isButton){
        deleteTodo(event.target.parentElement.id);
    }
})
