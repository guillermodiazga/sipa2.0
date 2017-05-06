
var controller = controller || {};
controller.navigation = {};

controller.navigation.loadViewOnReload = function () {
    var currentPage=location.href.split( '#' );
    currentPage=currentPage[1];
    localStorage.page='main';
    if(currentPage && currentPage != "exit"){
        localStorage.page = currentPage;
    }

    controller.navigation.loadView(localStorage.page)
    $("li[class=active]").removeClass("active");
    $("a[href='#"+localStorage.page+"'").parent().addClass("active");
}


controller.navigation.showMainMenu = function () {
    $(".navbar-toggle[aria-expanded='true']").click();
    
    controller.navigation.hideOptionsMainMenuByRol();
    

    $(".menuPpal").fadeIn();

    //allow desktop notifications
    if( getWebNotificationsSupported() &&  getWebNotificationPermissionStatus() != 2){

        $("#activNotifications")
        .slideDown()
        .click( function () {
            askForWebNotificationPermissions();
            $(this).slideUp();
        });

        if( getWebNotificationPermissionStatus() == 2 ){
            $("#activNotifications").hide();
        }
    }
    
};

controller.navigation.hideOptionsMainMenuByRol = function () {

     $(".menuPpal").find("a").parent().show();

    //ocultar menu de configuracion y edicion de pedidos
    if(localStorage.idrol == 1){
        $(".menuPpal").find("a[href='#config']").parent().hide();
        //$(".menuPpal").find("a[href='#editOrder']").parent().hide();
    }

    if(localStorage.idrol != 1){
        $(".menuPpal").find("a[href='#newOrder']").parent().hide();
    }
};

controller.navigation.hideMainMenu = function () {
    $(".menuPpal").hide();
    $("#activNotifications").hide();
}

controller.navigation.loadView = function (view, idElementToShow, callBack, swClassContainer) {
    var idElementToShow = idElementToShow || "container";
    general.stopUser.show();
    $("#"+idElementToShow).hide();
    if(localStorage.id){
        controller.navigation.showMainMenu();
    }else{
        view = 'login';
    }
    localStorage.page = view;
    $(".active").removeClass("active");
    $(".menuPpal").find("a[href='#"+view+"']").parent().addClass("active");;
    
    var swClassContainer = swClassContainer || $(".menuPpal").find("a[href='#"+view+"']").parent().data("container");

    if(view == 'login'){
        //swClassContainer = "true";
        idElementToShow ="containerLogin";
    }
    if(swClassContainer == true){
        $("#container").addClass("container");
    }
    else{
        $("#container").removeClass("container");
    }
   // $.get('app/view/'+view+'.html?a='+Math.random())
    $.get('app/view/'+view+'.html')
    .done(function(data, e){
        $("#"+idElementToShow).html("").append(data);
        //general.stopUser.hide();
        $("#"+idElementToShow).fadeIn();

        if(callBack){
            callBack();
        }
    })
    .fail(function(e){
        $("#container").html("Error: "+e.status+" "+e.statusText);
        general.stopUser.hide();
        $("#"+idElementToShow).fadeIn();
    });
    
}

controller.navigation.closeSession = function () {
    var _this = this;

    localStorage.clear();
    _this.loadView('login');
    _this.hideMainMenu();
    localStorage.remenberMe = "false";
    $("#container").addClass("container");
    $("li[class=active]").removeClass("active");
    //$("a[href='#"+localStorage.page+"'").parent().addClass("active");
    localStorage.page='main';

    //Ajax to close session
};

controller.navigation.exit = function () {
    var _this = this;
    $("#textConfirm").text("¿Seguro de cerrar sesion?")
    $("#okConfirm").off().click(function(){
        _this.closeSession();
    });
    $('#modalConfirm').modal('show');
}

controller.navigation.init = function (){
    var _this = this;

     //on reload page with sesion active
     if(!localStorage.id){
        controller.navigation.loadView('login');
    }else{
        controller.navigation.loadViewOnReload();
        $(".userName").text(localStorage.name);

        if(localStorage.remenberMe != "true"){
            controller.session.checkSession();
        }
    }

   //click on ppal menu
   $(".navbar-nav a").click(function(e){
    var view = this.href.split("#")[1];
    if(view != 'exit'){
        $("li[class=active]").removeClass("active");
        $(this).parent().addClass("active");
        _this.loadView(view);

            //close menu desplegable on mobile
            if($(window).width()<768){
                $(".navbar-toggle").click();
            }
            
        }else{
            _this.exit();
        }
    });
};

$(document).ready(function(){
    controller.navigation.init();
});