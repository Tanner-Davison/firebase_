import React, { useEffect, useRef} from "react";
import styled from "styled-components";
import media from "styles/media";
import text from "styles/text";
import AllSvgs from "./svgs";
import gsap from "gsap";
import GSDevTools from "gsap/src/GSDevTools";
gsap.registerPlugin(GSDevTools);

const AnimatedPage = () => {

  let demo = useRef(null);
  let head1 = useRef(null);
  let subHead = useRef(null);
  let bodyDemo = useRef(null);
  let ctaLink = useRef(null);

  useEffect(() => {
    const items = document.querySelectorAll("#items > g");
    const pageDemoTl = gsap.timeline({
      id: "page-demo-timeline",
      paused: false,
      defaults: { opacity: 0, ease: "back" },
    });

    pageDemoTl.fromTo(demo.current, { opacity: 0 }, { opacity: 1, ease: "linear" })
      .fromTo(head1.current, { x: 80 }, { x: 0, opacity: 1 })
      .fromTo(subHead.current, { x: -80 }, { x: 0, opacity: 1 })
      .fromTo(bodyDemo.current, { y: 30 }, { y: 0, opacity: 1 })
      .fromTo(ctaLink.current, { y: 30 }, { y: 0, opacity: 1 })
      .fromTo(
        items,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.289 }
      );

      GSDevTools.create({animation:'page-demo-timeline'});
   
  }, []);
  return (
    <Wrapper id="demo" ref={demo}>
      <Main>
        <Header className="header-one" ref={head1}>
          Creative
        </Header>
        <Heading2 className="header-two" ref={subHead}>
          Process
        </Heading2>
        <Body className="body-demo" ref={bodyDemo}>
          Learn how to find inspiration in the things you love.
        </Body>
        <ReadMore className="cta-link-demo" ref={ctaLink}>
          READ MORE
        </ReadMore>

        <ImageWrapper id="images-demo">
          <AllSvgs />
        </ImageWrapper>
      </Main>
    </Wrapper>
  );
};

export default AnimatedPage;

const ReadMore = styled.button`
  -moz-box-shadow: inset 0px 1px 0px 0px #fbafe3;
  -webkit-box-shadow: inset 0px 1px 0px 0px #fbafe3;
  box-shadow: inset 0px 1px 0px 0px #fbafe3;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.05, #ff905c),
    color-stop(1, #ef027d)
  );
  background: -moz-linear-gradient(top, #ff905c 5%, #ef027d 100%);
  background: -webkit-linear-gradient(top, #ff905c 5%, #ef027d 100%);
  background: -o-linear-gradient(top, #ff905c 5%, #ef027d 100%);
  background: -ms-linear-gradient(top, #ff905c 5%, #ef027d 100%);
  background: linear-gradient(to bottom, #ff905c 5%, #ef027d 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff905c', endColorstr='#ef027d',GradientType=0);
  background-color: #ff905c;
  border: 1px solid #ee1eb5;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-weight: bold;
  text-decoration: none;
  -moz-border-radius: 1.181vw;
  -webkit-border-radius: 1.181vw;
  text-shadow: 0vw 0.069vw 0vw #c70067;
  border-radius: 1.181vw;
  padding: 0.417vw 1.667vw;
  font-size: 1.042vw;
  margin-top: 1.389vw;

  ${media.fullWidth} {
    -moz-border-radius: 17px;
    -webkit-border-radius: 17px;
    text-shadow: 0px 1px 0px #c70067;
    border-radius: 17px;
    padding: 6px 24px;
    font-size: 15px;
    margin-top: 20px;
  }

  ${media.tablet} {
    -moz-border-radius: 1.66vw;
    -webkit-border-radius: 1.66vw;
    text-shadow: 0vw 0.098vw 0vw #c70067;
    border-radius: 1.66vw;
    padding: 0.586vw 2.344vw;
    font-size: 1.465vw;
    margin-top: 1.953vw;
  }

  ${media.mobile} {
    -moz-border-radius: 3.972vw;
    -webkit-border-radius: 3.972vw;
    text-shadow: 0vw 0.234vw 0vw #c70067;
    border-radius: 3.972vw;
    padding: 1.402vw 5.607vw;
    font-size: 3.505vw;
    margin-top: 4.673vw;
  }
`;
const ImageWrapper = styled.div`
  #images {
    position: absolute;
    left: 35vw;
    top: 1.167vw;
  }
  ${media.fullWidth} {
    #images {
      position: absolute;
      left: 485px;
      top: -10px;
    }
  }

  ${media.tablet} {
    #images {
      position: absolute;
      left: 45.156vw;
      top: -5.859vw;
    }
  }

  ${media.mobile} {
  }
`;
const Body = styled.p`
  ${text.bodyM}
`;

const Heading2 = styled.h3`
  ${text.h3}
  margin:unset;
  text-indent: 5px;
`;
const Header = styled.h1`
  ${text.h1}
  margin:unset;
`;

const Main = styled.div`
  position: absolute;
  width: 17.361vw;
  top: 9.028vw;
  left: 1.389vw;

  ${media.fullWidth} {
    width: 250px;
    top: 130px;
    left: 20px;
  }

  ${media.tablet} {
    width: 24.414vw;
    top: 12.695vw;
    left: 1.953vw;
  }

  ${media.mobile} {
    width: 58.411vw;
    top: 30.374vw;
    left: 4.673vw;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  border: 1px solid #333;
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/creative-process-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  width: 55.417vw;
  height: 33.125vw;
  border-radius: 1.736vw;

  ${media.fullWidth} {
    width: 798px;
    height: 477px;
    border-radius: 25px;
  }

  ${media.tablet} {
    width: 77.93vw;
    height: 46.582vw;
    border-radius: 2.441vw;
  }

  ${media.mobile} {
  }
`;
