var controller =  controller || {};

controller.reports = {};

//add all events
controller.reports.initEvents = function(){
	$("#tabMain").click(function(){
		$(".tabBody").hide();
		$("#tabBodyMain").show();
		$(".tab").removeClass("open-tab active");
		$(this).addClass("open-tab active");
	});

	$(".squareList li").click(function(){
		var $this = $(this),
		nameReport = $this.find(".nameReport").text(),
		html = $this.attr("data-html");
		
		if( $("#tab"+html).size() <= 0){//if is a new tab to open

			//clone tab
			$("#tabMain")
				.clone()
				.hide()
				.find(".name").html(nameReport+" "+'<button type="button" class="close" ><span aria-hidden="true">&times;</span></button>').end()
				.attr("id", "tab"+html)
				.removeClass("open-tab")
				.appendTo($("#tabMain").parent())
				.slideDown()
				.find(".close").show();


			//load report template
			$(".tabBody").hide();

			$("#tabBodyTemplate")
				.clone()
				.show()
				.attr("id", "tabBody"+html)
				.appendTo("#tabSet");

			var callBack = false;

			switch(html){
				case "report1":
					callBack = function(){
						controller.reports.report1.addEvents();
					}
					break;
				case "report2":
					callBack = function(){
						controller.reports.report2.addEvents();
					}
					break;
				case "report3":
					callBack = function(){
						controller.reports.report3.addEvents();
					}
					break;
				case "report4":
					callBack = function(){
						controller.reports.report4.addEvents();
					}
					break;

			}

			controller.navigation.loadView(html, "tabBody"+html, callBack);

			$("#tab"+html).click(function(e){
				$(".tabBody").hide();
				$("#tabBody"+html).show();
				$(".tab").removeClass("active open-tab");
				$("#tab"+html).addClass("active");
			});
			
			$("#tab"+html).find(".close").click(function(){
				$("#tab"+html).remove();
				$("#tabBody"+html).remove();
				$(".tabBody:first").show();
				$("#tabMain").addClass("active");

				if($(".tab").size() == 1){
					$(".tab").hide();
				}
			});

		}else{//if the tab already exists
			$(".tabBody").hide();
			$("#tabBody"+html).show();
			$(".tab").removeClass("active open-tab");
		}

		$("#tabMain").show().find(".close").hide();
		$(".tab").removeClass("active open-tab");
		$("#tab"+html).addClass("active");
	});
};

controller.reports.report1 = {


	addEvents: function(){
		$("#report1-form").submit(function(e){
			e.preventDefault();
			general.stopUser.show();

			model.reports.report1($("#report1-ini").val(), $("#report1-end").val() )
				.done(function(data){
					general.stopUser.hide();
					if(data.length){
						var html = "";

						$.each(data, function(i, data) {
				        	html += "<tr><td class='merge'>"+data.item+"</td><td>"+data.secretaria+"</td><td class='sum sum1 text-right' data-value='"+data.cantidad+"'>"+formatMoney(data.cantidad)+"</td><td class='sum sum2 text-right' data-value='"+data.valorpedido+"'>$"+formatMoney(data.valorpedido)+"</td></tr>";
				        });

						$("#report1-table tbody").html(html);
						controller.reports.report1.addMergeCells();
						controller.reports.report1.addTotalInTable($("#report1-table"));
						controller.reports.report1.addSubtotales($("#report1-table"));

					}else{
						general.noDataToShowInTable($("#report1-table"));
					}					
				})
				.fail(function(e){
					general.stopUser.hide();
					alert("Error: " + e.responseText);
				});
		});
	},

	addTotalInTable: function($table){
		var total1 = 0,
			total2 = 0;

		$.each($table.find(".sum"), function(i, e){
			var $e = $(e);
			total1 += ($e.hasClass("sum1")) ? parseInt($e.data("value")) : 0;
			total2 += ($e.hasClass("sum2")) ? parseInt($e.data("value")) : 0;
		});
		
		$table.find("tbody").append("<tr class='info'><th colspan='2'>Total: </th><th class='text-right'>"+formatMoney(total1)+"</th><th class='text-right'>$"+formatMoney(total2)+"</th></tr>")
	},

	addSubtotales: function($table){
		var total1 = 0,
			total2 = 0;

		$.each($table.find("tbody tr"), function(i, e){
			var $tr = $(e),
				value1 =  parseInt($tr.find(".sum1").data("value")),
				value2 =  parseInt($tr.find(".sum2	").data("value"));

			total1 += (isNaN(value1)) ? 0 : value1;
			total2 += (isNaN(value2)) ? 0 : value2;

			if($tr.find(".total1").size()){
				$tr
					.find(".total1").text(formatMoney(total1)).end()
					.find(".total2").text("$"+formatMoney(total2));
				total1 = 0;
				total2 = 0;
			}
		});
		
	},

	addMergeCells: function (){
		var beforeValue = false,
			counter = 0,
			$element = null,
			firstSub = false,
			totalRows = $("#report1-table tbody tr").size();

		$.each($("#report1-table tbody tr"), function(i, e){
			var $e = $(e),
				$td = $e.find(".merge"),
			    value = $td.text(),
			    trSubtotal = "<tr class='success'><th colspan=2>Subtotal:</th><th class='total1 text-right'></th><th  class='total2 text-right'></th></tr>";

			if(i+1 == totalRows){
				$element.attr("rowspan", counter+1);
				$element.parent().before(trSubtotal)
				$td.parent().after(trSubtotal);
				$td.remove();
				return false;
			}
			
			if(value != beforeValue){
				if($element){
					$element.attr("rowspan", counter);
					if(firstSub){
						$element.parent().before(trSubtotal);
					}
					
					firstSub = true;
				}
				$element = $td;
				counter = 0;
			}else{
				$td.remove();
			}

			counter++;
			beforeValue = value;
		})
	}


}


