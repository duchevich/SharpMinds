let table = new Table();

table.init();



addButton.addEventListener('click', function(e){
	e.preventDefault();
	table.toggleTable();
})

let inputSubmit = document.getElementById('submit-input');
let checkall = document.getElementById('select-all');

inputSubmit.addEventListener('click', function(e){
	e.preventDefault();
	table.saveUser();
	table.toggleTable();
})

checkall.addEventListener('click', function(){
	table.checkAllBoxes();
	table.toggleDeleteButton()
});