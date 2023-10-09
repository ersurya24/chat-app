import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assests/loader.gif"; // Correct the typo in "assests" to "assets".
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  
  // Remove the unused 'toastOptions' and 'setProfilePicture' functions.
  const setProfilePicture = async () => {
      if (selectedAvatar === undefined) {
        toast.error("Please select an avatar", toastOptions);
      } else {
        const user = await JSON.parse(
          localStorage.getItem("chat-app-user")
        );
  
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
  
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem(
            "chat-app-user",
            JSON.stringify(user)
          );
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      }
    };
  const toastOptions= {
      position:"bottom-right",
      autoClose:8000,
      pauseOnHover :true,
      draggable:true ,
      theme:"dark" 
   }

  useEffect(() => {
      if(!localStorage.getItem("chat-app-user")){
            navigate('/login')
      }
    // Fetch avatars using Axios and update the state.
    const fetchAvatars = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer =  Buffer.from(image.data); // Use 'Buffer.from' instead of 'new Buffer'.
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching avatars:", error);
        toast.error("Failed to load avatars. Please try again later.");
      }
    };

    fetchAvatars(); // Call the async function.

  }, [api,navigate]); // Dependency array is empty since this effect runs once.
  return (
    <>
    {
      isLoading ?<Container>
            <img src={loader} alt="loader" className="loader" />
      </Container>:(

      
      <Container>
        <div className="title-container">
          <h1>pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                key={index} // Use 'index' as the key for the list of avatars.
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                />
              </div>
            );
          })}
        </div>
        <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
      </Container>
      )
}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: #131324;
gap:2rem;
flex-direction:column;
height:100vh;
width:100vw;
.loader{
      max-inline-size:100%
}
.title-container {
      h1 {
        color: white;
      }
    }
    .avatars {
      display: flex;
      gap: 2rem;
  
      .avatar {
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img {
          height: 6rem;
          transition: 0.5s ease-in-out;
        }
      }
      .selected {
        border: 0.4rem solid #4e0eff;
      }
    }
.submit-btn {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        background-color: #4e0eff;
      }
    }



`;

