var controller =  controller || {};

// Constructor
controller.newOrder = {};

controller.newOrder.loadDataToOrder = function() {
	if(sessionStorage.idOrderToEdit){
		var idOrderToEdit = sessionStorage.idOrderToEdit;
		controller.newOrder.loadOrderToEdit(idOrderToEdit);
		$("legend span").html("Modificar Pedido: <b>"+idOrderToEdit+"<span id='deleteOrder' class='pull-right btn btn-danger' ><i class='fa fa-trash'></i> Anular Pedido</span>");
		$("#deleteOrder").click(function(){controller.newOrder.deleteOrder(idOrderToEdit, $("#ppto").val(), $("#formNewOrder").attr("vlrtotalanterior"))});
		sessionStorage.idOrderToEdit = '';
		$(".btn-default[type='reset']").click(function() {
			controller.navigation.loadView("main");
		});

	}else{
		controller.newOrder.loadOrderTypes();
		controller.newOrder.showCurrentDate();
		$("#formNewOrder").find("#typeOrder").removeAttr("disabled").end()
						  .find("#ppto").removeAttr("disabled");
	}

};

controller.newOrder.deleteOrder = function(idOrder, ppto, vlrtotalanterior ){
	general.confirm("Desea anular este pedido?", function(){
		general.stopUser.show();
		model.newOrder.deleteOrder(idOrder, ppto, vlrtotalanterior)
			.done(function(data){
				var callBack = function(){
									controller.navigation.loadView('main');
							    }
				general.stopUser.hide();
				alert(data.message, callBack).success();
			})
			.fail(function(e){
				general.stopUser.hide();
				alert("Error: " + e.responseText).danger();
			});
	});

};

controller.newOrder.loadOrderTypes = function (idTypeOrder){
	model.newOrder.getTypesOrders(idTypeOrder)
		.done(function (data) {
			if( data.length > 0){
		        //load data in view
		        var items = "";
		        $.each(data, function(i, item){
		        	items += "<option value='"+item.id+"'>"+item.talimento+"</option>";
		        });
		        $("#typeOrder").append(items);  
		    }else{
		    	alert("No se pudieron cargar los tipos de pedido").danger();
		    }

		    if(idTypeOrder){
		    	$("#formNewOrder").find("#typeOrder").val(idTypeOrder);
		    };


			 general.stopUser.hide();
		}).fail(function(e){
			alert("Error: " + e.responseText).danger();
		});
};

controller.newOrder.loadPptoUserToNewOrder = function (idppto){
	var typeOrder = $("#typeOrder").val();
	if(typeOrder || idppto){
		model.newOrder.getPptoUserToNewOrder($("#typeOrder").val(), localStorage.id, idppto)
		.done(function (data) {
			$("#ppto").html("");
			if( data.length > 0){
		        //load data in view
		        var items = "",
		        vlrtotalanterior = parseFloat($("#formNewOrder").attr("vlrtotalanterior")) || 0;
		        $.each(data, function(i, item){
		        	var saldo = parseFloat(item.valorini-item.valorpedido+vlrtotalanterior);
		        	items += "<option data-saldo="+saldo
		        			+" value='"+item.id+"'>"+item.id+"-"+item.nombre+"- Saldo: $"+formatMoney(saldo)+"</option>";
		        });
		        $("#ppto").append(items);
		        if(!idppto)
		        	controller.newOrder.loadItemsToNewOrder();

		    }else{
		    	alert("No hay presupuesto para este tipo de pedido").warning();
		    	$("#addItems").attr("disabled","disabled");
		    	$(".deletedItem:visible").click();
		    	$("#ppto").html("").val("");
		    	controller.newOrder.showCurrentDate();
		    }
		}).fail(function(e){
			$("#ppto").append(items);
			alert("Error: " + e.responseText).danger();
			$("#addItems").attr("disabled","disabled");
		});
	}
};

controller.newOrder.showCurrentDate = function (){
	$("#currentDate").val(currentDate());
	$("#deliveryDate").val(currentDate());
	$("#deliveryTime").val(currentTime());
}

