import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async() => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

// const Button = styled.button`
// display: flex;
// justify-content: center;
// align-items: center;
// padding: 0.5rem;
// border-radius: 0.5rem;
// background-color: #9a86f3;
// border: none;
// cursor: pointer;
// svg {
//   font-size: 1.3rem;
//   color: #ebe7ff;
// }


  
// `;
const Button = styled.button`
  position: absolute;

top: 15%;
right: 7%;
  transform: translate(-50%, -50%);
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  width: 50px; /* Adjust the width as needed */
  height: 50px; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
