jQuery(document).ready( function() {
	
	jQuery.getJSON('https://api-backend.datrixo.com/ico/ico-page', function (data) {

		document.getElementById("totalSupplyM").textContent = data.totalSupplyTokens;
		document.getElementById("soldM").textContent = data.soldTokens;
		document.getElementById("holdersCountM").textContent = data.holdersCount;
	});
});
