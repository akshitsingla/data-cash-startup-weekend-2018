hideAllBlocks();
navigateTo('page-data-request-form');

function navigateTo(pageId) {
	hideAllBlocks();
	$('#' + pageId).show();
}
function hideAllBlocks() {
	$('#page-data-request-form').hide();
	$('#page-records-archive').hide();
	$('#page-research-contributions').hide();
}