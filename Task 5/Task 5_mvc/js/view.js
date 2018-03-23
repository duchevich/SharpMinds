class TableView {
    constructor(){
		this.tableTitle = document.getElementById('table-title');
		this.userList = document.getElementById('user-list');
		this.inputId = document.getElementById('inputId');
		this.inputName = document.getElementById('inputName');
		this.inputLogin = document.getElementById('inputLogin');
		this.inputEmail = document.getElementById('inputEmail');
		this.inputGender = document.getElementById('inputGender');
		this.inputCountry = document.getElementById('inputCountry');
		this.inputAvatar = document.getElementById('inputAvatar');
		this.detailsView = document.getElementById('details-view');
		this.mainView = document.getElementById('main-view');
		this.backButton = document.getElementById('back-btn');
		this.deleteButton = document.getElementById('deleteButton');
        this.checkall = document.getElementById('select-all');
        this.inputSubmit = document.getElementById('submit-input');
    }
    
    // переключение видимости таблицы / формы
    toggleTable(){
        this.tableTitle.classList.toggle('hide');
        this.mainView.classList.toggle('hide');
        this.detailsView.classList.toggle('hide');
    }
// отрисовка таблицы пользователей
renderTable(){
    let tableStr = '';
    this.users.forEach((item, i) =>{
        tableStr += `<tr data-id="${item.id}">
                    <td><input class="checkboxes" type="checkbox" name="check" value="${item.id}"></td>
                    <td>${i + 1}</td>
                    <td><img src="${item.avatar}"></td>
                    <td>${item.name}</td>
                    <td>${item.login}</td>
                    <td>${item.email}</td>
                    <td>${item.gender}</td>
                    <td>${item.country}</td>
                    <td>
                        <span class="editRow icon-pencil"></span>
                    </td>
                    <td>
                        <span class="delRow icon-cross"></span>
                    </td>
                    </tr>
            `;
    })
    this.userList.innerHTML = tableStr;
}   




}