export const ImagePreview = ({ image }) => {
    return (
        <div className='shrink-0 snap-center w-4/5 rounded overflow-hidden shadow-lg shadow-blue-700/30'>
            <img className='aspect-video object-cover' alt='image-evidence' src={image} />
        </div>
    )
}