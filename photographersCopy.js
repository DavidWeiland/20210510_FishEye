//Index : photographers sur page index avec source ext
const section = document.querySelector('#section');
const sectionPhotographe = document.querySelector('#sectionPhotographe');

//source externe
fetch("fisheyedata.json")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(data){
        vignetPhotographers(data);
        //page photographe
        pagePhotographer(data);
    })
    .catch(function(err){
        console.log(err);
    });

//construction page index base démarrage
function vignetPhotographers(jsonObj){
    const propertyAccess = "photographers";
    const pers = jsonObj[propertyAccess];
    for (var i = 0; i < pers.length; i++) {
        var tags = pers[i].tags;
        var vignette = document.createElement('article');
        var imgPortrait = document.createElement('img');
        imgPortrait.setAttribute("class","vignette__photo");
        imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Reduce/" + pers[i].portrait);
        vignette.appendChild(imgPortrait);
        var namePers = document.createElement('h2','.coucou');
        namePers.setAttribute("class","vignette__titre");
        namePers.textContent = pers[i].name;
        vignette.appendChild(namePers);
        var cityPers = document.createElement('p');
        cityPers.setAttribute("class","vignette__city");
        cityPers.textContent = pers[i].city;
        vignette.appendChild(cityPers);
        var taglinePers = document.createElement('p');
        taglinePers.setAttribute("class","vignette__tagline");
        taglinePers.textContent = pers[i].tagline;
        vignette.appendChild(taglinePers);
        var pricePers = document.createElement('p');
        pricePers.setAttribute("class","vignette__price");
        pricePers.textContent = pers[i].price + '€/jour';
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
            fetch("fisheyedata.json")
                .then(function(res){
                    if(res.ok){
                    return res.json();
                }
                })
                .then(function(data){
                    vignetPhotographersSelected(data);
                })
                .catch(function(err){
                    console.log(err);
                });
        } else {
            option[controlOption].removeAttribute("checked");
            optionValue="";
        }
        
    })
};

//construction index avec photographers sélectionnés
function vignetPhotographersSelected(jsonObj){
    const propertyAccess = "photographers";
    const pers = jsonObj[propertyAccess];
    for (var i = 0; i < pers.length; i++) {
        var tags = pers[i].tags;
        for (var k = 0; k < tags.length; k++) {
            if (tags[k] === optionValue){
                var vignette = document.createElement('article');
            var imgPortrait = document.createElement('img');
            imgPortrait.setAttribute("class","vignette__photo");
            imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Reduce/" + pers[i].portrait);
            vignette.appendChild(imgPortrait);
            var namePers = document.createElement('h2','.coucou');
            namePers.setAttribute("class","vignette__titre");
            namePers.textContent = pers[i].name;
            vignette.appendChild(namePers);
            var cityPers = document.createElement('p');
            cityPers.setAttribute("class","vignette__city");
            cityPers.textContent = pers[i].city;
            vignette.appendChild(cityPers);
            var taglinePers = document.createElement('p');
            taglinePers.setAttribute("class","vignette__tagline");
            taglinePers.textContent = pers[i].tagline;
            vignette.appendChild(taglinePers);
            var pricePers = document.createElement('p');
            pricePers.setAttribute("class","vignette__price");
            pricePers.textContent = pers[i].price + '€/jour';
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

//construction pages photographer
function pagePhotographer(jsonObj){
    const propertyAccess = "photographers";
    const pers = jsonObj[propertyAccess];
    for (var i = 0; i < pers.length; i++) {
        var tags = pers[i].tags;
        var pagePhotographe = document.createElement('article');
        pagePhotographe.setAttribute("class","page__photographe");
        //pagePhotographe.style.display = "none";
        //section.style.display = "none";
        //const nav = document.querySelector('.nav');
        //nav.style.display = "none";
        //const h1 = document.querySelector('h1');
        //h1.style.opacity = "0";
        
            var pagePhotographeInfo = document.createElement('div');
            pagePhotographeInfo.setAttribute("class","page__photographe--info");
        
                var vignetPhotographeInfo1 = document.createElement('div');
                vignetPhotographeInfo1.setAttribute("class","vignet__photographe--info vignet__photographe--label");

                    var namePers = document.createElement('h2');
                    namePers.setAttribute("class","vignette__titre");
                    namePers.textContent = pers[i].name;
                    vignetPhotographeInfo1.appendChild(namePers);
                    var cityPers = document.createElement('p');
                    cityPers.setAttribute("class","vignette__city");
                    cityPers.textContent = pers[i].city;
                    vignetPhotographeInfo1.appendChild(cityPers);
                    var taglinePers = document.createElement('p');
                    taglinePers.setAttribute("class","vignette__tagline");
                    taglinePers.textContent = pers[i].tagline;
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
                imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Reduce/" + pers[i].portrait);
                vignetPhotographeInfo3.appendChild(imgPortrait);

                pagePhotographeInfo.appendChild(vignetPhotographeInfo3);
            pagePhotographe.appendChild(pagePhotographeInfo);

            var plageMedia = document.createElement('article');
            plageMedia.setAttribute("class","plage__media");
            plageMedia.innerHTML="<p class='plage__media--tri'>Trier par</p>";

//bouton de tri à mettre ici
     
            var plageMediaMedia = document.createElement('div');
            plageMediaMedia.setAttribute('class','medias');
                

            // boucle for media ici
            /*inclure img + titre + like*/

            plageMedia.appendChild(plageMediaMedia);
            
            pagePhotographe.appendChild(plageMedia);
            /*addition like ici*/

            var pricePers = document.createElement('p');
        pricePers.setAttribute("class","vignette__price");
        pricePers.textContent = pers[i].price + '€/jour';
        pagePhotographe.appendChild(pricePers);
        
        sectionPhotographe.appendChild(pagePhotographe);
    }
};