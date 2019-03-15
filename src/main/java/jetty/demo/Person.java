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
public class Person implements Serializable{
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "44") }, name = "age")
	private int age;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "Chen") }, name = "lastName")
	private String lastName;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "Pu") }, name = "firstName")
	private String firstName;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "") }, name = "spouse")
	private Person spouse;
	
	public Person (int age, String firstname, String lastname, Person p) {
		setAge(age);
		setFirstName(firstname);
		setLastName(lastname);
		setSpouse(p);
	}
	
	public Person (int age, String firstname, String lastname) {
		this.age = age;
		this.firstName = firstname;
		this.lastName = lastname;
	}
	
	public Person() {}
		
	public void setAge(int age) {
		this.age = age;
	}
	
	public int getAge() {
		return this.age;
	}
	
	public void setFirstName(String FirstName) {
		this.firstName = FirstName;
	}

	public String getFirstName() {
		return this.firstName;
	}
	
	public void setLastName(String LastName) {
		this.lastName = LastName;
	}

	public String getLastName() {
		return this.lastName;
	}
	
	public void setSpouse(Person spause) {
		this.spouse = spause;
	}
	
	public Person getSpouse() {
		return this.spouse;
	}
	
}