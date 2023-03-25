import React, { Component } from "react";

// Importing Section
import Navbar from "../../component/Navbar/NavBar";

import Section from "./Section";
import Courses from "../../component/Courses";
import Team from "../../component/Team";
import Alumni from "../../component/Alumni";
import Contact from "../../component/Contact";
import Footer from "../../component/Footer/Footer";

class Layout1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        { id: 1, idnm: "home", navheading: "Home" },
        { id: 2, idnm: "courses", navheading: "Courses" },
        { id: 3, idnm: "team", navheading: "Team" },
        { id: 4, idnm: "alumni", navheading: "Alumni" },
        { id: 5, idnm: "contact", navheading: "Contact" },
      ],
      pos: document.documentElement.scrollTop,
      imglight: false,
      navClass: "",
      fixTop : true
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollNavigation, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > this.state.pos) {
      this.setState({ navClass: "nav-sticky", imglight: false });
    } else {
      this.setState({ navClass: "", imglight: false });
    }
  };

  render() {
    return (
      <React.Fragment>
          {/* Importing Navbar */}
          <Navbar
            navItems={this.state.navItems}
            navClass={this.state.navClass}
            imglight={this.state.imglight}
            top={this.state.fixTop}
          />

          {/* Importing Section */}
          <Section />

           {/* Importing Courses */}
           <Courses />

        
          {/* Importing Team */}
          <Team />

          {/* Importing Alumni */}
          <Alumni />

          {/* Importing Contact Us */}
          <Contact />

          {/* Importing Footer */}
          <Footer />
      </React.Fragment>
    );
  }
}
export default Layout1;
