
import React, { useRef, useState, useEffect } from 'react'
import Icon from '../Icon'

export const VideoPlayer = ({ src, focus = false }) => {

    const [playing, setPlaying] = useState(true);
    const [isActiveSound, setIsActiveSound] = useState(false)
    const video = useRef();

    const handlePlay = () => {

        playing
            ? video.current.pause()
            : video.current.play()

        setPlaying(prev => !prev)
    }

    useEffect(() => {
        focus
            ? video.current.play()
            : video.current.pause()
    }, [focus])


    return (
        <div className='shrink-0 relative snap-center aspect-video w-full  rounded overflow-hidden shadow-lg shadow-blue-700/30'>

            <video
                className='aspect-video object-cover '
                src={src}
                muted={isActiveSound}
                controls={false}
                ref={video}
                loop
            />

            <PlayButton onClick={handlePlay} playing={playing} />

            <SoundButton onClick={setIsActiveSound} isActiveSound={isActiveSound} />

        </div>

    )
}


const PlayButton = ({ onClick, playing }) => {

    return (
        <div className='absolute z-10 bg-gray-400  rounded-full w-8 h-8 top-0 m-auto inset-0' onClick={onClick}>
            <Icon
                style='w-8 h-8 bg-black-200 rounded  '
                name={`${!playing?'play':'pause'}`}
                color='#fff'

            />

        </div>
    )
}

const SoundButton = ({ onClick, isActiveSound }) => {

    return (
        <div className='absolute z-10 bg-gray-400  rounded-full w-8 h-8 bottom-0 right-0' onClick={() => onClick(prev => !prev)}>
            <Icon
                style='w-8 h-8 bg-black-200 rounded  '
                name={`${isActiveSound ? 'soundInactive' : 'soundActive'}`}
                color='#fff'
            />

        </div>
    )
}