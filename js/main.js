'use strict';

function init(){
    renderImgs();
}

function renderImgs() {
    var elHtmlStr = '';
    gImgs.forEach((element) => {
        elHtmlStr += `<div class="imgDiv flex"><img src="${element.imgUrl}" onclick="onSetImgOnCanvas(this)"></div>`
    });
    document.querySelector('.container').innerHTML = elHtmlStr;
}

function onSetImgOnCanvas(elImg){
    clearCanvas();
    setImgOnCanvas(elImg);
}

function clearCanvas() {
    gCtx.clearRect(0,0,gCanvas.width, gCanvas.height);
}