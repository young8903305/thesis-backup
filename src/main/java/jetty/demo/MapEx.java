package jetty.demo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MapEx implements Serializable {
	
	private final Map<String, Option> shortOpts = new LinkedHashMap<String, Option>();

    private final Map<String, Option> longOpts = new LinkedHashMap<String, Option>();

    
    public static void main(String...args) {
    	
    	MapEx map = new MapEx();
    	
    	ObjectMapper ob = new ObjectMapper();
    }
	
}