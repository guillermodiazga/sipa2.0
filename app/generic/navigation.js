
var controller = controller || {};
controller.navigation = {};

controller.navigation.loadViewOnReload = function () {
 var currentPage=location.href.split( '#' );
    currentPage=currentPage[1];

    localStorage.page='main';

    if(currentPage && currentPage != "exit")
        localStorage.page = currentPage;

    controller.navigation.loadView(localStorage.page)
    $("li[class=active]").removeClass("active");
    $("a[href='#"+localStorage.page+"'").parent().addClass("active");
}


controller.navigation.showMainMenu = function () {
    $(".navbar-toggle[aria-expanded='true']").click();
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

controller.navigation.hideMainMenu = function () {
    $(".menuPpal").hide();
    $("#activNotifications").hide();
}

controller.navigation.loadView = function (view, idElementToShow) {
    var idElementToShow = idElementToShow || "container";
    $("#stopUser").show();
    $("#container-xl").html("").hide();
    if(sessionStorage.id){
        controller.navigation.showMainMenu();
    }else{
        view = 'login';
    }
    $.get('app/view/'+view+'.html?a='+Math.random())
       .done(function(data){
            $("#"+idElementToShow).html(data);
            $("#stopUser").hide();
       })
       .fail(function(e){
            $("#container").html("Error: "+e.status+" "+e.statusText);
            $("#stopUser").hide();
       });
    
}

controller.navigation.closeSession = function () {
    sessionStorage.clear();
    controller.navigation.loadView('login');
    controller.navigation.hideMainMenu();
    localStorage.remenberMe = "false";
};

controller.navigation.exit = function () {
    $("#textConfirm").text("¿Seguro de cerrar sesion?")
    $("#okConfirm").off().click(function(){
        controller.navigation.closeSession();
    });
    $('#modalConfirm').modal('show');
}

$(document).ready(function(){
    
    //on reload page with sesion active
    if(!sessionStorage.id){
        controller.navigation.loadView('login');
    }else{
       controller.navigation.loadViewOnReload();
       $("#userName").text(localStorage.name);
       
       if(localStorage.remenberMe != "true")
            controller.session.checkSession();
    }

   //click on ppal menu
    $(".navbar-nav a").click(function(e){
        var view = this.href.split("#")[1];
        if(view != 'exit'){
            $("li[class=active]").removeClass("active");
            $(this).parent().addClass("active");
            controller.navigation.loadView(view);

            //close menu desplegable on mobile
            if($(window).width()<768){
                $(".navbar-toggle").click();
            }
            
        }else{
            controller.navigation.exit();
        }
    });
});