controller.newOrder.loadItemsToNewOrder = function (typeOrder, callBack){
	var typeOrder = typeOrder || $("#typeOrder").val();
	pushNotify.show("Cargando Productos y presupuesto...").info().hide(2000);
	if(typeOrder){
		model.newOrder.getItemsToNewOrder(typeOrder)
		.done(function (data) {
			if( data.length > 0){
		        //load data in view
		        $("#itemList").html("");
		        $("#txtToSearch").off().on("keyup change", function(){controller.newOrder.searchItem()}).focusin();
		        $.each(data, function(i, item){
		        	var vlrConIva = Math.round(parseFloat(item.valor)*((parseFloat(item.iva)/100)+1));
		        	$("#itemListTemplate")
		        	.clone().show()
		        	.attr("data-id", item.id)
		        	.attr("data-value", vlrConIva)
		        	.removeAttr("id")
		        	.find(".img").attr("src", "img/items/" + item.id + ".png").end()
		        	.find(".nameItem").text(item.id + "-" + item.nombre).end()
		        	.find(".description").text(item.descripcion).end()
		        	.find(".vlrSinIva").text("$"+formatMoney(item.valor)).end()
		        	.find(".valor").text("$"+formatMoney(vlrConIva)).end()
		        	.find(".selectItem").attr("id", item.id).end()
		        	.find(".collapse").attr("id", "dtlle"+i).end()	
		        	.find(".dtlle").attr("data-target", "#dtlle"+i).end()
		        	.appendTo("#itemList");
		        });
		        
		        general.zoomImg();

		        $("#addItems").removeAttr("disabled");

		        $(".selectItem").click(function(){
					//change items list
					$(".deletedItem:visible").click();//delete other product selected
					controller.newOrder.selectedItem(this);
				});

				if(typeof callBack == 'function' ){
					callBack();
				}

		    }else{
		    	alert("No se pudieron cargar los items").warning();
		    }
		}).fail(function(e){
			alert("Error: " + e.responseText).danger();
		});
	}
	
};

controller.newOrder.selectedItem = function(element){

	var $parent = $(element).parent().parent().parent();
	$("#items").html("");
		
    //clone and fill template 
    $("#templateItemAdded")
	    .clone()
	    .find(".nameItem").text($parent.parent().find(".nameItem").text()).end()
	    .find(".description").text($parent.parent().find(".description").text()).end()
	    .find("img").attr("src",$parent.parent().find("img").attr("src")).end()
	    .find(".individualValue").attr("data-value",$parent.parent().attr("data-value"))
	    .text("$"+formatMoney($parent.parent().attr("data-value"))).end()
	    .attr("id",$parent.parent().attr("data-id"))
	    .appendTo("#items");
    
    $("#items").find(".itemTemplate").addClass("item").removeClass("itemTemplate").end()
    $("#items .row").show()

    $(".quantity:visible").focus();

	//close modal
	$('#products').modal('hide');
	
	//add events
	$(".quantity").off().on("keyup change", function(e){
		$(this).val(Math.abs($(this).val()));
		var element = this,
		    quantity = parseFloat($(this).val()) || 0,
		    individualValue  = parseFloat($(element).parent().parent().parent().parent().find(".individualValue").attr("data-value")),
		    aditionalValue = parseFloat($(element).parent().parent().parent().parent().find(".aditionalValue").attr("data-value")) || 0,
		    totalValue = (quantity*individualValue)+aditionalValue;
		$(element).parent().parent().find(".totalValue").text("$"+formatMoney(Math.round(totalValue))).data("totalValue", totalValue);

	});

	$(".aditionalValue").off().on("keyup change", function(e){
		$(this).val(Math.abs($(this).val()));
		var element = e.target,
		    aditionalValue = parseFloat(element.value) || 0,
		    quantity  = parseFloat($(element).parent().parent().find(".quantity").val()) || 0,
		    individualValue = parseFloat($(element).parent().parent().parent().parent().find(".individualValue").attr("data-value")),
		    totalValue = (quantity*individualValue)+aditionalValue;
		$(element).parent().parent().find(".totalValue").text("$"+formatMoney(Math.round(totalValue))).data("totalValue", totalValue);

	});

	$(".deletedItem").off().click(function(e){
		var $element = $(e.target);
		$element.parent().parent().parent().remove();
	});

	general.zoomImg();
};

