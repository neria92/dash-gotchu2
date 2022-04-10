import React, { useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMedia } from '../../helpers/getMedia'
import { VideoPlayer } from './VideoPlayer'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export const MediaPreview = ({ media }) => {

    const multimedia = getMedia(media)


    return (

        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
        >


            {
                multimedia.map((item) => {

                    if (item.photo) {
                        return (
                            <SwiperSlide key={item.uri} >

                                <img className="shrink-0 snap-center aspect-video object-cover block h-auto w-full bg-cover" src={item.uri} />
                            </SwiperSlide>
                        )

                    }
                    if (item.video) {
                        return (
                            <SwiperSlide key={item.uri} >

                                {({ isActive }) => (
                                    <VideoPlayer

                                        src={item.uri}
                                        focus={isActive}
                                    />
                                )}
                            </SwiperSlide>
                        )
                    }
                })
            }

        </Swiper>

    )
}
