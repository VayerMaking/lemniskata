import { Image } from '@mantine/core';
import { useState, useEffect } from 'react';

function PicOfTheDayComponent() {
    const [currPicUrl, setCurrPicURL] = useState<string>();


    async function fetchImageOfTheDay() {
        fetch('https://api.nasa.gov/planetary/apod?api_key=6BaJSTfT8toGrjcyJwImEvSg2aofL9bOVYpVYL8d')
            .then((response) => response.json())
            .then((responseJSON) => {
                setCurrPicURL(responseJSON['hdurl'])
            });
    }
    useEffect(() => { fetchImageOfTheDay() }), []


    return (
        <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
            <Image
                radius="md"
                src={currPicUrl}
                alt={currPicUrl}
            />
        </div>
    );
}

export default PicOfTheDayComponent;