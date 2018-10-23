'use strict';

function init(){
    renderImgs();
}

function renderImgs() {
    var elHtmlStr = '';
    gImgs.forEach((element) => {
        elHtmlStr += `<div class="imgDiv flex"><img src="${element.imgUrl}" alt=""></img></div>`
    });
    document.querySelector('.container').innerHTML = elHtmlStr;
}
