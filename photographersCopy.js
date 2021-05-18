//Index : photographers sur page index avec source ext
const section = document.querySelector('#section');
const sectionPhotographe = document.querySelector('#sectionPhotographe');
const logo = document.querySelector('.logo');
const nav = document.querySelector('.nav');
const h1 = document.querySelector('h1');



//source externe et stockage session
fetch("fisheyedata.json")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(data){
        var myJsonStringify = JSON.stringify(data)
        sessionStorage.setItem("sStorage", myJsonStringify)
        vignetPhotographers(data);
    })
    .catch(function(err){
        console.log(err);
    });

var myJson = sessionStorage.getItem("sStorage");
var myJsonParse = JSON.parse(myJson);


//vignetPhotographers(myJsonParse);

// btn reset
logo.addEventListener("click", reset);

// reset page
function reset() {
   document.location.reload();
    vignetPhotographers(myJsonParse);
    //section.style.display = "flex";
    //nav.style.opacity = "1";
    //h1.style.opacity = "1";
}


//construction page index base démarrage
function vignetPhotographers(jsonObj){
    /*while (sectionPhotographe.firstChild){
        sectionPhotographe.removeChild(sectionPhotographe.firstChild);
    };while (section.firstChild){
        section.removeChild(section.firstChild);
    };*/
    const sourcePers = jsonObj["photographers"];
    const sourceMed = jsonObj["media"];
    for (var i = 0; i < sourcePers.length; i++) {
        var tags = sourcePers[i].tags;
        var id = sourcePers[i].id;
        var vignette = document.createElement('a');
        vignette.setAttribute('href','#' + sourcePers[i].id);
        vignette.setAttribute('class',"vignette");
        vignette.setAttribute('target',"_blank");
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
        cityPers.textContent = sourcePers[i].city;
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
            vignetPhotographersSelected(myJsonParse);
        } else {
            option[controlOption].removeAttribute("checked");
            optionValue="";
        }
        
    })
};


