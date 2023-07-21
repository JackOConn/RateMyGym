import React, { useState } from "react";
import api from "../api/axiosConfig.js";
import { useLocation, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "../CreateRating.css";
import { Button } from "react-bootstrap";

const CreateRating = () => {
  const [charCount, setCharCount] = useState(0);
  const [machinesRating, setMachinesRating] = useState("1");
  const [freeWeightsRating, setFreeWeightsRating] = useState("1");
  const [priceRating, setPriceRating] = useState("1");
  const [locationRating, setLocationRating] = useState("1");
  const [ratingBody, setRatingBody] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [alreadyRated, setAlreadyRated] = useState(false);
  const navigate = useNavigate();
  const state = useLocation();

  const isValidInput = () => {
    if (
      machinesRating == "0" ||
      freeWeightsRating == "0" ||
      priceRating == "0" ||
      locationRating == "0" ||
      ratingBody.length == 0
    ) {
      setIsValid(false);
    }
    setIsValid(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    api
      .post("/api/v1/ratings", {
        ratingBody: ratingBody,
        machinesRating: machinesRating,
        freeWeightsRating: freeWeightsRating,
        priceRating: priceRating,
        locationRating: locationRating,
        gymId: state["state"],
      })
      .then((response) => {
        if (response.status == 200) {
          setAlreadyRated(true);
        } else {
          navigate(-1);
        }
      });
  };

  return (
    <div className="new-rating-screen-wrapper">
      <div className="header">
        <a href="/" className="header-logo-container">
          <text>Rate My Gym</text>
        </a>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="rating">
            Machines
            <Rating
              name="machines-rating"
              defaultValue={1}
              precision={1}
              onChange={(e) => {
                setMachinesRating(e.target.value);
                isValidInput();
              }}
            ></Rating>
          </div>
          <div className="rating">
            Free Weights
            <Rating
              name="free-weights-rating"
              defaultValue={1}
              precision={1}
              onChange={(e) => {
                setFreeWeightsRating(e.target.value);
                isValidInput();
              }}
            ></Rating>
          </div>
          <div className="rating">
            Price
            <Rating
              name="price-rating"
              defaultValue={1}
              precision={1}
              onChange={(e) => {
                setPriceRating(e.target.value);
                isValidInput();
              }}
            ></Rating>
          </div>
          <div className="rating">
            Location
            <Rating
              name="location-rating"
              defaultValue={1}
              precision={1}
              onChange={(e) => {
                setLocationRating(e.target.value);
                isValidInput();
              }}
            ></Rating>
          </div>
          <div className="rating">
            <textarea
              className="text-area"
              maxLength={250}
              placeholder="Describe your reasonings for your ratings"
              rows={5}
              cols={60}
              onChange={(e) => {
                setCharCount(e.target.value.length);
                setRatingBody(e.target.value);
                isValidInput();
              }}
            ></textarea>
            <p color="black">{charCount}/250</p>
          </div>
          <div className="submit-container">
            {alreadyRated ? (
              <div>You've already rated this gym</div>
            ) : (
              <Button
                disabled={!isValid}
                type="submit"
                variant="success"
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
