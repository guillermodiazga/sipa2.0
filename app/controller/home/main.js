var controller =  controller || {};

// Constructor
controller.main = {};

controller.main.getOrdersPend = function() {
	model.main.getOrdersPend().then(function(data){
			console.log(data);
	});
};

$(document).ready(function(){
	(function initEvents (){
		controller.main.getOrdersPend();
	})();
});