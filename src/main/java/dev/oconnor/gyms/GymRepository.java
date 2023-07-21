package dev.oconnor.gyms;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymRepository extends MongoRepository<Gym, ObjectId>{
    
    Optional<Gym> findByGymId(String gymId);
}
