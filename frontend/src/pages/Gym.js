import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import "../Gym.css";
import {
  faDollarSign,
  faDumbbell,
  faGear,
  faHandSparkles,
  faLocationArrow,
  faSun,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import PageHeader from "../components/PageHeader.js";

const Gym = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gym, setGym] = useState("");
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState("0.0");
  const [machinesRating, setMachinesRating] = useState("0.0");
  const [freeWeightsRating, setFreeWeightsRating] = useState("0.0");
  const [atmosphereRating, setAtmosphereRating] = useState("0.0");
  const [cleanlinessRating, setCleanlinessRating] = useState("0.0");
  const [staffRating, setStaffRating] = useState("0.0");
  const [priceRating, setPriceRating] = useState("0.0");
  const [theme, setTheme] = useState("");

  const [visible, setVisible] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const getGym = async () => {
      try {
        let id = window.location.pathname.substring(5);
        const response = await api.get("/api/v1/gyms/" + id);
        setGym(response.data);
        setRatings(response.data.ratings.reverse());
        await setAverageGymRatings(response);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getGym();
    setIsLoading(false);
  }, []);

  const setAverageGymRatings = async (response) => {
    var rateTotal = 0.0;
    var machinesTotal = 0.0;
    var freeWeightsTotal = 0.0;
    var atmosphereTotal = 0.0;
    var cleanlinessTotal = 0.0;
    var staffTotal = 0.0;
    var priceTotal = 0.0;
    var count = 0;
    response.data.ratings.forEach(function (item) {
      console.log(item);
      rateTotal += parseFloat(item.rate);
      machinesTotal += parseFloat(item.machinesRating);
      freeWeightsTotal += parseFloat(item.freeWeightsRating);
      atmosphereTotal += parseFloat(item.atmosphereRating);
      cleanlinessTotal += parseFloat(item.cleanlinessRating);
      staffTotal += parseFloat(item.staffRating);
      priceTotal += parseFloat(item.priceRating);
      count++;
    });
    if (count > 0) {
      console.log(machinesTotal);
      setAvgRating((Math.round((rateTotal / count) * 10) / 10).toFixed(1));
      setMachinesRating(
        (Math.round((machinesTotal / count) * 10) / 10).toFixed(1)
      );
      setFreeWeightsRating(
        (Math.round((freeWeightsTotal / count) * 10) / 10).toFixed(1)
      );
      setAtmosphereRating(
        (Math.round((atmosphereTotal / count) * 10) / 10).toFixed(1)
      );
      setCleanlinessRating(
        (Math.round((cleanlinessTotal / count) * 10) / 10).toFixed(1)
      );
      setStaffRating((Math.round((staffTotal / count) * 10) / 10).toFixed(1));
      setPriceRating((Math.round((priceTotal / count) * 10) / 10).toFixed(1));
    }
  };

  const handleCreateRating = () => {
    navigate("/add-rating/" + gym.gymId, {
      state: [gym.name, gym.location],
    });
  };

  const showMoreRatings = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  window.addEventListener("storage", (e) => {
    setTheme(JSON.parse(localStorage.getItem("theme")) + "-gym");
  });

  return (
    <div className="gym-screen-wrapper" id={theme}>
      <PageHeader></PageHeader>
      <div className="gym-information-container">
        <div className="gym-name" id={theme}>{gym.name}</div>
        <div className="gym-location" id={theme}>
          <FontAwesomeIcon icon={faLocationArrow} /> {gym.location}
        </div>
        <div className="gym-rating-overall-container" id={theme}>
          <div className="gym-rating-overall">{avgRating}</div>
          <text>overall rating</text>
        </div>
        <div className="gym-rating-machines">
          <FontAwesomeIcon className="rating-icons" icon={faGear} id={theme}/>{" "}
          <text className="rating-text" id={theme}>Machines</text>
          <div className="gym-rating-number-container" id={theme}>
            <div className="gym-rating-number" id={theme}>{machinesRating}</div>
          </div>
        </div>
        <div className="gym-rating-freeweights">
          <FontAwesomeIcon className="rating-icons" icon={faDumbbell} id={theme}/>{" "}
          <text className="rating-text" id={theme}>Free Weights</text>
          <div className="gym-rating-number-container">
            <div className="gym-rating-number" id={theme}>{freeWeightsRating}</div>
          </div>
        </div>
        <div className="gym-rating-atmosphere">
          <FontAwesomeIcon className="rating-icons" icon={faSun} id={theme}/>{" "}
          <text className="rating-text" id={theme}>Atmosphere</text>
          <div className="gym-rating-number-container">
            <div className="gym-rating-number" id={theme}>{atmosphereRating}</div>
          </div>
        </div>
        <div className="gym-rating-cleanliness">
          <FontAwesomeIcon className="rating-icons" icon={faHandSparkles} id={theme}/>{" "}
          <text className="rating-text" id={theme}>Cleanliness</text>
          <div className="gym-rating-number-container">
            <div className="gym-rating-number" id={theme}>{cleanlinessRating}</div>
          </div>
        </div>
        <div className="gym-rating-staff">
          <FontAwesomeIcon className="rating-icons" icon={faUserTie} id={theme}/>{" "}
          <text className="rating-text" id={theme}>Staff</text>
          <div className="gym-rating-number-container">
            <div className="gym-rating-number" id={theme}>{staffRating}</div>
          </div>
        </div>
        <div className="gym-rating-price">
          <FontAwesomeIcon className="rating-icons" icon={faDollarSign} id={theme}/>{" "}
          <text className="rating-text" id={theme}>Price</text>
          <div className="gym-rating-number-container">
            <div className="gym-rating-number" id={theme}>{priceRating}</div>
          </div>
        </div>
      </div>
      <div className="under-gym-information-shadow" id={theme}></div>
      <div className="above-ratings-list-bar">
        {ratings.length == 1 ? (
          <text id={theme}>1 Rating</text>
        ) : (
          <text id={theme}>{ratings.length} Ratings</text>
        )}
        <Button
          onClick={() => handleCreateRating(gym.place_id)}
          variant="contained"
          color="success"
          size="lg"
        >
          Rate this gym
        </Button>
      </div>
      <div className="ratings-list-wrapper">
        <div className="ratings-list">
          {ratings.slice(0, visible).map((rating) => (
            <div className="rating-item-container" id={theme}>
              <div className="rating-rate-container" id={theme}>
                <div className="rating-rate" id={theme}>{rating.rate}</div>
                <text>overall rating</text>
              </div>
              <div className="rating-body" id={theme}>{rating.body}</div>
              <div className="rating-machines" id={theme}>
                <FontAwesomeIcon className="rating-icons" icon={faGear} />{" "}
                <text className="rating-text">Machines</text>
                <div className="gym-rating-number-container">
                  <div className="rating-rating-number" id={theme}>
                    {rating.machinesRating}
                  </div>
                </div>
              </div>
              <div className="rating-freeweights" id={theme}>
                <FontAwesomeIcon className="rating-icons" icon={faDumbbell} />{" "}
                <text className="rating-text">Free Weights</text>
                <div className="gym-rating-number-container">
                  <div className="rating-rating-number" id={theme}>
                    {rating.freeWeightsRating}
                  </div>
                </div>
              </div>
              <div className="rating-atmosphere" id={theme}>
                <FontAwesomeIcon className="rating-icons" icon={faSun} />{" "}
                <text className="rating-text">Atmosphere</text>
                <div className="gym-rating-number-container">
                  <div className="rating-rating-number" id={theme}>
                    {rating.atmosphereRating}
                  </div>
                </div>
              </div>
              <div className="rating-cleanliness" id={theme}>
                <FontAwesomeIcon
                  className="rating-icons"
                  icon={faHandSparkles}
                />{" "}
                <text className="rating-text">Cleanliness</text>
                <div className="gym-rating-number-container">
                  <div className="rating-rating-number" id={theme}>
                    {rating.cleanlinessRating}
                  </div>
                </div>
              </div>
              <div className="rating-staff" id={theme}>
                <FontAwesomeIcon className="rating-icons" icon={faUserTie} />{" "}
                <text className="rating-text">Staff</text>
                <div className="gym-rating-number-container">
                  <div className="rating-rating-number" id={theme}>
                    {rating.staffRating}
                  </div>
                </div>
              </div>
              <div className="rating-price" id={theme}>
                <FontAwesomeIcon className="rating-icons" icon={faDollarSign} />{" "}
                <text className="rating-text">Price</text>
                <div className="gym-rating-number-container">
                  <div className="rating-rating-number" id={theme}>
                    {rating.priceRating}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(() => {
            if (visible < ratings.length) {
              return (
                <div className="more-ratings-container">
                  <Button onClick={showMoreRatings}>Load more ratings</Button>
                </div>
              );
            } else if (ratings.length > 0 && visible >= ratings.length) {
              return (
                <div className="more-ratings-container" id={theme}>
                  <text>There are no more ratings</text>
                </div>
              );
            } else {
              return (
                <div className="more-ratings-container" id={theme}>
                  <text>Be the first person to rate this gym!</text>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Gym;
