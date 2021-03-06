package jetty.demo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jetty.demo.AnnotationStyle.InputTypeControl;


@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Student implements Serializable{
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "") }, name = "name")
	private String stuName;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.number, value = "") }, name = "age")
	private Integer age;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "") }, name = "gender")
	private Boolean gender;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "") }, name = "phone")
	private String phone;
	
	public Student(String stuName, Integer age, Boolean gender, String phone) {
		setStuName(stuName);
		setAge(age);
		setGender(gender);
		setPhone(phone);
	}
	
	public Student() {}
	
	public void setStuName(String stuName) {
		this.stuName = stuName;
	}
	
	public String getStuName() {
		return this.stuName;
	}
	
	public void setAge(Integer age) {
		this.age = age;
	}
	
	public Integer getAge() {
		return this.age;
	}
	
	public void setGender(Boolean gender) {
		this.gender = gender;
	}
	
	public Boolean getGender() {
		return this.gender;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getPhone() {
		return this.phone;
	}
}