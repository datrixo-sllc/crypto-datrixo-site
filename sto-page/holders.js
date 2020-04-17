jQuery(document).ready( function() {
	
	jQuery.getJSON('http://ico-page-site-backend.gned73gxqz.us-east-1.elasticbeanstalk.com/ico/ico-page', function (data) {

		document.getElementById("totalSupply").textContent = data.totalSupplyTokens;
		document.getElementById("sold").textContent = data.soldTokens;
		document.getElementById("holdersCount").textContent = data.holdersCount;
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

		jQuery('#tableHolders').DataTable({data: holders});
	});
});
