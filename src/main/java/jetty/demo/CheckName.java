package jetty.demo;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map.Entry;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CheckName {
	
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
	        	if (jsonNodes.hasNext()) {
	        		out = out + "\"" + node.getKey() + "\"" + ": {" + parse(jNodeValue, source, view) + "},";
	        	} else {
	        		out = out + "\"" + node.getKey() + "\"" + ": {" + parse(jNodeValue, source, view) + "}";
	        	}
	        }
	        
	        
	    }
		return out;
	}
	
	public static void main(String...args) throws IOException {
		String person = "{\"@id\":\"1\",\"@type\":\"jetty.demo.PersonDemo\",\"age\":1,\"lastName\":\"huang\",\"First Name\":\"yi\",\"password\":\"aaa\",\"email\":\"123@gmail.com\",\"choose a color\":\"#ff0000\",\"time\":\"\",\"spouse\":\"\"}";
		String view = "spouse";
		String source = "fuck";
		String test = "{\"@id\":\"1\",\"@type\":\"jetty.demo.Teacher\",\"name\":\"asfasasa\",\"years\":-2,\"lessons\":[\"sgfss\",\"sdfk\",\"aksjfh\"]}";
		String family2 = "";
		
		ObjectMapper mapper = new ObjectMapper();
		JsonNode jsog = mapper.readTree(person);
		String re;
		re = person;
		//JsonNode jsog = mapper.readTree(family2);
		//JsonNode jsog = mapper.readTree(test);
		
			re = "{" + parse(jsog, source, view) + "}";
			System.out.println(re);
		
	}
	
	
}