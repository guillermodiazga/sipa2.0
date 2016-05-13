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
		approveOrders = "",
		editOrder = "";

	if(!data.length){
		return general.noDataToShowInTable($('#mainTable'), "No hay Pedidos Pendientes");
	}

	if(localStorage.idrol != 1){
		approveOrders = "<i class='okOrder green btn btn-default fa fa-check ' title='Aprobar'></i>"+
		      "<i class='rejectOrder red btn btn-default fa fa-times ' title='Rechazar Pedido'></i><br>";
	}

	if(localStorage.idrol != 3){
		editOrder = "<i class='editOrder yellow btn fa fa-pencil btn-default' title='Modificar Pedido'></i>";
	}

	$.each(data, function(i, resp){
		result += 
			"<tr data-id='"+resp.id+"''>"+
	            "<td title='"+resp.descestado+"'>"+general.iconStatus.html(resp.estado)+"</td>"+
	            "<td data-id='"+resp.id+"''>"+
		       		approveOrders+
	            	"<i class='historyOrder blue btn fa fa-history btn-default' title='Ver historico de estados del Pedido'></i>"+
		       		editOrder +
		       		"<i class='printOrder purple btn fa fa-print btn-default' title='Imprimir Pedido'></i>"+
		       	"</td>"+
	            "<td class='hide'>"+resp.idsecretaria+" "+resp.secretaria+"</td>"+
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
    general.iconStatus.addEvents();
    general.setPagination("#mainTable", controller.main.pagesToShow, parseInt($(".pagination li.active:first").text()));

  // $("#mainTableContainer").css("width", $(window).width()-20).css("height", $(window).height()-170)

  	if(localStorage.idrol != 1){
		$("#mainTable td:hidden").removeClass("hide");
		$("#mainTable th:hidden").removeClass("hide");
	}

    controller.main.addEventsTable();
};

controller.main.addEvents = function (){
	$(".tabsMain").click(function(e){
		var $e = $(e.target),
			id = $e.parent().attr("id");

		$e.parent()
			.siblings().removeClass("active").end()
			.addClass("active");

		$(".tabsContainers").hide();

		switch(id){
			case "tab1":
				$("#container1").show();
				break;
			case "tab2":
				$("#container2").show();
				break;
			case "tab3":
				$("#container3").show();
				break;
		}
	});
	$("#refreshResults").click(function(){
		$("#stopUser").show();
		statusBar.show("Cargando...").hide(1000);
		controller.main.getOrdersPend();
	});
	if(localStorage.idrol != 1){
		$("#aproveAll").show().off().click(function(){
			var $orders = $("#mainTable tbody tr[data-id]"),
				newStatus=3,
				msg = "¿Desea Aprobar <b>"+$orders.length+"</b> Pedidos?"

			if($orders.size() == 0){
				return alert("No hay pedidos para aprobar");
			}

			if($orders.length == 1){
				msg = "¿Desea Aprobar <b>1</b> Pedido?"
			}

			//Proveedor aprove Status
			if(localStorage.idrol == 3){
				newStatus = 6;
			}



			general.confirm(msg, function(){
				general.stopUser.show("Aprobando Pedidos...");
				var idOrders='';
				$.each($orders, function(i, tr){
					if((i+1) == $orders.length){
						idOrders += $(tr).data("id");
					}else{
						idOrders += $(tr).data("id")+"-";
					}

				});

				model.main.updateStatusOrder(idOrders, newStatus, "Aprobacion Masiva")
					.done(function(resp){
						general.noDataToShowInTable($('#mainTable'));
						general.stopUser.hide();

						if($orders.length == 1)
							alert("Se aprobo 1 pedido.")
						else
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
			idOrder = $(e.target).parent().data("id"),
			newStatus = 3;

		//Proveedor aprove Status
		if(localStorage.idrol == 3){
			newStatus = 6;
		}

		general.confirm("¿Desea Aprobar el Pedido "+idOrder+"?", function(){
			$("#stopUser").show();
			model.main.updateStatusOrder(idOrder, newStatus)
				.done(function(resp){
					$row.remove();
			        $("#stopUser").hide();
					statusBar.show("Pedido "+idOrder+" Aprobado.").hide(2000);

					if($("#mainTable tbody tr[data-id]").size() == 0){
						general.noDataToShowInTable($('#mainTable'));
						general.notification(0);
					}else{
						general.notification(parseInt($("#notification").text())-1);
						general.setPagination("#mainTable", controller.main.pagesToShow, parseInt($(".pagination li.active:first").text()));
					}

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
				  "<input id='motivoRechazo' class='form-control' placeholder='Ingresa la razon del rechazo.'></input>",
			newStatus = 4;
		
		//Proveedor reject Status
		if(localStorage.idrol == 3){
			newStatus = 7;
		}

		var a = general.confirm(msg, function(){
			if(!$("#motivoRechazo").val()){
				alert("Debe ingresar la razon del rechazo.");
				return $("td[data-id="+idOrder+"]").find(".rejectOrder").click();
			}
			$("#stopUser").show();
			model.main.updateStatusOrder(idOrder, newStatus, $("#motivoRechazo").val())
				.done(function(resp){
					$row.remove();
			        $("#stopUser").hide();
					statusBar.show("Pedido "+idOrder+" Rechazado.").hide(2000);

					if($("#mainTable tbody tr[data-id]").size() == 0){
						general.noDataToShowInTable($('#mainTable'));
						general.notification(0);
					}else{
						general.notification(parseInt($("#notification").text())-1);
						general.setPagination("#mainTable", controller.main.pagesToShow, parseInt($(".pagination li.active:first").text()));
					}
				})
				.fail(function(e){
			        $("#stopUser").hide();
				 	alert("Error: " + e.responseText);
				});
		});
	});

	$(".printOrder").click(function(e){
		var idOrder = $(e.target).parent().data("id");
		general.printOrder(idOrder);
	});

	$(".editOrder").click(function(e){
		sessionStorage.idOrderToEdit = $(e.target).parent().data("id");
		controller.navigation.loadView('neworder');
	});

	$(".historyOrder").click(function(e){
		var idOrder = $(e.target).parent().data("id");
		
		general.stopUser.show();

		model.main.getHistoryOrder(idOrder)
			.done(function(resp){

		        general.stopUser.hide();

		        var title = "<legend>Estados del Pedido: "+idOrder+"</legend>",
		        	html = "<div class='table-responsive' ><table class='table table-striped' >"+
		        		   "<tr><th>Estado</th><th>Fecha y Hora</th><th>Comentario</th></tr>";

		        $.each(resp, function(i, data) {
		        	html += "<tr><td>"+data.estado+"</td><td>"+data.log+"</td><td>"+data.comentario+"</td></tr>";
		        });

		        html += "</table></div>";

		        if(!resp.length){
		        	html="<legend>No hay cambios de estado del pedido: "+idOrder+"</legend>";
		        }

		        alert({msg: html, title:title});

			})
			.fail(function(e){
		        $("#stopUser").hide();
			 	alert("Error: " + e.responseText);
			});
	});

};

//---------------------------------------Constructor
controller.main.getOrdersPend();
controller.main.addEvents();


