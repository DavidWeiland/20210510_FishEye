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
                inputItem.setAttribute("type","checkbox");
                //inputItem.setAttribute("id",tags[j]);
                inputItem.setAttribute("name","option");
                inputItem.setAttribute("value",tags[j]);
            var labelItem = document.createElement('label');
                labelItem.setAttribute("class","label__option");
                labelItem.setAttribute("for",tags[j]);
                var span = document.createElement('span');
                span.textContent = "#"+tags[j];
                labelItem.appendChild(span);
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
const option = document.querySelectorAll("input[type=checkbox]");
var optionValue;
for ( var cbx =0; cbx<option.length; cbx++) {
    option[cbx].addEventListener('click',function(eventOption){
        var checkedVerif = eventOption.target.getAttribute("checked",true);
        for(var cbx2 = 0; cbx2<option.length;cbx2++){
            if (option[cbx2].getAttribute("checked")){
            option[cbx2].setAttribute("checked",false);
        }
        if(!checkedVerif){
            eventOption.target.setAttribute("checked",true);
            optionValue=eventOption.target.value;
            while (section.firstChild){
                section.removeChild(section.firstChild);
            };
            vignetPhotographersSelected(myJsonParse);
        } else {
            eventOption.target.removeAttribute("checked",false);
            optionValue="";
            
            while (section.firstChild){
                section.removeChild(section.firstChild);
            };
            vignetPhotographers(myJsonParse);
}}})};


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
}}}};

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

var sourcePers;
var totalLike;

