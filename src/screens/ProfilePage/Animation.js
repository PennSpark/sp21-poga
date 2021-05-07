import React from 'react';
import Lottie from 'lottie-react';
import Evolution1 from '../../images/animations/evolution1.json'
import Evolution2 from '../../images/animations/evolution2.json'
import Evolution3 from '../../images/animations/evolution3.json'

const style = {
    height: 200,
    width: 180
};

const plantAnimation = () => {
    const score = 61;

    if (score < 300) {
        return <Lottie
            animationData={Evolution1}
            style={style}
        />
    } else if (score < 600) {
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