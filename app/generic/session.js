var controller =  controller || {};

// Constructor
controller.session = {};

controller.session.timeToClose = 600000;
//controller.session.timeToClose = 600000;//10 minutes

controller.session.timeout = controller.session.timeToClose;

controller.session.timeCheck = 60000; 
//controller.session.timeCheck = 60000;//check active session every 1 minute

controller.session.warningShowed = false;

//check active session every minute
controller.session.checkSession = function(){

    var checkSession = function(){
                                    controller.session.timeout -= controller.session.timeCheck;

                                    if (controller.session.timeout < 0) {
                                        clearInterval(controller.session.interval);
                                    }

                                    if (controller.session.timeout < 1 && localStorage.id) {
                                        controller.navigation.closeSession();
                                        createNewWebNotification("SIPA, Session expirada", "Su session ha expirado.", "icon.ico", "session", 10000);
                                        alert("Su session ha expirado");
                                    };

                                    if (controller.session.timeout < 60000 && localStorage.id && controller.session.warningShowed == false) {
                                        controller.session.warningShowed = true;
                                        if(getWebNotificationPermissionStatus() != 2){
                                            alert("Su session esta  a punto de expirar.");
                                        }else{
                                            createNewWebNotification("SIPA", "Su session esta a punto de expirar.", "icon.ico", "session", 10000);
                                        }
                                    }
                                };

    controller.session.interval = setInterval(checkSession,controller.session.timeCheck);
};