//construction pages photographe
function pagePhotographer(jsonObj){
    sourcePers = jsonObj;
//initialisation
    while (section.firstChild){
        section.removeChild(section.firstChild);
    };
    nav.style.display = "none";
    h1.style.display = "none";
    totalLike = 0;
    var pagePhotographe = document.createElement('article');
    pagePhotographe.setAttribute("class","page__photographe");
        var pagePhotographeInfo = document.createElement('div');
        pagePhotographeInfo.setAttribute("class","page__photographe--info");
        sectionPhotographe.appendChild(pagePhotographeInfo);
        var triMedia = document.createElement('article');
        triMedia.setAttribute("class","tri__medias");
        sectionPhotographe.appendChild(triMedia);
        var plageMedia = document.createElement('article');
        plageMedia.setAttribute("class","plage__media");
        sectionPhotographe.appendChild(plageMedia);
        var mediaBottom = document.createElement('div');
    mediaBottom.setAttribute("class","media__bottom");
    sectionPhotographe.appendChild(mediaBottom);

//Header Photographer
            var vignetPhotographeInfo1 = document.createElement('div');
            vignetPhotographeInfo1.setAttribute("class","vignet__photographe--info vignet__photographe--label");
                var namePers = document.createElement('h2');
                namePers.setAttribute("class","vignette__titre");
                namePers.textContent = sourcePers.name;
            vignetPhotographeInfo1.appendChild(namePers);
                var cityPers = document.createElement('p');
                cityPers.setAttribute("class","vignette__city");
                cityPers.textContent = sourcePers.city + ", " + sourcePers.country;
            vignetPhotographeInfo1.appendChild(cityPers);
                var taglinePers = document.createElement('p');
                taglinePers.setAttribute("class","vignette__tagline");
                taglinePers.textContent = sourcePers.tagline;
            vignetPhotographeInfo1.appendChild(taglinePers);
                var tagPers = document.createElement('ul');
                for (var j = 0; j < sourcePers.tags.length; j++) {
                    var listItem = document.createElement('li');
                    listItem.textContent = "#"+sourcePers.tags[j];
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
                btnContact.addEventListener("click",launchModal);
        pagePhotographeInfo.appendChild(vignetPhotographeInfo2);
            var vignetPhotographeInfo3 = document.createElement('div');
            vignetPhotographeInfo3.setAttribute("class","vignet__photographe--info vignet__photographe--photo");
                var imgPortrait = document.createElement('img');
                imgPortrait.setAttribute("class","vignet__photo");
                imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Reduce/" + sourcePers.portrait);
            vignetPhotographeInfo3.appendChild(imgPortrait);
        pagePhotographeInfo.appendChild(vignetPhotographeInfo3);

//bouton de tri (base)
        const triLabel = document.createElement('label');
        triLabel.setAttribute("for","triSelect");
        triLabel.setAttribute("class","tri__label");
        triLabel.setAttribute("value","");
        triLabel.textContent = "Trier par";
        triMedia.appendChild(triLabel);
        var divMedia = document.createElement('div');
        divMedia.setAttribute('class','custom-select');
        const triSelect = document.createElement('select');
        triSelect.setAttribute("id","triSelect");
        const triOptionDefault = document.createElement('option');
        triOptionDefault.setAttribute("value","");
        triOptionDefault.textContent = "--choisir un tri--";
        const triOptionDate = document.createElement('option');
        triOptionDate.setAttribute("value","date");
        triOptionDate.textContent = "Date";
        const triOptionTitre = document.createElement('option');
        triOptionTitre.setAttribute("value","titre");
        triOptionTitre.textContent = "Titre";
        const triOptionPopularite = document.createElement('option');
        triOptionPopularite.setAttribute("value","popularité");
        triOptionPopularite.textContent = "Popularité";
        triSelect.appendChild(triOptionDefault);
        triSelect.appendChild(triOptionPopularite);
        triSelect.appendChild(triOptionDate);
        triSelect.appendChild(triOptionTitre);
        divMedia.appendChild(triSelect);
    triMedia.appendChild(divMedia);
// customisation bouton de tri    
    var customSelect = document.getElementsByClassName("custom-select");
    for (var customCompteur = 0; customCompteur < customSelect.length; customCompteur++) {
        var selectCopy = customSelect[customCompteur].getElementsByTagName("select")[0];
        selectSelected = document.createElement("DIV");
        selectSelected.setAttribute("class", "select-selected");
        selectSelected.innerHTML = selectCopy.options[selectCopy.selectedIndex].innerHTML;
        customSelect[customCompteur].appendChild(selectSelected);
        selectItems = document.createElement("DIV");
        selectItems.setAttribute("class", "select-items select-hide");
        for (var selectCopyI = 1; selectCopyI < selectCopy.length; selectCopyI++) {
            var optionElement = document.createElement("DIV");
            optionElement.innerHTML = selectCopy.options[selectCopyI].innerHTML;
            optionElement.addEventListener("click", function(e) {
                selectOrigine = this.parentNode.parentNode.getElementsByTagName("select")[0];
                var selectOrigineCiblePrev = this.parentNode.previousSibling;
                for (var conpteurSelectOrigine = 0; conpteurSelectOrigine < selectOrigine.length; conpteurSelectOrigine++) {
                    if (selectOrigine.options[conpteurSelectOrigine].innerHTML == this.innerHTML) {
                        selectOrigine.selectedIndex = conpteurSelectOrigine;
                        selectOrigineCiblePrev.innerHTML = this.innerHTML;
                        var sameSelected = this.parentNode.getElementsByClassName("same-as-selected");
                        triValue = document.querySelector("#triSelect").value;
                        for (compteurSelectOrigine = 0; compteurSelectOrigine < sameSelected.length; compteurSelectOrigine++) {
                            sameSelected[compteurSelectOrigine].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                selectOrigineCiblePrev.click();
            });
        selectItems.appendChild(optionElement);
        }
        customSelect[customCompteur].appendChild(selectItems);

        selectSelected.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });

        selectItems.addEventListener("click",function(event){
            event.stopPropagation();
        if (triValue === "popularité"){ 
            myJsonParse["media"].sort(function(a,b){
                return a.likes-b.likes;
            });
        } else if (triValue === 'titre'){
            myJsonParse["media"].sort(function compare(a,b){
                if(a.title < b.title)
                    return-1;
                if(a.title>b.title)
                    return 1;
                return 0;
            });
        } else if (triValue === 'date'){
            myJsonParse["media"].sort(function compare(a,b){
                if(a.date < b.date)
                    return-1;
                if(a.date>b.date)
                    return 1;
                return 0;
            });
        }
        while (plageMedia.firstChild){
        plageMedia.removeChild(plageMedia.firstChild);
        }
        plancheImage();
        });
    }
    
    function closeAllSelect(elmnt) {
        var i, arrNo = [];
        var selectItems = document.getElementsByClassName("select-items");
        var selectSelected = document.getElementsByClassName("select-selected");
        for (i = 0; i < selectSelected.length; i++) {
            if (elmnt == selectSelected[i]) {
                arrNo.push(i)
            } else {
                selectSelected[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < selectItems.length; i++) {
            if (arrNo.indexOf(i)) {
                selectItems[i].classList.add("select-hide");
            }
        }
    }
    document.addEventListener("click", closeAllSelect);

//planche medias
    plancheImage()

//creation footer media
        var likeBottom = document.createElement('div');
        likeBottom.setAttribute("class","like__bottom");
            var likeTotal = document.createElement('p');    
            likeTotal.textContent = totalLike;
        likeBottom.appendChild(likeTotal)
            var heart = document.createElement('i');
            heart.setAttribute("class","fas fa-heart");
        likeBottom.appendChild(heart)
    mediaBottom.appendChild(likeBottom);
        var pricePers = document.createElement('p');
        pricePers.setAttribute("class","media__price");
        pricePers.textContent = sourcePers.price + '€/jour';
    mediaBottom.appendChild(pricePers);
};

var triValue="";

//à placer en début de JS avec class Photographers
function Image(options){
    this.id = options.id;
    this.photographerId = options.photographerId;
    this.title = options.title;
    this.image = options.image;
    this.tags = options.tags;
    this.likes = options.likes;
    this.date = options.date;
    this.price = options.price;
}

function Video(options){
    this.id = options.id;
    this.photographerId = options.photographerId;
    this.title = options.title;
    this.video = options.video;
    this.tags = options.tags;
    this.likes = options.likes;
    this.date = options.date;
    this.price = options.price;
}

function ImageFactory(){}
ImageFactory.prototype.mediaClass = Image;
ImageFactory.prototype.createMedia = function(options){
    switch(options.mediaType){
        case "image":
            this.mediaClass = Image;
            break;
        case "video":
            this.mediaClass = Video;
            break;
    }
    return new this.mediaClass(options);
};

function VideoFactory(){}
VideoFactory.prototype = new ImageFactory();
VideoFactory.prototype.mediaClass=Video;

function plancheImage(){
    var plageMedia = document.querySelector('.plage__media');
    var plageMediaMedia = document.createElement('div');
    plageMediaMedia.setAttribute('class','medias');
for(var mediacompteur = 0; mediacompteur<myJsonParse["media"].length; mediacompteur++){
    var media=myJsonParse["media"][mediacompteur];
    var medias = document.createElement('div');
    medias.setAttribute('class','mediasInside');
    if(media.photographerId===sourcePers.id){
        if (media.video === undefined){
            var imageFactory = new ImageFactory();
            var image = imageFactory.createMedia(media);
            var photoMedia = document.createElement('img');
            photoMedia.setAttribute("class","media__photo");
            photoMedia.setAttribute('src',"Images/SamplePhotos/"+sourcePers.name.split(' ')[0]+"/resized/" + media.image);
            photoMedia.setAttribute("alt",media.title);
            medias.appendChild(photoMedia);
        }
        if(media.image === undefined){
            var videoFactory = new VideoFactory();
            var video = videoFactory.createMedia(media);
            var videoMedia = document.createElement('video');
            videoMedia.setAttribute("class","media__photo");
            videoMedia.setAttribute('src',"Images/SamplePhotos/"+sourcePers.name.split(' ')[0]+"/resized/" + media.video);
            videoMedia.setAttribute("alt",media.title);
            medias.appendChild(videoMedia);
        }
        var legendMedia = document.createElement('div');
        legendMedia.setAttribute("class","media__legend");
        var titreMedia = document.createElement('h3');
        titreMedia.setAttribute("class","media__titre");
        titreMedia.textContent = media.title;
        legendMedia.appendChild(titreMedia);
        var likeMedia=document.createElement('div');
        likeMedia.setAttribute("class","media__like");
        var likeMediaCount = document.createElement('p');
        likeMediaCount.setAttribute("class","media__like");
        likeMediaCount.textContent = media.likes;
        totalLike = totalLike + media.likes;
        var heart = document.createElement('i');
        heart.setAttribute("class","fas fa-heart");
        likeMedia.appendChild(likeMediaCount);
        likeMedia.appendChild(heart);
        legendMedia.appendChild(likeMedia);
        medias.appendChild(legendMedia);
        plageMediaMedia.appendChild(medias);
    }
    plageMedia.appendChild(plageMediaMedia)
}};

function launchModal(){
    const modalBg = document.createElement('div');
    modalBg.setAttribute("class","bground");
    sectionPhotographe.appendChild(modalBg);
    const content = document.createElement('div');
    content.setAttribute("class","content");
    modalBg.appendChild(content);
    const enteteModal = document.createElement('div');
    enteteModal.setAttribute("class","entete-modal");
    content.appendChild(enteteModal);
    enteteModal.innerHTML = "<h3 class='titre-modal2'>Contactez-moi</br>"+sourcePers.name+"</h3>";
    const close = document.createElement('span');
    close.setAttribute("class","close");
    enteteModal.appendChild(close);
    const closeBtn = document.querySelectorAll(".close");
    closeBtn.forEach((btnClose) => btnClose.addEventListener("click", closeModal));
    const modalBody = document.createElement('div');
    modalBody.setAttribute("class","modal-body");
    content.appendChild(modalBody);
    const formModal = document.createElement('form');
    formModal.setAttribute("name","contact");
    formModal.setAttribute("action","index.html");
    formModal.setAttribute("method","POST");
    formModal.setAttribute("onsubmit","return validate()");
    modalBody.appendChild(formModal);
    const formDataPrenom = document.createElement('div');
    formDataPrenom.setAttribute("class","formData");
    formModal.appendChild(formDataPrenom);
    formDataPrenom.innerHTML = "<label for='first'>Prénom</label></br>";
    const inputPrenom = document.createElement('input');
    inputPrenom.setAttribute("class","text-control");
    inputPrenom.setAttribute("type","text");
    inputPrenom.setAttribute("id","first");
    inputPrenom.setAttribute("name","first");
    formDataPrenom.appendChild(inputPrenom);
    const formDataNom = document.createElement('div');
    formDataNom.setAttribute("class","formData");
    formModal.appendChild(formDataNom);
    formDataNom.innerHTML = "<label for='last'>Nom</label></br>";
    const inputNom = document.createElement('input');
    inputNom.setAttribute("class","text-control");
    inputNom.setAttribute("type","text");
    inputNom.setAttribute("id","last");
    inputNom.setAttribute("name","last");
    formDataNom.appendChild(inputNom);
    const formDataMail = document.createElement('div');
    formDataMail.setAttribute("class","formData");
    formModal.appendChild(formDataMail);
    formDataMail.innerHTML = "<label for='email'>Email</label></br>";
    const inputMail = document.createElement('input');
    inputMail.setAttribute("class","text-control");
    inputMail.setAttribute("type","email");
    inputMail.setAttribute("id","email");
    inputMail.setAttribute("name","email");
    formDataMail.appendChild(inputMail);
    const formDataMessage = document.createElement('div');
    formDataMessage.setAttribute("class","formData");
    formModal.appendChild(formDataMessage);
    formDataMessage.innerHTML = "<label for='message'>Votre Message</label></br>";
    const inputMessage = document.createElement('textarea');
    inputMessage.setAttribute("class","text-control");
    inputMessage.setAttribute("rows","4");
    inputMessage.setAttribute("id","message");
    inputMessage.setAttribute("name","message");
    formDataMessage.appendChild(inputMessage);
    const btnEnvoi = document.createElement('button');
    btnEnvoi.setAttribute("class","button btn__submit btn__contact");
    btnEnvoi.setAttribute("type","submit");
    btnEnvoi.setAttribute("value","Envoyer");
    btnEnvoi.innerText="Envoyer";
    formModal.appendChild(btnEnvoi);
}

function closeModal() {
    const modalBg = document.querySelector(".bground");
    sectionPhotographe.removeChild(modalBg);
}
