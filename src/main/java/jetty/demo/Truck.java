package jetty.demo;

public class Truck extends Vehicle {
    private double payloadCapacity;
    
    public double getPayloadCapacity() {
		return payloadCapacity;
	}

	public void setPayloadCapacity(double payloadCapacity) {
		this.payloadCapacity = payloadCapacity;
	}

	public Truck(String make, String model, double payloadCapacity) {
        super(make, model);
        this.payloadCapacity = payloadCapacity;
    }
 
    // no-arg constructor, getters and setters
}