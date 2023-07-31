import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "../Home.css";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.js";

const Home = () => {
  const [selectedGym, setSelectedGym] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfGymExistsInDB = async () => {
      try {
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
        navigate("/gym/" + selectedGym["value"].place_id, {
          state: selectedGym["value"].place_id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    console.log(selectedGym["icon"]);
    checkIfGymExistsInDB();
  }, [selectedGym]);

  const handleSelection = (val) => {
    setIsLoading(true);
    setSelectedGym(val);
  };

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

  window.addEventListener("storage", (e) => {
    setTheme(JSON.parse(localStorage.getItem("theme")) + "-home");
  });

  return (
    <div className="home-screen-wrapper" id={theme}>
      <PageHeader></PageHeader>
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
                onChange: (val) => {
                  handleSelection(val);
                },
                placeholder: "Search for a gym...",
                noOptionsMessage: () =>
                  "There are no gyms that match your search :(",
              }}
            />
          </div>
        </div>
      </div>
      <div className="home-footer" id={theme}></div>
    </div>
  );
};

export default Home;
