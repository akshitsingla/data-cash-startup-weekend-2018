var db = {};
db.patient = {};
db.researcher = {};
db.campaign = {};

db.users = {
	"sbaker": {
		"id": "p1",
		"pass": "",
		"role": "patient"
	},
	"mass_general": {
		"id": "r1",
		"pass": "",
		"role": "researcher"
	}
};

db.patient.request_form_instructions = [
	"Blah Blah Blah Blah Blah Blah",
	"Blah Blah Blah Blah Blah Blah"
];

db.patient.request_form_url = "";

db.patient.medical_records = {
	"p1": [
		{
			"organization_name": "Mass General",
			"symptoms": [
				"Cold",
				"Cough"
			],
			"possible_issues": [
				"Common Cold",
				"Malaria"
			],
			"prescriptions": [
				"2 pills of blah every day, after food",
				"1 pill of blah2 every week, empty stomache"
			]
		}, {
			"organization_name": "PGI",
			"symptoms": [
				"Cold",
				"Cough"
			],
			"possible_issues": [
				"Common Cold",
				"Malaria"
			],
			"prescriptions": [
				"2 pills of blah every day, after food",
				"1 pill of blah2 every week, empty stomache"
			]
		}
	]
};

db.campaigns = {
	"c1": {
		"title": "Potty Research",
		"search_criteria": {
			"age_group": "18 - 25",
			"symptoms": [
				"Cold",
				"Cough"
			],
			"geography": "Massachusetts"
		},
		"description": "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
		"url": "www.google.com",
		"tags": [
			"HIV",
			"AIDS"
		],
		"request": {
			"reports_count": 200,
			"incentive_per_report_usd": 1.5
		},
		"start_date": "2018-05-01",
		"end_date": null

	},
	"c2": {
		"title": "Cardiology Research",
		"search_criteria": {
			"age_group": "18 - 25",
			"symptoms": [
				"Cold",
				"Cough"
			],
			"geography": "Massachusetts"
		},
		"description": "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
		"url": "www.google.com",
		"tags": [
			"HIV",
			"AIDS"
		],
		"request": {
			"reports_count": 200,
			"incentive_per_report_usd": 1.5
		},
		"start_date": "2018-05-01",
		"end_date": "2018-06-01"

	}
};

db.researchers = {
	"r1": {
		"name": "MASS General"
	}
};

db.researcher.campaigns = {
	"r1": ["c1", "c2"]
};

db.patient.approved_researches = {
	"p1": ["c1", "c2"]
}

db.campaign.approved_patients = {
	"c1": ["p1"],
	"c2": ["p1"]
}

db.campaign.researcher = {
	"c1": "r1",
	"c2": "r1"
}