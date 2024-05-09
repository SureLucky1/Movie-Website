import React from "react";
import Carousel1 from "./carousel1/carousel1";
import Container from "./containers/container";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "./footer/footer"; 

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
