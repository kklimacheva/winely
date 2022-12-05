const toBuyList = document.getElementsByClassName("form__toBuy")[0];
const toBuyInput = document.getElementsByClassName("form")[0];
const template = document.getElementById("template");
let toBuyArray = [];


toBuyInput.addEventListener("submit", function (e){
    e.preventDefault();
    const formData = new FormData(toBuyInput);
    let wine = formData.get("wine");
    if (wine !== "") {
        const toBuy = {
            wine: formData.get("wine"),
            isChecked: false,
            id: Date.now() + Math.random().toString(36).slice(2)
        };
        toBuyArray.push(toBuy);
        toBuyInput.reset();
        store(toBuyArray);
    }
});

function store(toBuyArray){
    localStorage.setItem("listTodo", JSON.stringify(toBuyArray));
    displayToBuyList(toBuyArray);
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

function displayToBuyList(toBuyArray){
    toBuyList.innerHTML = '';
    toBuyArray.forEach(function (toBuy) {
        const clone = template.content.cloneNode(true);
        const item = clone.querySelector(".toBuy-list__item");
        const isChecked = toBuy.isChecked ? "checked" : null;
        item.setAttribute("id", toBuy.id);
        clone.querySelector('input').setAttribute(isChecked, isChecked);
        item.querySelector("span").textContent = toBuy.wine;
        toBuyList.append(clone);
    })
}

function CheckItem(id){
    for (let i = 0; i < toBuyArray.length; i++){
        if (toBuyArray[i].id === id){
            toBuyArray[i].isChecked = !toBuyArray[i].isChecked;
        }
    }
    store(toBuyArray);
}

function deleteToBuy(id){
    toBuyArray = toBuyArray.filter(function (toBuy) {
        return toBuy.id !== id;
    });
    store(toBuyArray);
}

getFromStorage();

toBuyList.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains("delete__button");
    const isCheckBox = event.target.classList.contains("checkbox");
    if (isButton){
        deleteToBuy(event.target.parentElement.id);
    }
    if(isCheckBox){
        CheckItem(event.target.parentElement.id);
    }
})
