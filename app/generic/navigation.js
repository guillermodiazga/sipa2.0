
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


controller.navigation.loadView = function (view) {
    $("#stopUser").show();
    if(sessionStorage.id){
        $(".menuPpal").show();
    }else{
        view = 'login';
    }
    $.get('app/view/'+view+'.html?a='+Math.random())
       .done(function(data){
            $("#container").html(data);
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
    $(".menuPpal").hide();
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
    if(!sessionStorage.id)
        controller.navigation.loadView('login');
    else
       controller.navigation.loadViewOnReload();

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