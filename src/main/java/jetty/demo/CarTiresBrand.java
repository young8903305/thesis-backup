package jetty.demo;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jetty.demo.AnnotationStyle.InputTypeControl;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CarTiresBrand {
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "France") }, name = "Who made it?")
	private String country;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.color, value = "white") }, name = "Tire's color")
	private long color;
	
	public CarTiresBrand() {}
	
	public String getCountry() {
		return this.country;
	}
	
	public void setCountry(String country) {
		this.country = country;
	}
	
	public long getColor() {
		return this.color;
	}
	
	public void setPrise(long color) {
		this.color = color;
	}
}