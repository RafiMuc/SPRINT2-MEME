'use strict';

function init() {
    createBasicText();
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
    document.querySelector('.restart-btn').style.display = 'none';
}

function handleCreateRandomMeme() {
    createRandomMeme();
    renderVirtualImg();
}

function renderVirtualImg() {
    var imgId = gMeme.id;
    var imgHtml = `<img src="img/${imgId}.jpg" onload="onSetImgOnCanvas(this, ${imgId})" />`
    document.querySelector('.virtual-gallery').innerHTML = imgHtml;
    document.querySelector('.restart-btn').style.display = 'none';
}

function onSetImgOnCanvas(elImg, id) {
    setMeme(id, elImg);
    var elGallery = document.querySelector('.gallery-container');
    var elCanvas = document.querySelector('.meme-canvas');
    var elGalleryController = document.querySelector('.gallery-controller');
    var elSaveBtn = document.querySelector('.save-meme-btn');
    var elRestartBtn = document.querySelector('.restart-btn');
    elGalleryController.style.display = 'none';
    elGallery.style.display = 'none';
    renderCanvas();
    renderCanvasControls(0);
    elCanvas.style.display = 'block';
    elSaveBtn.style.display = 'inline-block';
    elRestartBtn.style.display = 'inline-block';
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function renderImgOnCanvas() {
    var img = gMeme.image;
    var imgWidth = +img.naturalWidth;
    var imgHeight = +img.naturalHeight;
    var ratio = imgHeight / imgWidth
    gCanvas.width = imgWidth;
    gCanvas.height = imgHeight;

    if (imgWidth > 500) imgWidth = 500;
    if (window.innerWidth < imgWidth) imgWidth = window.innerWidth * 0.9;
    var elCanContain = document.querySelector('.meme-canvas');
    elCanContain.style.width = imgWidth;

    gCanvas.width = imgWidth;
    gCanvas.height = imgWidth * ratio;
    gCtx.drawImage(img, 0, 0, imgWidth, imgWidth * ratio);
}

function renderTextOnCanvas() {
    if (!gMeme.txts.length) return;
    gMeme.txts.forEach((txtObj, i) => {
        gCtx.font = `${txtObj.size}px ${txtObj.font}`;
        gCtx.fillStyle = txtObj.fillColor;
        gCtx.strokeStyle = txtObj.strokeColor;
        var width = gCtx.measureText(txtObj.txt).width;
        var height = txtObj.size * 0.7;
        gCtx.lineWidth = 10;
        gCtx.strokeText(txtObj.txt, txtObj.xPos, txtObj.yPos);
        gCtx.fillText(txtObj.txt, txtObj.xPos, txtObj.yPos);
        setTextBoxSize(i, width, height);
    })
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
    renderImgGallery(elValue);
}

function onCanvasClicked(evt) {
    gMouseDown = true;
    var rect = gCanvas.getBoundingClientRect();
    let x = evt.clientX - rect.left
    let y = evt.clientY - rect.top

    var idx = getClickedMemeIdx(x, y);
    renderCanvasControls(idx);

}

function renderCanvasControls(idx) {
    var txt = gMeme.txts[idx];
    document.querySelector('.txt').value = txt.txt;
    document.querySelector('.fill-color').value = txt.fillColor;
    document.querySelector('.stroke-color').value = txt.strokeColor;
    document.querySelector('.txt-font').value = txt.font;
    document.querySelector('.txt-size').value = txt.size;
}

function renderCanvas() {
    clearCanvas();
    renderImgOnCanvas();
    renderTextOnCanvas();
    document.querySelector('.txt').focus();
}


function onTextEdit(value) {
    var idx = getMemeActiveTextIdx();
    updateMemeTxt(idx, value);
    renderCanvas();
}

function onStrokeColorChange(value) {
    var idx = getMemeActiveTextIdx();
    updateMemeStrokeColor(idx, value);
    renderCanvas();
}

function onFillColorChange(value) {
    var idx = getMemeActiveTextIdx();
    updateMemeFillColor(idx, value);
    renderCanvas();
}

function onFontChange(value) {
    var idx = getMemeActiveTextIdx();
    updateMemeFont(idx, value);
    renderCanvas();
}

function onSizeChange(value) {
    var idx = getMemeActiveTextIdx();
    updateMemeSize(idx, value);
    renderCanvas();
}


function onRestartClicked() {
    var elGallery = document.querySelector('.gallery-container');
    var elCanvas = document.querySelector('.meme-canvas');
    var elGalleryController = document.querySelector('.gallery-controller');
    var elSaveBtn = document.querySelector('.save-meme-btn');
    resetModel();
    elCanvas.style.display = 'none';
    elGalleryController.style.display = 'block';
    elGallery.style.display = 'flex';
    init();
    elSaveBtn.style.display = 'none';
}

// function onMoveTextUp() {
//     var idx = getMemeActiveTextIdx();
//     moveTextUp(idx);
//     renderCanvas();
// }
// function onMoveTextRight() {
//     var idx = getMemeActiveTextIdx();
//     moveTextRight(idx);
//     renderCanvas();
// }
// function onMoveTextLeft() {
//     var idx = getMemeActiveTextIdx();
//     moveTextLeft(idx);
//     renderCanvas();
// }
// function onMoveTextDown() {
//     var idx = getMemeActiveTextIdx();
//     moveTextDown(idx);
//     renderCanvas();
// }

function onMoveText(val) {
    var idx = getMemeActiveTextIdx();
    if (val === 'up') moveTextUp(idx);
    if (val === 'down') moveTextDown(idx);
    if (val === 'right') moveTextRight(idx);
    if (val === 'left') moveTextLeft(idx);
    renderCanvas();
}

function onSaveMeme(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-meme.jpg'
}

function handleMoveText(ev) {
    var idx = getMemeActiveTextIdx();
    if (gMemeActiveTextIdx < 0) return;
    if (ev.key === 'ArrowUp') moveTextUp(idx);
    if (ev.key === 'ArrowDown') moveTextDown(idx);
    if (ev.key === 'ArrowRight') moveTextRight(idx);
    if (ev.key === 'ArrowLeft') moveTextLeft(idx);
    if (ev.key === 'Enter') handleAddText();
    renderCanvas();
}


function handleAddText() {
    createBasicText();
    renderCanvasControls(gMemeActiveTextIdx);
    renderCanvas();

}

function handleDeleteText() {
    var idx = getMemeActiveTextIdx();
    deleteTextFromMeme(idx);
    document.querySelector('.txt').value = '';
    renderCanvas();
}

function onMouseUp() {
    mouseStateToggle();
}

function dragText(ev) {
    if (!gMeme.txts.length || !gMouseDown) return;
    var rect = gCanvas.getBoundingClientRect();
    var coorX = ev.clientX - rect.left;
    var coorY = ev.clientY - rect.top;
    var txt = gMeme.txts[gMemeActiveTextIdx];
    txt.xPos = coorX;
    txt.yPos = coorY;
    renderCanvas();
}

function onFileChoose(el) {
    renderImage(el.files[0]);
}

function renderImage(file) {

    // generate a new FileReader object
    var imgId = gMeme.id;
    var reader = new FileReader();

    // inject an image with the src url
    reader.onload = function (event) {
        let imgUrl = event.target.result;
        var imgHtml = `<img src="${imgUrl}" onload="onSetImgOnCanvas(this, ${imgId})" />`
        document.querySelector('.virtual-gallery').innerHTML = imgHtml;
        document.querySelector('.restart-btn').style.display = 'none';
    }
    
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(file);
}
