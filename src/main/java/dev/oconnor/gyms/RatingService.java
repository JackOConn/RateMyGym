package dev.oconnor.gyms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class RatingService {

  @Autowired
  private RatingRepository ratingRepository;

  @Autowired
  private MongoTemplate mongoTemplate;

  public Rating createRating(
    String body,
    String machinesRating,
    String freeWeightsRating,
    String atmosphereRating,
    String cleanlinessRating,
    String staffRating,
    String priceRating,
    String gymId,
    String ip_address
  ) {
    Rating rating = ratingRepository.insert(
      new Rating(
        body,
        machinesRating,
        freeWeightsRating,
        atmosphereRating,
        cleanlinessRating,
        staffRating,
        priceRating,
        ip_address
      )
    );

    //uses template to update the gym with a new rating
    mongoTemplate
      .update(Gym.class)
      .matching(Criteria.where("gymId").is(gymId))
      .apply(new Update().push("ratings").value(rating))
      .first();

    return rating;
  }
}
