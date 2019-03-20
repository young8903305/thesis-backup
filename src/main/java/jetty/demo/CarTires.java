package jetty.demo;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jetty.demo.AnnotationStyle.InputTypeControl;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CarTires {
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "Michelin") }, name = "Tire's Name")
	private CarTiresBrand brandName;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.number, value = "17") }, name = "Diameter")
	private int size; 
	
	public CarTires() {}
	
	public void setBrand(CarTiresBrand brandName) {
		this.brandName = brandName;
	}
	
	public CarTiresBrand getBrand() {
		return this.brandName;
	}
	
	public void setSize(int size) {
		this.size = size;
	}
	
	public int getSize() {
		return this.size;
	}
}