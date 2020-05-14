import React from 'react';
import SlickSlider from 'react-slick';
import { SvgPrev, SvgNext } from '../Icons';
// import { Arrow, SliderStyles } from './styles']

const PrevArrow = props => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <SvgPrev />
    </div>
  );
};

const NextArrow = props => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <SvgNext />
    </div>
  );
};

const Slider = ({ children, settings }) => {
  const sliderSettings = {
    ...settings,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return <SlickSlider {...sliderSettings}>{children}</SlickSlider>;
};

export default Slider;
