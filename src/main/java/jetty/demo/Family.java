package jetty.demo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.*;
//import com.fasterxml.jackson.annotation.JsonIdentityInfo;
//import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
//import com.voodoodyne.jackson.jsog.JSOGGenerator;
//import com.voodoodyne.jackson.jsog.JSOGRefDeserializer;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Family implements Serializable {
	
	@AnnotationForm()
	private Person father;
	
	@AnnotationForm()
	private Person mother;
	
	@AnnotationForm()
	private List<Person> children = new ArrayList<Person>();
	
	public Family(Person father, Person mother, Person... children ) {
		setFather(father);
		setMother(mother);
		setChildren(children);
	}
	
	public void setFather(Person father) {
		this.father = father;
	}
	
	public Person getFather() {
		return this.father;
	}
	
	public void setMother(Person mother) {
		this.mother = mother;
	}
	
	public Person getMother() {
		return this.mother;
	}
	
	public void setChildren(Person...persons) {
		this.children = Arrays.asList(persons);
	}
	
	public List<Person> getChildren() {
		return this.children;
	}
}