package jetty.demo;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class VehicleTest {
	
	public static void main(String... args) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		// mapper.enableDefaultTyping();
		
		Car2 car = new Car2("Mercedes-Benz", "S500", 5, 250.0);
		Truck truck = new Truck("Isuzu", "NQR", 7500.0);
		 
		List<Vehicle> vehicles = new ArrayList<>();
		vehicles.add(car);
		vehicles.add(truck);
		 
		Fleet serializedFleet = new Fleet();
		serializedFleet.setVehicles(vehicles);
		
		String jsonDataString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(serializedFleet);
		System.out.println(jsonDataString);
	}
}