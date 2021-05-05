import React from 'react';
import Lottie from 'lottie-react';
import Evolution1 from '../../images/animations/evolution1.json'

const style = {
    height: 200,
    width: 180
};

const plantAnimation = () => {
    const score = 55;

    if (score > 30) {
        return <Lottie
            animationData={Evolution1}
            style={style}
        />
    }
};

export default plantAnimation 