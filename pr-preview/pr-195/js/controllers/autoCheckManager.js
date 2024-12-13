/**
 * Add or remove a test from the autocheckIDs array (depending if the checkbox is checked or not)
 * @param {object} e - autocheck input checkbox
 * @param {string} testIDorigin - test ID property from dataVa11ydette
 * @param {string} testID - current test ID property from dataVa11ydette
 */
function setAutoCheckID(e, testIDorigin, testID) {
    if (e.checked) {
        var myModal = new boosted.Modal(document.getElementById('modalAutoCheck'))
        myModal.show();
        allPageAutoCheckModal();
        let allPageButton = document.getElementById('YesBtn');
        let nextPageButton = document.getElementById('NoBtn');

        allPageButton.addEventListener('click', (event) => {
            for (let i = currentPage;i<dataVallydette.checklist.page.length;i++){
                applyAutoCheck(i, testIDorigin)
            }
            myModal.hide();
        });

        nextPageButton.addEventListener('click', (event) => {

            applyAutoCheck(currentPage, testIDorigin)
            

            if (document.getElementById('link-' + testID) !== null) {
                document.getElementById('link-' + testID).remove();
            }
            myModal.hide();
        });


    } else {
        if ((currentPage != dataVallydette.checklist.page.length - 1)) {
            if (dataVallydette.checklist.page[currentPage].autoCheckIDs.length > 0) {
                let critereLink = true;
                let pageNumber = currentPage;
                while (critereLink) {
                    if (dataVallydette.checklist.page[pageNumber].autoCheckIDs.indexOf(testIDorigin) == -1) {
                        critereLink = false;
                    }

                    if (pageNumber == dataVallydette.checklist.page.length - 1) {
                        critereLink = false;
                    }

                    dataVallydette.checklist.page[pageNumber].autoCheckIDs = dataVallydette.checklist.page[pageNumber].autoCheckIDs.filter(item => item !== testIDorigin);
                    pageNumber++;
                }
            }
        } else {
            dataVallydette.checklist.page[currentPage].autoCheckIDs = dataVallydette.checklist.page[currentPage].autoCheckIDs.filter(item => item !== testIDorigin);
        }
    }

}

function getIfAutoCheck(currentIDorigin, previewPage = 0) {

    let autoUpdateResult = false;
    if (previewPage < 0) {
        return autoUpdateResult;
    }
    if (dataVallydette.checklist.page[previewPage].autoCheckIDs) {
        const autoUpdate = dataVallydette.checklist.page[previewPage].autoCheckIDs.filter(a => a === currentIDorigin);
        if (autoUpdate.length > 0) {
            autoUpdateResult = true;
        }
    }
    return autoUpdateResult;

}

function applyAutoCheck(currentPage, testIDorigin){

    if (!dataVallydette.checklist.page[currentPage].autoCheckIDs) {
        dataVallydette.checklist.page[currentPage].autoCheckIDs = [];
    }
    dataVallydette.checklist.page[currentPage].autoCheckIDs.push(testIDorigin);

    if ((currentPage != dataVallydette.checklist.page.length - 1)) {
        nextPage = dataVallydette.checklist.page[(currentPage + 1)].items.find(e => e.IDorigin == testIDorigin);
        currentPageTab = dataVallydette.checklist.page[currentPage].items.find(e => e.IDorigin == testIDorigin);
        nextPage.resultatTest = currentPageTab.resultatTest;
        nextPage.issues = nextPage.issues.concat(currentPageTab.issues);
    }

}

function allPageAutoCheckModal() {
    let htmlModal = '';
    htmlModal += '<div class="modal-dialog modal-lg " role="document">';
    htmlModal += '<div class="modal-content">';
    htmlModal += '<div class="modal-header">';
    htmlModal += '<h5 class="modal-title" id="modalAutoCheckTitle">' + langVallydette.autocheckModalTitle + '</h5>';
    htmlModal += '</div>';
    htmlModal += '<div class="modal-body">';
    htmlModal += '<p>' + langVallydette.autocheckModalTxt + '</p>'
    htmlModal += '<p>' + langVallydette.autocheckModalTxt2 + '</p>'
    htmlModal += '</div>';

    htmlModal += '<div class="modal-footer">';
    htmlModal += '<button type="button" id="YesBtn" class="btn btn-primary" >' + langVallydette.yes + '</button>';
    htmlModal += '<button type="button" id="NoBtn" class="btn btn-secondary">' + langVallydette.no + '</button>';
    htmlModal += '</div>';
    htmlModal += '</div></div>';

    let elModal = document.getElementById('modalAutoCheck');
    elModal.innerHTML = htmlModal;
}