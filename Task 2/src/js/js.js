(function(){

let dataKey = 'data',
    data = '',
    alphabetOrder = true,
    startIndex = 0,
    finishIndex = 10,
    startIndexPagination = 0,
    finishIndexPagination = 1,
    sortArray = [],
    sortArrayFlag = false,
    searchArray = [],
    searchArrayFlag = false;
    
    
// checks the availability of data
let isDataLocal = () =>{
    data = !localStorage.getItem(dataKey) ? getDataFromServer() : createTable(JSON.parse(localStorage.getItem(dataKey)));
}

// get data from server, create table and pagination, and put data to localStorage
let getDataFromServer = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            data = json;
            createTable(data);
            localStorage.setItem(dataKey, JSON.stringify(json))}
        );
}

// create table and pagination
let createTable = (data) => {
    let tbody = document.getElementById('tbody');
    let contentTable = '';
    let dataArray = searchArrayFlag == true && sortArrayFlag == true  || searchArrayFlag == false && sortArrayFlag ==true ?
                            sortArray.slice() : 
                            searchArrayFlag == true && sortArrayFlag == false ? 
                            searchArray.slice() : data.slice();
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
    pagePrevEvent();
    pageNextEvent();
    return data;
}


// create pagination
let createPagination = (data) => {
    let len = parseInt(data.length / 10);
    let activeItem;
    let prevDisabled = startIndexPagination == 0 || len == 0 ? 'disabled' : '';
    let nextDisabled = finishIndexPagination == len || len == 0 ? 'disabled' : '';
    let pagination = `<li class="page-item ${prevDisabled}"><a id="prevButton" class="page-link" href="#">Previous</a></li>`;
    for(let i = 0; i < len; i++){
        activeItem = (i >= startIndexPagination && i < finishIndexPagination) ? ' active' : '';
        pagination += `<li class="page-item ${activeItem}">
                            <a class="page-link page-link-num" data-num="${i + 1}" href="#">${i + 1}</a>
                        </li>`;
    }
    pagination += ` <li class="page-item ${nextDisabled}"><a id="nextButton" class="page-link" href="#">Next</a></li>`;
    paginationList.innerHTML = pagination; 
    if(finishIndexPagination == len || len == 0){
        more.classList.add('d-none');
    }
    else{
        more.classList.remove('d-none');
    }
}

// menu pagination click event 
let pageEvent = () => {
    paginationList.addEventListener('click', function(e){
        if(e.target && e.target.classList.contains('page-link-num')){
            e.preventDefault();
            checkall.checked = false;
            startIndexPagination = + e.target.dataset.num - 1;
            finishIndexPagination = + e.target.dataset.num;
            finishIndex = 10 * e.target.dataset.num;
            startIndex = 10 * (e.target.dataset.num - 1);
            createTable(data);
        }
    });
}
// menu pagination click event 
let pagePrevEvent = () => {
    prevButton.addEventListener('click', function(e){
        e.preventDefault();
        checkall.checked = false;
        finishIndexPagination -= 1;
        startIndexPagination = finishIndexPagination - 1;
        finishIndex = 10 * finishIndexPagination;
        startIndex = 10 * startIndexPagination;
        createTable(data);
    })
}

// menu pagination click event 
let pageNextEvent = () => {
    nextButton.addEventListener('click', function(e){
        e.preventDefault();
        checkall.checked = false;
        startIndexPagination = finishIndexPagination;
        finishIndexPagination += 1;
        finishIndex = 10 * finishIndexPagination;
        startIndex = 10 * startIndexPagination;
        createTable(data);
    
    })
}


// select/unselect all checkboxes
let checkAllBoxes = () => {
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

// sort the array in alphabetical order and in reverse alphabetical order
let alphabetOrderSort = (alphabetOrder) => {
    sortArray = (searchArrayFlag == false) ? data.slice(0) : searchArray.slice(0);
    sortArray.sort(function(a,b) {
        var x = a.title.replace(/<[^>]+>/g,'').toLowerCase();
        var y = b.title.replace(/<[^>]+>/g,'').toLowerCase();
        if(alphabetOrder){
            return x < y ? -1 : x > y ? 1 : 0;
        }
        else{
            return x > y ? -1 : x < y ? 1 : 0;
        }
    });
    createTable(sortArray);
}

// search
let searchFunction = (searchValue) => {
    let successSearchFlag = false;
    searchArray = [];
    let len = data.length;
    let expr = new RegExp("(" + searchValue + ")", "gi");
    let tempSearchArray = JSON.parse(JSON.stringify(data));
    for(let i = 0; i < len; i++){
        for(let key in tempSearchArray[i]){
            if(tempSearchArray[i][key].toString().search(expr) != -1){
                successSearchFlag = true;
                tempSearchArray[i][key] = tempSearchArray[i][key].replace(new RegExp("(" + searchValue + ")", "gi"), '<span class="bg-success">' + searchValue + '</span>')
            }
        }
        if(successSearchFlag == true){
            searchArray.push(tempSearchArray[i]);
        }
        successSearchFlag = false;
    }
    createTable(searchArray);
}

// reset settings 
let resetSettings = () =>{
    startIndex = 0;
    finishIndex = 10;
    startIndexPagination = 0;
    finishIndexPagination = 1;
    checkall.checked = false;
}

checkall.addEventListener('click', function(){
    checkAllBoxes();
});

filter.addEventListener('change', function(){
    let checked = this.value;
    resetSettings();
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
    checkall.checked = false;
    finishIndex += 10;
    finishIndexPagination += 1;
    createTable(data);
})

search.addEventListener('submit', function(e){
    e.preventDefault();
    filter.value = 0;
    sortArrayFlag = false;
    let searchValue = searchInput.value.trim();
    if(searchValue != ''){
        searchArrayFlag = true;
        resetSettings();
        searchFunction(searchValue);
        searchInput.value = '';
    }
})

clearButton.addEventListener('click', function(){
    filter.value = 0;
    searchArrayFlag = false;
    sortArrayFlag = false;
    searchInput.value = '';
    resetSettings();
    createTable(data);
});

isDataLocal();

}());

