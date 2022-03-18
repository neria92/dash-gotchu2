import React, { useState } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


export const AutoCompletePlaces = () => {

    const [address, setAddress] = useState('')
    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value)
        const coors = await getLatLng(results[0])
        setAddress(results[0].formatted_address)
    }
    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <form className='justify-center mb-10 '>
                            <div className='flex relative  p-1 bg-gradient-to-tr from-blue-200 to-blue-50 rounded-full w-2/6 '>
                                <input
                                    type='text'
                                    placeholder='Busca lugar'
                                    {...getInputProps({
                                        placeholder: 'Buscar lugar',
                                        className: 'flex-1 p-2 pl-4 rounded-full w-full',
                                    })}
                                />
                            </div>
                        </form>
                       
                        <div className=" overflow-hidden top-0 left-0 border border-gray-100  bg-white rounded-lg shadow-lg w-2/6">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    // ? 'hover:bg-blue-300 flex gap-4 p4 cursor-pointer bg-blue-500'
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // : 'hover:bg-blue-300 flex gap-4 p4 cursor-pointer bg-blue-500';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#BFD2D9', display:'flex',gap:'1rem',padding:4}
                                    : { backgroundColor: 'white', display:'flex',gap:'1rem', hover:'yellow',padding:4}
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span className='text-sm font-semibold '>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </PlacesAutocomplete>
        </div>

    )
}
