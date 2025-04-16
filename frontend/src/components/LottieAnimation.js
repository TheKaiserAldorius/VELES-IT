import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../public/animations/menu-animation.json';

const LottieAnimation = ({ style = {}, loop = true, autoplay = true }) => {
  return (
    <Lottie 
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={style}
    />
  );
};

export default LottieAnimation;