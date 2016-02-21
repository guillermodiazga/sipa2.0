
$.ajaxSetup({
    beforeSend: function() {
        // show loading dialog // works
        //$("#stopUser").show();
    },
    complete: function(xhr, stat) {
        // hide dialog // works
        //$("#stopUser").hide();
    },
    success: function(result,status,xhr) {
        // not showing the alert
        $("#stopUser").hide();
        controller.session.timeout = controller.session.timeToClose;
        controller.session.warningShowed = false;
    },
    fail: function(result,status,xhr) {
        // not showing the alert
        $("#stopUser").hide();
    }
});

function currentDate () {
	var now = new Date();

	var day = ("0" + parseInt(now.getDate())).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);

	return now.getFullYear()+"-"+(month)+"-"+(day) ;

}

function currentTime () {
	var now = new Date();
	var hours = ("0" + (now.getHours() + 0)).slice(-2);
	var minutes = ("0" + (now.getMinutes() + 0)).slice(-2);
	return hours+":"+minutes;
}

function formatMoney (n, c, d, t){
    c = isNaN(c = Math.abs(c)) ? 0 : c, 
    d = d == undefined ? "," : d, 
    t = t == undefined ? "." : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

 function formatDate(date) {
     var arDate = date.split("-");

     date = arDate[2] + "/" + arDate[1] + "/" + arDate[0];
     return date;
 };

function zoomImg(){
    $(".zoomImg")
        .addClass("btn")
        .attr("title", "Ver Imagen")
        .click(function(){
            $(this)
                .clone()
                .hide()
                .removeClass("zoomImg")
                .addClass("imgZoomInContainer")
                .addClass("img-responsive")
                .attr("width", "")
                .fadeIn()
                .appendTo("body");

               $("#stopUser")
                .show()
                .append('<button type="button" class="close"><span aria-hidden="true">×</span></button>')
                .find(".close")
                .click(function(){
                    $(this)
                        .parent()
                        .hide()
                        .end()
                        .remove();
                    
                    $(".imgZoomInContainer").remove();

                })
                

        });
 
};

 window.alert = function(text){
 	$('#modalAlert').find("#textAlert").text(text).end().modal('show');
 };


//Desktop notifications
/*
 function AskForWebNotificationPermissions()
{
    if (Notification) {
        Notification.requestPermission();
    }
}

AskForWebNotificationPermissions();

Notification.requestPermission( function(status) {
    if (status == "granted"){

    	setTimeout(function(){
    		var options = {
			    body: "Este es le cuerpo de la notificación",
			    icon: "favicon.ico"
			};
	        var notif = new Notification("Mi primera notificación!", options);
			notif.onclick = function(){alert("le click")};
			notif.onclose = function(){alert("Se Cerro")};
			notif.onshow = function(){alert("Se abrio")};
	    },3000);

	    setTimeout(notif.close, 6000);
    }
});
*/

