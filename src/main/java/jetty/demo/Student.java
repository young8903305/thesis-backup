package jetty.demo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Student implements Serializable{
	
	@AnnotationForm()
	private String name;
	
	@AnnotationForm()
	private Integer age;
	
	@AnnotationForm()
	private String gender;
	
	@AnnotationForm()
	private String phone;
	
	public Student(String name, Integer age, String gender, String phone) {
		setName(name);
		setAge(age);
		setGender(gender);
		setPhone(phone);
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setAge(Integer age) {
		this.age = age;
	}
	
	public Integer getAge() {
		return this.age;
	}
	
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public String getGender() {
		return this.gender;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getPhone() {
		return this.phone;
	}
}