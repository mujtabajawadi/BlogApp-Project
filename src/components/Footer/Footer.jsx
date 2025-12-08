import React from "react";
import { Link } from "react-router-dom";
import { Container, Logo } from "../index";

const Footer = () => {
  return (
    <section className="overflow-hidden py-1 px-[12px]  flex justify-center items-center shadow-[0_-8px_16px_0_rgba(0,0,0,0.05)]">
      <Container>
        <div>
          <p className="font-extralight text-[0.8rem] sm:text-[1rem] font-[Open Sans] text-gray-600 text-center">
            &copy; Copyright {new Date().getFullYear()}. All Rights Reserved by mujtaba-jawadi.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Footer;
