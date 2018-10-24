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
    createMeme(id);
    var elGallery = document.querySelector('.gallery-container');
    var elCanvas = document.querySelector('.meme-canvas');
    var elGalleryController = document.querySelector('.gallery-controller');
    clearCanvas();
    elGalleryController.style.display = 'none';
    elGallery.style.display = 'none';
    setImgOnCanvas(elImg);
    elCanvas.style.display = 'block';
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onAddMemeBtn() {
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

function renderTextOnCanvs() {
    if (!gMeme.txts.length) return;
    gMeme.txts.forEach(txtObj => {
        gCtx.font = `${gCanvas.height / +txtObj.size}px ${txtObj.font}`;
        gCtx.fillStyle = txtObj.fillColor;
        gCtx.strokeStyle = txtObj.strokeColor;
        gCtx.textAlign = "center"
        txtObj.width = gCtx.measureText(txtObj.txt).width;
        gCtx.strokeText(txtObj.txt, (gCanvas.width - txtObj.width) / 2, gCanvas.height / +txtObj.align);
        gCtx.fillText(txtObj.txt, (gCanvas.width - txtObj.width) / 2, gCanvas.height / +txtObj.align);
        if (!txtObj.xPos) addTextPosition(txtObj);
        console.log('xPos:',txtObj.xPos); 
        console.log('yPos:',txtObj.yPos); 
        console.log('width:',txtObj.width); 
        console.log('height:',txtObj.height); 
    })
}

function addTextPosition(obj){
    obj.xPos = (gCanvas.width - obj.width) / 2;
    obj.yPos = gCanvas.height / +obj.align;
    obj.height = (gCanvas.height / obj.size) * 1.5;
}

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