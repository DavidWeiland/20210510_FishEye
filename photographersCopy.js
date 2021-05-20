//source externe et stockage local
fetch("fisheyedata.json")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(data){
        //vignetPhotographers(data);
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
const logo = document.querySelector('.logo');
const nav = document.querySelector('.nav');
const h1 = document.querySelector('h1');


//Initialisation de la page 2
vignetPhotographers(myJsonParse);


// btn reset
logo.addEventListener("click", reset);
// reset page
function reset() {
   document.location.reload();
    vignetPhotographers(myJsonParse);
}


//construction page index base démarrage
function vignetPhotographers(jsonObj){
    const sourcePers = jsonObj["photographers"];
    for (var i = 0; i < sourcePers.length; i++) {
        var tags = sourcePers[i].tags;
        var vignette = document.createElement('a');
        vignette.setAttribute('href','#' + sourcePers[i].id);
        vignette.setAttribute('class',"vignette");
        vignette.setAttribute('onclick',"return pagePhotographer(myJsonParse.photographers["+i+"])");
        var imgPortrait = document.createElement('img');
        imgPortrait.setAttribute("class","vignette__photo");
        imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Reduce/" + sourcePers[i].portrait);
        vignette.appendChild(imgPortrait);
        var namePers = document.createElement('h2','.coucou');
        namePers.setAttribute("class","vignette__titre");
        namePers.textContent = sourcePers[i].name;
        vignette.appendChild(namePers);
        var cityPers = document.createElement('p');
        cityPers.setAttribute("class","vignette__city");
        cityPers.textContent = sourcePers[i].city + ", " + sourcePers[i].country;
        vignette.appendChild(cityPers);
        var taglinePers = document.createElement('p');
        taglinePers.setAttribute("class","vignette__tagline");
        taglinePers.textContent = sourcePers[i].tagline;
        vignette.appendChild(taglinePers);
        var pricePers = document.createElement('p');
        pricePers.setAttribute("class","vignette__price");
        pricePers.textContent = sourcePers[i].price + '€/jour';
        vignette.appendChild(pricePers);
        var tagPers = document.createElement('ul');
        for (var j = 0; j < tags.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = "#"+tags[j];
            tagPers.appendChild(listItem);
        }
        vignette.appendChild(tagPers);
        section.appendChild(vignette);
    }
};

//écouteur sélection spécialité des photographers
const option = document.querySelectorAll("input[type=radio]");
var optionValue;
for (var j =0; j<option.length; j++) {
    option[j].setAttribute("data-compteur-option",j)
    option[j].addEventListener('change',function(eventOption){
        var controlOption = eventOption.target.getAttribute("data-compteur-option");
        var checkedVerif = option[controlOption].getAttribute("checked")
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
        }
    })
};

//construction index avec photographers sélectionnés
function vignetPhotographersSelected(jsonObj){
    const sourcePers = jsonObj["photographers"];
    //boucle sur Photographes
    for (var i = 0; i < sourcePers.length; i++) {
        var tags = sourcePers[i].tags;
        //boucle sur spécialité
        for (var k = 0; k < tags.length; k++) {
            //correction faute d'orthographe
            if (tags[k] ==="sports") {
                tags[k] = "sport";
            }
            //condition/comparaison spécialité et création fichephotographes
            if (tags[k] === optionValue){
                var vignette = document.createElement('a');
                vignette.setAttribute('href','#' + sourcePers[i].id);
                vignette.setAttribute('class',"vignette");
                vignette.setAttribute('onclick',"return pagePhotographer(myJsonParse.photographers["+i+"])");
                var imgPortrait = document.createElement('img');
                imgPortrait.setAttribute("class","vignette__photo");
                imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Reduce/" + sourcePers[i].portrait);
                vignette.appendChild(imgPortrait);
                var namePers = document.createElement('h2','.coucou');
                namePers.setAttribute("class","vignette__titre");
                namePers.textContent = sourcePers[i].name;
                vignette.appendChild(namePers);
                var cityPers = document.createElement('p');
                cityPers.setAttribute("class","vignette__city");
                cityPers.textContent = sourcePers[i].city + ", " + sourcePers[i].country;
                vignette.appendChild(cityPers);
                var taglinePers = document.createElement('p');
                taglinePers.setAttribute("class","vignette__tagline");
                taglinePers.textContent = sourcePers[i].tagline;
                vignette.appendChild(taglinePers);
                var pricePers = document.createElement('p');
                pricePers.setAttribute("class","vignette__price");
                pricePers.textContent = sourcePers[i].price + '€/jour';
                vignette.appendChild(pricePers);
                var tagPers = document.createElement('ul');
                for (var j = 0; j < tags.length; j++) {
                    var listItem = document.createElement('li');
                    listItem.textContent = "#"+tags[j];
                    tagPers.appendChild(listItem);
                }
                vignette.appendChild(tagPers);
                section.appendChild(vignette);
            }
        }
    }
};


//construction pages photographe
function pagePhotographer(jsonObj){
    //effet page précédente
    while (sectionPhotographe.firstChild){
        sectionPhotographe.removeChild(sectionPhotographe.firstChild);
    };
    while (section.firstChild){
        section.removeChild(section.firstChild);
    };
    nav.style.opacity = "0";
    h1.style.opacity = "0";
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
        var pricePers = document.createElement('p');
    //Attributs de mise en forme et valeur
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
    plageMedia.setAttribute("class","plage__media");
        plageMedia.innerHTML="<p class='plage__media--tri'>Trier par</p>";
//bouton de tri à mettre ici
        plageMediaMedia.setAttribute('class','medias');
            for(var j = 0; j<sourceMed.length; j++){
                var photographerId = sourceMed[j].photographerId;
                var medias = document.createElement('div');
                medias.setAttribute('class','mediasInside');
                if (photographerId === idPers) {
                    var photoMedia = document.createElement('img');
                    photoMedia.setAttribute("class","media__photo");
                    photoMedia.setAttribute("src","Images/SamplePhotos/"+ namePersSplit[0] + "/resized/" + sourceMed[j].image);
                    photoMedia.setAttribute("alt",sourceMed[j].title);
                    medias.appendChild(photoMedia);
                    console.log(sourceMed[j].image)
                    if (sourceMed[j].image == undefined){
                        medias.removeChild(photoMedia);
                        var videoMedia = document.createElement('video');
                        videoMedia.setAttribute("class","media__photo");
                        videoMedia.setAttribute("src","Images/SamplePhotos/"+ namePersSplit[0] + "/resized/" + sourceMed[j].video);
                        //videoMedia.setAttribute("alt",sourceMed[j].title)
                        medias.appendChild(videoMedia);
                        console.log(sourceMed[j].video)
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
                    
                    
                    likeMediaCount.textContent = sourceMed[j].likes+"  ";
        // a incrémenter
                    var heart = document.createElement('i')
                    heart.setAttribute("class","fas fa-heart");
                    likeMedia.appendChild(likeMediaCount)
                    likeMedia.appendChild(heart)
                    legendMedia.appendChild(likeMedia);
                    medias.appendChild(legendMedia);
                    plageMediaMedia.appendChild(medias);
                }
                plageMedia.appendChild(plageMediaMedia);
                pagePhotographe.appendChild(plageMedia);
        //addition like ici
            }
        pricePers.setAttribute("class","vignette__price");
        pricePers.textContent = sourcePers.price + '€/jour';
    pagePhotographe.appendChild(pricePers);
    sectionPhotographe.appendChild(pagePhotographe);
};
