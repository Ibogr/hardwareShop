import React from "react";
import aboutImage from "../assets/ufuk.jpeg";

function About() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center" style={{ margin:"192px 0" }}>
        {/* Left: Image */}
        <div className="col-md-4 mb-4 mb-md-0">
          <img
            src={aboutImage}
            alt="About Us"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Right: Text */}
        <div className="col-md-6">
          <p className="lead">
            HardWare Shop is an online store offering high-quality and reliable
            hardware products. Customer satisfaction is our priority.
          </p>
          <p>
            Our aim is to provide the best quality hand tools and hardware
            products at affordable prices.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
