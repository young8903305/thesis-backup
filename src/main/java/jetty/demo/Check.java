package jetty.demo;

import java.io.File;
import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map.Entry;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Check {
	
	public static String parse (JsonNode jsog, String source_name, String view_name) {
		
		String view = view_name;
		String source = source_name;
		String out = "";
		
		Iterator<Entry<String, JsonNode>> jsonNodes = jsog.fields();
		while (jsonNodes.hasNext()) {  
	        Entry<String, JsonNode> node = jsonNodes.next();
	        JsonNode jNodeValue = node.getValue();
	        
	        if(!jNodeValue.isObject()) {	// array, string, number, true, false, null, @id, @ref
	        	if( jNodeValue.isArray() ) {
		       		Iterator<JsonNode> elements = jNodeValue.elements();
		       		if (node.getKey().equals(view)) {
		       			out = out + "\"" + source + "\":[";
		       		} else {
		       			out = out + "\"" + node.getKey() + "\":[";
		       		}
		       		while (elements.hasNext()) {
		       			JsonNode element = elements.next();
		       			if(!element.isObject()) {	// array, string, number, true, false, null, @id, @ref
		       				if(element.isArray()) {	// may not have this situation.
		       					out = out + parse(element, source, view);
		       				}else {	// string, number, true, false, null, @id, @ref
		       					if (elements.hasNext()) {
		       						Object value;
		       						if (element.isNumber() || element.isBoolean()){
		       							value = element;
		       						}else {
		       							value = element.toString();
		       						}
		       						out = out + value + ",";
		       					} else {
		       						out = out + element.toString();
		       					}
		       				}
		       			} else {
		       				if (elements.hasNext()) {
		       					out = out + "{" + parse(element, source, view) + "},";
		       				} else {
		       					out = out + "{" + parse(element, source, view) + "}";
		       				}
		       			}
		       		}
		       		out = out + "]";
		       		
		       	} else {	// string, number, true, false, null, @id, @ref
		       		if (node.getKey().equals(view)) {
		       			if(jsonNodes.hasNext()) {
		       				out = out + "\"" + source + "\"" + ":" + node.getValue() + ",";
		       			} else {
		       				out = out + "\"" + source + "\"" + ":" + node.getValue();
		       			}
			        } else {
			        	if(jsonNodes.hasNext()) {
			        		out = out + "\"" + node.getKey() + "\"" + ":" + node.getValue() + ",";
			        	} else {
			        		out = out + "\"" + node.getKey() + "\"" + ":" + node.getValue();
			        	}
			        }
		       	}
	        } else {	// value is {}
	        	if (node.getKey().equals(view)) {
		        	if (jsonNodes.hasNext()) {
		        		out = out + "\"" + source + "\"" + ": {" + parse(jNodeValue, source, view) + "},";
		        	} else {
		        		out = out + "\"" + source + "\"" + ": {" + parse(jNodeValue, source, view) + "}";
		        	}
	        	} else {
	        		if (jsonNodes.hasNext()) {
		        		out = out + "\"" + node.getKey() + "\"" + ": {" + parse(jNodeValue, source, view) + "},";
		        	} else {
		        		out = out + "\"" + node.getKey() + "\"" + ": {" + parse(jNodeValue, source, view) + "}";
		        	}
	        	}
	        }
	        
	        
	    }
		return out;
	}

	public static void jsogToFormValue(JsonNode jsog) {
		
		Iterator<Entry<String, JsonNode>> jsonNodes = jsog.fields();
		while (jsonNodes.hasNext()) {  
	        Entry<String, JsonNode> node = jsonNodes.next();
	        JsonNode jNodeValue = node.getValue();
		}
	}
	public static void main(String...args) throws IOException {
		String person = "{\"@id\":\"2\",\"@type\":\"jetty.demo.Family\",\"father (PersonDemo)\": {\"@id\":\"1\",\"@type\":\"jetty.demo.PersonDemo\",\"age\":1,\"lastName\":\"huang\",\"firstName\":\"yi\",\"password\":\"aaa\",\"email\":\"123@gmail.com\",\"color\":\"#ff0000\",\"time\":null,\"spouse\":null},\"mother (PersonDemo)\": {\"@ref\":\"1\",\"@type\":\"jetty.demo.PersonDemo\"},\"children\":[{\"@ref\":\"1\",\"@type\":\"jetty.demo.PersonDemo\"},{\"@ref\":\"1\",\"@type\":\"jetty.demo.PersonDemo\"}]}";
		String view = "mother (PersonDemo)";
		String source = "fuck";
		String test = "{\"@id\":\"1\",\"@type\":\"jetty.demo.Teacher\",\"name\":\"asfasasa\",\"years\":-2,\"lessons\":[\"sgfss\",\"sdfk\",\"aksjfh\"]}";
		String family = "{\"@id\":\"2\",\"@type\":\"jetty.demo.Family\",\"father\": {\"@id\":\"1\",\"@type\":\"jetty.demo.PersonDemo\",\"age\":1,\"lastName\":\"huang\",\"firstName\":\"yi\",\"password\":\"aaa\",\"email\":\"123@gmail.com\",\"color\":\"#ff0000\",\"time\":null,\"spouse\":null},\"mother\": {\"@ref\":\"1\",\"@type\":\"jetty.demo.PersonDemo\"},\"children\":[{\"@ref\":\"1\",\"@type\":\"jetty.demo.PersonDemo\"},{\"@ref\":\"1\",\"@type\":\"jetty.demo.PersonDemo\"}]}";
		
		ObjectMapper mapper = new ObjectMapper();
		JsonNode jsog = mapper.readTree(person);
		String re;
		re = person;
		//JsonNode jsog = mapper.readTree(family2);
		//JsonNode jsog = mapper.readTree(test);
		
		re = "{" + parse(jsog, source, view) + "}";
		// System.out.println(re);
		
		Family ff = mapper.readerFor(Family.class).readValue(family);
		// System.out.println("ff.getFather().getEmail(): " + ff.getFather().getEmail());
		
		
		
		Car c = new Car();
		CarTires ct = new CarTires();
		CarTiresBrand ctb = new CarTiresBrand();
		
		ctb.setCountry("Taiwan");
		ctb.setColor("#ff0000");
		ct.setBrand(ctb);
		ct.setSize(17);
		c.setName("BENZ");
		c.setTires(ct, ct, ct, ct);
		String car = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(c);
		
		// System.out.println(car);
		
		String[] a = new String[10];
		List<String> b = new LinkedList<String>();
		ArrayList<String> d = new ArrayList<String>();
		
		/*System.out.println(a.getClass().getSimpleName() + " " + a.getClass().getTypeName().getClass().getSimpleName());
		System.out.println(b.getClass().getSimpleName() + " " + b.getClass().getTypeName().getClass().getSimpleName());
		System.out.println(d.getClass().getSimpleName() + " " + c.getClass().getTypeName().getClass().getSimpleName());*/
		
		String car_jsog = "{\"@id\":\"9\",\"@type\":\"jetty.demo.Car\",\"tires\":[{\"@id\":\"5\",\"@type\":\"jetty.demo.CarTires\",\"brand\": {\"@id\":\"1\",\"@type\":\"jetty.demo.CarTiresBrand\",\"country\":\"France\",\"color\":null},\"name\":\"Michelin\",\"size\":17},{\"@id\":\"6\",\"@type\":\"jetty.demo.CarTires\",\"brand\": {\"@id\":\"2\",\"@type\":\"jetty.demo.CarTiresBrand\",\"country\":\"France\",\"color\":null},\"name\":\"Michelin\",\"size\":17},{\"@id\":\"7\",\"@type\":\"jetty.demo.CarTires\",\"brand\": {\"@id\":\"3\",\"@type\":\"jetty.demo.CarTiresBrand\",\"country\":\"France\",\"color\":null},\"name\":\"Michelin\",\"size\":17},{\"@id\":\"8\",\"@type\":\"jetty.demo.CarTires\",\"brand\": {\"@id\":\"4\",\"@type\":\"jetty.demo.CarTiresBrand\",\"country\":\"France\",\"color\":null},\"name\":\"Michelin\",\"size\":17}],\"carName\":\"KIA\"}";
		Car car_check = mapper.readerFor(Car.class).readValue(car_jsog);
		CarTires[] tires_check = car_check.getTires();
		for (int i = 0; i < tires_check.length; i++) {
			// System.out.println(tires_check[i].getBrand().getCountry());
		}
		
        
    	//mapper.writeValue(new File("jsonObjects.json"), sharedOptions);
    	
    	//*convert java object to json string and pretty print
    	String car_JSOG_check = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(car_check);
    	System.out.println(car_JSOG_check);
	}
	
	
}