controller.newOrder.save = function(jsonData, swSaveDirect){
	
	var _this = this;
	if(!swSaveDirect){
		var deliveryDate = moment(jsonData[0]["deliveryDate"], "YYYY-MM-DD"),
		deliveryTime = moment(jsonData[0]["deliveryTime"], "hh:mm"),
		msg = "El pedido se entregara el día: <b>" +
		deliveryDate.format("LL") +
		"</b> a las <b>"+ deliveryTime.format("hh:mm A") +
		".<br><br> ¿Desea Continuar?</b>";

		$("#textConfirm").html(msg)
		$("#okConfirm").off().click(function(){
			_this.save(jsonData, true);
		});
		$('#modalConfirm').modal('show');
		return;
	}

	general.stopUser.show();
	model.newOrder.saveNewOrder(jsonData)
	.done(function (data, textStatus, jqXHR) {
		if( data.success ){

				var callBack = function(){controller.newOrder.resetForm();};

				if($("#formNewOrder").attr("idordertoedit")){
					callBack = function(){
									controller.navigation.loadView('main');
							    }
				}

		    	alert(data.message, callBack).success();
		    	
		    	general.stopUser.hide();
		    }else{
		    	alert("No se pudo guardar " + textStatus + " " + data.message).danger();
		    	general.stopUser.hide();
		    }
		})
	.fail(function(jqXHR, textStatus){
		general.stopUser.hide();
		alert("Error: " + jqXHR.responseText + ", " + textStatus).danger();
	});
};

controller.newOrder.resetForm = function(){
	$('#formNewOrder')[0].reset();
	$(".deletedItem:visible").click();
	$("#ppto").html("").val("");
	controller.newOrder.showCurrentDate();
	$("#addItems").attr("disabled","disabled");
};

controller.newOrder.getFormData = function(form){
	var $form = $( form ),
	jsonData = [],
	data = {};

	data.vlrtotalanterior = $form.attr("vlrtotalanterior") || "";
	data.idOrder = $form.attr("idordertoedit") || "";
	data.typeOrder = $form.find("#typeOrder").val();
	data.deliveryDate= $form.find("#deliveryDate").val();
	data.deliveryTime= $form.find("#deliveryTime").val();
	data.nameEvent= $form.find("#nameEvent").val();
	data.address= $form.find("#address").val();
	data.comment= $form.find("#comment").val();
	data.nameReceive= $form.find("#nameReceive").val();
	data.telephone= $form.find("#telephone").val();
	data.celphone= $form.find("#celphone").val();
	data.idItem= $form.find("#items").find(".item").attr("id");
	data.quantity= $form.find("#items").find(".item").find(".quantity").val();
	data.aditionalValue= $form.find("#items").find(".item").find(".aditionalValue").val() || 0;
	data.ppto= $form.find("#ppto").val();

	data.idUser = localStorage.id;

	jsonData.push(data);

	return jsonData;

};

//Edit Order
controller.newOrder.loadOrderToEdit = function(idOrderToEdit){
	general.stopUser.show();
	model.newOrder.loadDataOrder(idOrderToEdit)
		.done(function (data) {
			data = data[0];
			general.stopUser.hide();

			if(!data){
				alert("Pedido no Existe");
				controller.navigation.loadView("main");
			}
			//load data in view
			var $form = $("#formNewOrder"),
			creationDate = moment(data.fchreg.substring(0,10), "L").format("Y-MM-DD");
			controller.newOrder.loadOrderTypes(data.idtalimento);
			controller.newOrder.loadPptoUserToNewOrder(data.idppto);
			$form
				.attr("vlrtotalanterior", (parseFloat(data.valorpedido) + parseFloat(data.valoradic)))
				.attr("idordertoedit", idOrderToEdit)
				.find("#typeOrder").attr("disabled", "disabled").end()
				.find("#deliveryDate").val(data.fchentrega).end()
				.find("#deliveryTime").val(data.hora).end()
				.find("#currentDate").val(creationDate).end()
				.find("#nameEvent").val(data.evento).end()
				.find("#address").val(data.direccion).end()
				.find("#comment").val(data.comentario).end()
				.find("#nameReceive").val(data.personarecibe).end()
				.find("#telephone").val(data.telfjorecibe).end()
				.find("#celphone").val(data.movilrecibe).end()
				.find("#ppto").attr("disabled", "disabled").val(data.idppto);
				
		//Add item
				$("#addItems").removeAttr("disabled");
				controller.newOrder.loadItemsToNewOrder(data.idtalimento, 
					function(){
						$("#itemList").find(".selectItem[id="+data.iditem+"]").click();
						
						$form
							.find("#items").find(".item").attr("id", data.iditem).end()
							.find(".quantity").val(data.cantidad).change().end()
							.find(".aditionalValue").val(data.valoradic).change();
					}
				);
				
		}).fail(function(e){
			    general.stopUser.hide();
				alert("Error: " + e.responseText).danger();
		});
};


