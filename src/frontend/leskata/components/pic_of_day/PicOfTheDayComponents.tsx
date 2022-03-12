import { Image } from '@mantine/core';
import { useState } from 'react';

function PicOfTheDayComponent() {
    const [currPicUrl, setCurrPicURL] = useState<string>();

    async function fetchImageOfTheDay() {
        const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=6BaJSTfT8toGrjcyJwImEvSg2aofL9bOVYpVYL8d');
        const json = res.json()
        setCurrPicURL(json['url'])
    }

    console.log("alt text: ", currPicUrl.split('/')[-1].split('.')[0]);

    return (
        <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
            <Image
                radius="md"
                src={currPicUrl}
                alt={currPicUrl.split('/')[-1].split('.')[0]}
            />
        </div>
    );
}

export default PicOfTheDayComponent;