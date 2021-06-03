class Lightbox{
    static init(){
        const links=Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
        const gallery = links.map(link => link.getAttribute('href'))
        links.forEach(link => link.addEventListener('click', e => {
                e.preventDefault();
                new Lightbox(e.currentTarget.getAttribute('href'), gallery);
            }))
    }

    constructor (url, gallery){
        this.element = this.buildDOM(url);
        this.gallery = gallery;
        this.loadImage(url);
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element);
        document.addEventListener('keyup', this.onKeyUp);
    }

    loadImage(url){
        this.url=null
        var image = document.createElement('img');
        const container = this.element.querySelector('.lightbox__container');
        const loader = document.createElement('div')
        loader.classList.add('lightbox__loader');
        container.innerHTML =''
        container.appendChild(loader);
        this.url = url
        image.onload = () => {
            container.removeChild(loader);
            container.appendChild(image);
        }
        image.src=url;
    }

onKeyUp (e){
    if(e.key==='Escape'){
        this.close(e)
    }else if(e.key==='ArrowLeft'){
        this.prev(e)
    }else if(e.key==='ArrowRight'){
        this.next(e)
    }
}
    
close (e){
    e.preventDefault()
    this.element.classList.add('fadeOut')
    window.setTimeout(()=>{
        this.element.parentElement.removeChild(this.element)
    }, 500)
    document.removeEventListener('keyup', this.onKeyUp);
}

next (e){
e.preventDefault()
var i = this.gallery.findIndex(image => image === this.url)
if (i=== this.gallery.length -1){
    i = -1
}
this.loadImage(this.gallery[i + 1])
}

prev (e){
e.preventDefault()
var i = this.gallery.findIndex(image => image === this.url)
if (i=== 0){
    i = this.gallery.length
}
this.loadImage(this.gallery[i - 1])
}

    buildDOM(url){
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = '<button class="lightbox__close">Fermer</button><button class="lightbox__next">Suivant</button><button class="lightbox__prev">Précédent</button><div class="lightbox__container"></div>';
        dom.querySelector('.lightbox__close').addEventListener('click',this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click',this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click',this.prev.bind(this))
        return dom;
    }
}

Lightbox.init()