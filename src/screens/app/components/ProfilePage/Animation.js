import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import Evolution1 from './animations/evolution1.json';
import Evolution2 from './animations/evolution2.json';
import Evolution3 from './animations/evolution3.json';

const style = {
    height: 200,
    width: 180
};

const plantAnimation = () => {
    const score = 55;

    if (score < 30) {
        return <Lottie
            animationData={Evolution1}
            style={style}
        />
    } else if (score < 70) {
        return <Lottie
            animationData={Evolution2}
            style={style}
        />
    } else {
        return <Lottie
            animationData={Evolution3}
            style={style}
        />
    }
};

export default plantAnimation