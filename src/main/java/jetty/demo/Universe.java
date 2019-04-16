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

	public List<Object> getObject_list() {
		return object_list;
	}

	public void setObject_list(List<Object> object_list) {
		this.object_list = object_list;
	}
	
	public void Universe() {}
	
	public static void main(String...args) {
		
		Universe uni = new Universe();
		
		List<Object> test = new ArrayList<>();
		
		Car c = new Car();
		CarTires ct = new CarTires();
		test.add(c);
		test.add(ct);
		uni.setObject_list(test);
		
		ObjectMapper mapper = new ObjectMapper();
		try {
			String uni_jsog = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(uni);
			System.out.println(uni_jsog);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}