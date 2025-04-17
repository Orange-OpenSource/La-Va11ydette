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
	htmlModal += '<p class="text-muted">' + langVallydette.fieldRequired + '</p>';
	htmlModal += (issuesVallydette[targetIdOrigin]) ? getPredefinedIssues(targetIdOrigin) : "";
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label class="form-label" for="issueNameValue" id="issueNameValueLabel">' + langVallydette.summary + ' <span class="text-danger">*</span></label>';
	htmlModal += '<input type="text" class="form-control" id="issueNameValue" aria-labelledby="issueNameValueLabel" value="" required aria-invalid="false">';
	htmlModal += '<div id="issueNameValueError" class="alert alert-danger alert-sm d-none"><span class="alert-icon" aria-hidden="true"></span><p>' + langVallydette.summaryError + ' </p></div>';
	htmlModal += '</div>';
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label class="mt-2 form-label" for="issueDetailValue" id="issueDetailValueLabel">' + langVallydette.description + ' <span class="text-danger">*</span></label>';
	htmlModal += '<textarea class="form-control" id="issueDetailValue" aria-labelledby="issueDetailValueLabel" rows="8" required aria-invalid="false"></textarea>';
	htmlModal += '<div id="issueDetailValueError" class="alert alert-danger alert-sm d-none"><span class="alert-icon" aria-hidden="true"></span><p>' + langVallydette.descriptionError + ' </p></div>';
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

	var saveIssueBtnBtn = document.getElementById('saveIssueBtnBtn');

	saveIssueBtnBtn.addEventListener('click', function (e) {
		e.preventDefault();
		var error=0;
		var propertyName = document.getElementById("issueNameValue");
		var propertyDescription = document.getElementById("issueDetailValue");

		if(propertyDescription.value==""){
			invalidField(document.getElementById('issueDetailValueError'), propertyDescription, "issueDetailValueLabel", "issueDetailValueError")
			error++;
		}
		else{
			validField(document.getElementById('issueDetailValueError'), propertyDescription, "issueDetailValueLabel")
		}
		
		if(propertyName.value==""){

			invalidField(document.getElementById('issueNameValueError'), propertyName, "issueNameValueLabel", "issueNameValueError");
			error++;
		}
		else{
			validField(document.getElementById('issueNameValueError'), propertyName, "issueNameValueLabel")
		}

		if(error==0){
			addIssue(targetId, issueNameValue.value, issueDetailValue.value, issueSolutionValue.value, issueTechnicalSolutionValue.value);
			document.getElementById('closeIssueBtnBtn').click();
		}
		
	})
	
	
	if (document.getElementById('btnValidatePredefined')) {
		
			document.getElementById('btnValidatePredefined').addEventListener('click', function (e) {
			e.preventDefault();
			
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
	htmlEditIssue += '<p class="text-muted">' + langVallydette.fieldRequired + '</p>';
	htmlEditIssue += '<label class="form-label" for="issueNameValue-' + issueIndex + '" id="issueNameValueLabel-' + issueIndex + '"> ' + langVallydette.summary + ' <span class="text-danger">*</span></label>';
	htmlEditIssue += '<input type="text" class="form-control" id="issueNameValue-' + issueIndex + '" aria-labelledby="issueNameValueLabel-' + issueIndex + '" value="' + utils.escape_html(getIssue(targetId, 'issueTitle', issueIndex)) + '" required aria-invalid="false">';
	htmlEditIssue += '<div id="issueNameValueError-' + issueIndex + '" class="alert alert-danger alert-sm d-none"><span class="alert-icon" aria-hidden="true"></span><p>' + langVallydette.summaryError + ' </p></div>';
	htmlEditIssue += '<label class="mt-2 form-label" for="issueDetailValue-' + issueIndex + '" id="issueDetailValueLabel-'+issueIndex+'">' + langVallydette.description + ' <span class="text-danger">*</span></label>';
	htmlEditIssue += '<textarea class="form-control" id="issueDetailValue-' + issueIndex + '" aria-labelledby="issueDetailValueLabel-' + issueIndex + '" rows="8" required aria-invalid="false">' + utils.escape_html(getIssue(targetId, 'issueDetail', issueIndex)) + '</textarea>';
	htmlEditIssue += '<div id="issueDetailValueError-' + issueIndex + '" class="alert alert-danger alert-sm d-none"><span class="alert-icon" aria-hidden="true"></span><p>' + langVallydette.descriptionError + ' </p></div>';
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

	let saveIssueBtn = document.getElementById('saveIssueBtn-'+ targetId +'-'+ issueIndex );
	saveIssueBtn.addEventListener('click', function (e) {
		e.preventDefault();
		var error=0;
		var propertyName = document.getElementById('issueNameValue-' + issueIndex );
		var propertyDescription = document.getElementById('issueDetailValue-' + issueIndex );

		if(propertyDescription.value==""){
			invalidField(document.getElementById('issueDetailValueError-' + issueIndex ), propertyDescription, 'issueDetailValueLabel-' + issueIndex , 'issueDetailValueError-' + issueIndex )
			error++;
		}
		else{
			validField(document.getElementById('issueDetailValueError-' + issueIndex ), propertyDescription, 'issueDetailValueLabel-' + issueIndex )
		}
		
		if(propertyName.value==""){

			invalidField(document.getElementById('issueNameValueError-' + issueIndex ), propertyName, 'issueNameValueLabel-' + issueIndex , 'issueNameValueError-' + issueIndex );
			error++;
		}
		else{
			validField(document.getElementById('issueNameValueError-' + issueIndex ), propertyName, 'issueNameValueLabel-' + issueIndex )
		}

		if(error==0){
			saveIssue(targetId, issueIndex, document.getElementById('editIssueForm-'+ targetId +'-'+ issueIndex));
		}

	});

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
	elIssueCardHeader.innerHTML = '#' + (issueIndex+1) + ' '+ utils.escape_html(issueTitle);
	
	document.getElementById('editIssueBtn-' + targetId + '-' + issueIndex).style.display = "inline-flex";
	document.getElementById('deleteIssueBtn-' + targetId + '-' + issueIndex).style.display = "inline-flex";
	document.getElementById('closeModalIssue').disabled=false;

	document.getElementById('editIssueBtn-' + targetId + '-' + issueIndex).focus();
	
}

/**
 * Generate issue body
 * @param {string} targetId - current test ID.
 * @return {string} htmlModal - return html to issue body
*/
displayIssueBody= function(targetId){

	htmlModal="";
	
	for (let i in dataVallydette.checklist.page[currentPage].items) {
		
		if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId && dataVallydette.checklist.page[currentPage].items[i].issues.length > 0 ) {
			let auditNumber = 0;
			for (let j in dataVallydette.checklist.page[currentPage].items[i].issues) {
				auditNumber++;
				htmlModal += '<div class="accordion-item" id="cardIssue'+targetId+'-'+ j +'">';
				
				htmlModal += ' <div class="accordion-header" id="issue'+targetId+'-'+ j +'">';
				htmlModal += ' <h5 class="mb-0">';
				htmlModal += ' <button id="btnIssue'+targetId+'-'+ j +'" class="accordion-button collapsed w-100 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+targetId+'-'+j+'" aria-expanded="false" aria-controls="#collapse'+targetId+'-'+j+'">';
				htmlModal += '#' + auditNumber + ' ' + utils.escape_html(dataVallydette.checklist.page[currentPage].items[i].issues[j].issueTitle);
				htmlModal += ' </button>';
				htmlModal += '</h5>';
				htmlModal += ' </div>';

				htmlModal += ' <div id="collapse'+ targetId +'-'+ j +'" data-bs-parent="#issueList" class="accordion-collapse collapse" aria-labelledby="issue'+targetId+'-'+ j +'" >';

				htmlModal += ' <div class="accordion-body">';
				htmlModal += '   <div id="issue-body-'+ targetId +'-'+ j +'" class="px-3">';
				htmlModal +=  		utils.escape_html(dataVallydette.checklist.page[currentPage].items[i].issues[j].issueDetail);
			
				htmlModal += '  </div>';
				htmlModal += ' <button id="editIssueBtn-'+ targetId +'-'+ j +'" class="btn btn-secondary btn-sm" onClick="editIssue(\''+ targetId +'\','+ j +')">' + langVallydette.edit + '</button>';
				htmlModal += ' <button id="deleteIssueBtn-'+ targetId +'-'+ j +'" class="btn btn-secondary btn-sm" onClick="deleteConfirmationIssue(\''+ targetId +'\','+ j +')">' + langVallydette.delete + '</button>';
				
				htmlModal += '  </div>';
				htmlModal += ' </div>';
				
				htmlModal += ' </div>';
			}
		}
	}

	return htmlModal;
}

/**
 * Delete confirmation feedback
 * @param {string} targetId - current test ID
 * @param {string} issueIndex - index of the issue to remove into an issue array
*/
const deleteConfirmationIssue = (targetId, issueIndex) => {
    const feedbackId = `deleteIssueBtn-${targetId}-${issueIndex}-feedback`;
    if (document.getElementById(feedbackId)) return;

    const messageId = `deleteIssueMessage-${targetId}-${issueIndex}`;
    const noButtonId = `btnDeleteIssueNo-${targetId}-${issueIndex}`;
    const yesButtonId = `btnDeleteIssueYes-${targetId}-${issueIndex}`;

    const htmlIssueFeedback = `
        <div id="${feedbackId}">
            <p id="${messageId}" class="mt-2 mb-0">${langVallydette.issueTxt3}</p>
            <button type="button" 
                id="${noButtonId}" 
                class="btn btn-secondary btn-sm" 
                aria-labelledby="${messageId} ${noButtonId}"
                onClick="deleteIssue('${targetId}',${issueIndex}, false)">
                ${langVallydette.no}
            </button>
            <button type="button" 
                id="${yesButtonId}" 
                class="btn btn-secondary btn-sm"
                aria-labelledby="${messageId} ${yesButtonId}"
                onClick="deleteIssue('${targetId}',${issueIndex}, true)">
                ${langVallydette.yes}
            </button>
        </div>`;

    document.getElementById(`deleteIssueBtn-${targetId}-${issueIndex}`)
        .insertAdjacentHTML("afterend", htmlIssueFeedback);

    document.getElementById(noButtonId).focus();
}
	const feedbackId = "deleteIssueBtn-" + targetId + "-" + issueIndex + "-feedback";
	if (document.getElementById(feedbackId)) return

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
		utils.putTheFocus(document.getElementById("modalEditIssueTitle"));
		jsonUpdate();

		document.getElementById('issueList').innerHTML = displayIssueBody(targetId);
		
		
	} else {
		
		utils.removeElement(document.getElementById("deleteIssueBtn-"+ targetId +"-"+ issueIndex +"-feedback"));
		document.getElementById("deleteIssueBtn-"+ targetId +"-"+ issueIndex).focus();

	}

}
