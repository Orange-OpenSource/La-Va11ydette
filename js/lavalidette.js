	document.getElementById('import').onclick = function() {
	  var files = document.getElementById('selectFiles').files;

	  var fr = new FileReader();
	  
	  fr.onload = function(e) { 
	  
		var result = JSON.parse(e.target.result);
		
		reqListener(e.target.result);
		//var formatted = JSON.stringify(result, null, 2);
		//document.getElementById('result').value = formatted;
	  }
	  
	 fr.readAsText(files.item(0));
	  //doXHR( fr.readAsText(files.item(0)));
	};


	//requette XMLHttpRequest
	function doXHR(url, callback) {
	  var oReq = new XMLHttpRequest();

	  oReq.onreadystatechange = function(event) {
		if (this.readyState === XMLHttpRequest.DONE) {
		  if (this.status === 200) {
			//return callback(null, this.responseText);
			//console.log("Réponse reçue: %s", this.responseText);
			reqListener(this.responseText);
		  } else {
			//return callback({errCode: this.status, errMsg: this.statusText});
			 console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
		  }
		}
	  };

	  oReq.open('GET', url, true);
	  oReq.send(null);
	}

	//appel des Json
	doXHR('json/tests-web-wcag.json');
	
	function reqError(err) {
	   let elrefTests = document.getElementById('refTests');
	   elrefTests.innerHTML = '<div class="alert alert-warning">Erreur chargement ressource JSON</div>';
	}
	
	function formatHeading(str){
		str = str.toLowerCase();
		str = str.replace(/é|è|ê/g,"e");
		str = str.replace(/ /g,"-");
	
		return str;
	}
	
	function slugify(str) {
		var map = {
			'-' : '\'',
			'-' : '_',
			'a' : 'á|à|ã|â|À|Á|Ã|Â',
			'e' : 'é|è|ê|É|È|Ê',
			'i' : 'í|ì|î|Í|Ì|Î',
			'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
			'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
			'c' : 'ç|Ç',
			'n' : 'ñ|Ñ'
		};
		str = str.replace(/ /g,"-");
		str = str.toLowerCase();
		
		for (var pattern in map) {
			str = str.replace(new RegExp(map[pattern],'g'), pattern);
		};

		return str;
	}
	
	//supprimer les doublons dans les filtres
	function delDoublon(arrCond, inputId){
		for (var i = 0; i < arrCond.length; i++) {
		//for (let condition of arrCond) {
			let condition = arrCond[i];
			if (condition.name == inputId) {
				let arrCondIndex = arrCond.indexOf(condition);
				arrCond.splice(arrCondIndex , 1);	
			}
		}
		return arrCond;
	}
	
