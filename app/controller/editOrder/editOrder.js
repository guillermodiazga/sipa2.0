var controller =  controller || {};

controller.editOrder = {};

controller.editOrder.initEvents = function(){

	$("#formEditOrder").submit(function(e){
		e.preventDefault();
		sessionStorage.idOrderToEdit = $("#idOrder").val();
		controller.navigation.loadView('newOrder', null, null, true);
	});
};

//---------------------------------------Constructor
//add Events
controller.editOrder.initEvents();