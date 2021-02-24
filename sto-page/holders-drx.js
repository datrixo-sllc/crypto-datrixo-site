jQuery(document).ready( function() {
	
	jQuery.getJSON('https://api2-backend.datrixo.com/ico/ico-page', function (data) {

		document.getElementById("totalSupply-drx").textContent = data.totalSupplyTokens;
		document.getElementById("sold-drx").textContent = data.soldTokens;
		document.getElementById("holdersCount-drx").textContent = data.holdersCount;
		var holders = [];
		for (ind in data.holders) {
			var item = [];
			item.push("<a href='https://etherscan.io/address/" + data.holders[ind].address +
				"#readContract' target='_blank'>" + data.holders[ind].address + "</a>");
			item.push(new Date(data.holders[ind].timeDate).toUTCString());
			item.push(data.holders[ind].shareTokens);
			item.push(data.holders[ind].share);
			holders.push(item);

		}
		console.log(holders);

		jQuery('#tableHolders-drx').DataTable({data: holders});
	});
});
