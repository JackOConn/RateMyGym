package dev.oconnor.gyms;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ratings")
public class RatingController {

  @Autowired
  private RatingService ratingService;

  @Autowired
  private GymRepository gymRepository;

  @PostMapping
  public ResponseEntity<Rating> createRating(@RequestBody Map<String, String> payload,HttpServletRequest request) {
    //check if this user has posted a rating for this gym already
    Optional<Gym> gym = gymRepository.findByGymId(payload.get("gymId"));
    if (gym.isPresent()) {
        Gym newGym = gym.get();
      for (Rating rating : newGym.getRatings()) {
        if (rating.getIp_address().equals(request.getRemoteAddr())) {
            return null;
        }
      }
    }

    return new ResponseEntity<Rating>(
      ratingService.createRating(
        payload.get("ratingBody"),
        payload.get("machinesRating"),
        payload.get("freeWeightsRating"),
        payload.get("priceRating"),
        payload.get("locationRating"),
        payload.get("gymId"),
        request.getRemoteAddr()
      ),
      HttpStatus.CREATED
    );
  }
}