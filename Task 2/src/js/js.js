(function(){

let dataKey = 'data',
    data = '',
    alphabetOrder = true,
    startIndex = 0,
    finishIndex = 10,
    startIndexPagination = 0,
    finishIndexPagination = 1,
    sortArray = '',
    sortArrayFlag = false,
    searchArray = [];
    
    
// checks the availability of data
let isDataLocal = () =>{
    data = !localStorage.getItem(dataKey) ? getDataFromServer() : createTable(JSON.parse(localStorage.getItem(dataKey)));
}

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

// create table and pagination
let createTable = function(data){
    let tbody = document.getElementById('tbody');
    let contentTable = '';
    //let dataArray = (sortArrayFlag == false) ? data.slice() : sortArray.slice();
    let dataArray = (sortArrayFlag == false) ? data.slice() : sortArray.slice();
    dataArray.forEach(function(item, i, data){
        if( i >= startIndex && i < finishIndex){
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
    createPagination(dataArray);
    pageEvent();
    return data;
}


// create pagination
let createPagination = function(data){
    console.log(startIndexPagination);
    console.log(finishIndexPagination);
    let len = data.length / 10;
    let activeItem;
    let pagination = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
    for(let i = 0; i < len; i++){
        activeItem = (i >= startIndexPagination && i < finishIndexPagination) ? ' active' : '';
        pagination += `<li class="page-item ${activeItem}">
                            <a class="page-link page-link-num" data-num="${i + 1}" href="#">${i + 1}</a>
                        </li>`
    }
    pagination += ` <li class="page-item"><a class="page-link" href="#">Next</a></li>`;
    paginationList.innerHTML = pagination; 
}

// menu pagination click event
let pageEvent = function(){
    Array.prototype.forEach.call(document.querySelectorAll('.page-link-num'), function(a){
        a.addEventListener('click', function(e){
            e.preventDefault();
            startIndexPagination = + this.dataset.num - 1;
            finishIndexPagination = + this.dataset.num;
            finishIndex = 10 * this.dataset.num;
            startIndex = 10 * (this.dataset.num - 1);
            createTable(data);
        })
      })
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
    sortArray = data.slice(0);
    sortArray.sort(function(a,b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        if(alphabetOrder){
            return x < y ? -1 : x > y ? 1 : 0;
        }
        else{
            return x > y ? -1 : x < y ? 1 : 0;
        }
    });
    createTable(sortArray);
}

let searchFunction = function(searchValue){
    searchArray = [];
    let len = data.length;
    let expr = new RegExp("(" + searchValue + ")", "i");
    for(let i = 0; i < len; i++){
        for(let key in data[i]){
            if(data[i][key].toString().search(expr) != -1){
                searchArray.push(data[i]);
                break;
            }
        }
    }
    createTable(searchArray);
}

checkall.addEventListener('click', function(){
    checkAllBoxes();
});

filter.addEventListener('change', function(){
    let checked = this.value;
    startIndex = 0;
    finishIndex = 10;
    startIndexPagination = 0;
    finishIndexPagination = 1;
    if(checked == 'a'){
        sortArrayFlag = true;
        alphabetOrderSort(true);
    }
    else if(checked == 'z'){
        sortArrayFlag = true;
        alphabetOrderSort(false);
    }
    else{
        sortArrayFlag = false;
        createTable(data);
    }
})

more.addEventListener('click', function(e){
    e.preventDefault();
    finishIndex += 10;
    finishIndexPagination += 1;
    // console.log(startIndexPagination);
    // console.log(finishIndexPagination);
    createTable(data);
})

search.addEventListener('submit', function(e){
    e.preventDefault();
    let searchValue = searchInput.value;
    startIndex = 0;
    finishIndex = 10;
    startIndexPagination = 0;
    finishIndexPagination = 1;
    searchFunction(searchValue);
    searchInput.value = '';
})

isDataLocal();

}());

