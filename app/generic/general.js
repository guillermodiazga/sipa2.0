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

 window.alert = function(text){
 	$('#modalAlert').find("#textAlert").text(text).end().modal('show');
 };