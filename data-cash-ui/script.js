var session = {};

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function navigateTo(pageId) {
	hideAllBlocks();
	$('#' + pageId).show();
}
function hideAllBlocks() {
	$('#page-data-request-form').hide();
	$('#page-records-archive').hide();
	$('#page-research-contributions').hide();
}

function updateTotals() {

	console.log("updateTotals")

	var incentives_per_report = parseInt($("#incentive-per-request").val());
	var reports_requested = parseInt($("#reports-request-count").val());

	var incentives_total = incentives_per_report * reports_requested;
	var campaign_cost = incentives_total * 0.03;
	var taxes = ( incentives_total + campaign_cost ) * 0.05;
	var total_cost = incentives_total + campaign_cost + taxes;

	$('#incentives-total').html(incentives_total);
	$('#campaign-cost').html(campaign_cost);
	$('#taxes').html(taxes);
	$('#total-campaign-cost').html(total_cost);
}

function signIn() {

	var user = db.users[$("#uname").val()];
	window.location.replace("/" + user.role + ".html?id=" + user.id);

}

function searchCriteria() {

	$('#records-count').show();
	$('#request-info-form').show();
}

window.onload = function() {

	console.log("Page loaded");

	session.id = getUrlParameter("id");
	if (session.id.startsWith("p")) {

		console.log('role=patients');
		hideAllBlocks();
		navigateTo('page-data-request-form');
		fillMedicalRecords(db.patient.medical_records[session.id]);
		fillEligibleCampaigns(db.campaigns, db.patient.approved_researches[session.id]);
	} else if (session.id.startsWith("r")){

		console.log('role=researcher');
		$('#records-count').hide();
		$('#request-info-form').hide();
		fillCampaigns(db.campaigns, db.researcher.campaigns[session.id]);
	}
};

function fillMedicalRecords(records) {

	var html = "";
	console.log(records);
	for (var i=0; i<records.length; i++) {
		html += '<div class="card">';
			// HEADER
			html += '<div class="card-header" id="heading-'+i+'">';
				html += '<h5 class="mb-0">';
					html += '<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse-'+i+'" aria-expanded="false" aria-controls="collapse-'+i+'">';
              			html += 'Records from ' + records[i].organization_name;
                	html += '</button>';
              	html += '</h5>';
			html += '</div>'

			// BODY
			html += '<div id="collapse-'+i+'" class="collapse" aria-labelledby="heading-'+i+'" data-parent="#patients-accordian">';
              html += '<div class="card-body">';

                html += '<h6>Symptoms:</h6>';
                html += '<ul>';
                var symptoms = records[i].symptoms;
                console.log(symptoms);
                for (var j=0;j<symptoms.length; j++) {
                	html += '<li>'+ symptoms[j] +'</li>';
                }
                html += '</ul>';

                html += '<h6>Probable issues:</h6>';
                html += '<ul>';
                var issues = records[i].possible_issues;
                console.log(issues);
                for (var j=0;j<issues.length; j++) {
                	html += '<li>'+ issues[j] +'</li>';
                }
                html += '</ul>';

                html += '<h6>Prescriptions:</h6>';
                html += '<ul>';
                var prescriptions = records[i].prescriptions;
                console.log(prescriptions);
                for (var j=0;j<prescriptions.length; j++) {
                	html += '<li>'+ prescriptions[j] +'</li>';
                }
                html += '</ul>';
              html += '</div>';
            html += '</div>';
		html += '</div>';
	}
	
	$("#patients-accordian").html(html);
}

function fillEligibleCampaigns(campaignsData, campaignsList) {

	var html = "";

	for (var i=0; i<campaignsList.length; i++) {
		var campaign = campaignsData[campaignsList[i]];
		html += '<div class="card">';
            html += '<div class="card-header" id="heading-'+i+'">';
              html += '<h5 class="mb-0">';
                html += '<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse-'+i+'" aria-expanded="false" aria-controls="collapse-'+i+'">';
                  html += campaign.title;
                html += '</button>';
              html += '</h5>';
            html += '</div>';
            html += '<div id="collapse-'+i+'" class="collapse" aria-labelledby="heading-'+i+'" data-parent="#campaigns-accordian">';
              html += '<div class="card-body">';

                html += '<h6>Description:</h6>';
                html += '<p>'+campaign.description+'</p>';

                html += '<h6>Researcher: </h6>';
                html += '<p>'+db.researchers[db.campaign.researcher[campaignsList[i]]].name+'</p>';
                
                html += '<h6>URL: </h6>';
                html += '<p><a href="#">'+campaign.url+'</a></p>';

                html += '<h6>Tags: </h6>';
                html += '<p>';
                for (var j=0;j<campaign.tags.length; j++) {
                  html += '<span class="badge badge-warning">'+campaign.tags[j]+'</span> ';
              }
                html += '</p>';

                html += '<h6>Incentive: </h6>';
                html += '<p>'+campaign.request.incentive_per_report_usd+'$</p>';

                if (campaign.end_date == null) {
                	html += '<button type="button" class="btn btn-primary">Authorize</button>';
                }
              html += '</div>';
            html += '</div>';
          html += '</div>';
	}

	$("#campaigns-accordian").html(html);
}

function fillCampaigns(campaignsData, campaignsList) {

	var html = "";

	for (var i=0; i<campaignsList.length; i++) {
		var campaign = campaignsData[campaignsList[i]];

		html += '<div class="card">';
            html += '<div class="card-header" id="heading-'+i+'">';
              html += '<h5 class="mb-0">';
                html += '<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse-'+i+'" aria-expanded="false" aria-controls="collapseTwo">';
                  html += campaign.title;
                html += '</button>';
              html += '</h5>';
            html += '</div>';
            html += '<div id="collapse-'+i+'" class="collapse" aria-labelledby="heading-'+i+'" data-parent="#accordionExample">';
              html += '<div class="card-body">';
                html += '<h6>Search Criteria:</h6>';
                html += '<ul>';
                  html += '<li><b>Age Groups:</b> 18-25</li>';
                  html += '<li><b>Symptoms:</b> Sneeze, stomach-ache</li>';
                  html += '<li><b>Geography:</b> Massachusetts</li>';
                html += '</ul>';

                html += '<h6>Description:</h6>';
                html += '<p>'+campaign.description+'</p>';

                html += '<h6>URL: </h6>';
                html += '<p><a href="#">'+campaign.url+'</a></p>';

                html += '<h6>Tags: </h6>';
                html += '<p>';
                for (var j=0;j<campaign.tags.length; j++) {
                  html += '<span class="badge badge-warning">'+campaign.tags[j]+'</span> ';
              }
                html += '</p>';

                html += '<h6>Number of reports requested: </h6>';
                html += '<p>'+campaign.request.reports_count+'</p>';

                html += '<h6>Incetive per report: </h6>';
                html += '<p>'+campaign.request.incentive_per_report_us+'</p>';

                html += '<h6>Campaign Dates: </h6>';
                html += '<p>'+campaign.start_date+' - ';
                if (campaign.end_date == null) {
                  html += '<span class="badge badge-success">on-going</span>';
                } else {
                	html += campaign.end_date;
                }
                html += '</p>';

                html += '<button type="button" class="btn btn-primary">Download 198 reports</button>';
              html += '</div>';
            html += '</div>';
          html += '</div>';
      }
    $("#accordionExample").append(html);
}