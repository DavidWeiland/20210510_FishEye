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
const retourBtn = document.querySelector('.retour');

//bouton retour
var ratio = 0.5;
var interOptions = {
    root:null,
    rootMargin:'0px 0px 0px 0px',
    threshold: ratio
}

function interDo(entries, observer){
    entries.forEach(function(entry){
        if(entry.intersectionRatio < ratio){
            retourBtn.style.display="block";
        }else{
            retourBtn.style.display="none";
        }
    })
}

var observer = new IntersectionObserver (interDo, interOptions);
var interTarget = nav;
observer.observe(interTarget);

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
        //vignetteLien.setAttribute('href','#' + this.id);
        vignetteLien.setAttribute('class',"vignette");
        vignetteLien.setAttribute('onclick',"return pagePhotographer(myJsonParse.photographers["+i+"])");
        var imgPortrait = document.createElement('img');
        imgPortrait.setAttribute("class","vignette__photo");
        imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Resized/" + this.portrait);
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
    }
}

vignetPhotographers(myJsonParse);

var i ; //var de boucle commune

function vignetPhotographers(jsonObj){
    var sourceJson = jsonObj["photographers"];
    for ( i = 0; i < sourceJson.length; i++){
    construction(sourceJson);
    }
}

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
            }
        }
    })
};

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
            }
        }
    }
};

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
var likeMedia;
var likeMediaCount;
var totalLike;
var increLike;
//préparation lightbox
var tableauLiens =[];
var tableauTitres = [];
var tableauLikes = [];
var index;
//construction pages photographe
function pagePhotographer(jsonObj){
    sourcePers = jsonObj;
//initialisation
    while (section.firstChild){
        section.removeChild(section.firstChild);
    };
    nav.style.display = "none";
    h1.style.display = "none";
    retourBtn.style.display='none';
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
    imgPortrait.setAttribute("src","Images/SamplePhotos/PhotographersIdPhotos/Resized/" + sourcePers.portrait);
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
            tableauLiens = [];
            tableauTitres = [];
            tableauLikes = [];
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
};