//add all events
controller.newOrder.initEvents = function(){
	$("#typeOrder").change(function(){
		//Clear items selected
		$("#items").html("");
		
		if($(this).val() == "false"){
			return false;
		}
		//change items list
		controller.newOrder.loadItemsToNewOrder();
		controller.newOrder.loadPptoUserToNewOrder();
	});

	$("#formNewOrder").submit(function(e){
		e.preventDefault();
		
		var jsonData = controller.newOrder.getFormData(this),
		isDataValid = controller.newOrder.validateForm(jsonData);
		if( isDataValid === true) {
			controller.newOrder.save(jsonData);
		}else{
			alert(isDataValid).warning();
		}
	});

	$("#addItems").click(function(){
		$("#txtToSearch").val("");
	});

};

//validar envio
controller.newOrder.validateForm = function(jsonData) {
	var fecha = jsonData[0]["deliveryDate"],
	hora = jsonData[0]["deliveryTime"],
	typeOrder = jsonData[0]["typeOrder"],
	cantidad = jsonData[0]["quantity"],
	idItem = jsonData[0]["idItem"],
	direccion = jsonData[0]["address"],
	comentario = jsonData[0]["comment"],
	telfjorecibe = jsonData[0]["telephone"],
	evento = jsonData[0]["nameEvent"],
	movilrecibe = jsonData[0]["celphone"],
	personarecibe = jsonData[0]["nameReceive"],
	msg = true,
	saldo = parseFloat($("#ppto").find("option:selected").data("saldo")),
	totalValue = $(".totalValue:visible").data("totalValue");


	if(typeOrder == "false"){
		return msg = "Selecciona un tipo de pedido antes de enviar.";
	}

	if($(".totalValue:visible").size() && totalValue > saldo){
		return msg = "El valor total del pedido supera el presupuesto seleccionado";
	}

	if((validateText(personarecibe))==false){
		return msg = "Persona que recibe invalido";
	}

	if((validateText(movilrecibe))==false){
		return msg = "Celular persona que recibe invalido";
	}

	if((validateText(evento))==false){
		return msg = "Nombre evento invalido";
	}

	if( (validateNum(cantidad)) == false ){
		return msg = "Cantidad invalida";
	}

	if( comentario.length>250 ) {
		return msg = ('Comentario demasiado extenso');
	}

	if( direccion.length>150 ) {
		return msg = ('Direccion muy larga');
	}

	if( direccion == null || direccion.length < 5 || /^\s+$/.test(direccion ) ) {
		return msg = ('Direccion Obligatorio');
	}


	if(hora=='00') {
		return msg = ('Hora No valida');
	}

	/*Validate if exist products added*/

	if( !idItem ) {
		return msg = ('Debe seleccionar el producto');
	}

	if( !validateNum(cantidad) || cantidad < 1 ) {
		return msg = ('Ingresa la cantidad');
	}

	/*Validar Fecha de Entrega*/
	if( !controller.newOrder.validateDeliveryDate(fecha, hora) ) {
		return msg = ('El pedido se debe hacer con mínimo 24 horas de anticipación');
	}

	return msg;

}

controller.newOrder.validateDeliveryDate = function (date, hour){
	var deliveryDate = moment(date+" "+hour, "YYYY-MM-DD H:m"),
	today = moment(),
	diferencia = deliveryDate.diff(today,"hours"),
	numberDayDelivery = deliveryDate.format("d"),
	numberDayToday = today.format("d"),
	minHoursToRelease = 24;

	//pedido el sabdo para dia lunes
	if(numberDayToday == 6 && numberDayDelivery == 1)
		minHoursToRelease = 48+8;

	//pedido el sabdo para dia lunes
	if(numberDayToday == 7 && numberDayDelivery == 1)
		minHoursToRelease = 24+8;

	//Si es hecho el viernes paar entregar el lunes
	if(numberDayToday == 5 && numberDayDelivery == 1)
		minHoursToRelease = 72+8;

	//Pedido con menos de 24 horas de anticipacion
	if(diferencia < minHoursToRelease)
		return false;

	return true;
	
};

controller.newOrder.searchItem = function(){
	var items = $("#itemList").find(".nameItem"),
	texto = $("#txtToSearch").val().toLowerCase();

	items.parent().parent().parent().parent().show();
	for(var i=0; i< items.size(); i++){
		var contenido = items.eq(i).text().toLowerCase();
		var index     = contenido.indexOf(texto);
		if(index == -1){
			items.eq(i).parent().parent().parent().parent().hide();
		}		
	}
}

//---------------------------------------Constructor
controller.newOrder.loadDataToOrder();

//add Events
controller.newOrder.initEvents();
