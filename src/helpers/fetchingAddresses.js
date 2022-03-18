
import React from 'react'


export const fetchingAddresses = async (text) => {
    console.log('text', text)
    if (text.length < 2) return;

    let myInit = {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' },
        mode: 'no-cors',
        // cache: 'default'
        // crossDomain: true,
    };

    const response = await fetch(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAi21z3jIuTM_363sCqnQBQsgkvpI2qZb8&input=huixqui&radius=5000&language=es",
        {
            method: 'GET',
            headers: {
                
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            mode: 'no-cors',
        })
        .then((response) => {
            console.log('response', response);
            return (response.json())
        })
        .then((result) => {
            console.log("-----------------------------------------");
            result.predictions.map((e) => console.log(e.description));
            return (result.predictions);
        })
        .catch((error) => console.log("error", error));


    return response
}
