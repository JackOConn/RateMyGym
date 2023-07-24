import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "../Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedGym, setSelectedGym] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfGymExistsInDB = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(
          "/api/v1/gyms/" + selectedGym["value"].place_id
        );

        if (response.data == null) {
          // post new gym in database
          await api.post("/api/v1/gyms", {
            gymId: selectedGym["value"].place_id,
            name: selectedGym["value"]["structured_formatting"].main_text,
            location:
              selectedGym["value"]["structured_formatting"].secondary_text,
          });
        }
        setIsLoading(false);
        navigate("/gym/" + selectedGym["value"].place_id, {
          state: selectedGym["value"].place_id,
        });
      } catch (error) {
        console.log(error);
      }
    };

    checkIfGymExistsInDB();
    setIsLoading(false);
  }, [selectedGym]);

  const customStyles = {
    option: (defaultStyles) => ({
      ...defaultStyles,
      color: "#000",
      backgroundColor: "#fff",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#fff",
      padding: "10px",
      border: "none",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <div className="home-screen-wrapper">
      <div className="header">
        <a href="/" className="header-logo-container">
          <text>Rate My Gym</text>
        </a>
      </div>
      <div className="background-image">
        <div className="image-overlay">
          <div className="logo-text">
            {isLoading ? (
              <text>Loading...</text>
            ) : (
              <text>Enter a gym to get started</text>
            )}
          </div>
          <div className="google-search">
            <GooglePlacesAutocomplete
              apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
              autocompletionRequest={{
                types: ["gym"],
                country: ["us", "ca"],
              }}
              minLengthAutocomplete={3}
              selectProps={{
                styles: customStyles,
                selectedGym,
                onChange: (val) => setSelectedGym(val),
                placeholder: "Search for a gym...",
                noOptionsMessage: () =>
                  "There are no gyms that match your search :(",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
