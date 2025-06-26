import React from 'react'
import '../Css/AboutUs.css'

const AboutUs = () => {
  return (
    <div className='about'> 
    <div className='about-left'>
      <h2>What Do We Offer?</h2>
      <p>
      At Batu E-commerce, we specialize in delivering a diverse and carefully curated selection of fashion products for women, men, and children. From everyday essentials to statement pieces, we offer a wide range of clothing, shoes, bags, jewelry, and accessories that reflect the latest trends and timeless style.
      Each item in our store is selected with great attention to quality, design, and comfort. We collaborate with trusted suppliers and designers to ensure that every product we offer is original, ethically produced, and made to last. Whether you're looking for chic office wear, cozy loungewear, elegant evening outfits, or playful styles for kids — we've got you covered.
      Our collection is updated regularly to reflect seasonal trends and our customers' evolving tastes, so there's always something new to discover.
      </p>
    </div>
      <img src={"/new-arrivals/AboutUs/about_img3_img.webp"} alt="" />
      <div className='about-right'>
      <h2>Why Choose Us?</h2>
      <span>Fast & Reliable Shipping:</span>
      <p>
      We process your orders quickly and deliver them to your doorstep with trusted courier partners.
      </p>
      <span>Secure Payment Options:</span>
      <p>
      Shop with confidence using encrypted and trusted payment gateways.
      </p>
      <span>Customer-Centric Service:</span>
      <p>
          Our dedicated support team is available 24/7 to assist you with any questions, issues, or concerns.
      </p>
      <span>Easy Returns & Exchanges:</span>
      <p>
      Changed your mind? No problem. Enjoy a hassle-free return and exchange policy within 14 days of your purchase.
      </p>
      <span>Style & Quality Assurance: </span>
      <p>
      We blend trend-forward fashion with high-quality materials, offering you items that look good and last long.
      </p>
      <p>
      We're more than just a store — we're a brand built on passion, transparency, and the desire to make your online shopping experience smooth.
      </p>  
      </div>
      <img src={"/new-arrivals/AboutUs/about_img4_img.webp"} alt="" />
    </div>
  )
}

export default AboutUs