class GetUrls {
    constructor(url) {
      this.url = url;
      this.urls = [];
      this.counter = 0;
      this.holder = 'iframeholder';
      this.addElm();
      this.getUrlsBySitemaps();
      setTimeout(()=> {
        this.run();
      }, 2000)
  
    }
    
    addElm()
    {
      let e = document.createElement('div');
      e.setAttribute('id', this.holder );
      document.body.append(e);
    }
  
    addIframe(url)
    {
      let holder = document.getElementById(this.holder);
      holder.innerHTML = "";
      let iframe = document.createElement('iframe');
      iframe.setAttribute('src', url);
      iframe.setAttribute('height', 400);
      iframe.setAttribute('width', 1000);
      holder.append(iframe);
      window.scrollTo(holder.offsetLeft,holder.offsetTop); 
    }
  
    getUrlsBySitemaps() {
          this.getSitemapIndexXml(this.url);        
    }
  
    getSitemapIndexXml(url){
      fetch(url)
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then((data) => { 
  
       let locs = data.getElementsByTagName("loc");
       for(var i = 0; i < locs.length; i++){
         this.getSitemapXml(locs[i].innerHTML)
       }
  
      });
    }
  
    getSitemapXml(url){
      fetch(url)
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then((data) => { 
         let locs = data.getElementsByTagName("loc");
         for(var i = 0; i < locs.length; i++){
           this.addUrl(locs[i].innerHTML)
         }
      });
    }
  
    addUrl(url){
      if(this.urls.includes(url)) return;
      this.urls.push(url)
    }
  
    getUrls() {
      console.log(this.urls);
    }
  
    run() {  
        setTimeout(() => {        
          this.addIframe(this.urls[this.counter]);
          this.counter++;
          if(this.counter < this.urls.length) {
          this.run();
          }
        }, 2000);    
    }
  
    restart() {
      this.counter = 0;
      document.getElementById(this.holder).remove();      
      this.addElm();
      this.run();
    }
  }
// example  will start after 15 seconds  
let out = new GetUrls("https://"+window.location.hostname+"/sitemap_index.xml");
