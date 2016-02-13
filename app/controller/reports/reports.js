var controller =  controller || {};

controller.reports = {};



//add all events
controller.reports.initEvents = function(){
	$("#tabMain").click(function(){
		$(".tabBody").hide();
		$("#tabBodyMain").show();
		$(".tab").removeClass("open-tab");
		$(this).addClass("open-tab");
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
				.find(".name").text(nameReport+" ").end()
				.attr("id", "tab"+html)
				.appendTo("#"+$("#tabMain").parent().attr("id"))
				.slideDown()
				.find(".close").show();


			//load report template
			$(".tabBody").hide();

			$("#tabBodyTemplate")
				.clone()
				.show()
				.attr("id", "tabBody"+html)
				.appendTo("#tabSet");
			controller.navigation.loadView(html, "tabBody"+html);

			$("#tab"+html).click(function(){
				$(".tabBody").hide();
				$("#tabBody"+html).show();
				$(".tab").removeClass("open-tab");
				$("#tab"+html).addClass("open-tab");

				$(this).find(".close").click(function(){
					$("#tab"+html).remove();
					$("#tabBody"+html).remove();
					$(".tabBody").show();

					if($(".tab").size() == 1){
						$(".tab").hide();
					}
				});
			});
		}else{//if the tab already exists
			$(".tabBody").hide();
			$("#tabBody"+html).show();
		}

		$("#tabMain").show().find(".close").hide();
		$(".tab").removeClass("open-tab");
		$("#tab"+html).addClass("open-tab");
	});
};

//---------------------------------------Constructor
//add Events
controller.reports.initEvents();