package dev.oconnor.gyms;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "gyms")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Gym {

    @Id
    private ObjectId id;

    private String gymId;

    private String name;

    private String location;

    @DocumentReference
    private List<Rating> ratings;

    public Gym(String gymId, String name, String location) {
        this.gymId = gymId;
        this.name = name;
        this.location = location;
      }

    public List<Rating> getRatings() {
      return ratings;
    }
}
