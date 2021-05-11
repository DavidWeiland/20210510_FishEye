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
var myJsonPhotographers = '{"photographers":[{"name":"Mimi Keel","id":243,"city":"London","country":"UK","tags":["portrait","events","travel","animals"],"tagline":"Voir le beau dans le quotidien","price":400,"portrait":"MimiKeel.jpg"},{"name":"Ellie-Rose Wilkens","id":930,"city":"Paris","country":"France","tags":["sports","architecture"],"tagline":"Capturer des compositions complexes","price":250,"portrait":"EllieRoseWilkens.jpg"},{"name":"Tracy Galindo","id":82,"city":"Montreal","country":"Canada","tags":["art","fashion","events"],"tagline":"Photographe freelance","price": 500,"portrait":"TracyGalindo.jpg"},{"name":"Nabeel Bradford","id":527,"city":"Mexico City","country":"Mexico","tags":["travel","portrait"],"tagline":"Toujours aller de l\'avant","price":350,"portrait":"NabeelBradford.jpg"},{"name":"Rhode Dubois","id":925,"city":"Barcelona","country":"Spain","tags":["sport","fashion","events","animals"],"tagline":"Je crée des souvenirs","price":275,"portrait":"RhodeDubois.jpg"},{"name":"Marcel Nikolic","id":195,"city":"Berlin","country":"Germany","tags":["travel","architecture"],"tagline":"Toujours à la recherche de LA photo","price":300,"portrait":"MarcelNikolic.jpg"}]}';
var myNewJsonPhotographers = JSON.parse(myJsonPhotographers);

var section = document.querySelector('#section');

/*const getData = async(json)=>{
    const data =  fetch("fisheyedata.json")
    jsonPhoto= await data.json();
    return jsonPhoto;}
    */
/*var requestURL = ('https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json');
var request = new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType='json';
request.send();
request.onload = function(){
    var jsonPhotographers = request.response;*/
    vignetPhotographers(myNewJsonPhotographers);
//}

function vignetPhotographers(jsonObj) {
    var pers = jsonObj['photographers'];
  
    for (var i = 0; i < pers.length; i++) {
        var vignette = document.createElement('article');
        var imgPortrait = document.createElement('img');
        imgPortrait.setAttribute("class","vignette__photo");
        var namePers = document.createElement('h2');
        namePers.setAttribute("class","vignette__titre");
        var cityPers = document.createElement('p');
        cityPers.setAttribute("class","vignette__city");
        var taglinePers = document.createElement('p');
        taglinePers.setAttribute("class","vignette__tagline");
        var pricePers = document.createElement('p');
        pricePers.setAttribute("class","vignette__price");
        var tagPers = document.createElement('ul');
        var srcPortrait = "images/samplePhotos/photographersIdPhotos/" + pers[i].portrait;
    
        imgPortrait.setAttribute("src",srcPortrait);
        namePers.textContent = pers[i].name;
        cityPers.textContent = pers[i].city;
        taglinePers.textContent = pers[i].tagline;
        pricePers.textContent = pers[i].price + '€/jour';
  
        var tags = pers[i].tags;
        for (var j = 0; j < tags.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = "#"+tags[j];
            tagPers.appendChild(listItem);
      }
  
      
      vignette.appendChild(imgPortrait);
      vignette.appendChild(namePers);
      vignette.appendChild(cityPers);
      vignette.appendChild(taglinePers);
      vignette.appendChild(pricePers);
      vignette.appendChild(tagPers);
      
      section.appendChild(vignette);
    }
}