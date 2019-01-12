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
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text) }, name = "age", value = "1")
	private int age;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text) }, name = "lastName", value = "huang")
	private String lastName;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text) }, name = "firstName", value = "yi")
	private String firstName;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.password) }, name = "password", value = "aaa")
	private String password;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.email) }, name = "email", value = "123@gmail.com")
	private String email;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.color) }, name = "color", value = "#ff0000")
	private String color;
	
	/*@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.checkbox) }, name = "id", value = {"1", "2"})
	private List<?> id;*/
	
	public PersonDemo (int age, String firstname, String lastname, String description, String email, String color) {
		setAge(age);
		setFirstName(firstname);
		setLastName(lastname);
		setPassword(description);
		setEmail(email);
		setColor(color);
	}
	
	public PersonDemo() {}
		
	public void setAge(int age) {
		this.age = age;
	}
	
	public int getAge() {
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
}