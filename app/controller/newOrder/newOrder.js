var controller =  controller || {};

// Constructor
controller.newOrder = {};

controller.newOrder.loadDataToOrder = function() {
	controller.newOrder.loadOrderTypes();
	controller.newOrder.showCurrentDate();
};

controller.newOrder.loadOrderTypes = function (){

	model.newOrder.getTypesOrders()
		.done(function (data) {
		    if( data.length > 0){
		        //load data in view
		       var items = "";
		       $.each(data, function(i, item){
		       		items += "<option value='"+item.id+"'>"+item.talimento+"</option>";
		       });
		       $("#typeOrder").append(items);
		      
		    }else{
	        	alert("No se pudieron cargar los tipos de pedido");
	        }

	        $("#stopUser").hide();
		 }).fail(function(e){
		 	alert("Error: " + e.responseText);
		});
};

controller.newOrder.loadPptoUserToNewOrder = function (){
	model.newOrder.getPptoUserToNewOrder($("#typeOrder").val(), sessionStorage.id)
		.done(function (data) {
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
		        	$("#addItems").attr("disabled","disabled");
		        }
		 }).fail(function(e){
		 	$("#ppto").append(items);
		 	alert("Error: " + e.responseText);
		 	$("#addItems").attr("disabled","disabled");
		});
};

controller.newOrder.showCurrentDate = function (){
	$("#currentDate").val(currentDate());
	$("#deliveryDate").val(currentDate());
	$("#deliveryTime").val(currentTime());
}

