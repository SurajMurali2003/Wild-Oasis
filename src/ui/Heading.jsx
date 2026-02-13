import styled from "styled-components";

// let a = 1;
// let b = 3;

// conditional rendering
// const Heading = styled.h1`
//   color: ${a > b ? "red" : "blue"};
//   font-size: ${a > b ? "30px" : "80px"};
//   font-weight: 800;
// `;

// writing Css in eternal varible
// Usuing Css Funtion to get syntax highlighting
// const test = css`
//   background-color: red;
//   text-transform: uppercase;
// `;

// const Heading = styled.h1`
//   color: blue;
//   font-size: 30px;
//   font-weight: 800;
//   ${test}
// `;

// Passing Props and Coditinal writing styles;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    `
  color: blue;
  font-size: 30px;
  font-weight: 800;
  `}

  ${(props) =>
    props.as === "h2" &&
    `
  color: blue;
  font-size: 20px;
  font-weight: 500;
  `}

   ${(props) =>
    props.as === "h3" &&
    `
  color: blue;
  font-size: 20px;
  font-weight: 500;
  `}
`;

export default Heading;
