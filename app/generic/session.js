var controller =  controller || {};

// Constructor
controller.session = {};

controller.session.timeout = 600000;
controller.session.timeCheck = 60000; //check active session every 1 minute
//controller.session.timeCheck = 1000;

//check active session every minute
controller.session.checkSession = function(){

    setInterval(function(){
        controller.session.timeout -= controller.session.timeCheck;

        if (controller.session.timeout < 1 && sessionStorage.id) {
            controller.navigation.closeSession();
            createNewWebNotification("SIPA, Session expirada", "Su session ha expirado.", "favicon.ico", "session", 3000)
            alert("Su session ha expirado");
        };

        if (controller.session.timeout < 30000 && sessionStorage.id) {
            createNewWebNotification("SIPA", "Su session esta  a punto de expirar.", "favicon.ico", "session", 3000)
        };
    },controller.session.timeCheck);
};