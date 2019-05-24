package jetty.demo;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jetty.demo.AnnotationStyle.InputTypeControl;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Brand {
  @AnnotationForm(
      style = {
          @AnnotationStyle(
              input = InputTypeControl.text,
              value = "France")
      },
      name = "Where come from?")
  private String country;

  @AnnotationForm(
      style = {
          @AnnotationStyle(
              textarea = "true",
              value = "write brand information here")
      },
      name = "Description")
  private String description;

	public String getCountry() {
		return country;
	}
	
	public void setCountry(String country) {
		this.country = country;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
  
  
  
}