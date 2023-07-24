import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig.js";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import "../CreateRating.css";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const CreateRating = () => {
  const [gymName, setGymName] = useState("");
  const [gymLocation, setGymLocation] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [machinesRating, setMachinesRating] = useState("0");
  const [freeWeightsRating, setFreeWeightsRating] = useState("0");
  const [atmosphereRating, setAtmosphereRating] = useState("0");
  const [cleanlinessRating, setCleanlinessRating] = useState("0");
  const [staffRating, setStaffRating] = useState("0");
  const [priceRating, setPriceRating] = useState("0");
  const [ratingBody, setRatingBody] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [alreadyRated, setAlreadyRated] = useState(false);
  const navigate = useNavigate();
  const state = useLocation();

  useEffect(() => {
    setGymName(state["state"][0]);
    setGymLocation(state["state"][1]);
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    api
      .post("/api/v1/ratings", {
        ratingBody: ratingBody,
        machinesRating: machinesRating,
        freeWeightsRating: freeWeightsRating,
        atmosphereRating: atmosphereRating,
        cleanlinessRating: cleanlinessRating,
        staffRating: staffRating,
        priceRating: priceRating,
        gymId: window.location.pathname.substring(12),
      })
      .then((response) => {
        if (response.status == 200) {
          setAlreadyRated(true);
        } else {
          navigate(-1);
        }
      });
  };

  useEffect(() => {
    if (
      machinesRating == "0" ||
      freeWeightsRating == "0" ||
      atmosphereRating == "0" ||
      cleanlinessRating == "0" ||
      staffRating == "0" ||
      priceRating == "0" ||
      ratingBody.length < 100
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [
    machinesRating,
    freeWeightsRating,
    atmosphereRating,
    cleanlinessRating,
    staffRating,
    priceRating,
    ratingBody,
  ]);

  return (
    <div className="new-rating-screen-wrapper">
      <div className="header">
        <a href="/" className="header-logo-container">
          <text>Rate My Gym</text>
        </a>
      </div>
      <div className="form-container">
        <div className="create-rating-gym-name">{gymName}</div>
        <div className="create-rating-gym-location"><FontAwesomeIcon icon={faLocationArrow}/> {gymLocation}</div>
        <form onSubmit={handleSubmit}>
          <div className="rating">
            Machines
            <Rating
              name="machines-rating"
              defaultValue={0}
              precision={1}
              size="large"
              onChange={(e) => {
                setMachinesRating(e.target.value);
              }}
            ></Rating>
          </div>
          <div className="rating">
            Free Weights
            <Rating
              name="free-weights-rating"
              defaultValue={0}
              precision={1}
              size="large"
              onChange={(e) => {
                setFreeWeightsRating(e.target.value);
              }}
            ></Rating>
          </div>
          <div className="rating">
            Atmosphere
            <Rating
              name="atmosphere-rating"
              defaultValue={0}
              precision={1}
              size="large"
              onChange={(e) => {
                setAtmosphereRating(e.target.value);
              }}
            ></Rating>
          </div>
          <div className="rating">
            Cleanliness
            <Rating
              name="cleanliness-rating"
              defaultValue={0}
              precision={1}
              size="large"
              onChange={(e) => {
                setCleanlinessRating(e.target.value);
              }}
            ></Rating>
          </div>
          <div className="rating">
            Staff
            <Rating
              name="staff-rating"
              defaultValue={0}
              precision={1}
              size="large"
              onChange={(e) => {
                setStaffRating(e.target.value);
              }}
            ></Rating>
          </div>
          <div className="rating">
            Price
            <Rating
              name="price-rating"
              defaultValue={0}
              precision={1}
              size="large"
              onChange={(e) => {
                setPriceRating(e.target.value);
              }}
            ></Rating>
          </div>
          <div className="rating">
            <textarea
              className="text-area"
              maxLength={300}
              placeholder="Describe your reasonings for your ratings (min. of 100 characters)"
              rows={6}
              cols={60}
              onChange={(e) => {
                setCharCount(e.target.value.length);
                setRatingBody(e.target.value);
              }}
            ></textarea>
            <p color="black">{charCount}/300</p>
          </div>
          <div className="submit-container">
            {alreadyRated ? (
              <div>You've already rated this gym</div>
            ) : (
              <Button
                disabled={!isValid}
                type="submit"
                variant="contained"
                color="success"
                size="lg"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRating;
