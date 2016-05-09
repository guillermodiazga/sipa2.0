var controller =  controller || {};

// Constructor
controller.main = {};
controller.main.pagesToShow = 10;

controller.main.getOrdersPend = function () {
	model.main.getOrdersPend().then(function(data){
		general.notification(data.length);

		if(localStorage.page == "main"){
			controller.main.showDataInTable(data);
			general.stopUser.hide();
		}
	});
};

controller.main.showDataInTable = function (data) {
	var result = "",
		approveOrders = "";

	if(localStorage.idrol == 2){
		approveOrders = "<i class='okOrder green btn btn-default fa fa-check ' title='Aprobar'></i>"+
		      "<i class='rejectOrder red btn btn-default fa fa-times ' title='Rechazar Pedido'></i><br>";
	}

	$.each(data, function(i, resp){
		result += 
			"<tr data-id='"+resp.id+"''>"+
	            "<td title='"+resp.descestado+"'>"+general.iconStatus(resp.estado)+"</td>"+
	            "<td data-id='"+resp.id+"''>"+
		       		approveOrders+
	            	"<i class='historyOrder btn fa fa-eye btn-default' title='Ver historico de estados del Pedido'></i>"+
		       		"<i class='editOrder btn fa fa-pencil btn-default' title='Modificar Pedido'></i>"+
		       	"</td>"+
	            "<td>"+resp.idsecretaria+" "+resp.secretaria+"</td>"+
	            "<td>"+resp.id+"</td>"+
	            "<td>"+resp.talimento+"</td>"+
	            "<td>"+resp.alimento+"</td>"+
	            "<td>"+resp.cantidad+"</td>"+
	            "<td>$"+formatMoney(resp.valorpedido)+"</td>"+
	            "<td>"+formatDate(resp.fchentrega)+"</td>"+
	            "<td>"+resp.hora+"</td>"+
	            "<td>"+resp.direccion+"</td>"+
	            "<td>"+resp.idppto+"</td>"+
	            "<td>"+resp.personarecibe+"</td>"+
	            "<td>"+resp.comentario+"</td>"+
	        "</tr>";
    });

    $('#mainTable tbody').html("").append(result);
    general.setPagination("#mainTable", controller.main.pagesToShow, parseInt($(".pagination li.active:first").text()));

  // $("#mainTableContainer").css("width", $(window).width()-20).css("height", $(window).height()-170)

    controller.main.addEventsTable();
};

controller.main.addEvents = function (){
	$("#refreshResults").click(function(){
		$("#stopUser").show();
		statusBar.show("Cargando...").hide(1000);
		controller.main.getOrdersPend();
	});
	if(localStorage.idrol != 1){
		$("#aproveAll").show().off().click(function(){
			var $orders = $('#mainTable tbody tr');
			general.confirm("¿Desea Aprobar <b>"+$orders.length+"</b> Pedido(s)?", function(){
				general.stopUser.show("Aprobando Pedidos...");
				var idOrders='';
				$.each($orders, function(i, tr){
					if((i+1) == $orders.length){
						idOrders += $(tr).data("id");
					}else{
						idOrders += $(tr).data("id")+"-";
					}

				});

				model.main.updateStatusOrder(idOrders, 3, "Aprobacion Masiva")
					.done(function(resp){
						controller.main.getOrdersPend();
						general.stopUser.hide();
						alert("Se aprobaron "+$orders.length+" pedidos.")
					})
					.fail(function(e){
				        $("#stopUser").hide();
					 	alert("Error: " + e.responseText);
					});
			})
		});
	}
};

controller.main.addEventsTable = function (){
	$(".okOrder").click(function(e){
		var $row = $(e.target).parent().parent(),
			idOrder = $(e.target).parent().data("id");

		general.confirm("¿Desea Aprobar el Pedido "+idOrder+"?", function(){
			$("#stopUser").show();
			model.main.updateStatusOrder(idOrder, 3)
				.done(function(resp){
					$row.remove();
			        $("#stopUser").hide();
					statusBar.show("Pedido "+idOrder+" Aprobado.").hide(2000);
					general.notification(parseInt($("#notification").text())-1);
					general.setPagination("#mainTable", controller.main.pagesToShow, parseInt($(".pagination li.active:first").text()));

				})
				.fail(function(e){
			        $("#stopUser").hide();
				 	alert("Error: " + e.responseText);
				});
		})
	});

	$(".rejectOrder").click(function(e){
		var $row = $(e.target).parent().parent(),
			idOrder = $(e.target).parent().data("id"),
			msg = "¿Desea Rechazar el Pedido "+idOrder+"? <br><br>"+
				  "<input id='motivoRechazo' class='form-control' placeholder='Ingresa la razon del rechazo.'></input>";
		general.confirm(msg, function(){
			$("#stopUser").show();
			model.main.updateStatusOrder(idOrder, 4, $("#motivoRechazo").val())
				.done(function(resp){
					$row.remove();
			        $("#stopUser").hide();
					statusBar.show("Pedido "+idOrder+" Rechazado.").hide(2000);
					general.notification(parseInt($("#notification").text())-1);
					general.setPagination("#mainTable", controller.main.pagesToShow, parseInt($(".pagination li.active:first").text()));
				})
				.fail(function(e){
			        $("#stopUser").hide();
				 	alert("Error: " + e.responseText);
				});
		})
	});
};

//---------------------------------------Constructor
controller.main.getOrdersPend();
controller.main.addEvents();


