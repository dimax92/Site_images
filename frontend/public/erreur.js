function mauvaisNomDeDomaine(){
    if(location.host !== "imagione.com" && location.host !== "www.imagione.com"){
        document.querySelector("html").remove();
    }
};
mauvaisNomDeDomaine();

function mauvaisProtocol(){
    if(location.protocol !== "https:"){
        location.protocol="https:";
    }
};
mauvaisProtocol();