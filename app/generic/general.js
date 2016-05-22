var general = {};

general.confirm = function(msg, callback){
  $("#textConfirm").html(msg);
  $("#okConfirm").off().click(function(){
    callback();
  });
  $('#modalConfirm').modal('show');
};

general.noDataToShowInTable = function ($table, msg) {
  msg = msg || "No hay resultados";
  $table.find('tbody').html("").append("<tr><td colspan='"+$table.find('th').size()+"'>"+msg+"</td></tr>");
  $('.pagination').remove();
};

//return all tr elements in string for a json
general.jsonToTableHtml = function (jsonData) {
  var html = "";
    for (var i = 0; i < jsonData.length; i++) {
       html += drawRow(jsonData[i]);
    }
    return html;

    function drawRow(rowData) {
      var row = "<tr>";

      $.each(rowData, function(i, data){
        row += "<td>"+data+"</td>";
      });

      return row + "</tr>";
  }

};

general.notification = function(number){
  if(number)
    $("#notification").show().text(number);
  else
    $("#notification").hide().text("");

  if(number <= 0) return $("#notification").hide().text("");
  //show desktop notification
  if(number > parseInt($("#notification").text()) ) {
    if(!document.hidden || localStorage.idrol == '1'){
      return;
    }

    var execute = function(){
      controller.navigation.loadView("main");
      var windowAux = window.open("http://"+window.location.host+window.location.pathname+"app/view/exit.html","_blank");
      windowAux.close();
      closeNoti();
    };

    var notif = createNewWebNotification("SIPA", "Tienes pedidos por aprobar", "icon.ico", "session", null, execute);

    function closeNoti(){closeNotification(notif)};
  }

  

};

