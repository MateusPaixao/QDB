export function getBannerRetorna(){
    let bannerRetorna = document.querySelector("noscript.retornaBanner");
        let Content =  bannerRetorna.textContent.split('<div class="box-banner">')[1];
        let banUrl = Content.substring(
            Content.lastIndexOf('href="') + 6, 
            Content.lastIndexOf('">')
        );
        let banImg = Content.substring(
            Content.lastIndexOf('src="') + 5, 
            Content.lastIndexOf('?v=')
        );
    bannerRetorna.nextElementSibling.href = banUrl;
    bannerRetorna.nextElementSibling.childNodes[0].dataset.src = banImg;
}