import { ImagePreview } from "./ImagePreview"
import { VideoPlayer } from "./VideoPlayer"


export const Evidences = ({ media }) => {
    return (
        <section className='flex gap-4 p-4 h-52 items-center md:w-96 overflow-x-auto snap-x '>

            {
                media.map((item, index) => {
                    const focus = media[index].uri === item.uri && item.video
                    if (item.photo) {
                        return <ImagePreview key={item.uri} image={item.uri} />
                    } else {
                        return (
                            <VideoPlayer
                                key={item.uri}
                                src={item.uri}
                                focus={focus}
                            />
                        )
                    }
                })
            }
        </section>
    )
}