var triValue="";

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
var mediacompteur;
function plancheImage(){
    totalLike=0;
if (tableauLikes.length===0){
    for(var many = 0; many<myJsonParse["media"].length; many++){
        var media=myJsonParse["media"][many];
        tableauLikes.push(media.likes);
    }
}
    var plageMedia = document.querySelector('.plage__media');
    plageMedia.innerHTML='';
    var plageMediaMedia = document.createElement('div');
    plageMediaMedia.setAttribute('class','medias');
    for(mediacompteur = 0; mediacompteur<myJsonParse["media"].length; mediacompteur++){
        var media=myJsonParse["media"][mediacompteur];
        var medias = document.createElement('div');
        medias.setAttribute('class','mediasInside');
        var lightboxLien = document.createElement('a');
        if(media.photographerId===sourcePers.id){
            if (media.video === undefined){
                var imageFactory = new ImageFactory();
                var image = imageFactory.createMedia(media);
                lightboxLien.setAttribute('href',"Images/SamplePhotos/"+sourcePers.name.split(' ')[0]+ "/Resized/" +media.image);
                lightboxLien.setAttribute('class','lien__media');
                var photoMedia = document.createElement('img');
                photoMedia.setAttribute("class","media__photo");
                photoMedia.setAttribute('src',"Images/SamplePhotos/"+sourcePers.name.split(' ')[0]+"/Resized/" + media.image);
                photoMedia.setAttribute("alt",media.title);
                lightboxLien.appendChild(photoMedia)
                medias.appendChild(lightboxLien);
            } if(media.image === undefined){
                var videoFactory = new VideoFactory();
                var video = videoFactory.createMedia(media);
                lightboxLien.setAttribute('href',"Images/SamplePhotos/"+sourcePers.name.split(' ')[0]+"/" + media.video)
                lightboxLien.setAttribute('class','lien__media');
                var videoMedia = document.createElement('video');
                videoMedia.setAttribute("class","media__photo");
                videoMedia.setAttribute('src',"Images/SamplePhotos/"+sourcePers.name.split(' ')[0]+"/" + media.video);
                videoMedia.setAttribute("alt",media.title);
                lightboxLien.appendChild(videoMedia)
                medias.appendChild(lightboxLien);
            }
            tableauLiens.push(lightboxLien.getAttribute('href'))
            var legendMedia = document.createElement('div');
            legendMedia.setAttribute("class","media__legend");
            var titreMedia = document.createElement('h3');
            titreMedia.setAttribute("class","media__titre");
            titreMedia.textContent = media.title;
            tableauTitres.push(media.title);
            legendMedia.appendChild(titreMedia);
            likeMedia=document.createElement('div');
            likeMedia.setAttribute("class","media__like");
            likeMediaCount = document.createElement('p');
            likeMediaCount.setAttribute("class","media__like");
            var heart = document.createElement('i');
            heart.setAttribute("class","fas fa-heart");
            heart.setAttribute('data-compteur',mediacompteur);
            plusLikes(tableauLikes[mediacompteur])
            totalLike = totalLike + tableauLikes[mediacompteur];
            likeMedia.appendChild(heart);
            legendMedia.appendChild(likeMedia);
            medias.appendChild(legendMedia);
            plageMediaMedia.appendChild(medias);
        }
        plageMedia.appendChild(plageMediaMedia)
    }
//creation footer media
    var mediaBottom = document.createElement('div');
    mediaBottom.setAttribute("class","media__bottom");
    sectionPhotographe.appendChild(mediaBottom);
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
    const links = document.querySelectorAll('.lien__media');
    for(var j=0;j<links.length;j++){
        links[j].removeAttribute('href');
        links[j].setAttribute('onclick', 'return lightbox(tableauLiens['+j+'])')
    }
    const hearts = document.querySelectorAll('.fa-heart');
    for(var j=0;j<hearts.length;j++){
        hearts[j].addEventListener('click', function incrementationLikes(e){
            likeIndice = e.target.getAttribute('data-compteur');
            tableauLikes[likeIndice]++;
            mediacompteur=likeIndice;
            likeMedia.removeChild(likeMediaCount)
            likeMediaCount = document.createElement('p');
            likeMediaCount.setAttribute("class","media__like");
            likeMediaCount.textContent=''
            sourceLikes = tableauLikes[likeIndice]
            plancheImage(sourceLikes)
    })}
};

var sourceLikes;
var indexLikes;
function plusLikes(jsonObj){
    sourceLikes = jsonObj;
    likeMediaCount.textContent = sourceLikes;
    likeMedia.appendChild(likeMediaCount);
}

var sourceLightbox;

