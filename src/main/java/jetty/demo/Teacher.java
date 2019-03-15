package jetty.demo;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jetty.demo.AnnotationStyle.InputTypeControl;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Teacher {
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "") }, name = "name")
	private String name;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.number, value = "") }, name = "years")
	private Integer years;
	
	@AnnotationForm(style = { @AnnotationStyle(textarea = "true", value = "") }, name = "")
	private List<Boolean> lessons;
	
	public Teacher(String name, Integer years, List<Boolean> lessons) {
		setName(name);
		setYears(years);
		setLessons(lessons);
	}
	
	public Teacher() {}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setLessons(List<Boolean> lessons ) {
		this.lessons = lessons;
	}
	
	public List<Boolean> getLesson() {
		return this.lessons;
	}
	
	public void setYears(Integer years) {
		this.years = years;
	}
	
	public Integer getYears() {
		return this.years;
	}
}