general.stopUser = {
  $div : $("#stopUser"),
  show: function(msg){
    var _this = this;
    msg = msg || "Cargando...";
    html = '<div><i class="fa fa-circle-o-notch fa-spin"></i></span> '+msg+'</div>';
    _this.$div.html(html).show().off();
    return _this;
  },
  hide: function(delay){
    var _this = this;
    if(!isNaN(delay)){
      setTimeout(function(){
        _this.$div.hide();
      },delay);
    }else{
      _this.$div.hide();
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
  
  if( numberPages < 2){
    return;
  }
  
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
    $(".page"+page).addClass("active").removeClass("hide");

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

general.iconStatus = {
    html: function (estado) {
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

    return '<i class="status btn fa fa-2x fa-'+ico+' '+color+'" aria-hidden="true"></i>';
  },
  addEvents: function(){
    $(".status").click(function(){
      var $iconParent = $(this).parent(),
          status = $iconParent.attr("title");

      $iconParent.find("small").remove().end()
                 .append("<small class='label label-info' style='position:relative; left:-10px;top:0px; z-index:100'>"+status+"</small>")
                 .find("small").hide().slideDown(500);

      setTimeout(function(){ $iconParent.find("small").slideUp(500)},3000);

    });
  }
}

//refrescar pedidos pendientes
setInterval(function(){
  if(localStorage.id){
    if(!controller.main){
      $.getScript("app/model/home/main.js",function(){
        $.getScript("app/controller/home/main.js", function(){
          controller.main.getOrdersPend();
        });
      });
    }else{
      controller.main.getOrdersPend();
    }
  }

}, 60000);

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

window.alert = function(content, callback){
  var msg, 
  title = "Mensaje",
  $div = $('#modalAlert'),
  $divTitle = $div.find(".modal-title"),
  $divHeader = $div.find(".modal-header"),
  $button = $div.find("#okConfirm");

  if(typeof content == "object"){
    title = content.title;
    msg = content.msg;

  }else{
    msg = content;
  }

  if(typeof callback != "function"){
    callback = function(){};
  }

  $div
    .find(".modal-title").html(title).end()
    .find("#textAlert").html(msg).end()
    .modal('show').off('hide.bs.modal').on('hide.bs.modal', function(){callback()});

  $divHeader.removeAttr("class").addClass("label-primary modal-header");
  $button.removeAttr("class").addClass("btn btn-primary");
  
  this.info = function(){
    $divTitle.html("Información");
    $divHeader.addClass("label-info");
    $button.addClass("btn-info");
  };

  this.danger = function(){
    $divTitle.html("Error");
    $divHeader.addClass("label-danger");
    $button.addClass("btn-danger");
  };

  this.warning = function(){
    $divTitle.html("Advertencia");
    $divHeader.addClass("label-warning");
    $button.addClass("btn-warning");
  };

  this.success = function(){
    $divTitle.html("Mensaje");
    $divHeader.addClass("label-success");
    $button.addClass("btn-success");
  };

  return this;
};



var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();

general.exportToExcel = function ($table) {
    if(!$table.size()) return alert("Tabla invalida");
    var html = "<table>"+$table.html()+"</table>";
    html= html.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
      html= html.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
      html= html.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
      html = normalize(html)

    var url='data:application/vnd.ms-excel,' + encodeURIComponent(html);
    location.href=url;
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

general.zoomImg = function(){
  $(".zoomImg")
      .addClass("btn")
      .attr("title", "Zoom Imagen")
      .click(function(){
        $(this)
            .clone()
            .hide()
            .removeClass("zoomImg")
            .addClass("imgZoomInContainer")
            .addClass("img-responsive")
            .attr("width", "40%")
            .fadeIn()
            .appendTo("body");

        $("#stopUser")
            .show()
            .find(".close").remove().end()
            .append('<button type="button" class="close"><span aria-hidden="true">×</span></button>')
            .click(function(){
              $(this)
                  .hide()
                  .find(".close")
                  .remove();
          
              $(".imgZoomInContainer").remove();

           });
      });
      
};

general.printOrder = function(idOrder){
    window.open("http://"+location.host+"/"+location.pathname+"/sipa_legacy/remision.php?ped="+idOrder, "noimporta",'width=800, height=600, scrollbars =yes, top=150, status=no, toolbar=no, titlebar=no, menubar=no, urlbar=no');
}

general.showHistoryStatusOrder = function (idOrder) {
  general.stopUser.show();

    model.main.getHistoryOrder(idOrder)
      .done(function(resp){

            general.stopUser.hide();

            var title = "Cambios de estado del pedido: "+idOrder+"",
              html = "<div class='table-responsive' ><table class='table table-striped' >"+
                   "<tr><th>Estado</th><th>Fecha y Hora</th><th>Comentario</th></tr>";

            $.each(resp, function(i, data) {
              html += "<tr><td>"+data.estado+"</td><td>"+data.log+"</td><td>"+data.comentario+"</td></tr>";
            });

            html += "</table></div>";

            if(!resp.length){
              html="<p>No hay cambios de estado del pedido: "+idOrder+"</p>";
            }

            alert({msg: html, title:title});

      })
      .fail(function(e){
            general.stopUser.hide();
        alert("Error: " + e.responseText).danger();
      });
}


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

/** pushNotify:  show a notification in a specific element (div, span, p, etc) or default div #div-ms-status-notification
 * Method: show()
 *  @msg {string} message to add in notification
 *  @title {string} title to add in notification
 *  @time {number} millisecounds to shwo the notifdication
 *  @onclick {function} millisecounds to shwo the notifdication
 *  @$div {jQueryObject} altern element html to show data
 **/
 /*HTML Required
<div id="div-ms-status-notification" class="status-notification panel panel-default" style="display:none">
  <div class="panel-heading"> 
    <i class="fa fa-bell" aria-hidden="true"></i>  <span id="title"></span> 
    <button type="button" class="close" aria-hidden="true">&times;</button>
  </div>
  <div class="panel-body">
    <span id="msg"></span>
  </div>
</div> 
*/
var pushNotify = {
  $divDefault: $("#div-ms-status-notification"),
  $div: null,
  timeOut: null,
  show: function(msg, title, time, onclick, $div){
    var _this = this;

    _this.$div = ( $div ) ? $div : _this.$divDefault;

    if(_this.$div.size() == 0){
      console.log("$div is undefined");
      return this;
    }

    if(typeof onclick === 'function'){
      _this.$div.off().click(function(){onclick(); _this.$div.slideUp();});
    }else{
      _this.$div.off().click(function(){_this.$div.slideUp();});
    }

    _this.$div.slideDown().removeClass("panel-info panel-success").css({right: "0px"})
      .find("#msg").html(msg || "No message to show").end()
      .find("#title").html(title || "Notificación").end()
      .find("i").removeClass("green blue");

    clearTimeout(_this.timeOut);
    _this.timeOut = setTimeout(function(){
                  _this.$div.slideUp();
              },time || 3000);

    return this;
  },
  hide: function(){
    var _this = this;
    _this.$div.slideUp();
    return this;
  },
  info: function(){
    var _this = this;
    _this.$div.addClass("panel-info").removeClass("panel-success panel-default")
      .find("i").addClass("blue").removeClass("green");

    return this;
  },
  success: function(){
    var _this = this;
    _this.$div.removeClass("panel-info panel-default").addClass("panel-success")
      .find("i").addClass("green").removeClass("blue");
      
    return this;
  },
  center: function(){
    var _this = this;
    _this.$div.css({right: "50%"});
    return this;
  }
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

