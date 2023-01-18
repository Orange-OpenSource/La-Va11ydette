document.addEventListener('DOMContentLoaded', function () {
    initSummaryMenu();
}, false);

/**
 *  init the anchor menu
 */
function initSummaryMenu() {
    let menuHTML='<ul class="nav flex-column">';
    
    
    let level=3;
     document.querySelectorAll("h3, h4, h5").forEach((heading,index) =>{
        let headingLevel = heading.tagName.slice(1)
        if(headingLevel>level){
            menuHTML+='<ul>';
        }
        else if(index!=0){
            menuHTML+='</li>';
        }

        if(headingLevel<level){
            let differenceLevel=level-headingLevel;
            for (i=0;i<differenceLevel;i++){
                menuHTML+='</ul></li>';
            }
        }
        menuHTML+='<li class="nav-item  px-1 position-relative"><a href="#'+heading.id+'" class="nav-link fs-7">'+heading.textContent+'</a>';

        level=headingLevel;


     })
     menuHTML+='</ul>';
     document.getElementById('tableOfContents').innerHTML = menuHTML;
}