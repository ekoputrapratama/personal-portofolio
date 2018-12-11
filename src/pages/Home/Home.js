/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scrollTo from 'animated-scroll-to';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const headerBg =
  process.env.NODE_ENV === 'development'
    ? '/assets/images/personal-bg.png'
    : '/dist/assets/images/personal-bg.png';

const pic =
  process.env.NODE_ENV === 'development'
    ? '/assets/images/Foto-rect.png'
    : '/dist/assets/images/Foto-rect.png';

class Home extends Component {
  static propTypes = {
    section: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      age: this.calculateAge()
    };
  }
  showImage = (img, url = undefined) => {
    this.portal.style.display = 'flex';
    this.portal.style.transition = 'opacity 500ms ease-in';
    this.portal.style.opacity = 1;
    const container = this.portal.querySelector('.image-container');
    container.innerHTML = '';
    container.appendChild(img.cloneNode(true));

    if (url) {
      const link = this.portal.querySelector('.visitBtn');
      link.href = url;
      link.innerHTML = 'Visit Page';
      link.style.display = 'inline';
    }
  };
  hidePortal = _ => {
    this.portal.style.transition = 'opacity 500ms ease-out';
    this.portal.style.opacity = 0;

    const onTransitionEnd = e => {
      this.portal.style.display = 'none';
      const container = this.portal.querySelector('.image-container');
      container.innerHTML = '';

      const link = this.portal.querySelector('.visitBtn');
      link.style.display = 'none';
      this.portal.removeEventListener('transitionend', onTransitionEnd);
    };
    this.portal.addEventListener('transitionend', onTransitionEnd);
  };
  calculateAge() {
    var now = new Date();
    var born = new Date('10-25-1994');
    var age = now.getFullYear() - born.getFullYear();
    if (now.getMonth() < born.getMonth() - 1) {
      age--;
    }
    if (
      born.getMonth() - 1 == now.getMonth() &&
      now.getDate() < born.getDate()
    ) {
      age--;
    }
    return age;
  }
  sendMail = () => {};
  componentWillUpdate(nextProps) {
    if (nextProps && this.props.section !== nextProps.section) {
      switch (nextProps.section) {
        case 'home':
          scrollTo(this.home.offsetTop - 89);
          break;
        case 'education':
          scrollTo(this.education.offsetTop - 89);
          break;
        case 'experience':
          scrollTo(this.experience.offsetTop - 89);
          break;
        case 'portofolio':
          scrollTo(this.portofolio.offsetTop - 89);
          break;
        case 'contact':
          scrollTo(this.contact.offsetTop - 89);
          break;
        case 'about':
          scrollTo(this.about.offsetTop - 89);
          break;
        default:
      }
    }
  }
  render() {
    return (
      <div className="home">
        <section
          className="head"
          ref={el => (this.home = el)}
          style={{ backgroundImage: `url(${headerBg})` }}>
          <div className="overlay" />
          <div className="content">
            <span>HI, I'AM</span>
            <h1 className="name">Muhammad Sayuti</h1>
            <span className="occupation">Software Developer</span>
            <div className="socialLinks">
              <a
                rel="nofollow"
                target="blank"
                href="//github.com/muhammadsayuti">
                <i className="fa fa-github" />
              </a>
              <a
                rel="nofollow"
                target="blank"
                href="https://twitter.com/msayuti94">
                <i className="fa fa-twitter" />
              </a>
              <a
                rel="nofollow"
                target="blank"
                href="https://www.linkedin.com/in/muhammad-sayuti-74365b10a/">
                <i className="fa fa-linkedin" />
              </a>
            </div>
            <Button
              className="contactBtn"
              onClick={ref => scrollTo(this.contact.offsetTop - 89)}>
              Contact Me
            </Button>
          </div>
        </section>
        <section className="profile" ref={el => (this.about = el)}>
          <h2>About Me</h2>
          <div className="container">
            <div className="left">
              <div className="image">
                <img src={pic} />
              </div>
            </div>
            <div className="right">
              <div className="bio">
                <h3>Hello,</h3>
                <p>
                  I'am {this.state.age} year old self taught Software Developer
                  living in Balikpapan, Indonesia.
                </p>
                <p>
                  I have a passion for Open Source Software, since that is where
                  real innovation is happening.
                </p>
                <p>Interested in web technologies and linux.</p>
                <p>
                  I designed this site so you can get to know me on a personal
                  level.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="education" ref={el => (this.education = el)}>
          <h2>Education & Achievment</h2>
          <div className="container">
            <div className="formal">
              <div className="item">
                <div className="image">
                  <img
                    onClick={e => this.showImage(e.target)}
                    alt="STMIK STIKOM Balikpapan"
                    src="https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2Fcertifications%2FIjazah.jpg?alt=media&token=b222105d-e68b-45c0-8628-8aeb7e0161e0"
                  />
                </div>
                <div className="content">
                  <h3>STMIK STIKOM Balikpapan Indonesia</h3>
                  <p>
                    <strong>Diploma Degree of Information Management</strong>
                    &nbsp;/&nbsp;March 2013 - March 2017
                  </p>
                </div>
              </div>
            </div>
            <div className="nonformal">
              <div className="item">
                <div className="image">
                  <img
                    onClick={e =>
                      this.showImage(
                        e.target,
                        'https://www.freecodecamp.org/certification/muhammadsayuti/legacy-front-end'
                      )
                    }
                    alt="Front End Development Certification"
                    src="https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2Fcertifications%2Flegacy-front-end(800).png?alt=media&token=33cdd17d-e12b-4a68-a670-a872c7c46457"
                  />
                </div>
                <div className="content">
                  <h3>Freecodecamp</h3>
                  <p>
                    <b>Front End Development</b>
                    &nbsp;/&nbsp;March 2017
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <img
                    onClick={e =>
                      this.showImage(
                        e.target,
                        'https://www.freecodecamp.org/certification/muhammadsayuti/apis-and-microservices'
                      )
                    }
                    alt="APIs And Microservices Certification"
                    src="https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2Fcertifications%2Fapis-and-microservices(800).png?alt=media&token=0ee477d5-6381-48fb-bfc8-59a82326cea4"
                  />
                </div>
                <div className="content">
                  <h3>Freecodecamp</h3>
                  <p>
                    <b>APIs And Microservices</b>
                    &nbsp;/&nbsp;October 2018
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <img
                    onClick={e =>
                      this.showImage(
                        e.target,
                        'https://www.freecodecamp.org/certification/muhammadsayuti/javascript-algorithms-and-data-structures'
                      )
                    }
                    alt="Javascript Algorithms And Data Structure Certification"
                    src="https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2Fcertifications%2Fjavascript-algorithms-and-data-structures(800).png?alt=media&token=7c450f36-b93d-4a7a-8956-3fb99b1c72f8"
                  />
                </div>
                <div className="content">
                  <h3>Freecodecamp</h3>
                  <p>
                    <b>Javascript Algorithms And Data Structures</b>
                    &nbsp;/&nbsp;October 2018
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="experience" ref={el => (this.experience = el)}>
          <h2>Experience</h2>
          <div className="container">
            <div className="item">
              <h3>Saffix</h3>
              <p>
                <b>IT Support & Programmer </b>/ July 2018 - December 2018
                <ul>
                  <li>
                    Repair PCs/laptops/printers either in the office or in the
                    field.
                  </li>
                  <li>
                    Conduct audits both inside and outside the city to ensure
                    the condition of the company's assets.
                  </li>
                  <li>
                    Create a website from existing design given by designer
                    team.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </section>
        <section className="portofolio" ref={el => (this.portofolio = el)}>
          <h2>Portofolio</h2>
          <div className="container">
            <div className="item">
              <div className="wrapper">
                <div className="image">
                  <div
                    style={{
                      // backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundImage:
                        'url(https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2Fusers%2Fportofolio2.jpg?alt=media&token=5cb3c6f3-cbd4-4668-bb72-d21e9709487a)'
                    }}
                    className="image"
                  />
                  <div className="hidden-overlay-1 overlay" />
                  <div className="hidden-overlay-2 overlay" />
                  <div className="caption">
                    <div className="caption-inner">
                      <h4>Online Radio Streaming</h4>
                      <a href="#">View Project</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="wrapper">
                <div className="image">
                  <div
                    style={{
                      // backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundImage:
                        'url(https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2Fusers%2Fportofolio3.png?alt=media&token=5cb3c6f3-cbd4-4668-bb72-d21e9709487a)'
                    }}
                    className="image"
                  />
                  <div className="hidden-overlay-1 overlay" />
                  <div className="hidden-overlay-2 overlay" />
                  <div className="caption">
                    <div className="caption-inner">
                      <h4>Delivery Management System</h4>
                      <a href="#">View Project</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="wrapper">
                <div className="image">
                  <div
                    style={{
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundImage:
                        'url(https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2Fusers%2Fportofolio4.jpg?alt=media&token=5cb3c6f3-cbd4-4668-bb72-d21e9709487a)'
                    }}
                    className="image"
                  />
                  <div className="hidden-overlay-1 overlay" />
                  <div className="hidden-overlay-2 overlay" />
                  <div className="caption">
                    <div className="caption-inner">
                      <h4>Employee Management System</h4>
                      <a href="#">View Project</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="wrapper">
                <div className="image">
                  <div
                    style={{
                      // backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundImage:
                        'url(https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2Fusers%2Fportofolio6.jpg?alt=media&token=5cb3c6f3-cbd4-4668-bb72-d21e9709487a)'
                    }}
                    className="image"
                  />
                  <div className="hidden-overlay-1 overlay" />
                  <div className="hidden-overlay-2 overlay" />
                  <div className="caption">
                    <div className="caption-inner">
                      <h4>Inventory Management System</h4>
                      <a href="#">View Project</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="wrapper">
                <div className="image">
                  <div
                    style={{
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundImage:
                        'url(https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2Fusers%2Fportofolio7.png?alt=media&token=5cb3c6f3-cbd4-4668-bb72-d21e9709487a)'
                    }}
                    className="image"
                  />
                  <div className="hidden-overlay-1 overlay" />
                  <div className="hidden-overlay-2 overlay" />
                  <div className="caption">
                    <div className="caption-inner">
                      <h4>Point Of Sale Management System</h4>
                      <a href="#">View Project</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="wrapper">
                <div className="image">
                  <div
                    className="image"
                    style={{
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundImage:
                        'url(https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2FProjects%2Fmpayroll-screenshot.jpg?alt=media&token=23637934-a749-4c18-b911-ce28471ccdb2)'
                    }}
                  />
                  <div className="hidden-overlay-1 overlay" />
                  <div className="hidden-overlay-2 overlay" />
                  <div className="caption">
                    <div className="caption-inner">
                      <h4>Payroll Management System</h4>
                      <a href="#">View Project</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="wrapper">
                <div className="image">
                  <div
                    className="image"
                    style={{
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundImage:
                        'url(https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2FProjects%2Fruncy-screenshot.jpg?alt=media&token=cb197c03-bc77-43aa-a463-a500b62061da)'
                    }}
                  />
                  <div className="hidden-overlay-1 overlay" />
                  <div className="hidden-overlay-2 overlay" />
                  <div className="caption">
                    <div className="caption-inner">
                      <h4>Store Management System (Desktop)</h4>
                      <a href="#">View Project</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="item">
              <div className="wrapper">
                <div className="image">
                  <img src="https://firebasestorage.googleapis.com/v0/b/nerdiex-99466.appspot.com/o/images%2Fusers%2Fportofolio2.jpg?alt=media&token=5cb3c6f3-cbd4-4668-bb72-d21e9709487a" />
                  <div className="hidden-overlay-1 overlay" />
                  <div className="hidden-overlay-2 overlay" />
                  <div className="caption">
                    <div className="caption-inner">
                      <h4>Online Radio Streaming</h4>
                      <a href="#">View Project</a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>
        <section className="contact" ref={el => (this.contact = el)}>
          <h2>Contact</h2>
          <div className="container">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                ref={el => (this.name = el)}
                className="form-control"
                placeholder="Ex: John Doe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                ref={el => (this.email = el)}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                ref={el => (this.message = el)}
                className="form-control"
                placeholder="Your Message"
              />
            </div>
            <button className="submit" onClick={this.sendMail}>
              Submit
            </button>
          </div>
        </section>
        <div
          onClick={this.hidePortal}
          ref={el => (this.portal = el)}
          className="image-portal">
          <div className="image-container" />
          <a target="blank" className="visitBtn" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    section: state.scroll.section
  };
}

export default connect(mapStateToProps)(Home);
