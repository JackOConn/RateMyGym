package dev.oconnor.gyms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ratings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rating {

  @Id
  private ObjectId id;

  private String body;

  private String rate;

  private String machinesRating;

  private String freeWeightsRating;

  private String priceRating;

  private String locationRating;

  private String ip_address;

  public Rating(String body, String machinesRating, String freeWeightsRating, String priceRating,
      String locationRating, String ip_address) {
    this.body = body;
    this.machinesRating = machinesRating;
    this.freeWeightsRating = freeWeightsRating;
    this.priceRating = priceRating;
    this.locationRating = locationRating;
    double totalRating = (Double.parseDouble(machinesRating) 
    + Double.parseDouble(freeWeightsRating) 
    + Double.parseDouble(priceRating) 
    + Double.parseDouble(locationRating)) / 4;
    totalRating = Math.round(totalRating*Math.pow(10,1))/Math.pow(10,1);
    this.rate = String.valueOf(totalRating);
    this.ip_address = ip_address;
  }


}
