package jetty.demo;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jetty.demo.AnnotationStyle.InputTypeControl;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Car {
	
	@AnnotationForm(
			style = { @AnnotationStyle(input=InputTypeControl.text, value = "") })
	private CarTires[] tires;
	
	@AnnotationForm(
			style = { @AnnotationStyle(input=InputTypeControl.text, value = "KIA") },
			name = "Your Car's Name")
	private String carName;

	public Car() {}
	
	public void setTires(CarTires... tires) {
		this.tires = tires;
	}
	
	public CarTires[] getTires() {
		return this.tires; 
	}
	
	public void setCarName(String carName) {
		this.carName = carName;
	}
	
	public String getCarName() {
		return this.carName;
	}
}