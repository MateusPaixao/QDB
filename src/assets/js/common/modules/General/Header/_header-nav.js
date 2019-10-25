export function getBanners(){
    let bannersNav = document.querySelectorAll(".header__nav--banner noscript");

    for(let i = 0; i < bannersNav.length; i++){
        let Content =  bannersNav[i].textContent.split('<div class="box-banner">')[1];
        // if(General.getBrowserVendor() == 'safari/webkit'){
            let banUrl = Content.substring(
                Content.lastIndexOf('href="') + 6, 
                Content.lastIndexOf('">')
            );
            let banImg = Content.substring(
                Content.lastIndexOf('src="') + 5, 
                Content.lastIndexOf('?v=')
            );
        bannersNav[i].nextElementSibling.href = banUrl;
        bannersNav[i].nextElementSibling.childNodes[0].dataset.src = banImg;
    }
}