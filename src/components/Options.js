import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { useNavigate } from "react-router-dom";
import CreateBlog from "images/CreateBlog.webp";
import EditBlog from "images/EditBlog.webp";
import ViewNewBlogs from "images/ViewNewBlogs.webp";
import SailBoat from "images/Sailboat.webp";
import { CardOptionsPlay } from "./animations/gsapAnimations";
import { CardOptionsReverse } from "./animations/gsapAnimations";
import world from "images/world.png";

const BlogOptions = ({ blogPostData }) => {
  const navigate = useNavigate();
  const handleOnMouseOver = (e, color, id) => {
    if (e.target.classList.contains("goToButton")) {
      return;
    } else {
      CardOptionsPlay(e, color);
    }
  };

  const handleOnMouseLeave = (e, color) => {
    if (e.target.classList.contains("goToButton")) {
      return;
    } else {
      CardOptionsReverse(e);
    }
  };

  return (
    <BlogOptionsDiv className="blog-options">
      <Card
        className="options"
        id={"create"}
        onMouseEnter={(e) => handleOnMouseOver(e, "#6EE3C7", "create")}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage className={"image"} src={CreateBlog} alt="Create Blog" />
        <Title>Create Blog</Title>
        <GoToButton
          className={"goToButton"}
          onClick={(e) => navigate('/blog-creation')}
        >
         Create New Blog
        </GoToButton>
        <Body className="body">
          Start a new blog and share it with the world{" "}
          <World src={world} alt={"share with world"}></World>
        </Body>
      </Card>
      <Card
        className="options"
        onMouseEnter={(e) => handleOnMouseOver(e, "#6EE3C7")}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage className={"image"} src={EditBlog} alt="Edit Blog" />
        <Title>Edit Blog</Title>
        <GoToButton
          className={"goToButton"}
          onMouseEnter={(e) => e.preventDefault()}
        >
          Start New
        </GoToButton>
        <Body className="body">
          Continue editing a blog or edit published blogs.
        </Body>
      </Card>
      <Card
        className="options"
        onMouseEnter={(e) => handleOnMouseOver(e, "#77B3D4")}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage
          className={"image"}
          src={ViewNewBlogs}
          alt="View New Blogs"
        />
        <Title>Your Blogs</Title>
        <GoToButton
          className={"goToButton"}
          onMouseEnter={(e) => e.preventDefault()}
          onClick={()=> navigate('/my-blogs')}
        >
          Start New
        </GoToButton>
        <Body className="body">Your home for all your creative writings.</Body>
      </Card>
      <Card
        className="options"
        onMouseEnter={(e) => handleOnMouseOver(e, "#77B3D4")}
        onMouseLeave={handleOnMouseLeave}
      >
        <OptionsImage
          className={"image"}
          src={SailBoat}
          alt="Explore New Blogs"
        />
        <Title>Explore Blogs</Title>
        <GoToButton
          className={"goToButton"}
          onMouseEnter={(e) => e.preventDefault()}
        >
          Start New
        </GoToButton>
        <Body className="body">
          Explore all blogs posted by people just like you.
        </Body>
      </Card>
    </BlogOptionsDiv>
  );
};

export default BlogOptions;
const World = styled.img`
  display: flex;
  width: 3ch;
  height: 3ch;
`;
const Body = styled.div`
  ${text.bodyMBold}
  position: absolute;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  bottom: 5%;
  width: 90%;
  opacity: 0;
  z-index: 1;
  anima ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    ${text.bodyM}
  }
`;
const GoToButton = styled.button`
  display: flex;
  ${text.bodyMBold}
`;
const OptionsImage = styled.img`
  position: relative;
  z-index: 1;
  pointer-events: none;
  width: 7.917vw;
  height: auto;
  filter: contrast(100%);
  ${media.fullWidth} {
    width: 114px;
  }

  ${media.tablet} {
    width: 11.133vw;
  }

  ${media.mobile} {
    width: 15vw;
  }
`;

const Title = styled.p`
  position: relative;
  z-index: 2;
  pointer-events: none;
  ${text.bodyMLeague}
  margin-top: 10px;
  color: #353839;
  border-radius: 15px;
`;
const Card = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  gap: 1.042vw;
  opacity: 0;

  background-color: ${colors.backgroundBlog};
  /* background: ${colors.backgroundBlog}; */

  width: 15vw;
  padding: 1.042vw;
  border-top-width: 0%;
  border-radius: 2.014vw;
  border:3px outset ${colors.backgroundBlog};
  -webkit-box-shadow: 0.139vw 0.347vw 1.511vw 0vw #0b325e,
    0.139vw 0.139vw 1.042vw 0.347vw rgba(0, 0, 0, 0);
  box-shadow: 0.139vw 0.347vw 1.511vw 0vw #0b325e,
    0.139vw 0.139vw 1.042vw 0.347vw rgba(0, 0, 0, 0);

  ${media.fullWidth} {
    width: 216px;
    padding: 15px;
    border-radius: 29px;
    border-radius: 29px;
    -webkit-box-shadow: 2px 5px 16px 0px #0b325e,
      2px 2px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 2px 5px 16px 0px #0b325e, 2px 2px 15px 5px rgba(0, 0, 0, 0);
  }

  ${media.tablet} {
    width: 21.094vw;
    padding: 1.465vw;
    border-radius: 2.832vw;
  }

  ${media.mobile} {
    width: 38vw;
    padding: 3.2vw;
    border-radius: 7.733vw;
  }
`;

const BlogOptionsDiv = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  gap: 2.431vw;
  flex-wrap: wrap;
  z-index: 5;

  ${media.fullWidth} {
    gap: 35px;
  }

  ${media.tablet} {
    gap: 5.431vw 5vw;
  }

  ${media.mobile} {
    gap: 9.431vw 0vw;
    align-items: flex-start;
    justify-content: space-evenly;
  }
`;
