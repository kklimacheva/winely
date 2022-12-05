const toBuyList = document.getElementsByClassName("constructor__todo")[0];
const toBuyInput = document.getElementsByClassName("constructor__form")[0];
let toBuyArr = [];


toBuyInput.addEventListener("submit", function (e){
    e.preventDefault();
    const formData = new FormData(toBuyInput);
    const toBuy = {
        name: formData.get("wine"),
        done: false,
        id: Date.now() + Math.random().toString(36).slice(2)
    };
    toBuyArr.push(toBuy);
    toBuyInput.reset();
    store(toBuyArr);
});

function store(todoArr){
    localStorage.setItem("listTodo", JSON.stringify(todoArr));
    displayToBuyList(todoArr);
}

function getFromStorage(){
    const ref = localStorage.getItem("listTodo");
    if (ref){
        toBuyArr = JSON.parse(ref);
        displayToBuyList(toBuyArr);
    }
}

function clearStorage(){
    localStorage.removeItem("listTodo");
    toBuyArr.splice(0, toBuyArr.length);
    displayToBuyList(toBuyArr);
}

function displayToBuyList(todoArr){
    toBuyList.innerHTML = '';
    todoArr.forEach(function (todo) {
        const div = document.createElement("div");
        div.setAttribute("class", "todo-list__item")
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
    toBuyArr = toBuyArr.filter(function (todo) {
        return todo.id !== id;
    });
    store(toBuyArr);
}

getFromStorage();

toBuyList.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains("delete__button");
    if (isButton){
        deleteTodo(event.target.parentElement.id);
    }
})
