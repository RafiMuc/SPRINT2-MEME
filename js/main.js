'use strict';

function init(){
    renderImgs();
}

function renderImgs() {
    var elHtmlStr = '';
    gImgs.forEach((element) => {
        elHtmlStr += `<div class="imgDiv flex"><img src="${element.imgUrl}" onclick="onSetImgOnCanvas(this)" /></div>`
    });
    document.querySelector('.gallery-container').innerHTML = elHtmlStr;
}

function onSetImgOnCanvas(elImg){
    var elGallery = document.querySelector('.gallery-container');
    var elCanvas = document.querySelector('.meme-canvas');
    clearCanvas();
    elGallery.style.display = 'none';
    elCanvas.display = 'block';
    setImgOnCanvas(elImg);
}

function clearCanvas() {
    gCtx.clearRect(0,0,gCanvas.width, gCanvas.height);
}