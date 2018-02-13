(function(){

let dataKey = 'data',
    data = '',
    checkAll = document.getElementById('checkall');


let getDataFromServer = function(){
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            data = json;
            createTable();
            localStorage.setItem(dataKey, JSON.stringify(json))}
        );
}

let isDataLocal = function(){
    data = !localStorage.getItem(dataKey) ? getDataFromServer() : JSON.parse(localStorage.getItem(dataKey));
}

let createPagination = function(){
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

let createTable = function(){
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
    createPagination();
}

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


checkall.addEventListener('click', function(){
    checkAllBoxes();
})



isDataLocal();
createTable();
}());

