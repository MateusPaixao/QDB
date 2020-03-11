import React from 'react';

export const Reviews = ({ Product, Reviews, ReviewOpen, handleReviews }) => {
  // const [status, setStatus] = React.useState(ReviewOpen);
  const [lastReviews, setLastReviews] = React.useState(0);
  const [handle, setHandle] = React.useState('+');

  React.useEffect(() => {
    console.log(ReviewOpen);
    ReviewOpen == false ? setHandle('+') : setHandle('-');
  }, [ReviewOpen]);

  React.useEffect(() => {
    new Promise(resolve => {
      let request = new XMLHttpRequest();
      let url = `https://service.yourviews.com.br/api/v2/pub/review/get?productid=${Product.productId}&rating=5&count=2`;
      request.open('GET', url);
      request.setRequestHeader('YVStoreKey', '388ef2d0-c3b8-4fd6-af13-446b698d544a');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(JSON.parse(request.response));
        }
      };
      request.send();
    }).then(lastReview => {
      setLastReviews(lastReview);
    });

    var yvs = document.createElement('script');
    yvs.type = 'text/javascript';
    yvs.async = true;
    yvs.id = '_yvsrc';
    yvs.src = '//service.yourviews.com.br/script/388ef2d0-c3b8-4fd6-af13-446b698d544a/yvapi.js';
    var yvs_script = document.getElementsByTagName('script')[0];
    yvs_script.parentNode.insertBefore(yvs, yvs_script);
  }, []);

  // const handleStatus = () =>{
  //     setStatus(!status);
  // }

  const stars = () => {
    let stars = [];
    let i = 1;
    for (i = 1; i <= Reviews.Rating; i++) {
      stars.push(
        <svg
          className="info__reviewsContainer__content__stars__star"
          viewBox="0 0 88 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M43.91.047a2 2 0 0 0-1.819 1.384l-9.42 29.194-30.667-.06a2 2 0 0 0-1.177 3.62l24.85 17.983-9.541 29.164a2 2 0 0 0 3.08 2.238l24.779-18.083 24.79 18.084a2 2 0 0 0 3.078-2.239l-9.541-29.164 24.85-17.982a2 2 0 0 0-1.176-3.621l-30.669.06-9.43-29.195A2 2 0 0 0 43.911.047z"
            fill="#0C0C0C"
          />
        </svg>
      );
    }
    while (i > Reviews.Rating && i <= 5) {
      stars.push(
        <svg
          className="info__reviewsContainer__content__stars__star set--outline"
          viewBox="0 0 88 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M43.91.047a2 2 0 0 0-1.819 1.384l-9.42 29.194-30.667-.06a2 2 0 0 0-1.177 3.62l24.85 17.983-9.541 29.164a2 2 0 0 0 3.08 2.238l24.779-18.083 24.79 18.084a2 2 0 0 0 3.078-2.239l-9.541-29.164 24.85-17.982a2 2 0 0 0-1.176-3.621l-30.669.06-9.43-29.195A2 2 0 0 0 43.911.047z"
            stroke="#0C0C0C"
          />
        </svg>
      );
      i++;
    }
    return stars;
  };

  const viewReview = e => {
    e.parentElement.classList.add('setView--true');
  };

  return (
    <div
      id="reviewsContainer"
      className={`info__reviewsContainer container setOpen--${ReviewOpen}`}
    >
      <h2 className="info__title" onClick={() => handleReviews()}>
        Avaliações e Dúvidas
      </h2>
      <span className="info__handle" onClick={() => handleReviews()}>
        {handle}
      </span>

      {Reviews != null ? (
        <div className="info__reviewsContainer__content">
          <p className="info__reviewsContainer__content__rating">{Reviews.Rating}/5</p>
          <span className="info__reviewsContainer__content__stars">{stars()}</span>
          <a href="#" className="info__reviewsContainer__content__totalRating">
            {Reviews.TotalRatings} avaliações
          </a>
          <h3 className="info__reviewsContainer__content__subtitle">Quem usa diz o que?</h3>
          {lastReviews != 0 &&
            lastReviews.Element.map((o, i) => (
              <span
                className={`info__reviewsContainer__content__highlightReview review__${i}`}
                key={i}
              >
                <span className="info__reviewsContainer__content__highlightReview__user">{`${o.UserName}`}</span>
                <span className="info__reviewsContainer__content__highlightReview__review">
                  {o.Review}
                </span>
                {o.Review.length > 142 && (
                  <button className="cta-text" onClick={e => viewReview(e.currentTarget)}>
                    Ver Mais
                  </button>
                )}
              </span>
            ))}
          <div className="yourViews">
            <h3 className="info__reviewsContainer__content__subtitle">Ultimas Avaliações</h3>
            <div>
              <div id="yv-reviews" className="yv-reviews"></div>
            </div>
            <div>
              <div className="yv-qa"></div>
            </div>
            <div className="hidden">
              <div id="yv-review-quickreview"></div>
            </div>
          </div>
          {/* <div id="yv-review-quickreview"></div>  */}
        </div>
      ) : (
        <React.Fragment>
          <h3 className="info__subtitle">
            Esse produto não foi avaliado ainda, seja o primeiro a avaliar
          </h3>
          <div className="yourViews">
            <div>
              <div id="yv-reviews" className="yv-reviews"></div>
            </div>
            <div>
              <div className="yv-qa"></div>
            </div>
            <div className="hidden">
              <div id="yv-review-quickreview"></div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
