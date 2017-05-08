var controller =  controller || {};

// Constructor
controller.catalogo = {};


controller.catalogo.loadItems = function (){

	general.stopUser.show();
	model.catalogo.getItems("*")
	.done(function (data) {
		if( data.length > 0){
	        //load data in view
	        $("#itemList").html("");
	        $("#txtToSearch").off().on("keyup change", function(){controller.catalogo.searchItem()}).focusin();
	        $.each(data, function(i, item){
	        	var vlrConIva = Math.round(parseFloat(item.valor)*((parseFloat(item.iva)/100)+1));
	        	$("#itemListTemplate")
	        	.clone().show()
	        	.attr("data-id", item.id)
	        	.attr("data-value", vlrConIva)
	        	.removeAttr("id")
	        	.find(".img").attr("src", "img/items/" + item.id + ".png?2").end()
	        	.find(".nameItem").text(item.nombre).end()
	        	.find(".description").text(item.descripcion).end()
	        	.find(".vlrSinIva").text("$"+formatMoney(item.valor)).end()
	        	.find(".valor").text("$"+formatMoney(vlrConIva)).end()
	        	.find(".selectItem").attr("id", item.id).end()
	        	.find(".collapse").attr("id", "dtlle"+i).end()	
	        	.find(".dtlle").attr("data-target", "#dtlle"+i).end()
	        	.appendTo("#itemList");
	        });
	        
	        general.zoomImg();

	    }else{
	    	alert("No se pudieron cargar los items").warning();
	    }

	    general.stopUser.hide();
	}).fail(function(e){
		alert("Error: " + e.responseText).danger();
	});

	
};

controller.catalogo.searchItem = function(){
	var items = $("#itemList").find(".nameItem"),
	texto = $("#txtToSearch").val().toLowerCase();
	items.parent().parent().parent().parent().parent().show();
	for(var i=0; i< items.size(); i++){
		var contenido = items.eq(i).text().toLowerCase();
		var index     = contenido.indexOf(texto);
		if(index == -1){
			items.eq(i).parent().parent().parent().parent().parent().hide();
		}		
	}
}

controller.catalogo.loadItems();