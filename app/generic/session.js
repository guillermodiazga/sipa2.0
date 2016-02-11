var controller =  controller || {};

// Constructor
controller.session = {};

//controller.session.timeout = 600000;
controller.session.timeout = 60000;
controller.session.timeToClose = 60000;
//controller.session.timeCheck = 60000; //check active session every 1 minute
controller.session.timeCheck = 1000;

//check active session every minute
controller.session.checkSession = function(){

    setInterval(function(){
        controller.session.timeout -= controller.session.timeCheck;
        if (controller.session.timeout < 1 && sessionStorage.id) {
            controller.navigation.closeSession();
            createNewWebNotification("SIPA, Session expirada", "Su session ha expirado.", "favicon.ico", "session", 10000)
            alert("Su session ha expirado");
        };

        if (controller.session.timeout < 30000 && sessionStorage.id) {
            if(getWebNotificationPermissionStatus() != 2){
                alert("Su session esta  a punto de expirar.");
            }else{
                createNewWebNotification("SIPA", "Su session esta  a punto de expirar.", "favicon.ico", "session", 10000)
            }
        };
    },controller.session.timeCheck);
};