var general = {};

general.confirm = function(msg, task){
    $("#textConfirm").html(msg);
    $("#okConfirm").off().click(function(){
        setTimeout(task,100)
    });
    $('#modalConfirm').modal('show');
};

general.notification = function(number){
  //show desktop notification
  if(number > parseInt($("#notification").text()) ) {
    if(!document.hidden)
      return;

    var execute = function(){
      controller.navigation.loadView("main");
      //var b = window.open("http://google.com","_blank");
      var windowAux = window.open("http://"+window.location.host+window.location.pathname+"app/view/exit.html","_blank");
      windowAux.close();
      closeNoti();
    };

    var notif = createNewWebNotification("SIPA", "Tienes pedidos por aprobar", "icon.ico", "session", null, execute);

    function closeNoti(){closeNotification(notif)};
  }

  if(number)
    $("#notification").show().text(number);
  else
   $("#notification").hide().text("");

};

general.stopUser = {
  $div : $("#stopUser"),
    show: function(msg){
      msg = msg || "Cargando...";
      html = '<div><i class="fa fa-circle-o-notch fa-spin"></i></span> '+msg+'</div>';
      this.$div.html(html).show();
      return this;
    },
    hide: function(delay){
        var _this = this;
        if(!isNaN(delay)){
            setTimeout(function(){
              _this.$div.hide();
            },delay);
        }else{
            this.$div.hide();
        }
    }
};

general.setPagination = function(table, limitResults, selectPage){
  var $table = $(table),
      $rows = $table.find("tbody tr"),
      numberRows = $rows.size(),
      page = selectPage || 1,
      numberPages = Math.ceil(numberRows/limitResults);

      if(page > numberPages ){
        page = numberPages;
      }
      
      $(".pagination").remove();
      $table.before('<ul class="pagination pull-right"></ul>');
      $table.after('<ul class="pagination pull-right"></ul>');

      var pageButtons = "",
          active = "";
      for (var i = 0; i < numberPages; i++) {
        active = (i == page-1) ? ' active': '';
        pageButtons += '<li class="page'+(i+1)+active+'" ><a class="btn">'+(i+1)+'</a></li>';
      }
      var nextButton = '<li><a class="btn" aria-label="Next" data-next="true"><span aria-hidden="true" data-next="true">&raquo;</span></a></li>',
          previusButton = '<li><a class="btn" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';

      $(".pagination").append(previusButton+pageButtons+nextButton);

      $rows.hide();
      var show = false;
        $.each($rows, function(i, row){
          var init =  ((limitResults*page)-limitResults),
              end = (limitResults*page)-1;
          if( i >= init && i <= end ){
            $(row).show();
            show = true;
          }else if(show){
            return false;
          }
        });


      $(".pagination").click(function(e){
        e.preventDefault();
        var $element = $(e.target),
            page = parseInt(e.target.text);

        if(!page){
          if($element.data("next") ==  true){
            page = parseInt($(".pagination li.active:first").text())+1;
            if(page > numberPages ){
              statusBar.show("Pagina "+page+" no existe").hide(20000);
              return;
            } 
              
          }else{
            page = parseInt($(".pagination li.active:first").text())-1;
            if(page < 1 ){
              statusBar.show("Pagina "+page+" no existe").hide(20000);
              return;
            }
          }
        }

        $(".pagination li").removeClass("active");
        $(".page"+page).addClass("active");

        $rows.hide();

        var show = false;
        $.each($rows, function(i, row){
          var init =  ((limitResults*page)-limitResults),
              end = (limitResults*page)-1;
          if( i >= init && i <= end ){
            $(row).show();
            show = true;
          }else if(show){
            return false;
          }
        });

      });
};

general.iconStatus = function (estado) {
  var ico = "flag", color;

  switch (parseInt(estado)){
    case 1:
      ico = "flag";
      color = "gray";
      break;
    case 2:
      ico = "flag";
      color = "orange";
      break;
    case 3:
      ico = "flag";
      color = "green";
      break;
    case 4:
      ico = "repeat";
      color = "red";
      break;
    case 5:
      ico = "flag";
      color = "green";
      break;
    case 6:
      ico = "truck";
      color = "green";
      break;
    case 7:
      ico = "flag";
      color = "red";
      break;
  } 

  return '<i class="fa fa-2x fa-'+ico+' '+color+'" aria-hidden="true"></i>';
};

//refrescar pedidos pendientes
setInterval(function(){
  if(!controller.main){
    $.getScript("app/model/home/main.js",function(){
        $.getScript("app/controller/home/main.js", function(){
          controller.main.getOrdersPend();
        });
    });
  }else{
    controller.main.getOrdersPend();
  }

}, 30000);

statusBar = {
    $div : $("#statusBar"),
    show: function(text){
        this.$div.slideDown().text(text);
        return this;
    },
    hide: function(delay){
        var _this = this;
        if(!isNaN(delay)){
            setTimeout(function(){
              _this.$div.slideUp();
            },delay);
        }else{
            this.$div.slideUp();
        }
    }
};

window.alert = function(text){
  $('#modalAlert').find("#textAlert").html(text).end().modal('show');
};











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
        //$("#stopUser").hide();
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
                .attr("width", "60%")
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




//Funcion para validar numero
function validateNum(numero){
  if( isNaN(numero) || numero==null || numero.length == 0 ||/^\s+$/.test(numero) ) {
    return false;
  } 
  return true;
}

//Funcion para validar Texto
function validateText(texto){
  if( texto==null || texto.length == 0 || /^\s+$/.test(texto) ) {
    return false;
  } 

  return true;
}
/*
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
*/




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

