'use strict';

var gImgs = [
    {id: 1, imgUrl: 'img/1.jpg', kw: ['grumpy', 'politics', 'trump']},
    {id: 2, imgUrl: 'img/2.jpg', kw: ['happy', 'music']},
    {id: 3, imgUrl: 'img/3.jpg', kw: ['pets', 'dog', 'cute']},
    {id: 4, imgUrl: 'img/4.jpg', kw: ['baby', 'pets', 'dog', 'cute']},
    {id: 5, imgUrl: 'img/5.jpg', kw: ['success', 'cute']},
    {id: 6, imgUrl: 'img/6.jpg', kw: ['cat', 'pets', 'cute', 'sleep']},
    {id: 7, imgUrl: 'img/7.jpg', kw: ['expert', 'lecture']},
    {id: 8, imgUrl: 'img/8.jpg', kw: ['funny', 'movies', 'satisfied']},
    {id: 9, imgUrl: 'img/9.jpg', kw: ['funny', 'kids', 'satisfied']},
    {id: 10, imgUrl: 'img/10.jpg', kw: ['quotes', 'movies', 'sarcasm']},
    {id: 11, imgUrl: 'img/11.jpg', kw: ['kids', 'satisfied', 'dancing']},
    {id: 12, imgUrl: 'img/12.jpg', kw: ['lecture', 'quotes', 'tv']},
    {id: 13, imgUrl: 'img/13.jpg', kw: ['grumpy', 'politics', 'trump', 'lecture']},
    {id: 14, imgUrl: 'img/14.jpg', kw: ['baby', 'shock', 'cute']},
    {id: 15, imgUrl: 'img/15.jpg', kw: ['pets', 'dog', 'cute']},
    {id: 16, imgUrl: 'img/16.jpg', kw: ['funny', 'politics']},
    {id: 17, imgUrl: 'img/17.jpg', kw: ['sports', 'struggle']},
    {id: 18, imgUrl: 'img/18.jpg', kw: ['movies', 'actor', 'happy']},
    {id: 19, imgUrl: 'img/19.jpg', kw: ['shock', 'actor']},
    {id: 20, imgUrl: 'img/20.jpg', kw: ['movies', 'actor', 'quotes']},
    {id: 21, imgUrl: 'img/21.jpg', kw: ['movies', 'actor', 'quotes', 'lecture']},
    {id: 22, imgUrl: 'img/22.jpg', kw: ['tv', 'actor', 'happy']},
    {id: 23, imgUrl: 'img/23.jpg', kw: ['movies', 'actor', 'funny']},
    {id: 24, imgUrl: 'img/24.jpg', kw: ['lecture', 'politics']},
    {id: 25, imgUrl: 'img/25.jpg', kw: ['movies']},
]; 

<<<<<<< HEAD
function getImgById(id){
    var imgIdx = gImgs.findIndex(function(img){
        return id === img.id;
    })
    return gImgs[imgIdx];
}

function getImgs(){
    return gImgs;
}

//create

function filterImgByKw(kw){
    var filteredImgs = gImgs.filter(function(img){
        return img.kw.some(function(item){
            return item === kw;
        })
    })
    return filteredImgs;
}
=======
var gKeyWords = [
    'grumpy', 'politics', 'trump', 'happy', 'music',
    'pets', 'dog', 'cute', 'baby', 'success', 'cat', 
    'sleep','expert', 'lecture', 'funny', 'movies', 'satisfied',
    'kids', 'quotes', 'sarcasm', 'dancing', 'tv', 
    'shock', 'sports', 'struggle', 'actor', 'actor'
];
>>>>>>> 028054275833f79865304f3a9632838ec4fcd41d
