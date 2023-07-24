package dev.oconnor.gyms;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/gyms")
public class GymController {

  @Autowired
  private GymService gymService;

  @GetMapping
  public ResponseEntity<List<Gym>> getAllGyms() {
    return new ResponseEntity<List<Gym>>(gymService.allGyms(), HttpStatus.OK);
  }

  @GetMapping("/{gymId}")
  public ResponseEntity<Optional<Gym>> getOneGym(@PathVariable String gymId) {
    return new ResponseEntity<Optional<Gym>>(
      gymService.oneGym(gymId),
      HttpStatus.OK
    );
  }

  @GetMapping("/q={query}")
  public ResponseEntity<List<Gym>> getQuery(@PathVariable String query) {
    List<Gym> result = gymService
      .allGyms()
      .stream()
      .filter(x -> x.getName().toLowerCase().contains(query.toLowerCase()))
      .collect(Collectors.toList());

    return new ResponseEntity<List<Gym>>(result, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<Gym> createGym(@RequestBody Map<String, String> payload) {
    return new ResponseEntity<Gym>(
      gymService.createGym(
        payload.get("gymId"),
        payload.get("name"),
        payload.get("location")
      ),
      HttpStatus.CREATED
    );
  }
}
