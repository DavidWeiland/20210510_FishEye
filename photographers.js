var myJsonPhotographers = '{"photographers":[{"name":"Mimi Keel","id":243,"city":"London","country":"UK","tags":["portrait","events","travel","animals"],"tagline":"Voir le beau dans le quotidien","price":400,"portrait":"MimiKeel.jpg"},{"name":"Ellie-Rose Wilkens","id":930,"city":"Paris","country":"France","tags":["sports","architecture"],"tagline":"Capturer des compositions complexes","price":250,"portrait":"EllieRoseWilkens.jpg"},{"name":"Tracy Galindo","id":82,"city":"Montreal","country":"Canada","tags":["art","fashion","events"],"tagline":"Photographe freelance","price": 500,"portrait":"TracyGalindo.jpg"},{"name":"Nabeel Bradford","id":527,"city":"Mexico City","country":"Mexico","tags":["travel","portrait"],"tagline":"Toujours aller de l\'avant","price":350,"portrait":"NabeelBradford.jpg"},{"name":"Rhode Dubois","id":925,"city":"Barcelona","country":"Spain","tags":["sport","fashion","events","animals"],"tagline":"Je crée des souvenirs","price":275,"portrait":"RhodeDubois.jpg"},{"name":"Marcel Nikolic","id":195,"city":"Berlin","country":"Germany","tags":["travel","architecture"],"tagline":"Toujours à la recherche de LA photo","price":300,"portrait":"MarcelNikolic.jpg"}]}';
const myNewJsonPhotographers = JSON.parse(myJsonPhotographers);

const section = document.querySelector('#section');

    vignetPhotographers(myNewJsonPhotographers);

function vignetPhotographers(jsonObj) {
    const pers = jsonObj['photographers'];
  
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
        var srcPortrait = "Images/SamplePhotos/PhotographersIdPhotos/" + pers[i].portrait;
    
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