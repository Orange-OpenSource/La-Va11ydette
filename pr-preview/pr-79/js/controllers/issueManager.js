/**
 * Comment manager
 */

/**
 * Management of deprecated comments that no longer exist 
 * @param {array} data - data valydette
 */
 managementDeprecatedComment = function (data){
	data.checklist.page.forEach( 
			page => {
				page.items.forEach( item =>{
					if(typeof item.issues === 'undefined'){
						item.issues = [];
					}
					if( typeof item.commentaire !== 'undefined'){
						if(item.commentaire!==""){
							newIssue = {
								issueTitle : item.commentaire,
								issueDetail : "",
								issueSolution : "",
								issueTechnicalSolution:""
							};
							item.issues.push(newIssue);
						}
						delete item.commentaire	
					}
				})
			}
		 );
	return data;
}

/**
 * Issue manager
 */

/**
 * Load issue
*/
loadIssue = function (){
	if(typeof checklistVallydette[dataVallydette.checklist.referentiel] !== 'undefined'){
		var issuesRequest = new XMLHttpRequest();
		issuesRequest.open("GET", "json/"+ checklistVallydette[dataVallydette.checklist.referentiel].filename+"-issues-" + globalLang + ".json", true);
		issuesRequest.onreadystatechange = function () {
			if(issuesRequest.readyState === 4 && issuesRequest.status === 200) {
				issuesVallydette = JSON.parse(issuesRequest.responseText);
			}	 
		};
		
		issuesRequest.send();
	}
	
}

/**
 * Issue popin initialization.
 * @param {string} targetId - current test ID.
 * @param {string} title - current test title.
*/
setIssue = function (targetId, title, targetIdOrigin) {
	let titleModal = title;

	let htmlModal = '';
	htmlModal += '<div class="modal-dialog modal-lg " role="document">';
	htmlModal += '<div class="modal-content">';
	htmlModal += '<div class="modal-header">';
	htmlModal += '<h5 class="modal-title" id="modalAddIssueTitle">' + langVallydette.issueTxt1 + titleModal + '</h5>';
	htmlModal += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + langVallydette.close + '"></button>';
	htmlModal += '</div>';
	htmlModal += '<form id="editIssueForm">';
	htmlModal += '<div class="modal-body">';
	htmlModal += (issuesVallydette[targetIdOrigin]) ? getPredefinedIssues(targetIdOrigin) : "";
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label class="is-required form-label" for="issueNameValue">' + langVallydette.summary + ' <span class="visually-hidden"> (' + langVallydette.required + ')</span></label>';
	htmlModal += '<input type="text" class="form-control" id="issueNameValue" value="" required>';
	htmlModal += '</div>';
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label class="is-required mt-2 form-label" for="issueDetailValue">' + langVallydette.description + ' <span class="visually-hidden"> (' + langVallydette.required + ')</span> </label>';
	htmlModal += '<textarea class="form-control" id="issueDetailValue" rows="8" required></textarea>';
	htmlModal += '</div>';
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label for="issueSolutionValue" class="mt-2 form-label">' + langVallydette.solution + ' </label>';
	htmlModal += '<textarea class="form-control" id="issueSolutionValue"></textarea>';
	htmlModal += '</div>';
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label for="issueTechnicalSolutionValue" class="mt-2 form-label">' + langVallydette.technical_solution + ' </label>';
	htmlModal += '<textarea class="form-control" id="issueTechnicalSolutionValue"></textarea>';
	htmlModal += '</div>';
	htmlModal += '</div>';

	htmlModal += '<div class="modal-footer">';
	htmlModal += '<button type="button" id="closeIssueBtnBtn" class="btn btn-secondary" data-bs-dismiss="modal">' + langVallydette.cancel + '</button>';
	htmlModal += '<button type="submit" id="saveIssueBtnBtn" class="btn btn-primary">' + langVallydette.save + '</button>';
	htmlModal += '</div>';
	htmlModal += '</form>';
	htmlModal += '</div></div>';

	
	let elModal = document.getElementById('modalAddIssue');
	elModal.innerHTML = htmlModal;

	let currentEditForm = document.getElementById('editIssueForm');
 
	currentEditForm.addEventListener('submit', function () {
		event.preventDefault();
		
		addIssue(targetId, issueNameValue.value, issueDetailValue.value, issueSolutionValue.value, issueTechnicalSolutionValue.value);
		document.getElementById('closeIssueBtnBtn').click();
		

	});
	
	
	if (document.getElementById('btnValidatePredefined')) {
		
			document.getElementById('btnValidatePredefined').addEventListener('click', function () {
			event.preventDefault();
			
			issueNameValue.value = issuesVallydette[targetIdOrigin][issuePredefined.value].title;
			issueDetailValue.value = issuesVallydette[targetIdOrigin][issuePredefined.value].detail;
			issueSolutionValue.value = issuesVallydette[targetIdOrigin][issuePredefined.value].solution;
			issueTechnicalSolutionValue.value = issuesVallydette[targetIdOrigin][issuePredefined.value].technicalSolution;
			
			issueNameValue.focus();
		
		});
		
	}
	
	var issueNameValueInput = document.getElementById('issueNameValue');
	var modal = document.getElementsByClassName('modal');
	
	modal[0].addEventListener('shown.bs.modal', function () {
		issueNameValueInput.focus()
	  })
}

