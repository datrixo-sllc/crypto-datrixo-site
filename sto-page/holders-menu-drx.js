jQuery(document).ready( function() {
	
	jQuery.getJSON('https://api2-backend.datrixo.com/ico/ico-page', function (data) {

		document.getElementById("totalSupplyM-drx").textContent = data.totalSupplyTokens;
		document.getElementById("soldM-drx").textContent = data.soldTokens;
		document.getElementById("holdersCountM-drx").textContent = data.holdersCount;
	});
});
