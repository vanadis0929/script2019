$(document).ready(function(){

	// [1]random 배경 - jq ver.
	var randomNum = Math.floor(Math.random() * 5);
	var newClass = 0;
	newClass = 'type'+ randomNum;
	$('.bg').addClass(newClass);

});