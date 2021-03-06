package jetty.demo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.*;
//import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.*;

import jetty.demo.AnnotationStyle.InputTypeControl;


@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class PersonDemo implements Serializable{
	
	@AnnotationForm(
			style = { @AnnotationStyle(input=InputTypeControl.text, value = "1") },
			name = "how old are you")
	private long age;
	
	@AnnotationForm(
			style = { @AnnotationStyle(input=InputTypeControl.text, value = "huang") },
			name = "Last Name")
	private String lastName;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "yi") }, name = "First Name")
	private String firstName;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.password, value = "aaa") }, name = "")
	private String password;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.email, value = "123@gmail.com") }, name = "")
	private String email;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.color, value = "#ff0000") }, name = "")
	private String color;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.time, value = "" ) }, name = "")
	private String time;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "") }, name = "wife")
	private PersonDemo spouse;
	
	public PersonDemo (int age, String lastname, String firstname, String description, String email, String color, String time, PersonDemo p) {
		setAge(age);
		setLastName(lastname);
		setFirstName(firstname);
		setPassword(description);
		setEmail(email);
		setColor(color);
		setTime(time);
		setSpouse(p);
	}
	
	public PersonDemo() {}
		
	public void setAge(int age) {
		this.age = age;
	}
	
	public long getAge() {
		return this.age;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getFirstName() {
		return this.firstName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getLastName() {
		return this.lastName;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public void setColor(String color) {
		this.color = color;
	}
	
	public String getColor() {
		return this.color;
	}
	
	public void setTime(String time) {
		this.time = time;
	}
	
	public String getTime() {
		return this.time;
	}
	
	public void setSpouse(PersonDemo p) {
		this.spouse = p;
	}
	
	public PersonDemo getSpouse() {
		return this.spouse;
	}
}