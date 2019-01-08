package jetty.demo;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map.Entry;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class SessionToMap {
	
	public static void main(String... args) throws IOException {
		String session = "{\"@id\":\"1\",\"@type\":\"jetty.demo.PersonDemo\",\"age\":\"1\",\"lastName\":\"huang\",\"firstName\":\"yi\",\"password\":\"aaa\",\"email\":\"123@gmail.com\",\"color\":\"#ff0000\"}";
		
		System.out.println(session);
		
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(session);
		
		Iterator<Entry<String, JsonNode>> jsonNodes = node.fields();
		while (jsonNodes.hasNext()) {  
	        Entry<String, JsonNode> jnode = jsonNodes.next();
	        JsonNode jNode = jnode.getValue();
	        System.out.println(jnode.getValue());
		}
	}
}