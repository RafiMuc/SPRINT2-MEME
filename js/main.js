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
    clearCanvas();
    elGallery.style.display = 'none';
    setImgOnCanvas(elImg);
    elCanvas.width = window.innerWidth;
    elCanvas.height = window.innerHeight;
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
            align: document.querySelector('.txt-align').value

        }
    );
    renderTextOnCanvs();
}

function renderTextOnCanvs() {
    if (!gMeme.txts.length) return;
    gMeme.txts.forEach(txt => {
        gCtx.font = `${gCanvas.height / +txt.size}px ${txt.font}`;
        gCtx.fillStyle = txt.fillColor;
        gCtx.strokeStyle = txt.strokeColor;
        gCtx.textAlign = "center"
        gCtx.strokeText(txt.txt, (gCanvas.width - txt.txt.length) / 2, gCanvas.height / +txt.align);
        gCtx.fillText(txt.txt, (gCanvas.width - txt.txt.length) / 2, gCanvas.height / +txt.align);
    })
    console.log('gCtx width',gCtx.width); 
    console.log('gCtx height',gCtx.height); 
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