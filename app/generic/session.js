$.ajaxSetup({
    beforeSend: function() {
        // show loading dialog // works
    },
    complete: function(xhr, stat) {
        // hide dialog // works
    },
    success: function(result,status,xhr) {
        // not showing the alert
        //controller.session.timeout = 5000;//close session in 5 secouds
        controller.session.timeout = 600000;//close session in 10 minutes
    }
});

var controller =  controller || {};

// Constructor
controller.session = {};

controller.session.timeout = 0;
controller.session.timeCheck = 60000;
//controller.session.timeCheck = 1000;

//check active session every minute
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