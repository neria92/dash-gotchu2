import React from 'react'
import Icon from './Icon'

export const Ranking = ({ rating = .673, style = '' }) => {
    return (
        <div className={` flex flex-row h-20 w-30 flex-wrap  ${style}`}>
            {
                getTypeStars(rating)
            }
        </div>
    )
}


const Star = ({ type }) => {
    return (
        <div className='flex items-center justify-center'>
            <Icon
                style='h-4 w-4 md:h-8 md:w-8'
                name={type} 
                color='#DBC311'
            />

        </div>
    )

}



const getTypeStars = (rating) => {

    let star = parseInt(rating);
    let mediumStar = 0;
    const fractionPart = (rating - star) * 10;

    // Si la parte fraccionaria de su ranking es mayor a 0.8 Se le otorga una estrella completa.
    if (fractionPart <= 8 && fractionPart > 0) {
        mediumStar = 1;
    } else {
        if (fractionPart!==0 && star < 5) {
            star++;
        }
    }

    const inactiveStar = 5 - star - mediumStar;
    let array = [];
    for (let i = 0; i < star; i++) {
        array.push(
            <Star
                type='star'
                key={i + 'star'}
            />
        );
    }
    if (mediumStar > 0) {
        array.push(
            <Star
                type='mediumStar'
                key={'mediumStar'}
            />
        );
    }
    for (let i = 0; i < inactiveStar; i++) {
        array.push(
            <Star
                type='inactiveStar'
                key={i + 'inactiveStar'}
            />
        );
    }
    return array;
}