/**
 * Add the issue to the vallydette object.
 * @param {string} targetId - current test ID.
 * @param {string} issueTitle.
 * @param {string} issueDetail.
*/
addIssue = function (targetId, issueTitle, issueDetail, issueSolution, issueTechnicalSolution) {
	for (let i in dataVallydette.checklist.page[currentPage].items) {
		if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId) {
			
			newIssue = {};
			newIssue['issueTitle'] = issueTitle;
			newIssue['issueDetail'] = issueDetail;
			newIssue['issueSolution'] = issueSolution;
			newIssue['issueTechnicalSolution'] = issueTechnicalSolution;
			
			dataVallydette.checklist.page[currentPage].items[i].issues.push(newIssue);
			
			document.getElementById("issueDisplayBtn"+ targetId).removeAttribute("disabled");
			
		}
	}

	jsonUpdate();
}


/**
 * Get the predefined issues if exists, and update the select menu
 * @param {string} targetId - current test ID
 * @return {string} htmlPredefinedIssue - html of the updated select menu
*/
getPredefinedIssues = function(targetId) {
	
	let htmlPredefinedIssues = '';
	

	htmlPredefinedIssues += '<div class="mb-3 row">';
	htmlPredefinedIssues += '<div class="col-sm-10">';
	
	htmlPredefinedIssues += '<select class="form-select" id="issuePredefined" aria-label="' + langVallydette.selectIssue + ' ">';
	htmlPredefinedIssues += '<option selected>' + langVallydette.selectIssue + '</option>';
	issuesVallydette[targetId].forEach(function (issue, index) {htmlPredefinedIssues +='<option value="' + index + '">' + issue.title + '</option>'});
	htmlPredefinedIssues += '</select>';
	htmlPredefinedIssues += '</div>';
	htmlPredefinedIssues += '<div class="col-sm-2">';
	htmlPredefinedIssues += '<button id="btnValidatePredefined" class="btn btn-secondary">' + langVallydette.import + '</button>';
	htmlPredefinedIssues += '</div>';
	htmlPredefinedIssues += '</div>';
		
	return htmlPredefinedIssues;
	
}

/**
 * Get an issue property
 * @param {string} targetId - current test ID
 * @param {string} issueProperty - property name
 * @param {string} issueIndex - index of the issue to remove into an issue array
 * @return {string} currentIssue[issueProperty] - issue property value
*/
getIssue = function (targetId, issueProperty, issueIndex) {
	let currentIssue;

	for (let i in dataVallydette.checklist.page[currentPage].items) {
		if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId) {
			currentIssue = dataVallydette.checklist.page[currentPage].items[i].issues[issueIndex];
		}
	}

	return currentIssue[issueProperty];
}