function lightbox(jsonObj){
    sourceLightbox = jsonObj;
    index = tableauLiens.findIndex(lien => lien === sourceLightbox)
    var image;
    var titre;
    const lightboxDiv= document.createElement('div');
    lightboxDiv.classList.add('lightbox');
    sectionPhotographe.appendChild(lightboxDiv);
    const lightboxClose= document.createElement('button');
    lightboxClose.classList.add('lightbox__close');
    lightboxDiv.appendChild(lightboxClose);
    const lightboxNext= document.createElement('button');
    lightboxNext.classList.add('lightbox__next');
    lightboxDiv.appendChild(lightboxNext);
    const lightboxPrev= document.createElement('button');
    lightboxPrev.classList.add('lightbox__prev');
    lightboxDiv.appendChild(lightboxPrev);
    const container= document.createElement('div');
    container.classList.add('lightbox__container');
    lightboxDiv.appendChild(container);
    const containerElement= document.createElement('div');
    containerElement.classList.add('lightbox__container--element');
    
    loadImage();
    function loadImage(){
        if (sourceLightbox.split('.')[1]==="jpg"){
            image = document.createElement('img');
            image.src = sourceLightbox;
        } else if (sourceLightbox.split('.')[1]==="mp4"){
            image = document.createElement('video');
            image.controls = true;
            image.autoplay = true;
            image.style.width = "100%";
            image.setAttribute('name',"media");
            var imageSrc = document.createElement('source');
            imageSrc.type="video/mp4";
            imageSrc.src = sourceLightbox;
            image.appendChild(imageSrc)
        }
        titre = document.createElement('h4');
        titre.textContent = tableauTitres[index]
        container.innerHTML='';
        containerElement.innerHTML='';
        containerElement.appendChild(image);
        containerElement.appendChild(titre);
        container.appendChild(containerElement)
    }
    lightboxClose.addEventListener('click', function closeLightbox(e){
        e.preventDefault();
        sectionPhotographe.removeChild(lightboxDiv);
    })
    lightboxNext.addEventListener('click',function nextLightbox (e){
        e.preventDefault()
        if (index === tableauLiens.length -1){
            index = -1
        }
        index++
        sourceLightbox = tableauLiens[index]
        loadImage()
    })
    lightboxPrev.addEventListener('click', function prevLightbox(e){
        e.preventDefault();
        if (index === 0){
            index = tableauLiens.length
        }
        index--
        sourceLightbox = tableauLiens[index]
        loadImage()
    })
};

//effet bouton contactez-moi
var firstValue;
var lastValue;
var emailValue;
var messageValue;

function launchModal(){
    const modalBg = document.createElement('div');
    modalBg.setAttribute("class","bground");
    sectionPhotographe.appendChild(modalBg);
    const content = document.createElement('div');
    content.setAttribute("class","content");
    modalBg.appendChild(content);
    if (firstValue == null || firstValue == "" || firstValue == undefined|| lastValue == null || lastValue == "" || lastValue == undefined|| emailValue == null || emailValue == "" || emailValue == undefined|| messageValue == null || messageValue == "" || messageValue == undefined){
        const enteteModal = document.createElement('div');
        enteteModal.setAttribute("class","entete-modal");
        content.appendChild(enteteModal);
        enteteModal.innerHTML = "<h4 class='titre-modal'>Contactez-moi</br>"+sourcePers.name+"</h4>";
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
        btnEnvoi.setAttribute("class","button btn__submit");
        btnEnvoi.setAttribute("type","submit");
        btnEnvoi.setAttribute("value","Envoyer");
        btnEnvoi.innerText="Envoyer";
        formModal.appendChild(btnEnvoi);
        control();
    }else{
        content.innerHTML = "<h4 class='message-modal'>Vous avez déjà envoyé un message à "+sourcePers.name+"</h4><button class='btn-close btn__contact' value='Close'>Close</button>"
        const closeBtnModal = document.querySelector(".btn-close");
        closeBtnModal.addEventListener('click',closeModal);
    }
}

function closeModal() {
    const modalBg = document.querySelector(".bground");
    sectionPhotographe.removeChild(modalBg);
}

