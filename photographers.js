/*const getData = async(json)=>{
    const data =  fetch("fisheyedata.json")
    json= await data.json();
    return json;}

    
class photographers{
    constructor(name, id, city, country, tags, tagline, price, portrait){
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }
}*/
/*
var header = document.querySelector('#header');
var section = document.querySelector('#section');

var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
var request = new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType='json';
request.send();
request.onload = function(){
    var superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
}

function populateHeader(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['squadName'];
    header.appendChild(myH1);
  
    var myPara = document.createElement('p');
    myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + jsonObj['formed'];
    header.appendChild(myPara);
}

function showHeroes(jsonObj) {
    var heroes = jsonObj['members'];
  
    for (var i = 0; i < heroes.length; i++) {
      var myArticle = document.createElement('article');
      var myH2 = document.createElement('h2');
      var myPara1 = document.createElement('p');
      var myPara2 = document.createElement('p');
      var myPara3 = document.createElement('p');
      var myList = document.createElement('ul');
  
      myH2.textContent = heroes[i].name;
      myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
      myPara2.textContent = 'Age: ' + heroes[i].age;
      myPara3.textContent = 'Superpowers:';
  
      var superPowers = heroes[i].powers;
      for (var j = 0; j < superPowers.length; j++) {
        var listItem = document.createElement('li');
        listItem.textContent = superPowers[j];
        myList.appendChild(listItem);
      }
  
      myArticle.appendChild(myH2);
      myArticle.appendChild(myPara1);
      myArticle.appendChild(myPara2);
      myArticle.appendChild(myPara3);
      myArticle.appendChild(myList);

      section.appendChild(myArticle);
    }
}
*/
var section = document.querySelector('#section');

/*const getData = async(json)=>{
    const data =  fetch("fisheyedata.json")
    jsonPhoto= await data.json();
    return jsonPhoto;}
    */
var requestURL = 'file://FishEyeData.json';
var request = new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType='json';
request.send();
request.onload = function(){
    var jsonPhotographers = request.response;
    vignetPhotographers(jsonPhotographers);
}

function vignetPhotographers(jsonObj) {
    var pers = jsonObj['photographers'];
  
    for (var i = 0; i < heroes.length; i++) {
      var myArticle = document.createElement('article');
      var myH2 = document.createElement('h2');
      var myPara1 = document.createElement('p');
      var myPara2 = document.createElement('p');
      var myPara3 = document.createElement('p');
      var myList = document.createElement('ul');
  
      myH2.textContent = pers[i].name;
      myPara1.textContent = 'id: ' + pers[i].id;
      myPara2.textContent = 'city: ' + pers[i].city;
      myPara3.textContent = '';
  
      var tags = pers[i].tags;
      for (var j = 0; j < tags.length; j++) {
        var listItem = document.createElement('li');
        listItem.textContent = tags[j];
        myList.appendChild(listItem);
      }
  
      myArticle.appendChild(myH2);
      myArticle.appendChild(myPara1);
      myArticle.appendChild(myPara2);
      myArticle.appendChild(myPara3);
      myArticle.appendChild(myList);
      
      section.appendChild(myArticle);
    }
}