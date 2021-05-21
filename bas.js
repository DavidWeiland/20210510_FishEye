//source externe et stockage local
fetch("fisheyedata.json")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(data){
        var myJsonStringify = JSON.stringify(data)
        localStorage.setItem("lStorage", myJsonStringify)
    })
    .catch(function(err){
        console.log(err);
    });
const myJson = localStorage.getItem("lStorage");
const myJsonParse = JSON.parse(myJson);

//Index : photographers sur page index avec source ext
const section = document.querySelector('#section');
const sectionPhotographe = document.querySelector('#sectionPhotographe');
const nav = document.querySelector('.nav');
const h1 = document.querySelector('h1');

//constructeur vignette Photographers
function Photographers(name){
    this.name = name;
    this.id = "id";
    this.city = "city";
    this.country = "contry";
    this.tags = "tags";
    this.tagline = "tagline";
    this.price = "price";
    this.portrait = "portrait";
    this.getInfo = function(){
        var tags = this.tags;
        var vignette = document.createElement('article');
        var vignetteLien = document.createElement('a');
        vignetteLien.setAttribute('href','#' + this.id);
        vignetteLien.setAttribute('class',"vignette");
        vignetteLien.setAttribute('onclick',"return pagePhotographer(myJsonParse.photographers["+i+"])");
        var imgPortrait = document.createElement('img');
        imgPortrait.setAttribute("class","vignette__photo");
        imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Reduce/" + this.portrait);
        vignetteLien.appendChild(imgPortrait);
        var namePers = document.createElement('h2');
        namePers.setAttribute("class","vignette__titre");
        namePers.textContent = this.name;
        vignetteLien.appendChild(namePers);
        var cityPers = document.createElement('p');
        cityPers.setAttribute("class","vignette__city");
        cityPers.textContent = this.city + ", " + this.country;
        vignetteLien.appendChild(cityPers);
        var taglinePers = document.createElement('p');
        taglinePers.setAttribute("class","vignette__tagline");
        taglinePers.textContent = this.tagline;
        vignetteLien.appendChild(taglinePers);
        var pricePers = document.createElement('p');
        pricePers.setAttribute("class","vignette__price");
        pricePers.textContent = this.price + '€/jour';
        var tagPers = document.createElement('form');
        tagPers.setAttribute("class","form__option");
        for (var j = 0; j < tags.length; j++) {
            var listItem = document.createElement('div');
            listItem.setAttribute("class","btn__option");
            var inputItem = document.createElement('input');
                inputItem.setAttribute("class","input__option");
                inputItem.setAttribute("type","radio");
                inputItem.setAttribute("id",tags[j]+j);
                inputItem.setAttribute("name","option");
                inputItem.setAttribute("value",tags[j]);
            var labelItem = document.createElement('label');
                labelItem.setAttribute("class","label__option");
                labelItem.setAttribute("for",tags[j]);
                labelItem.textContent = "#"+tags[j];
            listItem.appendChild(inputItem);
            listItem.appendChild(labelItem);    
            tagPers.appendChild(listItem);
        }
        vignette.appendChild(vignetteLien);
        vignette.appendChild(tagPers);
        section.appendChild(vignette);
    }}

vignetPhotographers(myJsonParse);
var i ; //var de boucle commune

function vignetPhotographers(jsonObj){
    var sourceJson = jsonObj["photographers"];
for ( i = 0; i < sourceJson.length; i++){
    construction(sourceJson);
}}

//écouteur sélection spécialité des photographers
const option = document.querySelectorAll("input[type=radio]");
var optionValue;
for (var j =0; j<option.length; j++) {
    option[j].setAttribute("data-compteur-option",j)
    option[j].addEventListener('change',function(eventOption){
        var controlOption = eventOption.target.getAttribute("data-compteur-option");
        var checkedVerif = option[controlOption].getAttribute("checked",true)
        if(!checkedVerif){
            option[controlOption].setAttribute("checked",true);
            optionValue=eventOption.target.value;
            option[controlOption].removeAttribute("checked");
            while (section.firstChild){
                section.removeChild(section.firstChild);
            };
            vignetPhotographersSelected(myJsonParse);
        } else {
            option[controlOption].removeAttribute("checked");
            optionValue="";
        }})};

