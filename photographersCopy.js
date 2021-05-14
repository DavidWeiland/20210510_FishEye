//Index : photographers sur page index avec source ext
const section = document.querySelector('#section');

//source externe
fetch("fisheyedata.json")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(data){
        vignetPhotographers(data);
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