controller.newOrder.loadItemsToNewOrder = function (){
	model.newOrder.getItemsToNewOrder($("#typeOrder").val())
		.done(function (data) {
		    if( data.length > 0){
		        //load data in view
		       $("#itemList").html("")

		       $.each(data, function(i, item){
		       	$("#itemListTemplate")
					.clone().show()
					.attr("data-id", item.id)
					.attr("data-value", item.valor)
					.removeAttr("id")
					.find(".img").attr("src", "img/items/" + item.id).end()
					.find(".nameItem").text(item.id + "-" + item.nombre).end()
					.find(".description").text(item.descripcion).end()
					.find(".vlrSinIva").text("$"+formatMoney(item.valor)).end()
					.find(".valor").text("$"+formatMoney(Math.floor(parseInt(item.valor)*((parseInt(item.iva)/100)+1)))).end()
					.find(".selectItem").attr("id", item.id).end()
					.find(".collapse").attr("id", "dtlle"+i).end()
					.find(".dtlle").attr("data-target", "#dtlle"+i).end()
					.appendTo("#itemList");
			    });

		       $(".selectItem").click(function(){
					//change items list
					$(".deletedItem:visible").click();//delete other product selected
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

		$(".quantity:visible").focus();

		
	//add events
	$(".quantity").off().change(function(e){
		//debugger
		var element = e.target;
		var quantity = parseInt(element.value) || 0;
		var aditionalValue  = parseInt($(element).parent().parent().find(".aditionalValue").val()) || 0;
		var individualValue = parseInt($(element).parent().parent().parent().parent().find(".individualValue").attr("data-value"));
		$(element).parent().parent().find(".totalValue").text("$"+formatMoney((quantity*individualValue)+aditionalValue));

	});

	$(".aditionalValue").off().change(function(e){
		var element = e.target;
		var aditionalValue = parseInt(element.value) || 0;
		var quantity  = parseInt($(element).parent().parent().find(".quantity").val()) || 0;
		var individualValue = parseInt($(element).parent().parent().parent().parent().find(".individualValue").attr("data-value"));
		$(element).parent().parent().find(".totalValue").text("$"+formatMoney((quantity*individualValue)+aditionalValue));

	});

	$(".deletedItem").off().click(function(e){
		var $element = $(e.target);
		$element.parent().parent().parent().remove();
	});
};

controller.newOrder.save = function(jsonData){
	$("#stopUser").show();
	model.newOrder.saveNewOrder(jsonData)
	.done(function (data, textStatus, jqXHR) {
		$("#stopUser").hide();
	    if( data.success ){
	        //load data in view
	       alert(data.message);
	       controller.newOrder.resetForm();
	    }else{
        	alert("No se pudo guardar " + textStatus + " " + data.message)
        }
	 })
	.fail(function(jqXHR, textStatus){
		$("#stopUser").hide();
	 	alert("Error: " + jqXHR.responseText + ", " + textStatus);
	});
};

controller.newOrder.resetForm = function(){
	$('#formNewOrder')[0].reset();
	$(".deletedItem:visible").click();
	controller.newOrder.showCurrentDate();
	$("#addItems").attr("disabled","disabled");
};

controller.newOrder.getFormData = function(form){
	var $form = $( form ),
		jsonData = [],
		data = {};
		
	data.typeOrder= $form.find("#typeOrder").val();
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

	data.idUser = sessionStorage.id;

	jsonData.push(data);

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
		$("#addItems").removeAttr("disabled");
	});

	$("#formNewOrder").submit(function(e){
		e.preventDefault();
		
		var jsonData = controller.newOrder.getFormData(this);
		controller.newOrder.save(jsonData);
	});

};

//---------------------------------------Constructor
controller.newOrder.loadDataToOrder();

//add Events
controller.newOrder.initEvents();


//validar envio
function validarform() {
	var fecha= document.getElementById("deliveryDate").value;
	var cantidad= $("#formNewOrder").find("#items").find(".item").find(".quantity").val();
	var direccion= document.getElementById("address").value;
	var comentario= document.getElementById("comment").value;
	var hora= document.getElementById("deliveryTime").value;
	var telfjorecibe= document.getElementById("telephone").value;
	var evento= document.getElementById("nameEvent").value;
	var movilrecibe= document.getElementById("celphone").value;
	var personarecibe= document.getElementById("nameReceive").value;


	if((vtexto(telfjorecibe))==false)
		return false;
	else

	if((vtexto(personarecibe))==false)
		return false;
	else

	if((vtexto(movilrecibe))==false)
		return false;
	else

	if((vtexto(evento))==false)
		return false;
	else

	if((vtexto(cantidad))==false)
		return false;
	else


	if( comentario.length>250 ) {
		alert('Comentario demasiado extenso');
		return false;
	}

	if( direccion.length>150 ) {
		alert('Direccion muy larga');
		return false;
	}

	if( direccion == null || direccion.length < 5 || /^\s+$/.test(direccion ) ) {
		alert('Direccion Obligatorio');
		return false;
	}

	if( isNaN(cantidad) ) {
		alert('Cantidad invalida');
		return false;
	}

	if( cantidad<0 ) {
		alert('Cantidad invalida');
		return false;
	}

	if( cantidad.length>4 ) {
		alert('Cantidad no disponible');
		return false;
	}

	if( cantidad == null || isNaN(cantidad)|| cantidad.length < 1 || /^\s+$/.test(cantidad) ) {
		alert('Cantidad Obligatorio');
		return false;
	}


	if(hora=='00') {
		alert('Hora No valida');
		return false;
	}

	/*Validar Fecha de Enrega*/

		 
return true;

}

//Funcion para validar numero
function vnumero(numero){
  if( isNaN(numero) || numero==null || numero.length == 0 ||/^\s+$/.test(numero) ) {
    return false;
  } 
  return true;
}

//Funcion para validar Texto
function vtexto(texto){
  if( texto==null || texto.length == 0 || /^\s+$/.test(texto) ) {
    return false;
  } 

  return true;
}
function mensage (text,swNoCerrar) {

  $("#dvMsg").show();
  $("#dvMsgText").text(text);
 
  var idFocus=$(document.activeElement).attr('id');
  var x;
  var left;
  if(idFocus){
    x=$("#"+idFocus).offset();
    $("#dvMsg").animate({"top":x.top,'left':(x.left+100)});
  }else{
    $(window).scrollTop(0);
     $("#dvMsg").animate({'left':'40%','top':'200px','position': 'absolute'});
  }

  if(!swNoCerrar)
    setTimeout(function(){$("#dvMsg").animate({'left':'-500'});},3000);
  
  $("#closeMsg").click(function(){$("#dvMsg").hide(100);})
}