function control(){
    const formData = document.querySelectorAll(".formData");
    const textControl = document.querySelectorAll(".text-control");
    for( var j = 0; j < textControl.length; j++){
        textControl[j].setAttribute("data-compteur",j);
    }
    for (var i = 0; i < formData.length; i++) {
        formData[i].addEventListener("change", function(e){
            var value = e.target.value;
            var idInput = e.target.id;
            var nameInput =e.target.name;
            var iControl = e.target.getAttribute("data-compteur");
            function testInput(regex, chaine){
                if (regex.test(chaine)) {
                    formData[iControl].removeAttribute("data-error")
                    formData[iControl].setAttribute("data-error-visible",false);
                    switch (nameInput) {
                        case "first" :
                            firstValue = value;
                            break;
                        case "last" :
                            lastValue = value;
                            break;
                        case "email" :
                            emailValue = value;
                            break;
                        case "message" :
                            messageValue = value;
                        break;
                    }
                } else {
                    formData[iControl].setAttribute("data-error-visible",true);
                    switch (nameInput) {
                        case "first" :
                            firstValue = "";
                            formData[iControl].setAttribute("data-error","Veuillez entrer un minimum de 2 caractères (Aa-Zz)");
                            break;
                        case "last" :
                            lastValue = "";
                            formData[iControl].setAttribute("data-error","Veuillez entrer un minimum de 2 caractères (Aa-Zz)");
                            break;
                        case "email" :
                            emailValue = "";
                            formData[iControl].setAttribute("data-error","Veuillez renseigner un email valide (***@***.***)");
                            break;
                        case "message" :
                            messageValue = "";
                            formData[iControl].setAttribute("data-error","Veuillez préciser votre demande");
                            break;
                        default :
                            formData[iControl].setAttribute("data-error","cet élément n'est pas renseigné correctement");
                    }
                }
            }
            switch (idInput) {
                case "first" :
                case "last" :
                    testInput(/^[A-Za-z -]\D{1,}$/,value);
                    break;
                case "email" :
                    testInput(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/,value);
                    break;
                case "message" : 
                    testInput(/^[a-zA-Z0-9 -_'.!,?:=$€]{1,}$/,value);
                    break;
                default:;
            }
        })
    }
}

function validate(){
    const form = document.querySelector("form");
    const enteteModal = document.querySelector(".entete-modal");
    const modalBody = document.querySelector(".modal-body");
    if (firstValue == null || firstValue == "" || firstValue == undefined){
        document.querySelector('#first').parentNode.setAttribute("data-error-visible",true);
        document.querySelector('#first').parentNode.setAttribute("data-error","Merci d'indiquer votre prénom");
        return false;
    } else if (lastValue == null || lastValue == "" || lastValue == undefined){
        document.querySelector('#last').parentNode.setAttribute("data-error-visible",true);
        document.querySelector('#last').parentNode.setAttribute("data-error","Merci d'indiquer votre nom");
        return false;
    } else if (emailValue == null || emailValue == "" || emailValue == undefined){
        document.querySelector('#email').parentNode.setAttribute("data-error-visible",true);
        document.querySelector('#email').parentNode.setAttribute("data-error","Merci d'indiquer votre email");
        return false;
    } else if (messageValue == null || messageValue == "" || messageValue == undefined){
        document.querySelector('#message').parentNode.setAttribute("data-error-visible",true);
        document.querySelector('#message').parentNode.setAttribute("data-error","Merci d'indiquer votre message");
        return false;
    } else {
        form.style.display = "none";
        enteteModal.style.opacity ="0";
        modalBody.innerHTML = "<h4 class='message-modal'>Merci !<br/><br/>Votre demande a bien été envoyée à "+sourcePers.name+"</h4><button class='btn-close btn__contact' value='Close'>Close</button>"
        constructionForm()
        const closeBtnModal = document.querySelector(".btn-close");
        closeBtnModal.addEventListener('click',closeModal);
        return true;
    }
};

var envoiForm=[]

function ValueForm(recever){
    this.recever = recever;
    this.first = "first";
    this.last = "last";
    this.email = "email";
    this.message = "message";
    this.getInfo = function(){
        var valueForm =[];
        valueForm.push(this.recever);
        valueForm.push(this.first);
        valueForm.push(this.last);
        valueForm.push(this.email);
        valueForm.push(this.message);
        envoiForm.push(valueForm);
        console.log(JSON.stringify(envoiForm));
    };
};

function constructionForm(){
    var myFormulaire = new ValueForm(sourcePers.id);
    myFormulaire.first = firstValue;
    myFormulaire.last = lastValue;
    myFormulaire.email = emailValue;
    myFormulaire.message = messageValue;
    myFormulaire.getInfo();
}