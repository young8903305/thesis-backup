package jetty.demo;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Teacher {
	
	@AnnotationForm()
	private String name;
	
	@AnnotationForm()
	private Integer years;
	
	@AnnotationForm()
	private List<String> lessons;
	
	public Teacher(String name, Integer years, String... lessons) {
		setName(name);
		setYears(years);
		setLessons(lessons);
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setLessons(String...lessons ) {
		this.lessons = Arrays.asList(lessons);
	}
	
	public List<String> getLesson() {
		return this.lessons;
	}
	
	public void setYears(Integer years) {
		this.years = years;
	}
	
	public Integer getYears() {
		return this.years;
	}
}