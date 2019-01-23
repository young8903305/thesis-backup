package jetty.demo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.*;

import jetty.demo.AnnotationStyle.InputTypeControl;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Family implements Serializable {
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "") }, name = "father")
	private PersonDemo father;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "") }, name = "mother")
	private PersonDemo mother;
	
	@AnnotationForm(style = { @AnnotationStyle(input=InputTypeControl.text, value = "") }, name = "children")
	private List<PersonDemo> children = new ArrayList<PersonDemo>();
	
	public Family(PersonDemo father, PersonDemo mother, List<PersonDemo> children ) {
		setFather(father);
		setMother(mother);
		//setChildren(children);
	}
	
	public Family(PersonDemo father, PersonDemo mother) {
		setFather(father);
		setMother(mother);
	}
	
	public Family() {}	// need to add this non-argument constructor for jackson to deserialize
	
	public void setFather(PersonDemo father) {
		this.father = father;
	}
	
	public PersonDemo getFather() {
		return this.father;
	}
	
	public void setMother(PersonDemo mother) {
		this.mother = mother;
	}
	
	public PersonDemo getMother() {
		return this.mother;
	}
	
	/*public void setChildren(List<PersonDemo> persons) {
		this.children = persons;
	}
	
	public List<PersonDemo> getChildren() {
		return this.children;
	}*/
}