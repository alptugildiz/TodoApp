// UI VARIABLES
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
const checkbox = document.getElementById('checkbox');
let items;

//load items

loadItems();


//call event listeners
eventListeners();

function eventListeners(){
    //submit event
    form.addEventListener('submit',addNewItem);
    //delete item 
    taskList.addEventListener('click',deleteItem)
    //delete all items
    btnDeleteAll.addEventListener('click',deleteAllItems)
    //dark theme toggle
    checkbox.addEventListener('change',changeTheme)
}

//load items 
function loadItems() {

    items = getItemsFromLS();


    items.forEach(function(item){
        createItem(item);
    })

}


//get items from Local Storage

function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items
}


//set items to Local Storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));

}
//delete From Locale Storage

function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}
//function for creating item
function createItem(text){

//create li
const li = document.createElement('li');
li.className = 'list-group-item list-group-item-secondary'
li.appendChild(document.createTextNode(text))

//create a 
const a  = document.createElement('a')
a.classList = 'delete-item float-right'
a.setAttribute('href','#')
a.innerHTML = '<i class="fas fa-times"></i>'

//add a to li 
li.appendChild(a);

//add lit o ul
taskList.appendChild(li)

}

//add new item
function addNewItem (e) {

    if (input.value == '') {
        alert('add new item');
    }else{
        //creating new item
    let newItem = input.value;
    createItem(newItem);

//adding to local storage
    setItemToLS(newItem);
    }



//clearing input
    input.value=''

    e.preventDefault();    

}

//delete an item
function deleteItem(e){
    
    if(e.target.className==='fas fa-times'){
       e.target.parentElement.parentElement.remove();

       //delete from local storage

       deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }


    e.preventDefault()
}

//delete all items

function deleteAllItems(e){

    //the function will put null inside of the ul element to delete all the list items in it
    if(confirm('ARE YOU SURE ? ')){
        taskList.innerHTML='';
        localStorage.clear();
    }
    e.preventDefault();
}

//change the theme of the app 
function changeTheme(){
    document.body.classList.toggle('light')
    
    
}





