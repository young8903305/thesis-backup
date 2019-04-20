package jetty.demo;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jetty.demo.AnnotationStyle.InputTypeControl;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Universe {
	
	@AnnotationForm(
			style = { @AnnotationStyle(input=InputTypeControl.text, value = "") })
	List<Object> object_list;
	
	@AnnotationForm(
			style = { @AnnotationStyle(input=InputTypeControl.text, value = "") })
	List<Boolean> boolean_list;
	
	@AnnotationForm(
			style = { @AnnotationStyle(input=InputTypeControl.text, value = "") })
	List<String> string_list;


	public List<Boolean> getBoolean_list() {
		return boolean_list;
	}

	public void setBoolean_list(List<Boolean> boolean_list) {
		this.boolean_list = boolean_list;
	}

	public List<String> getString_list() {
		return string_list;
	}

	public void setString_list(List<String> string_list) {
		this.string_list = string_list;
	}

	public List<Object> getObject_list() {
		return object_list;
	}

	public void setObject_list(List<Object> object_list) {
		this.object_list = object_list;
	}
	
	public void Universe() {}
	
	
	
}