import React from "react";
import { Link } from "react-router-dom";
import { Container, Logo } from "../index";

const Footer = () => {
  return (
    <section className="relative overflow-hidden py-4 px-[12px]  border-t-1 border-t-black sm:flex justify-between items-center">
      <Container>
        <div className="mb-4 block sm:inline-flex  items-center">
          <Logo width="5px" />
        </div>
        <div>
          <p className="text-sm font-mono text-gray-600">
            &copy; Copyright 2025. All Rights Reserved by mujtaba-jawadi.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Footer;
