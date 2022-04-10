import React, { useState } from 'react'
import { getMedia } from '../../helpers/getMedia'
import ActiveToIndex from './ActiveToIndex'
import { VideoPlayer } from './VideoPlayer'

export const MediaPreview = ({ media }) => {

    const multimedia = getMedia(media)
    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <>
            <div className=' flex gap-4  items-center md:w-full overflow-x-auto snap-x overflow-hidden '>
                {
                    multimedia.map((item, index) => {
                        
                        if (item.photo) {
                            return <img className="shrink-0 snap-center aspect-video object-cover block h-auto w-full bg-cover" src={item.uri} key={item.uri} />
                        }
                        if (item.video) {
                            return (

                                <VideoPlayer
                                    key={item.uri}
                                    src={item.uri}
                                    focus={media[index]?.uri === item?.uri}
                                />
                            )
                        }
                    })
                }

            </div>
            <ActiveToIndex
                total={multimedia.map((_, i) => i)}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
        </>
    )
}
