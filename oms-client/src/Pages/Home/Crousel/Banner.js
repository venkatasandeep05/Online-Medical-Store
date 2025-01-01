import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
function Banner() {
    return (
        <Carousel className="home_image" autoPlay={true} showArrows={true} showThumbs={false} data-ride="carousel">
            <img
                src="https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg"
                alt="Banner_1"
            />
            <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/OHL_Discovery/GW/Monsoon_store/TallHero_1500x600._CB428946608_.jpg"
                alt="Banner_2"
            />
        </Carousel>
    )
}

export default Banner