/**
 * Edit an issue
 * @param {string} targetId - current test ID
 * @param {string} issueIndex - index of the issue to remove into an issue array
*/
editIssue = function (targetId, issueIndex) {
	
	let htmlEditIssue = '';
	
	htmlEditIssue += '<form id="editIssueForm-'+ targetId +'-'+ issueIndex+'">';
	htmlEditIssue += '<label class="is-required form-label" for="issueNameValue-' + issueIndex + '"> ' + langVallydette.summary + ' <span class="visually-hidden"> (' + langVallydette.required + ')</span></label>';
	htmlEditIssue += '<input type="text" class="form-control" id="issueNameValue-' + issueIndex + '" value="' + utils.escape_html(getIssue(targetId, 'issueTitle', issueIndex)) + '" required >';
	htmlEditIssue += '<label class="is-required mt-2 form-label" for="issueDetailValue-' + issueIndex + '">' + langVallydette.description + ' <span class="visually-hidden"> (' + langVallydette.required + ')</span></label>';
	htmlEditIssue += '<textarea class="form-control" id="issueDetailValue-' + issueIndex + '" rows="8" required>' + utils.escape_html(getIssue(targetId, 'issueDetail', issueIndex)) + '</textarea>';
	htmlEditIssue += '<label for="issueSolutionValue-' + issueIndex + '" class="mt-2 form-label">' + langVallydette.solution + '</label>';
	htmlEditIssue += '<textarea class="form-control" id="issueSolutionValue-' + issueIndex + '">' + utils.escape_html(getIssue(targetId, 'issueSolution', issueIndex)) + '</textarea>';
	htmlEditIssue += '<label for="issueTechnicalSolutionValue-' + issueIndex + '" class="mt-2 v">' + langVallydette.technical_solution + '</label>';
	htmlEditIssue += '<textarea class="form-control" id="issueTechnicalSolutionValue-' + issueIndex + '">' + utils.escape_html(getIssue(targetId, 'issueTechnicalSolution', issueIndex)) + '</textarea>';
	htmlEditIssue += '<button type="button" id="cancelIssueBtn-'+ targetId +'-'+ issueIndex +'" class="btn btn-secondary btn-sm mt-1 me-1 mb-1">' + langVallydette.cancel + '</button>';
	htmlEditIssue += '<button type="submit" id="saveIssueBtn-'+ targetId +'-'+ issueIndex +'" class="btn btn-primary btn-sm mt-1 mb-1">' + langVallydette.save + '</button>';
	htmlEditIssue += '<div class="border-top border-light my-3"></div>';
	htmlEditIssue += '</form>';
	
	let elIssueCard = document.getElementById('issue-body-'+ targetId +'-'+ issueIndex);
	elIssueCard.innerHTML = htmlEditIssue;
	
	let elTitle = document.getElementById('issueNameValue-' + issueIndex);
	elTitle.focus();

	let issueForm = document.getElementById('editIssueForm-'+ targetId +'-'+ issueIndex);
	issueForm.addEventListener('submit', function (event) {
		event.preventDefault();
		
		saveIssue(targetId, issueIndex, this);
		
	});
	
	document.getElementById('editIssueBtn-' + targetId + '-'+ issueIndex).style.display = "none";
	document.getElementById('deleteIssueBtn-' + targetId + '-'+ issueIndex).style.display = "none";
	document.getElementById('closeModalIssue').disabled=true;
	
	document.getElementById('cancelIssueBtn-' + targetId + '-' + issueIndex).addEventListener('click', function () {
		cancelIssue(targetId, issueIndex, getIssue(targetId, 'issueTitle', issueIndex), getIssue(targetId, 'issueDetail', issueIndex));	
	});
	
}

/**
 * Save an issue
 * @param {string} targetId - current test ID
 * @param {string} issueIndex - index of the issue to remove into an issue array
 * @param {object} issueEditForm - issue edit form object
*/
saveIssue = function (targetId, issueIndex, issueEditForm) {

	for (let i in dataVallydette.checklist.page[currentPage].items) {
		if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId) {

			dataVallydette.checklist.page[currentPage].items[i].issues[issueIndex]['issueTitle'] = issueEditForm.elements["issueNameValue-" + issueIndex].value;
			dataVallydette.checklist.page[currentPage].items[i].issues[issueIndex]['issueDetail'] = issueEditForm.elements["issueDetailValue-" + issueIndex].value;
			dataVallydette.checklist.page[currentPage].items[i].issues[issueIndex]['issueSolution'] = issueEditForm.elements["issueSolutionValue-" + issueIndex].value;
			dataVallydette.checklist.page[currentPage].items[i].issues[issueIndex]['issueTechnicalSolution'] = issueEditForm.elements["issueTechnicalSolutionValue-" + issueIndex].value;
			
		}
	}

	cancelIssue(targetId, issueIndex, issueEditForm.elements["issueNameValue-" + issueIndex].value, issueEditForm.elements["issueDetailValue-" + issueIndex].value);
	
	jsonUpdate();	
	
}


