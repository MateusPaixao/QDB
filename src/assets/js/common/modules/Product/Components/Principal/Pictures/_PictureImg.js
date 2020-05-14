import React from 'react'

const Picture = ({Src, Alt, SetMain, SkuImg}) => {
    const [loadStatus, setStatus] = React.useState("loading");

    return(
        <img 
            className={loadStatus} 
            src={Src} 
            alt={Alt} 
            onLoad={() => setStatus("loaded")} 
            loading="lazy" 
            onClick={window.innerWidth > 768 && SetMain != undefined ? (e) => SetMain(e.currentTarget, SkuImg.imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0]) : ""}
        />
    )
}

export default Picture