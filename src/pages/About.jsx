import React from 'react'
import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1>
        Great stories were being written every day, but few were being heard.
      </h1>
      <p>
        Blog Marshal was born from the belief that storytelling deserves a
        dedicated home—one that blends simplicity, modern design, and powerful
        publishing tools. We wanted to build a platform that not only welcomes
        writers but empowers them. No complications. No clutter. Just a
        beautifully clean space where ideas can flow freely.
      </p>
      <h3>
        Ultimately, our goal is to give writers a clean, powerful space to bring
        their ideas to life.
      </h3>
      <p>
        We believe that what you read and write matters. Words can divide or
        empower us, inspire or discourage us. In a world where the most
        sensational and surface-level stories often win, we’re building a system
        that rewards depth, nuance, and time well spent. A space for thoughtful
        conversation more than drive-by takes, and substance over packaging.
      </p>
      <p>
        If you’re new here, <NavLink to="/login" className="underline">start reading</NavLink>. Dive
        deeper into whatever matters to you. Find a post that helps you learn
        something new, or reconsider something familiar—and then{" "}
        <NavLink to="/login" className="underline">write your story</NavLink>.
      </p>
    </div>
  );
}

export default About
