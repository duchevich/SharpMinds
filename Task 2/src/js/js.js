(function(){

let dataKey = 'data',
    data = '',
    alphabetOrder = true;

// get data from server, create table and pagination, and put data to localStorage
let getDataFromServer = function(){
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            data = json;
            createTable(data);
            localStorage.setItem(dataKey, JSON.stringify(json))}
        );
}

// checks the availability of data
let isDataLocal = function(){
    return data = !localStorage.getItem(dataKey) ? getDataFromServer() : createTable(JSON.parse(localStorage.getItem(dataKey)));
    
}

// create pagination
let createPagination = function(data){
    let len = data.length / 10;
    let activeItem;
    let pagination = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
    for(let i = 0; i < len; i++){
        activeItem = (i == 0) ? ' active' : '';
        pagination += `<li class="page-item ${activeItem}">
                            <a class="page-link" data-num="${i + 1}" href="#">${i + 1}</a>
                        </li>`
    }
    pagination += ` <li class="page-item"><a class="page-link" href="#">Next</a></li>`;
    paginationList.innerHTML = pagination; 
}

// create table and pagination
let createTable = function(data){
    let tbody = document.getElementById('tbody');
    let contentTable = '';
    data.forEach(function(item, i, data){
        if(i < 10){
            contentTable += `<tr>
                                <td><input class="checkboxes" type="checkbox" name="check" value="${item.id}"></td>
                                <td>${item.id}</td>
                                <td>${item.userId}</td>
                                <td>${item.title}</td>
                                <td>${item.body}</td>
                            </tr>`;   
        }
    });
    tbody.innerHTML = contentTable;
    createPagination(data);
    return data;
}

// select/unselect all checkboxes
let checkAllBoxes = function(){
    checkBoxes = document.querySelectorAll('.checkboxes');
    if (checkall.checked) {
        checkBoxes.forEach(function(item, i, checkBoxes){
            item.checked = true;
        });
    }
    else {
        checkBoxes.forEach(function(item, i, checkBoxes){
            item.checked = false;
        });
    }
}

let alphabetOrderSort = function(alphabetOrder){

    var byName = data.slice(0);
    byName.sort(function(a,b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        if(alphabetOrder){
            return x < y ? -1 : x > y ? 1 : 0;
        }
        else{
            return x > y ? -1 : x < y ? 1 : 0;
        }
        
    });
    createTable(byName);
}



checkall.addEventListener('click', function(){
    checkAllBoxes();
})

filter.addEventListener('change', function(){
    let checked = this.value;
    if(checked == 'a'){
        alphabetOrderSort(true);
    }
    else if(checked == 'z'){
        alphabetOrderSort(false);
    }
    else{
        createTable(data);
    }

})


isDataLocal();

}());

