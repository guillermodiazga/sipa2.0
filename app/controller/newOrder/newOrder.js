var controller =  controller || {};

// Constructor
controller.newOrder = {};

controller.newOrder.loadDataToOrder = function() {
	
	controller.newOrder.loadOrderTypes();
	controller.newOrder.showCurrentDate();
};

controller.newOrder.loadOrderTypes = function (){

	model.newOrder.getTypesOrders()
		.then(function (data) {
		    if( data.length > 0){
		        //load data in view
		       var items = "";
		       $.each(data, function(i, item){
		       		items += "<option value='"+item.id+"'>"+item.talimento+"</option>";
		       });
		       $("#typeOrder").append(items);
		      
		     }else{
		        	alert("No se pudieron cargar los tipos de pedido")
		        }
		 }).fail(function(e){
		 	alert("Error: " + e.responseText);
		});
}

controller.newOrder.loadPptoUserToNewOrder = function (){
	model.newOrder.getPptoUserToNewOrder($("#typeOrder").val(), sessionStorage.id)
		.then(function (data) {
		    $("#ppto").html("");
		    if( data.length > 0){
		        //load data in view
		       var items = "";
		       $.each(data, function(i, item){
		       		items += "<option value='"+item.id+"'>"+item.id+"-"+item.nombre+"- Saldo: $"+formatMoney(item.valorini-item.valorpedido)+"</option>";
		       });
		       $("#ppto").append(items);
		       controller.newOrder.loadItemsToNewOrder();

		     }else{
		        	alert("No hay presupuesto para este tipo de pedido");
		        	$("#addItems").hide();
		        }
		 }).fail(function(e){
		 	$("#ppto").append(items);
		 	alert("Error: " + e.responseText);
		 	$("#addItems").hide();
		});
}

controller.newOrder.showCurrentDate = function (){
	$("#currentDate").val(currentDate());
	$("#deliveryDate").val(currentDate());
	$("#deliveryTime").val(currentTime());
}

controller.newOrder.loadItemsToNewOrder = function (){
	model.newOrder.getItemsToNewOrder($("#typeOrder").val())
		.then(function (data) {
		    if( data.length > 0){
		        //load data in view
		       var items = "";
		       $.each(data, function(i, item){
		       	items += 
		       	"<div class='item row' data-id="+item.id+" data-value="+item.valor+">"+
		       		"<div class='col-xs-6 col-md-4'>"+
			       		"<img class='thumbnail' src='img/items/"+item.id+"' width='100%'> "+
		       		"</div>"+
		       		"<div class='col-xs-6 col-md-8'>"+
		       			"<div class='row'>"+
			       			"<div class='col-xs-12 col-md-11'>"+
					       		"<strong class='nameItem'>"+item.id+"-"+item.nombre+"</strong>"+
			       			"</div>"+
			       		"</div>"+
		       			"<div class='row'>"+
			       			"<div class='col-xs-0 col-md-10'>"+
					       		"<p class='description text-justify text-muted'>"+item.descripcion+"</p>"+
			       			"</div>"+
		       			"<div class='row'>"+
			       		"</div>"+
			       			"<div class='col-xs-12 col-md-10'>"+
				       			"Valor sin IVA: <strong>$"+formatMoney(item.valor)+"</strong>"+
			       			"</div>"+
			       			"<div class='col-xs-9 col-md-9'>"+
				       			"Valor con IVA: <strong>$"+formatMoney(Math.floor(parseInt(item.valor)*((parseInt(item.iva)/100)+1)))+"</strong>"+
			       			"</div>"+
			       			"<div class='col-xs-1 col-md-1'>"+
				       			"<span id='"+item.id+"' class='selectItem btn btn-primary glyphicon glyphicon-ok' title='Selecionar Item'></span>"+
			       			"</div>"+
			       		"</div>"+
		       		"</div>"+
		       	"</div><hr>";
		       });
		       $("#itemList").html("").append(items);

		       $(".selectItem").click(function(){
					//change items list
					controller.newOrder.selectedItem(this);
				});

		     }else{
		        	alert("No se pudieron cargar los items")
		        }
		 }).fail(function(e){
		 	alert("Error: " + e.responseText);
		});
	
}

controller.newOrder.selectedItem = function(element){

	var $parent = $(element).parent().parent().parent();

	//close modal
	$('#products').modal('hide');

	//clone template
	$("#templateItemAdded")
		.clone().show()
		.find(".nameItem").text($parent.find(".nameItem").text()).end()
		.find(".description").text($parent.find(".description").text()).end()
		.find("img").attr("src",$parent.parent().find("img").attr("src")).end()
		.find(".individualValue").attr("data-value",$parent.parent().attr("data-value"))
		.text("$"+formatMoney($parent.parent().attr("data-value"))).end()
		.attr("id",$parent.parent().attr("data-id"))
		.appendTo("#items");
	//add events
	$(".quantity").off().change(function(e){
		var element = e.target;
		var quantity = element.value;
		var individualValue = $(element).parent().parent().parent().parent().find(".individualValue").attr("data-value");
		$(element).parent().parent().find(".totalValue").text("$"+formatMoney(quantity*individualValue));

	});

	$(".deletedItem").off().click(function(e){
		var $element = $(e.target);
		$element.parent().parent().parent().remove();
	});
};

controller.newOrder.save = function(jsonData){
debugger
//http://127.0.0.1/sipa2.0/services/main.php?f=saveOrder&data=%22[{%22name%22:%22typeOrder%22,%22value%22:%222%22},{%22name%22:%22deliveryDate%22,%22value%22:%222016-02-02%22},{%22name%22:%22deliveryTime%22,%22value%22:%2221:16%22},{%22name%22:%22nameEvent%22,%22value%22:%221%22},{%22name%22:%22address%22,%22value%22:%221%22},{%22name%22:%22comment%22,%22value%22:%221%22},{%22name%22:%22nameReceive%22,%22value%22:%221%22},{%22name%22:%22telephone%22,%22value%22:%2211%22},{%22name%22:%22celphone%22,%22value%22:%221%22},{%22name%22:%22idItem%22,%22value%22:%222%22},{%22name%22:%22quantity%22}]%22
	//jsonData = JSON.stringify(jsonData);

	model.newOrder.saveNewOrder(jsonData)
	.then(function (data) {
	    if( data.length > 0){
	        //load data in view
	       alert("Pedido Guardado");
	      
	    }else{
        	alert("No se pudo guardar")
        }
	 })
	.fail(function(e){
	 	alert("Error: " + e.responseText);
	});
};
/*
*/
controller.newOrder.getFormData = function(form){
	var $form = $( form ),
		jsonData = $form.serializeArray(),
		idItem = $form.find("#items").find(".item").attr("id"),
		quantity = $form.find("#items").find("#idItem").find(".quantity").attr("id");
		
		jsonData.push({name: "idItem", value: idItem});
		jsonData.push({name: "quantity", value: quantity});

	return jsonData;
};

//add all events
controller.newOrder.initEvents = function(){
	$("#typeOrder").change(function(){
		//change items list
		controller.newOrder.loadItemsToNewOrder();
		controller.newOrder.loadPptoUserToNewOrder();
		//Clear items selected
		$("#items").html("");
		$("#addItems").show();
	});

	$("#formNewOrder").submit(function(e){
		e.preventDefault();
		
		var jsonData = controller.newOrder.getFormData(this);
		controller.newOrder.save(jsonData);

	});
	


};

//Constructor
controller.newOrder.loadDataToOrder();

//add Events
controller.newOrder.initEvents();