//construction index avec photographers sélectionnés
function vignetPhotographersSelected(jsonObj){
    while (sectionPhotographe.firstChild){
        sectionPhotographe.removeChild(sectionPhotographe.firstChild);
    };while (section.firstChild){
        section.removeChild(section.firstChild);
    };
    const sourcePers = jsonObj["photographers"];
    const sourceMed = jsonObj["media"];
    for (var i = 0; i < sourcePers.length; i++) {
        var tags = sourcePers[i].tags;
        for (var k = 0; k < tags.length; k++) {
            if (tags[k] ==="sports") {
                tags[k] = "sport";
            }
            if (tags[k] === optionValue){
                var vignette = document.createElement('a');
                //vignette.setAttribute('href','#' + sourcePers[i].id);
                vignette.setAttribute('class',"vignette");
                vignette.setAttribute('target',"_blank");
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
                cityPers.textContent = sourcePers[i].city;
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


//pagePhotographer(myJsonParse["photographers"][2]);

//construction pages photographe
function pagePhotographer(jsonObj){
    while (sectionPhotographe.firstChild){
        sectionPhotographe.removeChild(sectionPhotographe.firstChild);
    };
    const sourcePers = jsonObj;
    const sourceMed = myJsonParse["media"];
        var idPers = sourcePers.id;
        var namePers = sourcePers.name;
        var namePersSplit = namePers.split(" ");
        var tags = sourcePers.tags;

                var pagePhotographe = document.createElement('article');
                pagePhotographe.setAttribute("class","page__photographe");
                //pagePhotographe.setAttribute("id", idPers);
                section.style.display = "none";
                const nav = document.querySelector('.nav');
                nav.style.opacity = "0";
                const h1 = document.querySelector('h1');
                h1.style.opacity = "0";
        
                var pagePhotographeInfo = document.createElement('div');
                pagePhotographeInfo.setAttribute("class","page__photographe--info");
            
                    var vignetPhotographeInfo1 = document.createElement('div');
                    vignetPhotographeInfo1.setAttribute("class","vignet__photographe--info vignet__photographe--label");

                        var namePersElement = document.createElement('h2');
                        namePersElement.setAttribute("class","vignette__titre");
                        namePersElement.textContent = namePers;
                        vignetPhotographeInfo1.appendChild(namePersElement);
                        var cityPers = document.createElement('p');
                        cityPers.setAttribute("class","vignette__city");
                        cityPers.textContent = sourcePers.city;
                        vignetPhotographeInfo1.appendChild(cityPers);
                        var taglinePers = document.createElement('p');
                        taglinePers.setAttribute("class","vignette__tagline");
                        taglinePers.textContent = sourcePers.tagline;
                        vignetPhotographeInfo1.appendChild(taglinePers);
                        var tagPers = document.createElement('ul');
                        for (var j = 0; j < tags.length; j++) {
                            var listItem = document.createElement('li');
                            listItem.textContent = "#"+tags[j];
                            tagPers.appendChild(listItem);
                        }
                        vignetPhotographeInfo1.appendChild(tagPers);
                    pagePhotographeInfo.appendChild(vignetPhotographeInfo1);

                    var vignetPhotographeInfo2 = document.createElement('div');
                    vignetPhotographeInfo2.setAttribute("class","vignet__photographe--info vignet__photographe--btn");
                    var btnContact = document.createElement('button');
                    btnContact.setAttribute("class","btn__contact");
                    btnContact.setAttribute("value","Contactez-moi");
                    btnContact.innerText="Contactez-moi";
                    vignetPhotographeInfo2.appendChild(btnContact);

                    pagePhotographeInfo.appendChild(vignetPhotographeInfo2);

                    var vignetPhotographeInfo3 = document.createElement('div');

                    vignetPhotographeInfo3.setAttribute("class","vignet__photographe--info vignet__photographe--photo");
                    var imgPortrait = document.createElement('img');
                    imgPortrait.setAttribute("class","vignette__photo");
                    imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Reduce/" + sourcePers.portrait);
                    vignetPhotographeInfo3.appendChild(imgPortrait);

                    pagePhotographeInfo.appendChild(vignetPhotographeInfo3);
                pagePhotographe.appendChild(pagePhotographeInfo);

                var plageMedia = document.createElement('article');
                plageMedia.setAttribute("class","plage__media");
                plageMedia.innerHTML="<p class='plage__media--tri'>Trier par</p>";

    //bouton de tri à mettre ici
        
                var plageMediaMedia = document.createElement('div');
                plageMediaMedia.setAttribute('class','medias');
                for(var j = 0; j<sourceMed.length; j++){
                    var photographerId = sourceMed[j].photographerId;
                    var medias = document.createElement('div');
                    medias.setAttribute('class','mediasInside');
                        if (photographerId === idPers) {
                            var photoMedia = document.createElement('img');
                            photoMedia.setAttribute("class","media__photo");
                            photoMedia.setAttribute("src","Images/SamplePhotos/"+ namePersSplit[0] + "/" + sourceMed[j].image);
                            medias.appendChild(photoMedia);

                        var titreMedia = document.createElement('h3');
                        titreMedia.setAttribute("class","media__titre");
                        titreMedia.textContent = sourceMed[j].title;
                        medias.appendChild(titreMedia);
                        var likeMedia = document.createElement('p');
                        likeMedia.setAttribute("class","vignette__city");
                        likeMedia.textContent = sourceMed[j].likes; // a incrémenter
                        medias.appendChild(likeMedia);
                        plageMediaMedia.appendChild(medias);
                        }


                // boucle for media ici
                /*inclure img + titre + like*/

                plageMedia.appendChild(plageMediaMedia);
                
                pagePhotographe.appendChild(plageMedia);
                /*addition like ici*/
                    }
                var pricePers = document.createElement('p');
            pricePers.setAttribute("class","vignette__price");
            pricePers.textContent = sourcePers.price + '€/jour';
            pagePhotographe.appendChild(pricePers);
            
            sectionPhotographe.appendChild(pagePhotographe);
    
};
/*
function pagePhotographer(jsonObj){
    //écouteur lien page photographers

    const sourcePers = jsonObj["photographers"];
    const sourceMed = jsonObj["media"];
    for (var i = 0; i < sourcePers.length; i++) {
        var idPers = sourcePers[i].id;
        var namePers = sourcePers[i].name;
        var namePersSplit = namePers.split(" ");
        var tags = sourcePers[i].tags;

                var pagePhotographe = document.createElement('article');
                pagePhotographe.setAttribute("class","page__photographe");

                pagePhotographe.setAttribute("id", idPers);
                //pagePhotographe.style.paddingTop = "200px";
                //const header = document.querySelector("header");
                //header.style.position = "fixed";
                //pagePhotographe.style.display = "none";
                //section.style.display = "none";
                //const nav = document.querySelector('.nav');
                //nav.style.opacity = "0";
                //const h1 = document.querySelector('h1');
                //h1.style.opacity = "0";
        
                var pagePhotographeInfo = document.createElement('div');
                pagePhotographeInfo.setAttribute("class","page__photographe--info");
            
                    var vignetPhotographeInfo1 = document.createElement('div');
                    vignetPhotographeInfo1.setAttribute("class","vignet__photographe--info vignet__photographe--label");

                        var namePersElement = document.createElement('h2');
                        namePersElement.setAttribute("class","vignette__titre");
                        namePersElement.textContent = namePers;
                        vignetPhotographeInfo1.appendChild(namePersElement);
                        var cityPers = document.createElement('p');
                        cityPers.setAttribute("class","vignette__city");
                        cityPers.textContent = sourcePers[i].city;
                        vignetPhotographeInfo1.appendChild(cityPers);
                        var taglinePers = document.createElement('p');
                        taglinePers.setAttribute("class","vignette__tagline");
                        taglinePers.textContent = sourcePers[i].tagline;
                        vignetPhotographeInfo1.appendChild(taglinePers);
                        var tagPers = document.createElement('ul');
                        for (var j = 0; j < tags.length; j++) {
                            var listItem = document.createElement('li');
                            listItem.textContent = "#"+tags[j];
                            tagPers.appendChild(listItem);
                        }
                        vignetPhotographeInfo1.appendChild(tagPers);
                    pagePhotographeInfo.appendChild(vignetPhotographeInfo1);

                    var vignetPhotographeInfo2 = document.createElement('div');
                    vignetPhotographeInfo2.setAttribute("class","vignet__photographe--info vignet__photographe--btn");
                    var btnContact = document.createElement('button');
                    btnContact.setAttribute("class","btn__contact");
                    btnContact.setAttribute("value","Contactez-moi");
                    btnContact.innerText="Contactez-moi";
                    vignetPhotographeInfo2.appendChild(btnContact);

                    pagePhotographeInfo.appendChild(vignetPhotographeInfo2);

                    var vignetPhotographeInfo3 = document.createElement('div');

                    vignetPhotographeInfo3.setAttribute("class","vignet__photographe--info vignet__photographe--photo");
                    var imgPortrait = document.createElement('img');
                    imgPortrait.setAttribute("class","vignette__photo");
                    imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Reduce/" + sourcePers[i].portrait);
                    vignetPhotographeInfo3.appendChild(imgPortrait);

                    pagePhotographeInfo.appendChild(vignetPhotographeInfo3);
                pagePhotographe.appendChild(pagePhotographeInfo);

                var plageMedia = document.createElement('article');
                plageMedia.setAttribute("class","plage__media");
                plageMedia.innerHTML="<p class='plage__media--tri'>Trier par</p>";

    //bouton de tri à mettre ici
        
                var plageMediaMedia = document.createElement('div');
                plageMediaMedia.setAttribute('class','medias');
                for(var j = 0; j<sourceMed.length; j++){
                    var photographerId = sourceMed[j].photographerId;
                    var medias = document.createElement('div');
                    medias.setAttribute('class','mediasInside');
                        if (photographerId === idPers) {
                            console.log(photographerId);
                            var photoMedia = document.createElement('img');
                            photoMedia.setAttribute("class","media__photo");
                            photoMedia.setAttribute("src","Images/SamplePhotos/"+ namePersSplit[0] + "/" + sourceMed[j].image);
                            medias.appendChild(photoMedia);

                        var titreMedia = document.createElement('h3');
                        titreMedia.setAttribute("class","media__titre");
                        titreMedia.textContent = sourceMed[j].title;
                        medias.appendChild(titreMedia);
                        var likeMedia = document.createElement('p');
                        likeMedia.setAttribute("class","vignette__city");
                        likeMedia.textContent = sourceMed[j].likes; // a incrémenter
                        medias.appendChild(likeMedia);
                        plageMediaMedia.appendChild(medias);
                        }


                // boucle for media ici
                //inclure img + titre + like

                plageMedia.appendChild(plageMediaMedia);
                
                pagePhotographe.appendChild(plageMedia);
                //addition like ici
                    }
                var pricePers = document.createElement('p');
            pricePers.setAttribute("class","vignette__price");
            pricePers.textContent = sourcePers[i].price + '€/jour';
            pagePhotographe.appendChild(pricePers);
            
            sectionPhotographe.appendChild(pagePhotographe);
    }
};*/