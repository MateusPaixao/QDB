import React from 'react';
// const Breadcrumbs = () => {
//     const [breadcrumbs, setBreadCrumbs] = React.useState([]);

//     React.useEffect(() => {
//         let breadcrumbsContent = document.querySelector(".breadcrumbs").textContent.split('<li ');

//         let breadcrumbsArray = []
//         breadcrumbsContent.map(b => !(/xmlns/g.test(b) || /quem/g.test(b)) && breadcrumbsArray.push(b));
//         setBreadCrumbs(breadcrumbsArray);
//         console.log(breadcrumbs)
//     }, []);

//     return(
//         <div className="breadcrumbs">
//             {
//                 <div className="breadcrumbs__container container">
//                     <a href="/"><h2>Inicio</h2></a>
//                     {
//                         breadcrumbs.map(b =>
//                             <a href={
//                                 b.substring(
//                                     b.lastIndexOf('href="') + 6,
//                                     b.lastIndexOf('" r')
//                                 )
//                             }>
//                                 <h2>
//                                     {
//                                         b.substring(
//                                             b.lastIndexOf('">') + 2 ,
//                                             b.lastIndexOf('</a')
//                                         )
//                                     }
//                                 </h2>
//                             </a>
//                         )
//                     }
//                 </div>
//             }
//         </div>
//     )
// }

// export default Breadcrumbs;

// Working Code
const Breadcrumbs = () => {
  let breadcrumbs = document.querySelector('.breadcrumbs').textContent.split('<li ');

  return (
    <div className="breadcrumbs">
      {
        <div className="breadcrumbs__container container shell">
          <a href="/">
            <h2>Inicio</h2>
          </a>
          {breadcrumbs.map((bread, i) =>
            i == 0 || i == 1 ? (
              ''
            ) : (
                <>
                  <a href={bread.substring(bread.indexOf('href="') + 6, bread.lastIndexOf('" i'))}>
                    <h2>{bread.substring(bread.lastIndexOf('">') + 2, bread.lastIndexOf('</span>'))}</h2>
                  </a>
                  {/* {console.log("OPA", bread.substring(bread.indexOf('href="') + 6, bread.lastIndexOf('" i')))} */}
                </>

              )
          )}
        </div>
      }
    </div>
  );
};

export default Breadcrumbs;