controller.reports.report2 = {


	addEvents: function(){
		$("#report2-form").submit(function(e){
			e.preventDefault();
			general.stopUser.show();

			model.reports.report2($("#report2-ini").val(), $("#report2-end").val() )
				.done(function(data){
					general.stopUser.hide();
					if(data.length){
						var html = "";

						$.each(data, function(i, data) {
				        	html += "<tr>"+
				        	"<td>"+data.id+"</td>"+
				        	"<td>"+data.ali+"-"+data.alimento+"</td>"+
				        	"<td class='sum sum1 text-right' data-value="+data.cantidad+"'>"+formatMoney(data.cantidad)+"</td>"+
				        	"<td class='sum sum2 text-right' data-value="+data.valorpedido+"'>"+formatMoney(data.valorpedido)+"</td>"+
				        	"<td>"+data.fchentrega+"</td>"+
				        	"<td>"+data.idppto+"</td>"+
				        	"<td>"+data.idsec+"-"+data.usnam+"</td>"+
				        	"<td>"+((data.valorpedido/data.valorini)*100).toFixed(2)+"%</td>"+

				        	"</tr>";
				        });

						$("#report2-table tbody").html(html);
						controller.reports.report2.addTotalInTable($("#report2-table"));

					}else{
						general.noDataToShowInTable($("#report2-table"));
					}					
				})
				.fail(function(e){
					general.stopUser.hide();
					alert("Error: " + e.responseText);
				});
		});
	},

	addTotalInTable: function($table){
		var total1 = 0,
			total2 = 0;

		$.each($table.find(".sum"), function(i, e){
			var $e = $(e);
			total1 += ($e.hasClass("sum1")) ? parseInt($e.data("value")) : 0;
			total2 += ($e.hasClass("sum2")) ? parseInt($e.data("value")) : 0;
		});
		
		$table.find("tbody").append("<tr class='info'><th colspan='2'>Total: </th><th class='text-right'>"+formatMoney(total1)+"</th><th class='text-right'>$"+formatMoney(total2)+"</th><th colspan='4'></th></tr>")
	}
}

