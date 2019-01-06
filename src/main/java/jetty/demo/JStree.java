package jetty.demo;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Stack;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.ObjectMapper;


import jetty.demo.Person;
import jetty.demo.AnnotationForm;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JStree {
	
	public Stack<Integer> st = new Stack<Integer>();
	public static Integer Level = 0;
	public static String defaultJStreeState = "\"state\": {\n\"disabled\": false,\n\"opened\": true,\n\"selected\": false\n},\n";
	
	public static void traverseJson(JsonNode jsonNode) throws IOException {  
	    Iterator<String> fieldNames = jsonNode.fieldNames();
	    while (fieldNames.hasNext()) {
	        String fieldName = fieldNames.next();
	        System.out.println(fieldName);
	    }  
	}
	
	public static void traverseJson2(JsonNode jsonNode) {  
	    jsonNode.forEach((JsonNode node)->{  
	        System.out.println(node.toString());  
	    });  
	}
	
	/*	for object node
	 *	
	 *
	 */
	public static String traverseJson3(JsonNode jsonNode, Integer levelCount) throws IOException {  
	    Iterator<Entry<String, JsonNode>> jsonNodes = jsonNode.fields();
	    Integer level = levelCount;
	    String IDtemp = "";
	    String REFtemp = "";
	    String TYPEtemp = "";
	    String concat = "";
	    
	    while (jsonNodes.hasNext()) {  
	        Entry<String, JsonNode> node = jsonNodes.next();
	        JsonNode jNode = node.getValue();
	        if( !jNode.isObject() ) {	// array, string, number, true, false, null, @id, @ref
	        		if( jNode.isArray() ) {	// encounter an array, create a new children node, then go to handleElement function
	        			//System.out.println("{\"text\" : \"" + node.getKey() + "\",\n" + "\"children\": [");
	        			concat += ("{\"text\" : \"" + node.getKey() + "\",\n" + defaultJStreeState + "\"children\": [" );
	        															//+ defaultJStreeState + "\"children\": ["
	        			concat += handleArrayElements(jNode, level);
	        			concat += "]}";
	        			//System.out.println("]}");
	        		} else { 	// @id, @ref, @type, string, number, true, false, null
	        			if(node.getKey().equals("@id")) {	// @id
	        				IDtemp = "\"@id\"" + ":" + node.getValue().toString() + ",\n";
	        				//concat += IDtemp;
	        				//System.out.println("IDtemp: " + IDtemp);
	        			}else if(node.getKey().equals("@ref")) { 	//@ref
	        				REFtemp = "\"@ref\"" + ":" + node.getValue().toString() + ",\n";
	        				//concat += REFtemp;
	        			}else if(node.getKey().equals("@type")) { 	//@type
	        				TYPEtemp = "\"@type\"" + ":" + node.getValue().toString() + ",\n";
	        				//concat += TYPEtemp;
	        			}else {	// string, number, true, false, null
	        				//System.out.println("{\"text\": \"" + node.getKey() + "\"},");
	        				//concat += "{\"text\": \"" + node.getKey() + "\"},";
	        				concat += "\n{\"text\": \"" + node.getKey() + "\",\n" + "\"value\": " + node.getValue() + "},";
	        				concat += traverseJson3(jNode, level);
	        			}
	        		}
	        	}else { // encounter a new object, create new children node
	        		//System.out.println("{\"text\": \"" + node.getKey() + "\",\n" + defaultJStreeState + "\"children\": [ ");
	        		//concat += ("{\"text\": \"" + node.getKey() + "\",\n" + "\"children\": [ ");
	        		concat += ("{\"text\": \"" + node.getKey() + "\",\n" + "\"a_attr\":{\"href\": \"#" + node.getKey() + "\" },\n" + "\"children\": [ ");
	        		//concat += ("\"children\": [\n" + "{\"text\": \"" + node.getKey() + "\",\n");
	        		concat += traverseJson3(jNode, level);
	        		concat += "]},";
	        		//System.out.println("]},");
	        	}
	    }
	    return concat;
	    
	}
	
	/*
	 * 
	 *  for array node, need to fix for string/array/null/true/false
	 */
	public static String handleArrayElements(JsonNode arrayNode, Integer levelCount) throws IOException {  
	    Iterator<JsonNode> Elements = arrayNode.elements();
	    Integer level = levelCount;
	    String concat = "";
	    
	    while (Elements.hasNext()) {  
	        JsonNode realElement = Elements.next();
	        if (realElement.isArray()) {
	        		concat += handleArrayElements(realElement, level);
	        } else { 	//object in array
	        		//System.out.println("{\"children\":[");
	        		concat += ("{ " + defaultJStreeState + "\"children\":[");
	        		//concat += ("\"children\":[\n{");
	        		concat += traverseJson3(realElement, level);
	        		concat += "]},";
	        		//System.out.println("]},");
	        }
	    }
	    return concat;
	}
	
	public static List< List<String> > formParse (JsonNode jsonNode) {
		
		List< List<String> > a = new ArrayList< List<String> >();
		// get variable name
		Iterator<Entry<String, JsonNode>> jsonNodes = jsonNode.fields();
		List<String> variable = new ArrayList<String>();
		List<String> value = new ArrayList<String>();
		while (jsonNodes.hasNext()) {
			Entry<String, JsonNode> innerNode = jsonNodes.next();
			JsonNode nodeTemp = innerNode.getValue();
			if ( !nodeTemp.isObject() ) {
				if ( nodeTemp.isArray() ) {	//encounter an array
					
				} else {
					if(innerNode.getKey().equals("@id")) {
						
					}else if(innerNode.getKey().equals("@ref")) {
						
					}else if(innerNode.getKey().equals("@type")) {
						
					}else {	// string, number, true, false, null
						variable.add(innerNode.getKey());
						value.add(innerNode.getValue().toString());
					}
				}
			} else {	// encounter a new object
				variable.add(innerNode.getKey());
				value.add(" ");
				variable.addAll(formParse(nodeTemp).get(0));
				value.addAll(formParse(nodeTemp).get(1));
			}
		}
		
		a.add(variable);
		a.add(value);
		
		return a;
		
	}
	
	/*public static void formParse2() {
		
	}*/
	
	public static void main(String...args) throws IOException {
		String jsogPerson = "{\"@id\":\"1\",\"age\":10,\"firstName\":\"Ann\",\"lastName\":\"Chou\",\"spouse\":null}";
		String jsogFamily = "{\"@id\":\"1\",\"father\":{\"@id\":\"2\",\"age\":50,\"firstName\":\"John\",\"lastName\":\"Chou\",\"spouse\":{\"@id\":\"3\",\"age\":44,\"firstName\":\"Lily\",\"lastName\":\"Chou\",\"spouse\":{\"@ref\":\"2\"}}},\"mother\":{\"@ref\":\"3\"},\"children\":[{\"@id\":\"4\",\"age\":18,\"firstName\":\"Han\",\"lastName\":\"Chou\",\"spouse\":null},{\"@id\":\"5\",\"age\":10,\"firstName\":\"Ann\",\"lastName\":\"Chou\",\"spouse\":null}]}";
		String TypeFamily = "{\"@id\": \"1\",\"@type\": \"jetty.demo.Family\",\"father\": {\"@id\": \"2\",\"@type\": \"jetty.demo.Person\",\"age\": 10,\"firstName\": \"dfga\",\"lastName\": \"alkjfg\",\"spouse\": {\"@id\": \"3\",\"@type\": \"jetty.demo.Person\",\"age\": 2,\"firstName\": \"22\",\"lastName\": \"22\",\"spouse\": {\"@ref\": \"2\",\"@type\": \"jetty.demo.Person\"}}},\"mother\": {\"@ref\": \"3\",\"@type\": \"jetty.demo.Person\"},\"children\": [{\"@id\": \"4\",\"@type\": \"jetty.demo.Person\",\"age\": 3,\"firstName\": \"33\",\"lastName\": \"333\",\"spouse\": null}, {\"@id\": \"5\",\"@type\": \"jetty.demo.Person\",\"age\": 4,\"firstName\": \"44\",\"lastName\": \"4444\",\"spouse\": null}]}";
		String outputString = "";
		String head = "{\n" + defaultJStreeState + "\"children\":[";
		String tail ="\n]}";
		
		ObjectMapper mapper = new ObjectMapper();
		//JsonNode node = mapper.readTree(jsogPerson);
		//JsonNode node = mapper.readTree(jsogFamily);
		JsonNode node = mapper.readTree(TypeFamily);
		
		// recursive
		outputString = head + traverseJson3(node, Level) + tail;
		// System.out.println(outputString);

		List<String> value = new ArrayList<String>();
		List<String> variable = new ArrayList<String>();

		List<List<String>> a = new ArrayList<List<String>>();
		a = formParse(node);

		for (int i = 0; i < a.size(); i++) {
			//System.out.println("variable : " + variable.get(i));
			//System.out.println("value : " + value.get(i));
			System.out.println(a.get(i));
		}
		
	    
	    
		// read back from string and deserialize
		//Family ff = mapper.readerFor(Family.class).readValue(jsogFamily);
		//System.out.println(ff.getFather().getAge());
	}
}