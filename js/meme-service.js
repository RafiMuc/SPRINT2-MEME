'use strict';
var gMouseDown = false;

var gImgs = [
    { id: 1, imgUrl: 'img/1.jpg', kw: ['grumpy', 'politics', 'trump'] },
    { id: 2, imgUrl: 'img/2.jpg', kw: ['happy', 'music'] },
    { id: 3, imgUrl: 'img/3.jpg', kw: ['pets', 'dog', 'cute'] },
    { id: 4, imgUrl: 'img/4.jpg', kw: ['baby', 'pets', 'dog', 'cute'] },
    { id: 5, imgUrl: 'img/5.jpg', kw: ['success', 'cute'] },
    { id: 6, imgUrl: 'img/6.jpg', kw: ['cat', 'pets', 'cute', 'sleep'] },
    { id: 7, imgUrl: 'img/7.jpg', kw: ['expert', 'lecture'] },
    { id: 8, imgUrl: 'img/8.jpg', kw: ['funny', 'movies', 'satisfied'] },
    { id: 9, imgUrl: 'img/9.jpg', kw: ['funny', 'kids', 'satisfied'] },
    { id: 10, imgUrl: 'img/10.jpg', kw: ['quotes', 'movies', 'sarcasm'] },
    { id: 11, imgUrl: 'img/11.jpg', kw: ['kids', 'satisfied', 'dancing'] },
    { id: 12, imgUrl: 'img/12.jpg', kw: ['lecture', 'quotes', 'tv'] },
    { id: 13, imgUrl: 'img/13.jpg', kw: ['grumpy', 'politics', 'trump', 'lecture'] },
    { id: 14, imgUrl: 'img/14.jpg', kw: ['baby', 'shock', 'cute'] },
    { id: 15, imgUrl: 'img/15.jpg', kw: ['pets', 'dog', 'cute'] },
    { id: 16, imgUrl: 'img/16.jpg', kw: ['funny', 'politics'] },
    { id: 17, imgUrl: 'img/17.jpg', kw: ['sports', 'struggle'] },
    { id: 18, imgUrl: 'img/18.jpg', kw: ['movies', 'actor', 'happy'] },
    { id: 19, imgUrl: 'img/19.jpg', kw: ['shock', 'actor'] },
    { id: 20, imgUrl: 'img/20.jpg', kw: ['movies', 'actor', 'quotes'] },
    { id: 21, imgUrl: 'img/21.jpg', kw: ['movies', 'actor', 'quotes', 'lecture'] },
    { id: 22, imgUrl: 'img/22.jpg', kw: ['tv', 'actor', 'happy'] },
    { id: 23, imgUrl: 'img/23.jpg', kw: ['movies', 'actor', 'funny'] },
    { id: 24, imgUrl: 'img/24.jpg', kw: ['lecture', 'politics'] },
    { id: 25, imgUrl: 'img/25.jpg', kw: ['movies'] },
];

var gRandomLines = ['Hello World', 'No Pain No Gain', 'CSS?', 'OMG', 'LOL'];

var gMemeActiveTextIdx = -1;
var gCanvas = document.querySelector('canvas');
var gCtx = gCanvas.getContext('2d');

var gMeme = {
    id: 0,
    image: '',
    txts: []
}

function getImgById(id) {
    var imgIdx = gImgs.findIndex(function (img) {
        return id === img.id;
    })
    return gImgs[imgIdx];
}

function getImgs() {
    return gImgs;
}

function getMemeActiveTextIdx() {
    return gMemeActiveTextIdx;
}

function filterImgByKw(kw) {
    if (kw === 'all') return gImgs;
    var filteredImgs = gImgs.filter(function (img) {
        return img.kw.some(function (item) {
            return item === kw;
        })
    })
    return filteredImgs;
}
var gKeyWords = [
    'all', 'grumpy', 'politics', 'trump', 'happy', 'music',
    'pets', 'dog', 'cute', 'baby', 'success', 'cat',
    'sleep', 'expert', 'lecture', 'funny', 'movies', 'satisfied',
    'kids', 'quotes', 'sarcasm', 'dancing', 'tv',
    'shock', 'sports', 'struggle', 'actor'
];



function setMeme(id, image) {
    gMeme.id = id;
    gMeme.image = image;
}

function createRandomMeme() {
    var tempRandLines = [];
    gRandomLines.forEach(function (line) {
        tempRandLines.push(line);
    })
    var randNum25 = getRandomInt(25);
    gMeme.id = randNum25;
    createBasicText();
    var randNum1 = getRandomInt(tempRandLines.length);
    gMeme.txts[0].txt = tempRandLines[randNum1];
    tempRandLines.splice(randNum1, 1);
    var randNum2 = getRandomInt(tempRandLines.length);
    gMeme.txts[1].txt = tempRandLines[randNum2];
    gMeme.txts[1].yPos = 400;
}

function createBasicText() {
    var memeTxt = {
        txt: '',
        strokeColor: '#000000',
        fillColor: '#ffffff',
        font: 'impact',
        size: 50,
        width: 0,
        xPos: 100,
        yPos: 70 * (1 + gMeme.txts.length),
        height: 13.5
    }
    gMeme.txts.push(memeTxt);
    gMemeActiveTextIdx = gMeme.txts.length - 1;
}


function updateMemeTxt(idx, txt) {
    gMeme.txts[idx].txt = txt
}
function updateMemeStrokeColor(idx, strokeColor) {
    gMeme.txts[idx].strokeColor = strokeColor
}
function updateMemeFillColor(idx, fillColor) {
    gMeme.txts[idx].fillColor = fillColor
}
function updateMemeFont(idx, font) {
    gMeme.txts[idx].font = font
}
function updateMemeSize(idx, size) {
    gMeme.txts[idx].size = size
}
function moveTextUp(idx) {
    gMeme.txts[idx].yPos -= 20;
}
function moveTextRight(idx) {
    gMeme.txts[idx].xPos += 20;
}
function moveTextLeft(idx) {
    gMeme.txts[idx].xPos -= 20;
}
function moveTextDown(idx) {
    gMeme.txts[idx].yPos += 20;
}
function setTextBoxSize(idx, w, h) {
    gMeme.txts[idx].width = w;
    gMeme.txts[idx].height = h;
}

// Save new position after dragging text
// function setNewPosition(idx, x, y) {
//     gMeme.txts[idx].xPos = x;
//     gMeme.txts[idx].yPos = y;
// }

function deleteTextFromMeme(idx) {
    gMeme.txts.splice(idx, 1);
    if (gMeme.txts.length === 0) createBasicText();
    gMemeActiveTextIdx = gMeme.txts.length - 1;
}

function getClickedMemeIdx(clickedX, clickedY) {
    var idx = gMeme.txts.findIndex(function (txt) {
        return isClickedOnMeme(clickedX, clickedY, txt)
    })
    if (idx === -1) idx = gMemeActiveTextIdx;
    else gMemeActiveTextIdx = idx;
    return idx;
}

function isClickedOnMeme(clickedX, clickedY, txt) {
    if (clickedX < txt.xPos) return false;
    if (clickedX > txt.xPos +
        txt.width) return false;
    if (clickedY < txt.yPos -
        txt.height) return false;
    if (clickedY > txt.yPos) return false;
    return true;
}

function resetModel() {
    gMeme = {
        id: 0,
        image: '',
        txts: []
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function mouseStateToggle() {
    return gMouseDown = !gMouseDown;
}