function vignetPhotographersSelected (jsonObj){
    var sourceJsonSelect = jsonObj["photographers"];
for (i = 0; i < sourceJsonSelect.length; i++) {
    var tags = sourceJsonSelect[i].tags;
    //boucle sur spécialité
    for (var k = 0; k < tags.length; k++) {
        //correction faute d'orthographe
        if (tags[k] ==="sports") {
            tags[k] = "sport";
        }
        //condition/comparaison spécialité et création fichephotographes
        if (tags[k] === optionValue){
            construction(sourceJsonSelect)
        } else if (optionValue==undefined || optionValue =="") {

        }
}}};

function construction(myJsonObj){
    var myPhotographer = new Photographers(myJsonObj[i].name);
    myPhotographer.id = myJsonObj[i].id;
    myPhotographer.city = myJsonObj[i].city;
    myPhotographer.country = myJsonObj[i].country;
    myPhotographer.tags = myJsonObj[i].tags;
    myPhotographer.tagline = myJsonObj[i].tagline;
    myPhotographer.price = myJsonObj[i].price;
    myPhotographer.portrait = myJsonObj[i].portrait;
    myPhotographer.getInfo();
    }

    //construction pages photographe
function pagePhotographer(jsonObj){
    //effet page précédente
    while (sectionPhotographe.firstChild){
        sectionPhotographe.removeChild(sectionPhotographe.firstChild);
    };
    while (section.firstChild){
        section.removeChild(section.firstChild);
    };
    nav.style.display = "none";
    h1.style.display = "none";
    //bases de la fonction
    const sourcePers = jsonObj;
    const sourceMed = myJsonParse["media"];
    var idPers = sourcePers.id;
    var namePersSplit = sourcePers.name.split(" ");
    var tags = sourcePers.tags;
    //Element HTML à créer
    var pagePhotographe = document.createElement('article');
        var pagePhotographeInfo = document.createElement('div');
            var vignetPhotographeInfo1 = document.createElement('div');
                var namePers = document.createElement('h2');
                var cityPers = document.createElement('p');
                var taglinePers = document.createElement('p');
                var tagPers = document.createElement('ul');
            var vignetPhotographeInfo2 = document.createElement('div');
                var btnContact = document.createElement('button');
            var vignetPhotographeInfo3 = document.createElement('div');
                var imgPortrait = document.createElement('img');
        var plageMedia = document.createElement('article');
            var plageMediaMedia = document.createElement('div');
        var mediaBottom = document.createElement('div');
            var totalLike = 0;
            var likeTotal = document.createElement('p');    
            var pricePers = document.createElement('p');
    //Attributs de mise en forme et valeur sur entete
    pagePhotographe.setAttribute("class","page__photographe");
        pagePhotographeInfo.setAttribute("class","page__photographe--info");
            vignetPhotographeInfo1.setAttribute("class","vignet__photographe--info vignet__photographe--label");
                namePers.setAttribute("class","vignette__titre");
                namePers.textContent = sourcePers.name;
            vignetPhotographeInfo1.appendChild(namePers);
                cityPers.setAttribute("class","vignette__city");
                cityPers.textContent = sourcePers.city + ", " + sourcePers.country;            vignetPhotographeInfo1.appendChild(cityPers);
                taglinePers.setAttribute("class","vignette__tagline");
                taglinePers.textContent = sourcePers.tagline;
            vignetPhotographeInfo1.appendChild(taglinePers);
                for (var j = 0; j < tags.length; j++) {
                    var listItem = document.createElement('li');
                    listItem.textContent = "#"+tags[j];
                    tagPers.appendChild(listItem);
                }
            vignetPhotographeInfo1.appendChild(tagPers);
        pagePhotographeInfo.appendChild(vignetPhotographeInfo1);
            vignetPhotographeInfo2.setAttribute("class","vignet__photographe--info vignet__photographe--btn");
                btnContact.setAttribute("class","btn__contact");
                btnContact.setAttribute("value","Contactez-moi");
                btnContact.innerText="Contactez-moi";
            vignetPhotographeInfo2.appendChild(btnContact);
        pagePhotographeInfo.appendChild(vignetPhotographeInfo2);
            vignetPhotographeInfo3.setAttribute("class","vignet__photographe--info vignet__photographe--photo");
                imgPortrait.setAttribute("class","vignet__photo");
                imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Reduce/" + sourcePers.portrait);
            vignetPhotographeInfo3.appendChild(imgPortrait);
        pagePhotographeInfo.appendChild(vignetPhotographeInfo3);
    pagePhotographe.appendChild(pagePhotographeInfo);
    // planche medias générales
    plageMedia.setAttribute("class","plage__media");
        plageMedia.innerHTML="<p class='plage__media--tri'>Trier par</p>";//temporaire
//bouton de tri à mettre ici
        plageMediaMedia.setAttribute('class','medias');
//mettre if tri ici
            for(var j = 0; j<sourceMed.length; j++){
                var photographerId = sourceMed[j].photographerId;
                var medias = document.createElement('div');
                medias.setAttribute('class','mediasInside');
                //planche medias personalisée + creations + attributs + contenus
                if (photographerId === idPers) {
                    var photoMedia = document.createElement('img');
                    photoMedia.setAttribute("class","media__photo");
                    photoMedia.setAttribute("src","Images/SamplePhotos/"+ namePersSplit[0] + "/resized/" + sourceMed[j].image);
                    photoMedia.setAttribute("alt",sourceMed[j].title);
                    medias.appendChild(photoMedia);
                    console.log(sourceMed[j].title)
                    //correction video
                    if (sourceMed[j].image == undefined){
                        medias.removeChild(photoMedia);
                        var videoMedia = document.createElement('video');
                        videoMedia.setAttribute("class","media__photo");
                        videoMedia.setAttribute("src","Images/SamplePhotos/"+ namePersSplit[0] + "/resized/" + sourceMed[j].video);
                        videoMedia.setAttribute("alt",sourceMed[j].title)
                        medias.appendChild(videoMedia);
                    }
                    var legendMedia = document.createElement('div');
                    legendMedia.setAttribute("class","media__legend");
                    var titreMedia = document.createElement('h3');
                    titreMedia.setAttribute("class","media__titre");
                    titreMedia.textContent = sourceMed[j].title;
                    legendMedia.appendChild(titreMedia);
                    var likeMedia=document.createElement('div');
                    likeMedia.setAttribute("class","media__like");
                    var likeMediaCount = document.createElement('p');
                    likeMediaCount.setAttribute("class","media__like");
                    likeMediaCount.textContent = sourceMed[j].likes;
                    totalLike = totalLike + sourceMed[j].likes;
                    var heart = document.createElement('i');
                    heart.setAttribute("class","fas fa-heart");
                    likeMedia.appendChild(likeMediaCount);
                    likeMedia.appendChild(heart);
                    legendMedia.appendChild(likeMedia);
                    medias.appendChild(legendMedia);
                    plageMediaMedia.appendChild(medias);
                }
                plageMedia.appendChild(plageMediaMedia);
                pagePhotographe.appendChild(plageMedia);
            }
            //creation footer media
            mediaBottom.setAttribute("class","media__bottom");
            var likeBottom = document.createElement('div');
            likeBottom.setAttribute("class","like__bottom")
            likeTotal.textContent = totalLike;
            var heart = document.createElement('i');
                heart.setAttribute("class","fas fa-heart");
            likeBottom.appendChild(likeTotal)
            likeBottom.appendChild(heart)
            pricePers.setAttribute("class","media__price");
            pricePers.textContent = sourcePers.price + '€/jour';
            mediaBottom.appendChild(likeBottom);
            mediaBottom.appendChild(pricePers);
            pagePhotographe.appendChild(mediaBottom);
    sectionPhotographe.appendChild(pagePhotographe);
};

var triValue = "popularité";
if (triValue ==="popularité"){ 
//if tri = popularité, construire sur ce tableau
    myJsonParse["media"].sort(function(a,b){
        return a.likes-b.likes;
    });
}

if (triValue === 'titre'){
    const tableauMedia = myJsonParse["media"];
    tableauMedia.sort(title);    
}