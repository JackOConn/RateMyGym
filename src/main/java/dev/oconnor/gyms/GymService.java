package dev.oconnor.gyms;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GymService {

  @Autowired
  private GymRepository gymRepository;

  public List<Gym> allGyms() {
    return gymRepository.findAll();
  }

  public Optional<Gym> oneGym(String gymId) {
    return gymRepository.findByGymId(gymId);
  }

  public Gym createGym(String gymId, String name, String location) {
    Gym gym = gymRepository.insert(new Gym(gymId, name, location));

    return gym;
  }
}
