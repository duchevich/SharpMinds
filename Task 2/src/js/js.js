(function(){

let dataKey = 'data',
    data = '';

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

let createTable = function(){
    let tbody = document.getElementById('tbody');
    let contentTable = '';
    data.forEach(function(item, i, data){
        contentTable += `<tr>
                            <td></td>
                            <td>${item.id}</td>
                            <td>${item.userId}</td>
                            <td>${item.title}</td>
                            <td>${item.body}</td>
                        </tr>`;
    });
    tbody.innerHTML = contentTable;
}

isDataLocal();
createTable();
}());