controller.reports.report3 = {


	addEvents: function(){
		$("#report3-form").submit(function(e){
			e.preventDefault();
			general.stopUser.show();

			model.reports.report3($("#report3-ini").val(), $("#report3-end").val() )
				.done(function(data){
					general.stopUser.hide();
					if(data.length){
						var html = "";

						$.each(data, function(i, data) {
				        	html += "<tr>"+
				        	"<td>"+data.idsecretaria+"-"+data.secretaria+"</td>"+
				        	"<td>"+data.idppto+"-"+data.nombre+"</td>"+
				        	"<td class='sum sum1 text-right' data-value="+data.cantidad+"'>"+formatMoney(data.cantidad)+"</td>"+
				        	"<td class='sum sum2 text-right' data-value="+data.valorini+"'>$"+formatMoney(data.valorini)+"</td>"+
				        	"<td class='sum sum3 text-right' data-value="+data.valorped+"'>$"+formatMoney(data.valorped)+"</td>"+
				        	"<td class='sum sum4 text-right' data-value="+data.saldo+"'>$"+formatMoney(data.saldo)+"</td>"+
				        	"</tr>";
				        });

						$("#report3-table tbody").html(html);
						controller.reports.report3.addTotalInTable($("#report3-table"));

					}else{
						general.noDataToShowInTable($("#report3-table"));
					}					
				})
				.fail(function(e){
					general.stopUser.hide();
					alert("Error: " + e.responseText);
				});
		});
	},

	addTotalInTable: function($table){
		var total1 = 0,
			total2 = 0,
			total3 = 0,
			total4 = 0;

		$.each($table.find(".sum"), function(i, e){
			var $e = $(e);
			total1 += ($e.hasClass("sum1")) ? parseInt($e.data("value")) : 0;
			total2 += ($e.hasClass("sum2")) ? parseInt($e.data("value")) : 0;
			total3 += ($e.hasClass("sum3")) ? parseInt($e.data("value")) : 0;
			total4 += ($e.hasClass("sum4")) ? parseInt($e.data("value")) : 0;
		});
		
		$table.find("tbody").append("<tr class='info'><th colspan='2'>Total: </th><th class='text-right'>"+formatMoney(total1)+"</th><th class='text-right'>$"+formatMoney(total2)+"</th><th class='text-right'>$"+formatMoney(total3)+"</th><th class='text-right'>$"+formatMoney(total4)+"</th></tr>")
	}
}

controller.reports.report4 = {


	addEvents: function(){
		//$("#report4-form").submit(function(e){
			//e.preventDefault();
			general.stopUser.show();

			model.reports.report4()
				.done(function(data){
					general.stopUser.hide();
					if(data.length){
						var html = "";

						$.each(data, function(i, data) {
				        	html += "<tr>"+
				        	"<td>"+data.idsecretaria+"-"+data.secretaria+"</td>"+
				        	"<td>"+data.proyecto+"</td>"+
				        	"<td>"+data.pedido+"</td>"+
				        	"<td>"+data.nombre+"</td>"+
				        	"<td class='sum sum1 text-right' data-value="+data.valorini+"'>$"+formatMoney(data.valorini)+"</td>"+
				        	"<td class='sum sum2 text-right' data-value="+data.valorpedido+"'>$"+formatMoney(data.valorpedido)+"</td>"+
				        	"<td class='sum sum3 text-right' data-value="+(data.valorini-data.valorpedido)+"'>$"+formatMoney(data.valorini-data.valorpedido)+"</td>"+

				        	"</tr>";
				        });

						$("#report4-table tbody").html(html);
						controller.reports.report4.addTotalInTable($("#report4-table"));

					}else{
						general.noDataToShowInTable($("#report4-table"));
					}					
				})
				.fail(function(e){
					general.stopUser.hide();
					alert("Error: " + e.responseText);
				});
		//});
	},

	addTotalInTable: function($table){
		var total1 = 0,
			total2 = 0,
			total3 = 0;

		$.each($table.find(".sum"), function(i, e){
			var $e = $(e);
			total1 += ($e.hasClass("sum1")) ? parseInt($e.data("value")) : 0;
			total2 += ($e.hasClass("sum2")) ? parseInt($e.data("value")) : 0;
			total3 += ($e.hasClass("sum3")) ? parseInt($e.data("value")) : 0;
		});
		
		$table.find("tbody").append("<tr class='info'><th colspan='4'>Total: </th><th class='text-right'>$"+formatMoney(total1)+"</th><th class='text-right'>$"+formatMoney(total2)+"</th><th class='text-right'>$"+formatMoney(total3)+"</th></tr>")
	}
}

//---------------------------------------Constructor
//add Events
controller.reports.initEvents();
