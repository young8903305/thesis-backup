package jetty.demo;

public abstract class Vehicle {
    private String make;
    private String model;
 
    protected Vehicle(String make, String model) {
        this.make = make;
        this.model = model;
    }
 
    // no-arg constructor, getters and setters
}
