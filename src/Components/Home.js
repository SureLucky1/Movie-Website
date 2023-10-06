import React from "react";
import Carousel1 from "./Carousel1/Carousel1";
import Container from "./Containers/Container";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "./Footer/Footer"; 

function Home({ posts }) {
  return (
    <div>
      <Carousel1 posts={posts} />
      <Container posts={posts} />
      <Footer />
    </div>
  );
}

export default Home;
