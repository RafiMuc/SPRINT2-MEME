'use strict';

function init() {
    renderImgs('all');
    renederKwFilter();
}

function renderImgs(kw) {
    var imgs = filterImgByKw(kw);
    var elHtmlStr = '';
    imgs.forEach((element) => {
        elHtmlStr += `<div class="imgDiv flex"><img src="${element.imgUrl}" onclick="onSetImgOnCanvas(this, ${element.id})" /></div>`
    });
    document.querySelector('.gallery-container').innerHTML = elHtmlStr;
}

function onSetImgOnCanvas(elImg, id) {
    setMeme(id, elImg);
    var elGallery = document.querySelector('.gallery-container');
    var elCanvas = document.querySelector('.meme-canvas');
    var elGalleryController = document.querySelector('.gallery-controller');
    var elSaveBtn = document.querySelector('.save-meme-btn');
    clearCanvas();
    elGalleryController.style.display = 'none';
    elGallery.style.display = 'none';
    renderImgOnCanvas(elImg);
    elCanvas.style.display = 'block';
    elSaveBtn.style.display='block';
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function renderTextOnCanvs() {
    if (!gMeme.txts.length) return;
    gMeme.txts.forEach(txtObj => {
        // debugger
        gCtx.font = `${gCanvas.height / +txtObj.size}px ${txtObj.font}`;
        gCtx.textAlign = "center"
        gCtx.fillStyle = txtObj.fillColor;
        gCtx.strokeStyle = txtObj.strokeColor;
        var width = gCtx.measureText(txtObj.txt).width;
        gCtx.strokeText(txtObj.txt, gCanvas.width/ 2, gCanvas.height / +txtObj.align);
        gCtx.fillText(txtObj.txt, gCanvas.width / 2, gCanvas.height / +txtObj.align);
        // if (!txtObj.xPos) addTextPosition(txtObj);
    })
}

// function addTextPosition(objdd){
//     objdd.xPos = ((gCanvas.width - objdd.width) / 2);
//     objdd.yPos = gCanvas.height / +objdd.align;
//     objdd.height = (gCanvas.height / objdd.size) * 1.5;
// }

function renederKwFilter() {
    var elImgFilter = document.querySelector('.img-filter')
    var strHtmls = '';
    gKeyWords.forEach(function (kw) {
        strHtmls += `<option value='${kw}'>${kw}</option>`
    })
    elImgFilter.innerHTML = strHtmls;
}

function onSetKwFilter(elValue) {
    renderImgs(elValue);
}

function onCanvasClicked(ev) {
    console.log('Canvas clicked', ev);

}

function onFooterChange() {
    clearCanvas();
    renderImgOnCanvas(gMeme.image);
    addTextToMeme(
        {
            txt: document.querySelector('.txt').value,
            fillColor: document.querySelector('.fill-color').value,
            strokeColor: document.querySelector('.stroke-color').value,
            font: document.querySelector('.txt-font').value,
            size: document.querySelector('.txt-size').value,
            align: document.querySelector('.txt-align').value,
            
        }
    );
    renderTextOnCanvs();
}

function onRestartClicked(){
    var elGallery = document.querySelector('.gallery-container');
    var elCanvas = document.querySelector('.meme-canvas');
    var elGalleryController = document.querySelector('.gallery-controller');
    elCanvas.style.display = 'none';
    elGalleryController.style.display = 'block';
    elGallery.style.display = 'flex';
    renderImgs('all');
    elSaveBtn.style.display='none';
}