/**
 * Groups manager
 * Actually 'groups' are : captcha, form, multimedia, mobile
 * Each group own multiple tests.
 * If a group is disabled by the user, then all of his tests are passed to N/A.
 */
 
 
 /**
 * Initialization of group markup.
 */
  function initGroups() {
	
	if (Object.keys(dataVallydette.checklist.page[currentPage].groups).length !== 0) {
		htmlgroups = '';
		htmlgroups = '<h6>' + langVallydette.groupHeading + '</h6>';
		htmlgroups += '<ul class="list-inline m-0">';
		for (var themeItem in dataVallydette.checklist.page[currentPage].groups)  {
			htmlgroups += '<li class="form-check form-check-inline mb-0"><input type="checkbox"  class="form-check-input"  id="' + themeItem + '" value="' + themeItem + '" name="' + themeItem + '" ' + (dataVallydette.checklist.page[currentPage].groups[themeItem].checked ? "checked" : "") + '/><label for="' + themeItem + '" class="form-check-label">' + themeItem + '</label></li>';
		};
		htmlgroups += '</ul>';
		
		htlmgroupsMarker = document.getElementById("themeManager");
		htlmgroupsMarker.innerHTML = htmlgroups;
   	}
}

 /**
	* Get the groups checkboxes value from a page edition form, to determine if a group has been updated or not.
	* If true, then applyGroups is launched.
 */
function getGroups() {
	
	themeIsUpdated = false;
	themeUpdatedArray=[];
	
	for (var themeItem in dataVallydette.checklist.page[currentPage].groups) {
		
		if (document.getElementById(themeItem).checked !== dataVallydette.checklist.page[currentPage].groups[themeItem].checked) {
			themeIsUpdated = true;
			dataVallydette.checklist.page[currentPage].groups[themeItem].checked = document.getElementById(themeItem).checked;
			themeUpdatedArray.push(dataVallydette.checklist.page[currentPage].groups[themeItem]);
		
		}
	}
	if (themeIsUpdated) {
		applyGroups(themeUpdatedArray);
	}
	
}

 /**
	* Update the tests value from current groups selection
	*	@param {Array} themeUpdatedArray - global var that contains the current page index.
 */
function applyGroups( themeUpdatedArray ) {
	
	var radioToUpdate;
	var testValue;
	var findTest;
	themeUpdatedArray.forEach(theme=>{
		theme.idTests.forEach(test => {
			findTest = dataVallydette.checklist.page[currentPage].items.find(o => o.IDorigin === test);
			const radioButtons = document.getElementsByName("test-"+findTest.ID);
					
					if (findTest.resultatTest === "nt" || findTest.resultatTest === "na") {
					
						if (theme.checked) {
			
							testValue = "nt";
							
							radioButtons.forEach(function(button) {
								button.disabled=false;
								button.classList.remove("disabled");
							});
						
						} else {
						
							testValue = "na";
		
							radioButtons.forEach(function(button) {
								button.disabled=true;
								button.classList.add("disabled");
							});
													
						}
							
						 /** testing if not null in case of an activated filter */
						radioToUpdate = document.getElementById(testValue+"-"+findTest.ID);
					
					
						if (radioToUpdate!==null) {
							radioToUpdate.checked = true;
							setStatusAndResults(radioToUpdate, findTest.ID, findTest.IDorigin);
						} else {
							findTest.resultatTest = testValue;
						}
					
					}

		});
		
	})

	
		
	
}


 /**
	* If a theme is unchecked then we applied a disabled style to the entire tests on the frontend component
 */
function applyDisabledGroups() {
		
	for (var themeItem in dataVallydette.checklist.page[currentPage].groups) {
		
		if (!dataVallydette.checklist.page[currentPage].groups[themeItem].checked) {
	
			dataVallydette.checklist.page[currentPage].groups[themeItem].idTests.map(function(themeIdTest) {
			
				dataVallydette.checklist.page[currentPage].items.map(function(itemTest, index) {
					
					if (themeIdTest === itemTest.IDorigin) {
						
						const radioButtons = document.getElementsByName("test-"+itemTest.ID);
						
						if (!dataVallydette.checklist.page[currentPage].groups[themeItem].checked) {

							radioButtons.forEach(function(button) {
								button.disabled=true;
								button.classList.add("disabled");
							});
													
						}
						
						return true;
				
					}
					
					return false;
					
				});
			
			});
									
		}
		
	}
	
}