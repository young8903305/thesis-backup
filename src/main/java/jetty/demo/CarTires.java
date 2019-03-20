package jetty.demo;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jetty.demo.AnnotationStyle.InputTypeControl;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CarTires {
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "(put CarTiresBrand here)") }, name = "Tire's Name")
	private CarTiresBrand brand;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "Michelin") }, name = "Tire's Name")
	private String name;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.number, value = "17") }, name = "Diameter")
	private int size; 
	
	public CarTires() {}
	
	public void setBrand(CarTiresBrand brand) {
		this.brand = brand;
	}
	
	public CarTiresBrand getBrand() {
		return this.brand;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setSize(int size) {
		this.size = size;
	}
	
	public int getSize() {
		return this.size;
	}
}