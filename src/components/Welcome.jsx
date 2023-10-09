import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assests/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const storedData = localStorage.getItem('chat-app-user');

        if (!storedData) {
          // Handle the case where the data does not exist in local storage
          console.error("Data not found in local storage.");
          return;
        }

        const parsedData = JSON.parse(storedData);

        if (!parsedData || !parsedData.username) {
          // Handle the case where the data is not in a valid format
          console.error("Invalid data format in local storage.");
          return;
        }

        setUserName(parsedData.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle other errors as needed
      }
    }

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
