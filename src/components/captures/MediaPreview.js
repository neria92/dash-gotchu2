import React, { useContext } from 'react'
import { EditCaptureContext } from './context/EditCaptureContext'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMedia } from '../../helpers/getMedia'
import { VideoPlayer } from './VideoPlayer'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export const MediaPreview = () => {

    const { capture } = useContext(EditCaptureContext);
    const media = capture.evidences
    const multimedia = getMedia(media)


    return (

        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
            {
                multimedia.map((item) => {
                    return (
                        <SwiperSlide key={item.uri} >
                            {({ isActive }) => (
                                <div className='aspect-w-3 aspect-h-3 sm:aspect-w-1 sm:aspect-h-1 lg:aspect-w-2 lg:aspect-h-4'>

                                    {item.video
                                        ? <VideoPlayer
                                            src={item.uri}
                                            focus={isActive}
                                        />
                                        :<img className="shrink-0 snap-center aspect-video object-cover block h-auto w-full bg-cover" src={item.uri} alt='phot_evidence' />
                                    }
                                </div>
                            )}
                        </SwiperSlide>
                    )


                })
            }

        </Swiper>

    )
}
