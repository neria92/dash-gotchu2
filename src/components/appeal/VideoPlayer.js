
import React, { useRef, useState, useEffect } from 'react'
import Icon from '../Icon'

export const VideoPlayer = ({ src, focus }) => {

    const [playing, setPlaying] = useState(false);
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
        <div className='shrink-0 snap-center w-4/5 rounded overflow-hidden shadow-lg shadow-blue-700/30'>

            <video
                className='aspect-video object-cover'
                src={src}
                muted
                controls
                ref={video}
            />
            {/* <PlayButton
                onClick={handlePlay}
            /> */}
        </div>

    )
}


const PlayButton = ({ onClick }) => {

    return (
        <div className='m-h-screen grid place-content-center ' onClick={onClick}>
            <Icon
                style='w-8 h-8 bg-black-200 rounded inline-flex justify-center  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
                name='play'
                color='#fff'
            />

        </div>
    )
}