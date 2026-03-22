import React from "react";

function Contact() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Contact Us</h2>

      <div className="row">
        {/* Left: Contact Form */}
        <div className="col-md-6 mb-4">
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>

        {/* Right: Address + Map */}
        <div className="col-md-6 ">
        <div className=" d-flex ">
          <h4>Our Address :</h4>
          <p>
            123 Hardware Street
            Meath, Ireland
          </p>
        </div>
        <hr />
          <div style={{ width: "100%", height: "350px" }}>
            <iframe
              title="NalburShop Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23754.123456789!2d-6.657!3d53.583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9f00000001%3A0xabcdef123456789!2sMeath%2C%20Ireland!5e0!3m2!1sen!2sus!4v1671234567890!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