/**
 * Cancel the issue edition form
 * @param {string} targetId - current test ID
 * @param {string} issueIndex - index of the issue to remove into an issue array
 * @param {string} issueTitle - issue title property
 * @param {string} issueDetail - issue detail property
*/
cancelIssue = function (targetId, issueIndex, issueTitle, issueDetail) {

	let htmlEditIssue = '';
	htmlEditIssue += utils.escape_html(issueDetail);
	

	let elIssueCard = document.getElementById('issue-body-' + targetId + '-' + issueIndex);
	elIssueCard.innerHTML = htmlEditIssue;
	let elIssueCardHeader = document.getElementById('btnIssue' + targetId + '-' + issueIndex);
	elIssueCardHeader.innerHTML = utils.escape_html(issueTitle);
	
	document.getElementById('editIssueBtn-' + targetId + '-' + issueIndex).style.display = "inline-flex";
	document.getElementById('deleteIssueBtn-' + targetId + '-' + issueIndex).style.display = "inline-flex";
	document.getElementById('closeModalIssue').disabled=false;

	document.getElementById('editIssueBtn-' + targetId + '-' + issueIndex).focus();
	
}


/**
 * Delete confirmation feedback
 * @param {string} targetId - current test ID
 * @param {string} issueIndex - index of the issue to remove into an issue array
*/
deleteConfirmationIssue = function (targetId, issueIndex) {
	
	let htmlIssueFeedback = '<div id="deleteIssueBtn-'+ targetId +'-'+ issueIndex +'-feedback">';
	htmlIssueFeedback += '<span id="deleteIssueMessage-'+ targetId +'-'+ issueIndex +'">' + langVallydette.issueTxt3 + '</span>';
	htmlIssueFeedback += '<button type="button" id="btnDeleteIssueNo-'+ targetId +'-'+ issueIndex +'" aria-labelledby="deleteIssueMessage-'+ targetId +'-'+ issueIndex +' btnDeleteIssueNo-'+ targetId +'-'+ issueIndex +'" class="btn btn-secondary btn-sm" onClick="deleteIssue(\''+ targetId +'\','+ issueIndex +', false)">' + langVallydette.no + '</button>';
	htmlIssueFeedback += '<button type="button" id="btnDeleteIssueYes-'+ targetId +'-'+ issueIndex +'" class="btn btn-secondary btn-sm"  aria-labelledby="deleteIssueMessage-'+ targetId +'-'+ issueIndex +' btnDeleteIssueYes-'+ targetId +'-'+ issueIndex +'"  onClick="deleteIssue(\''+ targetId +'\','+ issueIndex +', true)">' + langVallydette.yes + '</button>';
	htmlIssueFeedback += '</div>';
	
	let elButton = document.getElementById("deleteIssueBtn-"+ targetId +"-"+ issueIndex);
	elButton.insertAdjacentHTML("afterend", htmlIssueFeedback); 
	
	document.getElementById("btnDeleteIssueNo-"+ targetId +"-"+ issueIndex).focus();
	
}

/**
 * Delete an issue from the vallydette object.
 * @param {string} targetId - current test ID.
 * @param {string} issueIndex - index of the issue to remove into an issue array
 * @param {boolean} issueValidation - if true => run the deletion, if false => come back to the issues list
*/
deleteIssue = function (targetId, issueIndex, issueValidation) {

	if (issueValidation) {
		
		for (let i in dataVallydette.checklist.page[currentPage].items) {
			if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId) {
				dataVallydette.checklist.page[currentPage].items[i].issues.splice(issueIndex, 1);
				if (dataVallydette.checklist.page[currentPage].items[i].issues.length === 0) {
					document.getElementById("issueDisplayBtn"+ targetId).setAttribute("disabled", true);
				}
			}
		}
	
		utils.removeElement(document.getElementById("cardIssue"+targetId+"-"+ issueIndex));
		utils.putTheFocus(document.getElementById("modal" + targetId + "Title"));
		jsonUpdate();
		
	} else {
		
		utils.removeElement(document.getElementById("deleteIssueBtn-"+ targetId +"-"+ issueIndex +"-feedback"));
		document.getElementById("deleteIssueBtn-"+ targetId +"-"+ issueIndex).focus();

	}

}