function reqListener(responseFirst) {
		
	var data = JSON.parse(responseFirst);
	var currentPage = 0;
	var idPageIndex = 0;
	
	// Récupération des données
	var refTests = data.checklist.page[currentPage].items;				 
	
	var uniqueTypes = [];

	//class statut
	var statutClass = "badge-light";
	
	 //init checklist name
	var btnChecklist = document.getElementById("btnChecklistName");
	btnChecklist.addEventListener('click', function(){checklistApp.setChecklistName(btnChecklist.dataset.element)}, false);
	
	var HeadingChecklistName = document.getElementById("checklistName");
	HeadingChecklistName.innerText = data.checklist.name;
	
	var btnaddPage = document.getElementById("btnAddPage");
	btnaddPage.addEventListener('click', function(){checklistApp.addPage()}, false);
	
	var btnFirstPage = document.getElementById("pageID-0");
	btnFirstPage.addEventListener('click', function(){checklistApp.showPage("pageID-0")}, false);
	
	var btndelPage = document.getElementById("btnDelPage");
	btndelPage.addEventListener('click', function(){checklistApp.deletePage()}, false);											   
	
	let checklistApp = new function() {
	  // Récupération des données
	  //this.refTests = refTests;
	  var textContent = {
		title1 : "Procédures",
		title2 : "A vérifier",
		title3 : "Résultats",
		title4 : "Justification",
		statut1 : "conforme",
		statut2 : "non-conforme",
		statut3 : "non-applicable",
		statut4 : "non-testé"
	  };

///////////////// multipage //////////////////////	
	this.addPage = function(){
	// dupliquer
		var arr2 = JSON.parse(JSON.stringify(data.checklist.page[currentPage]));
		data.checklist.page.push(arr2);
		indexPage = data.checklist.page.length - 1;
		idPageIndex = idPageIndex + 1;
		newIdPage =  "pageID-"+idPageIndex;
		
		btnFirstPage.disabled = false;
		
		//a supprimer
		data.checklist.page[1].items[0].themes = "test page 2";
		data.checklist.page[indexPage].IDPage = newIdPage;
		data.checklist.page[indexPage].items.forEach(this.initNewPage);
		
		jsonStr = JSON.stringify(data);
		//console.log(jsonStr);
		
		//display pagination
		var pageElement = document.getElementById("pageManager");
		var newBtnPage = document.createElement("button");
		
		newBtnPage.innerHTML = "Page "+newIdPage;
		newBtnPage.setAttribute('id', newIdPage);
		pageElement.appendChild(newBtnPage);
		

		var thisNewBtn = document.getElementById(newIdPage);
		var currentIdPage = thisNewBtn.getAttribute('id');
		thisNewBtn.addEventListener('click', function(){checklistApp.showPage(currentIdPage)}, false);
	}	

	this.initNewPage = function(item) {
		item.ID = item.ID+'-p'+indexPage;
		item.resultatTest = '';
		item.commentaire = '';
	}
	
	this.showPage = function(id) {
				
		var index = data.checklist.page.findIndex(function(o) {
			return o.IDPage == id;
		})	
		
		currentPage = index;
		
		[x,y] = this.getIfFilter("types");
	
		if (x) {
			checklistApp.runFilter(y);
		} else {
			checklistApp.FetchAll(data.checklist.page[currentPage].items);
		}
		
		
	}
	
	this.deletePage = function(index) {
		data.checklist.page.splice(0,1);
	}
	
	this.getIfFilter = function(name) {
		const filters = document.querySelectorAll('[name="'+name+'"]');
		let found = false;
		let foundItem;
		filters.forEach(function(filterItem) {
		
			if(filterItem.checked) {
				found=true;
				foundItem = filterItem;
			} 

		});
		
		return [found,foundItem];
	}
	
	
///////////////// fin multipage //////////////////////	

	//on prédéfini le tableau de filtres
	var filtres = [["conforme","ok"], ["non-conforme","ko"], ["non-applicable","na"], ["non-teste","nt"]];

	  this.getStatutClass = function(lastResult) {

		if (lastResult == filtres[0][1]) {
			statutClass = "badge-success";
		} else if (lastResult == filtres[1][1]) {
			statutClass = "badge-danger";
		} else if (lastResult == filtres[2][1]) {
			statutClass = "badge-info";
		} else {
			statutClass = "badge-light";
		}
		return statutClass;
	 }

	 this.setStatutClass = function(lastResult) {

		if (lastResult == filtres[0][1]) {
			statutText = textContent.statut1;
		} else if (lastResult == filtres[1][1]) {
			statutText = textContent.statut2;
		} else if (lastResult == filtres[2][1]) {
			statutText = textContent.statut3;
		} else {
			statutText = textContent.statut4;
		}
		return statutText;
	 }

	 this.setStates = function(ele, targetId) {
		ele.parentNode.parentNode.classList.add("mystyle");
		
		for (let i in data.checklist.page[currentPage].items) {
			if (data.checklist.page[currentPage].items[i].ID == targetId) {
				lastResult = this.getStatutClass(data.checklist.page[currentPage].items[i].resultatTest);
				data.checklist.page[currentPage].items[i].resultatTest = ele.value;
			}	
		}
		
		//mise à jour de l'état du test
		testResult = document.getElementById("resultID-"+targetId+"");
		testResult.classList.remove(lastResult); 

		
		if (ele.value == filtres[0][1]) {
			testResult.innerText = textContent.statut1;
			statutClass = "badge-success";
		} else if (ele.value == filtres[1][1]) {
			testResult.innerText = textContent.statut2;
			statutClass = "badge-danger";
		} else if (ele.value == filtres[2][1]) {
			testResult.innerText = textContent.statut3;
			statutClass = "badge-info";
		} else {
			testResult.innerText = textContent.statut4;
			statutClass = "badge-light";
		}
		
		testResult.classList.add(statutClass); 
	
		//on met à jour l'export
		this.jsonUpdate();
	
	}

		this.setChecklistName = function(target) {
	
		
			<!-- Modal -->
			 let htmlModal = '';
			 htmlModal = '<div id="modalChecklistName" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle">';
			 htmlModal += '<div class="modal-dialog modal-dialog-scrollable" role="document">';
			 htmlModal += '<div class="modal-content">';
			 htmlModal += '<div class="modal-header">';
			 htmlModal += '<h5 class="modal-title" id="modalChecklistTitle">Modifier le nom de la checklist</h5>';
			 htmlModal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
			 htmlModal += '<span aria-hidden="true">&times;</span>';
			 htmlModal += '</button>';
			 htmlModal += '</div>';
			 htmlModal += '<div class="modal-body">';
			 htmlModal += '<input type="text" id="inputChecklistName" aria-labelledby="modalChecklistTitle" value="'+this.getChecklistName(target)+'">';
			 htmlModal += '</div>';
			 htmlModal += '<div class="modal-footer">';
			 htmlModal += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>';
			 htmlModal += '<button type="button" id="nameSaveBtn" data-dismiss="modal" class="btn btn-primary">Enregistrer</button>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
		
			<!-- Parent element -->
			let elModal = document.getElementById('modal');
			elModal.innerHTML = htmlModal;
			
			<!-- Event handler -->
			var nameSaveBtn = document.getElementById("nameSaveBtn");
			var name = document.getElementById("inputChecklistName");
			nameSaveBtn.addEventListener('click', function(){checklistApp.updateChecklistName(name.value, target)});

		}
	 
		this.updateChecklistName = function(name, target) {	
			if(name) {
				var currentChecklistName = document.getElementById(target);
				currentChecklistName.innerText = name;
			}
			
			//on met à jour l'export
			this.jsonUpdate();
		}
	
		this.getChecklistName = function(target) {	
				var currentChecklistName = document.getElementById(target);
				return currentChecklistName.innerText;	
		}
	
		this.jsonUpdate = function() {
			let DefaultName = document.getElementById("checklistName");
			data.checklist.name = DefaultName.innerText;	
			DefaultName = slugify(DefaultName.innerText);
	
			let dataStr = JSON.stringify(data);
			
			let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
			
			var todayDate = new Date();
			var date = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate();
			
			var todayHour = new Date();
			var time = todayHour.getHours() + ":" + todayHour.getMinutes() + ":" + todayHour.getSeconds();
	
			let exportFileDefaultName = DefaultName+'-'+date+'-'+time+'.json';
	
			linkElement = document.getElementById("export");
			linkElement.classList.remove("disabled");
			linkElement.setAttribute('href', dataUri);
			linkElement.setAttribute('download', exportFileDefaultName);
		}
	
	
		//gestion commentaires
		this.setComment = function(targetId, title) {
		
		let titleModal = title;
			
			<!-- Modal -->
			 let htmlModal = '';
			 htmlModal = '<div id="modal'+targetId+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle">';
			 htmlModal += '<div class="modal-dialog modal-dialog-scrollable" role="document">';
			 htmlModal += '<div class="modal-content">';
			 htmlModal += '<div class="modal-header">';
			 htmlModal += '<h5 class="modal-title" id="modal'+targetId+'Title">Commentaire pour : '+titleModal+'</h5>';
			 htmlModal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
			 htmlModal += '<span aria-hidden="true">&times;</span>';
			 htmlModal += '</button>';
			 htmlModal += '</div>';
			 htmlModal += '<div class="modal-body">';
			 htmlModal += '<textArea id="comment'+targetId+'" aria-labelledby="modal'+targetId+'Title">'+this.getComment(targetId)+'</textArea>';
			 htmlModal += '</div>';
			 htmlModal += '<div class="modal-footer">';
			 htmlModal += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>';
			 htmlModal += '<button type="button" id="commentSaveBtn" data-dismiss="modal" class="btn btn-primary">Enregistrer</button>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
			 htmlModal += '</div>';
 
			<!-- Parent element -->
			let elModal = document.getElementById('modal');
			elModal.innerHTML = htmlModal;

			<!-- Event handler -->
			var commentSave = document.getElementById("commentSaveBtn");
			var comment = document.getElementById('comment'+targetId);
			commentSave.addEventListener('click', function(){checklistApp.addComment(targetId, comment.value)});
			
		}
	
		this.addComment = function(targetId, newComment) {
			data.checklist.page[currentPage].items[targetId].commentaire = newComment;
			
			var currentBtnComment = document.getElementById("commentBtn"+targetId);
			currentBtnComment.innerText = this.getCommentState(targetId);
			
			//on met à jour l'export
			this.jsonUpdate();
		}	

		this.getComment = function(targetId) {
			data.checklist.page[currentPage].items[targetId].commentaire = newComment;
			return (currentComment != "" ? currentComment : "");
		}	

		this.getCommentState = function(targetId) {
			currentComment = data.checklist.page[currentPage].items[targetId].commentaire;
			return (!currentComment ? "Ajouter un commentaire" : "Modifier le commentaire");
		}	

		this.setCommentState = function(targetId) {
			var currentBtnComment = document.getElementById("commentBtn"+targetId);
			
		}	

		//fin gestion commentaires
		
	  this.UpdateTypes = function(allTypes, updatedTypes) {
		let elrefTypes = [];
		  
			for (let i in updatedTypes) {
				for (let j in updatedTypes[i].type) {
				  elrefTypes.push(updatedTypes[i].type[j]);
				}
			  }
			 let uniqueUpdatedTypes =  elrefTypes.filter(function(value, index, self) {
				return self.indexOf(value) === index; 
				});
		
			for (let i in allTypes) {	
						var elem = document.getElementById('type'+i);
						elem.disabled = true;
						var elemLabel = document.getElementById('labelType'+i);
						elemLabel.classList.add("disabled");
						
			  }	
			for (let i in allTypes) {
				for (let j in uniqueUpdatedTypes) {
				  if (allTypes[i]==uniqueUpdatedTypes[j]) {
						var elem = document.getElementById('type'+i);
						elem.disabled = false;
						var elemLabel = document.getElementById('labelType'+i);
						elemLabel.classList.remove("disabled");
				  }
				}
			  }
				
	  };
	  
	  this.UpdateFeedback = function(activeFilter, nbTests) {
		let elBtnReinit = document.getElementById('reinit');
		let elFeedback = document.getElementById('feedback');
		let htmlFeedback = '';
		if (activeFilter) {
			elBtnReinit.disabled = false;
			htmlFeedback = '<p><span><b>'+nbTests+'</b> tests dans filtres en cours</span> | <button type="button" class="btn btn-secondary btn-sm" id="reinitLink">reinitialiser</button></p>';
			elFeedback.innerHTML = htmlFeedback;
			
			let elreinitLink = document.getElementById('reinitLink');
			 elreinitLink.addEventListener('click', function() {
									
				checklistApp.runFilter();
				checklistApp.UpdateFeedback(false, refTests.length);
				
				
				//reinitialisation du filtre en cours de sélection
				var elToReinit = document.querySelector("#types input:checked");
				elToReinit.checked = false;
			 });
			 
			 
		} else {
			elBtnReinit.disabled = true;
			htmlFeedback = '<p><b>'+nbTests+'</b> tests en cours</p>';
			elFeedback.innerHTML = htmlFeedback;
		}
				
	  };
	  
	  this.FetchAll = function(currentRefTests) {
	 
		  // Selection de l'élément
		  let elrefTests = document.getElementById('refTests');
		  let htmlrefTests = '';
		  let headingTheme = '';
		
		  //on boucle dans le tableau passé en paramètre de la fonction
		  for (let i in currentRefTests) {
			if(headingTheme!=currentRefTests[i].themes){
				headingTheme=currentRefTests[i].themes;
				htmlrefTests +='<h2 id="test-'+formatHeading(currentRefTests[i].themes)+'">'+currentRefTests[i].themes+'</h2>';
			}
			
			htmlrefTests += '<article class="" id="'+currentRefTests[i].ID+'"><div class="card-header" id="heading'+i+'"><h3 class="card-title"><a class="" role="button" data-toggle="collapse" href="#collapse'+i+'" aria-expanded="false" aria-controls="collapse'+i+'"><span class="accordion-title">' + currentRefTests[i].title + '</span><span id="resultID-'+currentRefTests[i].ID+'" class="badge badge-pill '+this.getStatutClass(currentRefTests[i].resultatTest)+' float-lg-right">'+ this.setStatutClass(currentRefTests[i].resultatTest)+'</span></a></h3>';
			//à remplacer par un for sur filtres
			htmlrefTests += '<div id="testForm"><label for="conforme'+i+'">Conforme</label><input type="radio" id="conforme'+i+'" name="test'+i+'" value="ok" '+((currentRefTests[i].resultatTest == filtres[0][1]) ? "checked" : "")+'/> <label for="non-conforme'+i+'">Non conforme</label><input type="radio" id="non-conforme'+i+'" name="test'+i+'" id="radio'+i+'" value="ko" '+((currentRefTests[i].resultatTest == filtres[1][1]) ? "checked" : "")+'/>  <label for="na'+i+'">N/A</label><input type="radio" id="na'+i+'" name="test'+i+'" value="na" '+((currentRefTests[i].resultatTest == filtres[2][1]) ? "checked" : "")+'/>  <label for="nt'+i+'">Non testé</label><input type="radio" id="nt'+i+'" name="test'+i+'" value="nt" '+(((currentRefTests[i].resultatTest == filtres[3][1]) || (currentRefTests[i].resultatTest == '')) ? "checked" : "")+'/>';
			htmlrefTests += '<button type="button" id="commentBtn'+i+'" class="btn btn-secondary float-lg-right" data-toggle="modal" data-target="#modal'+i+'">'+this.getCommentState(i)+'</button></div></div>';
			htmlrefTests += '<div id="collapse'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+i+'">';
			htmlrefTests += '<div class="card-block"><div class="row">';
			htmlrefTests += '<div class="col-lg-6"><h4>'+textContent.title1+'</h4><ol>';
			for (let j in currentRefTests[i].tests) {
				htmlrefTests += '<li>' + currentRefTests[i].tests[j] + '</li> ';
			}
			htmlrefTests += '</ol></div>';
			htmlrefTests += '<div class="col-lg-6"><h4>'+textContent.title2+'</h4><ol>';
			for (let j in currentRefTests[i].verifier) {
				htmlrefTests += '<li>' +  currentRefTests[i].verifier[j] + '</li> ';
			}
			htmlrefTests += '</ol></div>';
			htmlrefTests += '</div>';
			htmlrefTests += '<div class="row">';
			htmlrefTests += '<div class="col-lg-12"><h4>'+((currentRefTests[i].profils[0] == 'Concepteur') ? textContent.title4 : textContent.title3)+'</h4><ol>';
			for (let j in currentRefTests[i].resultat) {
				htmlrefTests += '<li>' + currentRefTests[i].resultat[j] + '</li> ';
			}
			htmlrefTests += '</ol></div>';
			htmlrefTests += '</div>';
			if (currentRefTests[i].exception) {
				htmlrefTests += '<div class="row"><div class="col-lg-12" ><h4>Exceptions</h4>';
				htmlrefTests += '<p>' + currentRefTests[i].exception + '</p> ';
				htmlrefTests += '</div>';
				htmlrefTests += '</div>';
			}		
			htmlrefTests += '</div><div class="card-footer text-muted"><b>Profils : </b>';
			for (let j in currentRefTests[i].profils) {
			  htmlrefTests += currentRefTests[i].profils[j];
			  j != ((currentRefTests[i].profils).length-1) ? htmlrefTests +=',  ' : '';
			}
			htmlrefTests += '<br />'+((currentRefTests[i].type).length > 0 ? '<b>Outils : </b>' : '');
			for (let j in currentRefTests[i].type) {
			  htmlrefTests += '<i class="fa fa-tag" aria-hidden="true"></i> ' + currentRefTests[i].type[j] + ' ';
			}
			htmlrefTests += '</div>';
			htmlrefTests += '</div></article>';

		  }

			// Affichage de l'ensemble des lignes en HTML
			currentRefTests.length===0 ?  elrefTests.innerHTML = '<div class="alert alert-warning">Aucun résultat ne correspond à votre sélection</div>' : elrefTests.innerHTML = htmlrefTests;

			// Event Handler
			for (let i in currentRefTests) {
				
				//radio
				var radios = document.getElementsByName("test"+i);
				var nodeArray = [];
				for (var j = 0; j < radios.length; ++j) {
					 radios[j].addEventListener('click', function(){checklistApp.setStates(this, currentRefTests[i].ID)}, false);
				}

				//commentaires
				var comment = document.getElementById("commentBtn"+i);
				comment.addEventListener('click', function(){checklistApp.setComment(i, currentRefTests[i].title)}, false);
				
			}
			
		};
		
		
		// Retourne la liste des checkboxes
		this.DisplayFilters = function() {
		
			//debut gestion des boutons de reinitialisation
			  let elFilterFooter = document.getElementById('filter-footer');
			  let htmlFilterFooter = '';
			    
			  htmlFilterFooter += '<button id="reinit" class="btn btn-secondary" disabled>Réinitialiser</button>';
			  elFilterFooter.innerHTML = htmlFilterFooter;
			  
			  let elBtnReinit = document.getElementById('reinit');
			  
			 elBtnReinit.addEventListener('click', function() {
									
				checklistApp.runFilter();
				checklistApp.UpdateFeedback(false, refTests.length);
				
				//reinitialisation du filtre en cours de sélection
				var elToReinit = document.querySelector("#types input:checked");
				elToReinit.checked = false;
			 });
			//fin gestion des boutons de reinitialisation
			
			//debut ajout input de filtre
			  let htmlTypes = '';
			  let elTypes = document.getElementById('types');
			  elTypes.innerHTML = "";
			
			  for (let i in filtres) {
				htmlTypes = '<input type="radio" id="type' + i + '" name="types" value="' + filtres[i][1] + '"> <label for="type' + i + '" id="labelType' + i + '">' + filtres[i][0] + '</label>';
				var node = document.createElement("li");                 
				node.innerHTML = htmlTypes;               
				elTypes.appendChild(node);    

				var elRadio = document.getElementById("type"+i);
				elRadio.addEventListener('click', function(){checklistApp.runFilter(this)}, false);
				
			  }
			 //fin ajout input de filtre

		}
		
		this.runFilter = function(elRadio) {
		
					let runUpdateType = false;
					let conditions = [];
					let arrType    = [];
					if (elRadio && elRadio.checked){
						arrType = [];
						arrType.push(elRadio.value);
					}

					let indice = arrType.length;
						
					if (indice > 0) {	

						//on supprime les doublons, nécessaire pour les boutons radio
						delDoublon(conditions, elRadio.name);
					
						conditions.unshift(function(item) {
							return item.resultatTest.indexOf(arrType[0]) !== -1;
						});
						

						//on nomme la fonction, pour les checkboxes on utilise this.id
						Object.defineProperty(conditions[0], 'name', {value: elRadio.name, writable: false});	
								
						runUpdateType = false;

								
						//on applique tous les filtres stockés dans conditions
						 //filteredTest = self.refTests.filter(function(d) {
						filteredTest = data.checklist.page[currentPage].items.filter(function(d) {
							return conditions.every(function(c) {
								return c(d);
							});
						});		

						//on met à jour la page				
						checklistchecklistApp.FetchAll(filteredTest);
						
						if (runUpdateType) {
							checklistchecklistApp.UpdateTypes(uniqueTypes, filteredTest);
						}
						
						checklistchecklistApp.UpdateFeedback(true,filteredTest.length);
			
							
				 } else {
					//aucun critère de sélectionné, on réinitialise la page
					checklistchecklistApp.FetchAll(data.checklist.page[currentPage].items);
					
				 }
		}

}
	// Affichage de tous les tests
	checklistApp.FetchAll(refTests);
	// Filtrage
		
	// Affiche les checkboxes et boutons radios
	checklistApp.DisplayFilters();
	checklistApp.UpdateFeedback(false, refTests.length);
}
