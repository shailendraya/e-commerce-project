import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
//import LinkedInIcon from '@mui/icons-material/LinkedIn';
const About = () => {
  const visitLinkedin = () => {
    window.location = "https://www.linkedin.com/in/shailendra-nagina/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dmlxb66jc/image/upload/v1667063584/avatars/rv7sztk8up1dwjrrjqdj.jpg"
              alt="Developer"
            />
            <Typography>Shailendra Nagina</Typography>
            <Button onClick={visitLinkedin} color="primary">
              Visit Linkedin
            </Button>
            <span>
              This project is developed under the IBM fullstack developer certification program.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/c/IBM"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.linkedin.com/company/ibm/" target="blank">
              <LinkedInIcon className="likedinSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
