var controller =  controller || {};

// Constructor
controller.user = {};

controller.user.loadListDependences = function() {

};


controller.user.getFormData = function(form){
	var $form = $( form ),
		jsonData = [],
		data = {};

	data.id = $form.find("#id").val();
	data.name = $form.find("#name").val();
	data.mail = $form.find("#mail").val();
	data.office = $form.find("#office").val();
	data.telephone = $form.find("#telephone").val();
	data.celphone = $form.find("#celphone").val();
	data.password = $form.find("#password").val();
	data.dependence = $form.find("#dependence").val();

	jsonData.push(data);

	return jsonData;
};

//add all events
controller.user.initEvents = function(){

	$("#formUser").submit(function(e){
		e.preventDefault();
		if($("#password").val() == $("#password2").val()){
			var jsonData = controller.newOrder.getFormData(this);
			controller.newOrder.save(jsonData);
		}else{
			alert("La contraseña no coincide");
		}
	});

};

//---------------------------------------Constructor
controller.user.loadListDependences();

//add Events
controller.user.initEvents();