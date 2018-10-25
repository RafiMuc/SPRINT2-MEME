'use strict';

function init() {
    renderImgGallery('all');
    renederKwFilter();
}

function renderImgGallery(kw) {
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
    elGalleryController.style.display = 'none';
    elGallery.style.display = 'none';
    renderCanvas();
    elCanvas.style.display = 'block';
    elSaveBtn.style.display = 'inline-block';
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function renderImgOnCanvas() {
    // gCanvas.setAttribute(width, '100%');
    //TODO: calc
    // debugger;
    var img = gMeme.image;
    var imgWidth = +img.naturalWidth;
    var imgHeight = +img.naturalHeight;
    var ratio = imgHeight / imgWidth
    gCanvas.width = imgWidth;
    gCanvas.height = imgHeight;

    gCtx.drawImage(img, 0, 0, imgWidth, imgWidth * ratio);
}

function renderTextOnCanvas() {
    if (!gMeme.txts.length) return;
    gMeme.txts.forEach(txtObj => {
        // debugger
        gCtx.font = `${txtObj.size}px ${txtObj.font}`;
        // gCtx.textAlign = "center"
        gCtx.fillStyle = txtObj.fillColor;
        gCtx.strokeStyle = txtObj.strokeColor;
        var width = gCtx.measureText(txtObj.txt).width;
        var height = txtObj.size * 1.1;
        console.log('txtObj.size',txtObj.size); 
        gCtx.lineWidth = 10;
        gCtx.strokeText(txtObj.txt, txtObj.xPos, txtObj.yPos);
        gCtx.fillText(txtObj.txt, txtObj.xPos, txtObj.yPos);
        setTextBoxSize(0, width, height);
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
    renderImgGallery(elValue);
}

function onCanvasClicked(ev) {
    // console.log('offsetX', ev.offsetX);
    // console.log('offsetY', ev.offsetY);
    // savePosition(idx, ev.offsetX, ev.offsetY);
}

function renderCanvas() {
    // debugger;
    clearCanvas();
    renderImgOnCanvas();
    renderTextOnCanvas();
}


//  ****************25/10/18*******************
//IMPORTANT ---> currently idx 0 is written in each of the new functions in the html.
//need to remove and get the idx from active input or text
//need to get the active text: 
//can be done from class on input if we use multiple inputs 
//or from click on the text inside the canvas (if we manage to make it work)

function onTextEdit(value) {
    debugger;
    var idx = getMemeActiveTextIdx();
    updateMemeTxt(idx, value);
    renderCanvas();
}

function onStrokeColorChange(idx, value) {
    updateMemeStrokeColor(idx, value);
    renderCanvas();
}

function onFillColorChange(idx, value) {
    updateMemeFillColor(idx, value);
    renderCanvas();
}

function onFontChange(idx, value) {
    updateMemeFont(idx, value);
    renderCanvas();
}

function onSizeChange(idx, value) {
    updateMemeSize(idx, value);
    renderCanvas();
}
// updateMemeModel(txtIdx, elTxtVal, elStrokeColorVal, elFillColorVal, elFont, elSize);
// renderCanvas()


// function onTextPropsChange(value) {
//     console.log(value);
// }

function onRestartClicked() {
    var elGallery = document.querySelector('.gallery-container');
    var elCanvas = document.querySelector('.meme-canvas');
    var elGalleryController = document.querySelector('.gallery-controller');
    var elSaveBtn = document.querySelector('.save-meme-btn');
    elCanvas.style.display = 'none';
    elGalleryController.style.display = 'block';
    elGallery.style.display = 'flex';
    renderImgGallery('all');
    elSaveBtn.style.display = 'none';
}

function onMoveTextUp(idx) {
    moveTextUp(idx);
    renderCanvas();
}
function onMoveTextRight(idx) {
    moveTextRight(idx);
    renderCanvas();
}
function onMoveTextLeft(idx) {
    moveTextLeft(idx);
    renderCanvas();
}
function onMoveTextDown(idx) {
    moveTextDown(idx);
    renderCanvas();
}

function onSaveMeme(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-meme.jpg'
}

function handleMoveText(ev){
    var idx = getMemeActiveTextIdx();
    if (gMemeActiveTextIdx < 0) return;
    if(ev.key === 'ArrowUp') moveTextUp(idx);
    if(ev.key === 'ArrowDown') moveTextDown(idx);
    if(ev.key === 'ArrowRight') moveTextRight(idx);
    if(ev.key === 'ArrowLeft') moveTextLeft(idx);
    renderCanvas();
    console.log(ev);
}