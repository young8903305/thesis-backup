package jetty.demo;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jetty.demo.AnnotationStyle.InputTypeControl;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SimplePerson {
	
	@AnnotationForm(
			style = { @AnnotationStyle(input=InputTypeControl.text, value = "huang") },
			name = "Your Name")
	private String person_name;
	
	@AnnotationForm(
			style = { @AnnotationStyle(input=InputTypeControl.text, value = "") },
			name = "Spouse")
	private SimplePerson spouse;
	
	public void setName(String person_name) {
		this.person_name = person_name;
	}
	
	public String getName() {
		return this.person_name;
	}
	
	public void setSpouse(SimplePerson spouse) {
		this.spouse = spouse;
	}
	
	public SimplePerson getSpouse() {
		return this.spouse;
	}
}