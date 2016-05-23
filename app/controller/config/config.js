var controller =  controller || {};

controller.config = {};

//add all events
controller.config.initEvents = function(){
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
				case "config1":
					callBack = function(){
						controller.config.config1.addEvents();
					}
					break;
				case "config2":
					callBack = function(){
						controller.config.config2.addEvents();
					}
					break;
				case "config3":
					callBack = function(){
						controller.config.config3.addEvents();
					}
					break;
				case "config4":
					callBack = function(){
						controller.config.config4.addEvents();
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

controller.config.config1 = {


	addEvents: function(){
		
	}
}
//---------------------------------------Constructor
//add Events
controller.config.initEvents();