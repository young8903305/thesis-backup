//
//  ========================================================================
//  Copyright (c) 1995-2016 Mort Bay Consulting Pty. Ltd.
//  ------------------------------------------------------------------------
//  All rights reserved. This program and the accompanying materials
//  are made available under the terms of the Eclipse Public License v1.0
//  and Apache License v2.0 which accompanies this distribution.
//
//      The Eclipse Public License is available at
//      http://www.eclipse.org/legal/epl-v10.html
//
//      The Apache License v2.0 is available at
//      http://www.opensource.org/licenses/apache2.0.php
//
//  You may elect to redistribute this code under either of these licenses.
//  ========================================================================
//

package jetty.demo;

import static java.lang.System.*;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.*;

import java.awt.Desktop;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Array;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.MultipartConfigElement;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import javax.swing.JFileChooser;
import javax.swing.JFrame;

import org.apache.commons.lang3.ObjectUtils.Null;
import org.apache.tomcat.util.scan.StandardJarScanner;
import org.eclipse.jetty.apache.jsp.JettyJasperInitializer;
import org.eclipse.jetty.jsp.JettyJspServlet;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.eclipse.jetty.util.component.AbstractLifeCycle;
import org.eclipse.jetty.util.thread.QueuedThreadPool;
import org.eclipse.jetty.webapp.Configuration;

/**
 * Example of using JSP's with embedded jetty and using a lighter-weight
 * ServletContextHandler instead of a WebAppContext.
 * 
 * This example is somewhat odd in that it uses custom tag libs which reside in
 * a WEB-INF directory, even though WEB-INF is not meaningful to a
 * ServletContextHandler. This just shows that once we have properly initialized
 * the jsp engine, you can even use this type of custom taglib, even if you
 * don't have a full-fledged webapp.
 * 
 */
public class Main {
	// Resource path pointing to where the WEBROOT is
	private static final String WEBROOT_INDEX = "/webroot/";
	
	private static String[] arguments;
	
	private static HashMap<String, String> sessionStorage = new HashMap<String, String>();	// key-value
	private static HashMap<String, String> Source_ViewMap = new HashMap<String, String>();	// source-view
	private static HashMap<String, String> InputTypeMap = new HashMap<String, String>();	// name-type
	private static HashMap<String, String> javaStorageTypeMap = new HashMap<String, String>();	// name-javaType
	private static HashMap<String, String> formValueMap = new HashMap<String, String>();	// objectName-formValue
	
	private static String output_Jsog;
	
	public static void ConstructViewToSourceMap (String arg) {
		Class<?> pClass = null;
			try {
				pClass = Class.forName(arg);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// Field
			Field[] fieldlist = pClass.getDeclaredFields(); // include private members
			
			Annotation annotation;
			AnnotationForm var;
			String viewName = "";
			String complexTypeName = "";
			for (Field f : fieldlist) {
				annotation = f.getAnnotation(AnnotationForm.class);
				var = (AnnotationForm) annotation;
				System.out.println(var.style()[0]);
				if (f.getType().getSimpleName().equals("List")) {
					ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
					Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
					complexTypeName = "List".concat(" " + stringListClass.getSimpleName());
				} else {	// array or other types
					complexTypeName = f.getType().getSimpleName();
				}
				// set viewName if name in annotation been set, or use attribute name 
				if (var.name().equals("")) {
					viewName = f.getName().concat(" (" + complexTypeName + ")");;
				} else {
					viewName = var.name().concat(" (" + complexTypeName + ")");
				}
				Source_ViewMap.put(f.getName(), viewName);
			}
	}
	

	@SuppressWarnings("serial")
	public static class OutputFilePath extends HttpServlet {
		
		String text = "";
		JFileChooser chooser = new JFileChooser();
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			
			chooser.setCurrentDirectory(new File(System.getProperty("user.home")));
			chooser.setDialogTitle("choosertitle");
			chooser.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
			// JFileChooser.FILES_ONLY, JFileChooser.DIRECTORIES_ONLY,
			// JFileChooser.FILES_AND_DIRECTORIES
			chooser.setAcceptAllFileFilterUsed(false);
			chooser.setMultiSelectionEnabled(true);

			
			if(chooser.showOpenDialog(null) == JFileChooser.APPROVE_OPTION) {	// verify if selected file or not
				File selectedFolder = chooser.getSelectedFile();
				//System.out.println("Selected file: " + selectedFolder.getAbsolutePath());
				text = selectedFolder.getAbsolutePath();
			}else {
				text = "";
			}

			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(text);
		}

		@Override
		protected void doGet(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			doPost(request, response);
		}
	}
	
	@SuppressWarnings("serial")
	public static class InputFilePath extends HttpServlet {
		
		JFileChooser chooser = new JFileChooser();
		String text = "";
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			
			response.setStatus(HttpServletResponse.SC_OK);
	        response.flushBuffer();
			
			
			chooser.setCurrentDirectory(new File(System.getProperty("user.home")));
			chooser.setDialogTitle("choosertitle");
			chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
			// JFileChooser.FILES_AND_DIRECTORIES, JFileChooser.DIRECTORIES_ONLY,
			// JFileChooser.FILES_AND_DIRECTORIES
			chooser.setAcceptAllFileFilterUsed(false);
			chooser.setMultiSelectionEnabled(true);

			
			// verify if selected file or not
			if(chooser.showOpenDialog(null) == JFileChooser.APPROVE_OPTION) {
				File selectedFolder = chooser.getSelectedFile();
				//System.out.println("Selected file: " + selectedFolder.getAbsolutePath());
				text = selectedFolder.getAbsolutePath();
			}else {
				text = "";
			}

			response.setContentType("text/plain"); // response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
			response.addHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Codingpedia");
			response.getWriter().write(text); // response.getWriter().write(jsonString);
		}

		@Override
		protected void doGet(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			doPost(request, response);
		}
	}

	public static class GenServlet extends HttpServlet {

		public void init() throws ServletException {
		}

		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

			// get class
			// Class<?> pClass = Person.class;
			Class<?> pClass = null;
			try {
				pClass = Class.forName("jetty.demo.Person");
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}

			// get constructor
			Constructor<?>[] allConstructors = pClass.getDeclaredConstructors(); // 獲取所有的建構函式，包括私有的，不包括父類的
			//System.out.println(allConstructors);

			// Field
			Field[] fieldlist = pClass.getDeclaredFields();

			// create object with annotation
			String className = pClass.getName();
			String[] fieldName = new String[fieldlist.length];
			String[] layout = new String[fieldlist.length];
			Object[] type = new Object[fieldlist.length];
			
			// Field Annotation
			int index = 0;
			Object person_gen;
			Annotation annotation;
			for (Field field : fieldlist) {
				annotation = field.getAnnotation(AnnotationForm.class);
				AnnotationForm var = (AnnotationForm) annotation;
				fieldName[index] = field.getName();
				type[index] = field.getType();
				//layout[index] = var.memberType();
				index++;
			}
			
			// set for submitServlet to catch className
			ServletContext context = this.getServletContext();
			context.setAttribute("className", className);
			
			// set for generate.jsp to get required objects
			request.setAttribute("className", className);
			request.setAttribute("layout", layout);
			request.setAttribute("fieldName", fieldName);
			request.setAttribute("type", type);
			request.setAttribute("allConstructors", allConstructors);

			RequestDispatcher dispatcher = request.getRequestDispatcher("/generate.jsp");
			dispatcher.forward(request, response);
		}

		protected void doPost(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			doGet(request, response);
		}
	}

	public static class SubmitServlet extends HttpServlet {

		public void init() throws ServletException {}

		protected void doGet(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			
			// get class
			//Class<?> pClass = Person.class;
			Class<?> pClass = null;
			ServletContext context = this.getServletContext();
			String className = (String) context.getAttribute("className");
			try {
				pClass = Class.forName(className);
			} catch (ClassNotFoundException e2) {
				e2.printStackTrace();
			}

			// get constructor
			//Constructor<?>[] allConstructors = pClass.getDeclaredConstructors();//獲取所有的建構函式，包括私有的，不包括父類的
			Constructor<?> nullConstructor = null;
			try {
				nullConstructor = pClass.getConstructor(int.class, String.class, String.class);		//select which constructor we need to use
				nullConstructor.setAccessible(true); 	// 設定是否可訪問，因為該構造器是private的，所以要手動設定允許訪問，如果構造器是public的就不用設定
			} catch (NoSuchMethodException | SecurityException e1) {
				e1.printStackTrace();
			}
			
			// catch parameter value to String array
			Enumeration<String> paramNames = request.getParameterNames();
			String[] paramValues = null;
			while (paramNames.hasMoreElements()) {
				String paramName = (String) paramNames.nextElement();
				paramValues = request.getParameterValues(paramName);
			}
			
			for(int i = 0; i < paramValues.length; i++) {
				System.out.println(paramValues[i]);
			}
			
			//if no checkbox for path, need to specify requested parameter name to get path string 
			String path_text = request.getParameter("path-text");
			
			//construct a new object
			Object instance = null;
			try {
				instance = nullConstructor.newInstance(Integer.parseInt(paramValues[0]), paramValues[1], paramValues[2]);
			} catch (InstantiationException | IllegalAccessException | IllegalArgumentException
					| InvocationTargetException e1) {
				e1.printStackTrace();
			}
			
			if(instance != null) {
			try {
				// Serializable, primitive java object output
				FileOutputStream f = new FileOutputStream(new File( path_text + "/myObjects_gen.txt"));
				//FileOutputStream f = new FileOutputStream(new File( "myObjects.txt"));		// will output to webapp folder
				ObjectOutputStream o = new ObjectOutputStream(f);

				o.writeObject(instance);
				o.close();
				f.close();

				// JSON type output
				ObjectMapper mapper = new ObjectMapper();
				mapper.writeValue(new File( path_text + "/jsonObjects_gen.json"), instance);
				//mapper.writeValue(new File( "jsonObjects.json"), instance);	// will output to webapp root folder

				// convert java object to json string and pretty print
				//String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(instance);
				//System.out.println(jsonString);
				
				// direct to finished html page
				response.sendRedirect("submit.html");

			} catch (IOException e) {
				e.printStackTrace();
			}
			}else {
				System.out.println("null object");
			}
			
			// read the object from file to check out whether fail or success
			/*Person pIn; 
			try {
				FileInputStream fi = new FileInputStream(new File( path_text + "/myObjects.txt"));
				ObjectInputStream oi = new ObjectInputStream(fi);
				pIn = (Person) oi.readObject();
				System.out.println(pIn.toString());
			} catch (FileNotFoundException | ClassNotFoundException e) {
				e.printStackTrace();
			}*/
			 
		}

		protected void doPost(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			doGet(request, response);
		}
	}
	
	public static class Edit0Servlet extends HttpServlet {
		
		public void init() throws ServletException {}
		
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			/*RequestDispatcher dispatcher = request.getRequestDispatcher("/edit0.jsp");
			dispatcher.forward(request, response);*/
			
			request.getRequestDispatcher("/edit0.jsp").forward(request, response);
			return ;
		}
		
		protected void doPost(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			doGet(request, response);
		}
	}
	
	/* edit from json file : parse json, then set attribute to arrange form and value  
	 * */
	public static class Edit1Servlet extends HttpServlet {
		
		String className_forEdit = "";
		String path_text = "";
		String jsTreeString = "";
		List<String> variable = new ArrayList<String>();
		List<String> value = new ArrayList<String>();
		Object[] type_forEdit;
		String[] layout;
		
		public void init() throws ServletException {}
		
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			path_text = request.getParameter("path-text");
			Integer Level = 0;
			
			ObjectMapper mapper = new ObjectMapper();
			String jsogInput = new String(Files.readAllBytes(Paths.get(path_text)));
			//System.out.println(jsogInput);
			
			// parse jsog to jsTree's data format
			JsonNode node = mapper.readTree(jsogInput);
			String defaultJStreeState = "\"state\": {\n\"disabled\": false,\n\"opened\": true,\n\"selected\": false\n},\n";
			String head = "{\n" + defaultJStreeState + "\"children\":[";
			String tail ="\n]}";
			jsTreeString = head + JStree.traverseJson3(node, Level) + tail;
			//System.out.println(jsTreeString);
			
			// parse jsog variable/value/@type to String List, then setAttribute for edit1.jsp
			className_forEdit = node.get("@type").asText();
			Class<?> pClass = null;
			try {
				pClass = Class.forName(className_forEdit);
			} catch (ClassNotFoundException e2) {
				e2.printStackTrace();
			}
			// Field Annotations
			Field[] fieldlist = pClass.getDeclaredFields();
			// create object with annotation
			type_forEdit = new Object[fieldlist.length];
			layout = new String[fieldlist.length];

			int index = 0;
			Annotation annotation;
			AnnotationForm var;
			for (Field field : fieldlist) {
				annotation = field.getAnnotation(AnnotationForm.class);
				var = (AnnotationForm) annotation;
				type_forEdit[index] = field.getType();
				//layout[index] = var.memberType();
				index++;
			}
			
			Iterator<Entry<String, JsonNode>> jsonNodes = node.fields();
			//String[] variable = new String[node.size()];
			//String[] value = new String[node.size()];
			
		    while (jsonNodes.hasNext()) {  
		        Entry<String, JsonNode> innerNode = jsonNodes.next();  
		        //System.out.println(innerNode.getKey());  
		        //System.out.println(innerNode.getValue().toString());
		        if(!innerNode.getKey().equals("@id") && !innerNode.getKey().equals("@type")) {
			        variable.add(innerNode.getKey());
			        value.add(innerNode.getValue().toString());
		        }
		    }
			
			
			// set required objects for edit1.jsp use
		    request.setAttribute("className_forEdit", className_forEdit);
			request.setAttribute("jsTreeString", jsTreeString);
			request.setAttribute("variable", variable);
			request.setAttribute("value", value);
			request.setAttribute("type_forEdit", type_forEdit);
			request.setAttribute("path_text", path_text);
			request.setAttribute("layout", layout);
			
			// set attribute and directed to edit1.jsp
			request.getRequestDispatcher("/edit1.jsp").forward(request, response);
			return;
		}
		
		protected void doPost(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			doGet(request, response);
		}
	}
	
	public static class EditFinish extends HttpServlet{
		
		String className_forEdit = "";
		String path_text = "";
		
		public void init() throws ServletException {}
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			HttpSession session = request.getSession();
			path_text = String.valueOf(session.getAttribute("path_text"));
			
			// get class
			// Class<?> pClass = Person.class;
			Class<?> pClass = null;
			className_forEdit = String.valueOf(session.getAttribute("className_forEdit"));
			try {
				pClass = Class.forName(className_forEdit);
			} catch (ClassNotFoundException e2) {
				e2.printStackTrace();
			}

			// get constructor
			// Constructor<?>[] allConstructors =
			// pClass.getDeclaredConstructors();//獲取所有的建構函式，包括私有的，不包括父類的
			Constructor<?> nullConstructor = null;
			try {
				nullConstructor = pClass.getConstructor(int.class, String.class, String.class); // select which constructor we need to use
				nullConstructor.setAccessible(true); // 設定是否可訪問，因為該構造器是private的，所以要手動設定允許訪問，如果構造器是public的就不用設定
			} catch (NoSuchMethodException | SecurityException e1) {
				e1.printStackTrace();
			}

			// catch parameter value to String array
			Enumeration<String> paramNames = request.getParameterNames();
			String[] paramValues = null;
			while (paramNames.hasMoreElements()) {
				String paramName = (String) paramNames.nextElement();
				paramValues = request.getParameterValues(paramName);
			}
			
			Collections.list(request.getParameterNames())
	           .stream()
	           .map(request::getParameter)
	           .forEach(System.out::println);

			// construct a new object
			Object instance = null;
			try {
				instance = nullConstructor.newInstance(Integer.parseInt(paramValues[0]), paramValues[1], paramValues[2]);
			} catch (InstantiationException | IllegalAccessException | IllegalArgumentException
					| InvocationTargetException e1) {
				e1.printStackTrace();
			}

			try {

				// JSON type output
				ObjectMapper mapper = new ObjectMapper();
				mapper.writeValue(new File(path_text ), instance);
				// mapper.writeValue(new File( "jsonObjects.json"), instance); // will output to webapp root folder

				// direct to finished html page
				response.sendRedirect("submit.html");

			} catch (IOException e) {
				e.printStackTrace();
			}
			
			// set required objects for edit1.jsp use
		    request.setAttribute("path_text", path_text);
			
			// set attribute and directed to editFinish.jsp
			request.getRequestDispatcher("/editFinish.jsp").forward(request, response);
		}
	}
	
	
	/* file upload:
	 * Get the file part and readin the jsog string, then send to ng-uploader-component
	 * May have multiple objects or single object
	 */
	@MultipartConfig(
			fileSizeThreshold = 1024 * 1024 * 2,
			maxRequestSize = 1024 * 1024 * 10,
			maxFileSize = 1024 * 1024 * 50
	)
	public static class ngUploader extends HttpServlet{
		
		public void init() throws ServletException{}
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			InputStream fileContent = null;
			String fileContentStr;
			try {
				fileContent = request.getPart("file").getInputStream();
				
				ByteArrayOutputStream result = new ByteArrayOutputStream();
				byte[] buffer = new byte[1024];
				int length;
				while ((length = fileContent.read(buffer)) != -1) {
				    result.write(buffer, 0, length);
				}
				fileContentStr = result.toString(StandardCharsets.UTF_8.name());
				// System.out.println("from file: " + fileContentStr);
			} finally {
			   fileContent.close();
			}
			
			String upJsog = fileContentStr.toString();
			ObjectMapper mapper = new ObjectMapper();
			JsonNode jsog = mapper.readTree(upJsog);
			
			String upJsog_after = "";
			String single_ob_jsog = "";
			String source;
			String view;
			if(jsog.isArray()) {
				// change multiple objects source-name into view-name
				Iterator<JsonNode> elements = jsog.elements();  
			    while (elements.hasNext()) {
			        JsonNode single_ob = elements.next();
			        for ( Entry<String, String> entry : Source_ViewMap.entrySet()) {
					    source = entry.getKey();
					    view = entry.getValue();
					    single_ob_jsog = "{" + parse(single_ob, view, source) + "}";
					    single_ob = mapper.readTree(single_ob_jsog);
					}
			        if (elements.hasNext()) {
			        	upJsog_after = upJsog_after + single_ob_jsog + ",";
	   				} else {
	   					upJsog_after = upJsog_after + single_ob_jsog;
	   				}
			    }
			    upJsog_after = "[" + upJsog_after + "]";
			} else if(jsog.isObject()) {
				upJsog_after = upJsog;
				// change single object source-name into view-name
				for ( Entry<String, String> entry : Source_ViewMap.entrySet()) {
					jsog = mapper.readTree(upJsog_after);
				    source = entry.getKey();
				    view = entry.getValue();
				    upJsog_after = "{" + parse(jsog, view, source) + "}";
				}
			}
			
			System.out.println(upJsog_after);
			
			response.setHeader("Access-Control-Allow-Origin", "*");	// enable CORS
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write(upJsog_after);
		}
	}
	
	// send InputTypeMap to ng-tree component
	public static class ngInputType extends HttpServlet{
		
		public void init() throws ServletException{}
		
		@Override
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			ObjectMapper ob = new ObjectMapper();
			
			for (int i = 0; i < arguments.length; i++) {
				
				Class<?> pClass = null;
				ObjectNode styleNode = ob.createObjectNode();	//  fieldName : type 
				ObjectNode typeNode = ob.createObjectNode();	// [ fieldName : type ]
				try {
					pClass = Class.forName(arguments[i]);
					// Field
					Field[] fieldlist = pClass.getDeclaredFields(); // include private members
					
					Annotation annotation;
					AnnotationForm var;
					String viewName = "";
					String complexTypeName = "";
					for (Field f : fieldlist) {
						annotation = f.getAnnotation(AnnotationForm.class);
						var = (AnnotationForm) annotation;
						if (f.getType().getSimpleName().equals("List")) {
							ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
							Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
							complexTypeName = "List".concat(" " + stringListClass.getSimpleName());
							
						} else {	// array or other types
							complexTypeName = f.getType().getSimpleName();
						}
						// set viewName if name in annotation been set, or use attribute name
						if (var.name().equals("")) {
							viewName = f.getName().concat(" (" + complexTypeName + ")");
						} else {
							viewName = var.name().concat(" (" + complexTypeName + ")");
						}
						if(var.style()[0].input() != AnnotationStyle.InputTypeControl.none) {
							switch (var.style()[0].input()) {
							case color :
								styleNode.put(viewName, "color");
								break;
							case date:
								styleNode.put(viewName, "date");
								break;
							case email:
								styleNode.put(viewName, "email");
								break;
							case month:
								styleNode.put(viewName, "month");
								break;
							case number:
								styleNode.put(viewName, "number");
								break;
							case password :
								styleNode.put(viewName, "password");
								break;
							case text :
								styleNode.put(viewName, var.style()[0].input().toString());	// var.style()[0].input().toString() = "text"
								break;
							case time :
								styleNode.put(viewName, "time");
								break;
							case week :
								styleNode.put(viewName, "week");
								break;
							case none :
								break;
							default :
								break;
							}
						} else if (var.style()[0].textarea().length() > 0) {
							styleNode.put(viewName, "textarea");
						}
						InputTypeMap.put(arguments[i], styleNode.toString());
					}
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				}
			}
			
			ObjectNode inputTypeJson = ob.createObjectNode();
		    InputTypeMap.forEach((k, v) -> {
		    	inputTypeJson.put(k, v.toString());
		    });

			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write(inputTypeJson.toString());
		}
	}
	
	// send javaStorageTypeMap to ng-tree component
		public static class ngJavaStorageType extends HttpServlet{
			
			public void init() throws ServletException{}
			
			@Override
			protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
				
				ObjectMapper ob = new ObjectMapper();
				
				for (int i = 0; i < arguments.length; i++) {
					
					Class<?> pClass = null;
					ObjectNode typeNode = ob.createObjectNode();	// fieldName : type
					try {
						pClass = Class.forName(arguments[i]);
						// Field
						Field[] fieldlist = pClass.getDeclaredFields(); // include private members
						
						Annotation annotation;
						AnnotationForm var;
						String viewName = "";
						String complexTypeName = "";
						for (Field f : fieldlist) {
							annotation = f.getAnnotation(AnnotationForm.class);
							var = (AnnotationForm) annotation;
							if (f.getType().getSimpleName().equals("List")) {
								ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
								Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
								complexTypeName = "List".concat(" " + stringListClass.getSimpleName());
								
							} else {	// array or other types
								complexTypeName = f.getType().getSimpleName();
							}
							// set viewName if name in annotation been set, or use attribute name
							if (var.name().equals("")) {
								viewName = f.getName().concat(" (" + complexTypeName + ")");
							} else {
								viewName = var.name().concat(" (" + complexTypeName + ")");
							}
							if(var.style()[0].input() != AnnotationStyle.InputTypeControl.none) {
								switch (var.style()[0].input()) {
								case color :
									typeNode.put(viewName, complexTypeName);
									break;
								case date:
									typeNode.put(viewName, complexTypeName);
									break;
								case email:
									typeNode.put(viewName, complexTypeName);
									break;
								case month:
									typeNode.put(viewName, complexTypeName);
									break;
								case number:
									typeNode.put(viewName, complexTypeName);
									break;
								case password :
									typeNode.put(viewName, complexTypeName);
									break;
								case text :
									typeNode.put(viewName, complexTypeName);
									break;
								case time :
									typeNode.put(viewName, complexTypeName);
									break;
								case week :
									typeNode.put(viewName, complexTypeName);
									break;
								case none :
									break;
								default :
									break;
								}
							} else if (var.style()[0].textarea().length() > 0) {
								typeNode.put(viewName, complexTypeName);
							}
							javaStorageTypeMap.put(arguments[i], typeNode.toString());
						}
					} catch (ClassNotFoundException e) {
						e.printStackTrace();
					}
				}
				
				ObjectNode javaStorageTypeJson = ob.createObjectNode();
			    javaStorageTypeMap.forEach((k, v) -> {
			    	javaStorageTypeJson.put(k, v.toString());
			    });

				response.setContentType("text/plain");
				response.setCharacterEncoding("UTF-8");
				response.setStatus(HttpServletResponse.SC_OK);
				response.getWriter().write(javaStorageTypeJson.toString());
			}
		}
	
	public static class ngEditSessionStorage extends HttpServlet {
		public void init() throws ServletException {
		}
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			StringBuilder sb = new StringBuilder();
		    BufferedReader reader = request.getReader();
		    try {
		        String line;
		        while ((line = reader.readLine()) != null) {
		            sb.append(line).append('\n');
		        }
		    } finally {
		        reader.close();
		    }
			String str = sb.toString();
			
			ObjectMapper mapper = new ObjectMapper();
			JsonNode node = mapper.readTree(str);
			String className = node.get("@type").asText();
			String id = node.get("@id").asText();
			String EditSessionName = "";
			
			Class<?> pClass = null;
		    // ObjectNode defaultValueNode = mapper.createObjectNode();	// make json string to output : { fieldName : field  DefaultValue }
		    ObjectNode styleNode = mapper.createObjectNode();	// [ fieldName : style ]
		    ObjectNode typeNode = mapper.createObjectNode();	// [ fieldName : type ]
			try {
				pClass = Class.forName(className);
				EditSessionName = pClass.getSimpleName() + id;
				// Field
				Field[] fieldlist = pClass.getDeclaredFields(); // include private members
				
				Annotation annotation;
				AnnotationForm var;
				String viewName = "";
				String complexTypeName = "";
				for (Field f : fieldlist) {
					annotation = f.getAnnotation(AnnotationForm.class);
					var = (AnnotationForm) annotation;
					if (f.getType().getSimpleName().equals("List")) {
						ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
						Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
						complexTypeName = "List".concat(" " + stringListClass.getSimpleName());
					} else {	// array or other types
						complexTypeName = f.getType().getSimpleName();
					}
					// set viewName if name in annotation been set, or use attribute name
					if (var.name().equals("")) {
						viewName = f.getName().concat(" (" + complexTypeName + ")");;
					} else {
						viewName = var.name().concat(" (" + complexTypeName + ")");
					}
					// ViewToSourceMap.put(f.getName(), viewName);
					if(var.style()[0].input() != AnnotationStyle.InputTypeControl.none) {
						switch (var.style()[0].input()) {
							case color :
								styleNode.put(viewName, "color");
								typeNode.put(viewName, complexTypeName);
								break;
							case date:
								styleNode.put(viewName, "date");
								typeNode.put(viewName, complexTypeName);
								break;
							case email:
								styleNode.put(viewName, "email");
								typeNode.put(viewName, complexTypeName);
								break;
							case month:
								styleNode.put(viewName, "month");
								typeNode.put(viewName, complexTypeName);
								break;
							case number:
								styleNode.put(viewName, "number");
								typeNode.put(viewName, complexTypeName);
								break;
							case password :
								styleNode.put(viewName, "password");
								typeNode.put(viewName, complexTypeName);
								break;
							case text :
								styleNode.put(viewName, var.style()[0].input().toString());	// var.style()[0].input().toString() = "text"
								typeNode.put(viewName, complexTypeName);
								break;
							case time :
								styleNode.put(viewName, "time");
								typeNode.put(viewName, complexTypeName);
								break;
							case week :
								styleNode.put(viewName, "week");
								typeNode.put(viewName, complexTypeName);
								break;
							default:
								break;
						}
					}else if(var.style()[0].textarea().length() > 0) {
						styleNode.put(viewName, "textarea");
						typeNode.put(viewName, complexTypeName);
					}
				}
				
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			
			// enclose Edit Session Name with "", make responce_json send to front-end
			String responce_json = "[" + str + "," + styleNode.toString() + "," + typeNode.toString() + ",\"" + EditSessionName.toString() + "\"" + "]";
			
			// response.setHeader("Access-Control-Allow-Origin", "*");	// enable CORS
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write(responce_json);
		}
		
	}
	
	// when output json, need sessionStorage to create object's json-string
	public static class ngSessionStorage extends HttpServlet {
		public void init() throws ServletException{
			sessionStorage.clear();
		}
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			StringBuilder sb = new StringBuilder();
		    BufferedReader reader = request.getReader();
		    try {
		        String line;
		        while ((line = reader.readLine()) != null) {
		            sb.append(line).append('\n');
		        }
		    } finally {
		        reader.close();
		    }
			String str = sb.toString();
			System.out.println("sessionStorage: "+ str);
			
			ObjectMapper mapper = new ObjectMapper();
			ObjectMapper mapper2 = new ObjectMapper();
			JsonNode node = mapper.readTree(str);
			
			Iterator<Entry<String, JsonNode>> jsonNodes = node.fields();
			while (jsonNodes.hasNext()) {  
		        Entry<String, JsonNode> jnode = jsonNodes.next();
		        // JsonNode jNode = jnode.getValue();
		        sessionStorage.put(jnode.getKey(), jnode.getValue().asText());
			}
			
			//sessionStorage.forEach((k, v) -> System.out.println(k + " : " + v));
			
			response.setHeader("Access-Control-Allow-Origin", "*");	// enable CORS
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write(str);
		}
	}
	
	@MultipartConfig(
			fileSizeThreshold = 1024 * 1024 * 2,
			maxRequestSize = 1024 * 1024 * 10,
			maxFileSize = 1024 * 1024 * 50
	)
	public static class ngFormOutput extends HttpServlet{
		
		JFrame parentFrame = new JFrame();
	    JFileChooser fileChooser = new JFileChooser();
	    
		public void init() throws ServletException{}
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			output_Jsog = "";
			
			StringBuilder sb = new StringBuilder();
		    BufferedReader reader = request.getReader();
		    try {
		        String line;
		        while ((line = reader.readLine()) != null) {
		            sb.append(line).append('\n');
		        }
		    } finally {
		        reader.close();
		    }
			String str = sb.toString();
			
			ObjectMapper mapper = new ObjectMapper();
			JsonNode jsog = mapper.readTree(str);
			
			String source;
			String view;
			for ( Entry<String, String> entry : Source_ViewMap.entrySet()) {
			    source = entry.getKey();
			    view = entry.getValue();
			    output_Jsog = "{" + parse(jsog, source, view) + "}";
			    jsog = mapper.readTree(output_Jsog);
			}
			// System.out.println("Map: " + ViewToSourceMap);
			// System.out.println("form value: " + str);
			// System.out.println("final value: " + re);
			
		    
		    fileChooser.setDialogTitle("Specify a file to save");   
		     
		    int userSelection = fileChooser.showSaveDialog(parentFrame);
		    fileChooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
		    File fileToSave = null;
		     
		    if (userSelection == JFileChooser.APPROVE_OPTION) {
		        fileToSave = fileChooser.getSelectedFile();
		        System.out.println("Save as file: " + fileToSave.getAbsolutePath());
		    }
		    
		    // write json string out to the file
			//FileOutputStream outputStream = new FileOutputStream("/Users/yang/Desktop/output.json");
			FileOutputStream outputStream = new FileOutputStream(fileToSave.getAbsolutePath());
		    byte[] strToBytes = output_Jsog.getBytes();
		    outputStream.write(strToBytes);
		    outputStream.close();
		    System.out.println("done.");
		    
		    
		    
		    
			response.setHeader("Access-Control-Allow-Origin", "*");	// enable CORS
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("true");
		}
	}
	
	/* parse the jsog:
	 * 1. change the view-name to source-name,
	 * 2. send back to ngFormOutput
	 */ 
	public static String parse (JsonNode jsog, String source_name, String view_name) {
		
		String source = source_name;
		String view = view_name;
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
		       		// check if there has a node after array/list 
		       		if(jsonNodes.hasNext()) {
		       			out = out + "]" + ",";
		        	} else {
		        		out = out + "]";
		        	}
		       		
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
	
	public static class ngOutputAll extends HttpServlet{
		
		JFrame parentFrame = new JFrame();
	    JFileChooser fileChooser = new JFileChooser();
	    
		public void init() throws ServletException {}
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			formValueMap.forEach( (k, v) -> {
				System.out.println(k + ": " + v.toString());
		    });
			
			output_Jsog = "";
			
			StringBuilder sb = new StringBuilder();
		    BufferedReader reader = request.getReader();
		    try {
		        String line;
		        while ((line = reader.readLine()) != null) {
		            sb.append(line).append('\n');
		        }
		    } finally {
		        reader.close();
		    }
			String str = sb.toString();
			// System.out.println(str);
			
			// change all objects view-name to source-name
			ObjectMapper mapper = new ObjectMapper();
			JsonNode allInArray = mapper.readTree(str);
			Iterator<JsonNode> elements = allInArray.elements();
			String tempJsogOb = "";
			JsonNode jsog;
			String source;
			String view;
		    while (elements.hasNext()) {
		        JsonNode realElement = elements.next();
		        jsog = realElement;
		        for ( Entry<String, String> entry : Source_ViewMap.entrySet()) {
		        	source = entry.getKey();
	        		view = entry.getValue();
		        	if(jsog.isObject()) {
				    	tempJsogOb = "{" + parse(jsog, source, view) + "}";
				    } else if(jsog.isArray()) {
				    	tempJsogOb = "[" + parse(jsog, source, view) + "]";
				    }
		        	jsog = mapper.readTree(tempJsogOb);
				}
		        if (elements.hasNext()) {
		        	output_Jsog = output_Jsog + tempJsogOb + ",";
   				} else {
   					output_Jsog = output_Jsog + tempJsogOb;
   				}
		    }
		    output_Jsog = "[" + output_Jsog + "]";
		    
		    
		    fileChooser.setDialogTitle("Specify a file to save");   
		    int userSelection = fileChooser.showSaveDialog(parentFrame);
		    fileChooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
		    File fileToSave = null;
		    
		    if (userSelection == JFileChooser.APPROVE_OPTION) {
		        fileToSave = fileChooser.getSelectedFile();
		        System.out.println("Save as file: " + fileToSave.getAbsolutePath());
		    }
		    
		    // write json string out to the file
			FileOutputStream outputStream = new FileOutputStream(fileToSave.getAbsolutePath());
			byte[] strToBytes = output_Jsog.getBytes();
			outputStream.write(strToBytes);
			outputStream.close();
			System.out.println("done.");
		    
		    
			response.setHeader("Access-Control-Allow-Origin", "*");	// enable CORS
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("true");
			
			/*
			 * read back to java object.
			 * objectMap <class-name, real-object>
			 * formValueMap <>
			 */
			
			Map<String, Object> objectMap = new HashMap<>();	// <simple-className-id, real-object>
			mapper = new ObjectMapper();
			JsonNode jsog2 = mapper.readTree(output_Jsog);
			Iterator<JsonNode> elements2 = jsog2.elements();
			List<Object> MyOb = new ArrayList<Object>();	// for test
		    while (elements2.hasNext()) {
		    	JsonNode eachJsog = elements2.next();
		        // System.out.println("realElement: " + eachJsog.toString());
		        String className = eachJsog.get("@type").asText();
		        String id = eachJsog.get("@id").asText();
				Class<?> pClass = null;
				try {
					pClass = Class.forName(className);
					Object check = mapper.readValue(eachJsog.toString(), pClass);
					//System.out.println("Object class: " + check.getClass().getName());
					objectMap.put(check.getClass().getSimpleName()+id, check);
					MyOb.add(check);
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				}
		    }
		    
		    
		    objectMap.forEach((k, v) -> {
		    	System.out.println(k + ": " + v.getClass());
		    });
		    
		    // formValueMap;
		    objectMap.forEach((key, ob_value) -> {
		    	ObjectMapper obMapper = new ObjectMapper();
		    	try {
		    		Class<?> ob_class = ob_value.getClass();
		    		// ob_class.getDeclaredField(name);
					JsonNode ob_node = obMapper.readTree(formValueMap.get(key));
					Iterator<Entry<String, JsonNode>> jsonNodes = ob_node.fields();  
				    while (jsonNodes.hasNext()) {  
				        Entry<String, JsonNode> node = jsonNodes.next();
				        if( (node.getKey()!="@id") && (node.getKey()!="@type")) {
				        	String[] split_value = node.getValue().asText().split(", ");	// get real-string without double quote
				        	if( split_value.length > 1 ) {	// array/list object
					        	if (ob_class.getDeclaredField(node.getKey()).getType().getSimpleName().contains("List") ) {
					        		List temp_list = new ArrayList<>();
						        	for(int i = 0; i < split_value.length; i++) {
						        		if (objectMap.containsKey(split_value[i])) {
						        			System.out.println(split_value[i] + " type: " + objectMap.get(split_value[i]).getClass());
								       		temp_list.add( objectMap.get(split_value[i]));
						        		}
						        	}
					                callSetter(ob_value, node.getKey(), temp_list);
					        	} else if (ob_class.getDeclaredField(node.getKey()).getType().isArray()) {
					        		// else if (ob_class.getDeclaredField(node.getKey()).getType().getSimpleName().contains("[]")) {
					        		System.out.println("1339 " + ob_class.getDeclaredField(node.getKey()).getType().getSimpleName() + ": []");
					        		Class c = ob_class.getDeclaredField(node.getKey()).getType();
					        		// To create array of c items, you need to get component class and pass it to newInstance method: 
					        		Object arrayObject = Array.newInstance(c.getComponentType(), split_value.length);
					                for (int i = 0; i < split_value.length; i++) {
					                    Array.set(arrayObject, i, objectMap.get(split_value[i]) ); // set value here
					                }
					                callSetter(ob_value, node.getKey(), arrayObject);
					        	}
				        	} else {	// single object
				        		if (objectMap.containsKey(split_value[0])) {
				        			System.out.println("single: " + split_value[0]);
				        			callSetter(ob_value, node.getKey(), objectMap.get(split_value[0]));
				        		}
				        	}
				        }  
				    }  
				} catch (IOException | NoSuchFieldException | SecurityException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		    });

		    
		    int brandIndex = 0;
			int tiresIndex = 0;
			int carIndex = 0;
			int personDemoIndex = 0;
			int familyIndex = 0;
			int simplePersonIndex1 = 0;
			int simplePersonIndex2 = 0;
			for (int i = 0; i < MyOb.size(); i++) {
				if ( MyOb.get(i).getClass().getName() == "jetty.demo.CarTiresBrand") {
					brandIndex = i;
				}
				if ( MyOb.get(i).getClass().getName() == "jetty.demo.CarTires" ) {
					tiresIndex = i;
				}
				if (MyOb.get(i).getClass().getName() == "jetty.demo.Car") {
					carIndex = i;
				}
				if(MyOb.get(i).getClass().getName() == "jetty.demo.PersonDemo") {
					personDemoIndex = i;
				}
				if (MyOb.get(i).getClass().getName() == "jetty.demo.Family") {
					familyIndex = i;
				}
				if (MyOb.get(i).getClass().getName() == "jetty.demo.SimplePerson") {
					if( i!=simplePersonIndex1 && simplePersonIndex1==0) {
						simplePersonIndex1 = i;
					}else {
						simplePersonIndex2 = i;
					}
				}
				System.out.println("ob: " + MyOb.get(i));
			}
			
			System.out.println("brandIndex: " + brandIndex + "\ttiresIndex: " + tiresIndex);
			if(((CarTires)MyOb.get(tiresIndex)).getBrand().equals(((CarTiresBrand)MyOb.get(brandIndex)))) {
				System.out.println("1382 equals: true");
			} else {
				System.out.println("1384 equals: false");
			}
			if( ((CarTires)MyOb.get(tiresIndex)).getBrand() == ((CarTiresBrand)MyOb.get(brandIndex)) ) {
				System.out.println("1387 ==: true");
			} else {
				System.out.println("1389 ==: false");
				((CarTires)MyOb.get(tiresIndex)).setBrand(((CarTiresBrand)MyOb.get(brandIndex)));
				System.out.println( "1391 replace: " + (((CarTires)MyOb.get(tiresIndex)).getBrand() == ((CarTiresBrand)MyOb.get(brandIndex))) );
			}
			
			Car c = (Car)MyOb.get(carIndex);
			CarTires[] ct = c.getTires();
			System.out.println("tiresIndex: " + tiresIndex + "\tcarIndex: " + carIndex);
			if( ct[0].getBrand().equals(ct[1].getBrand()) ) {
				System.out.println("==: true");
			} else {
				System.out.println("==: flase");
			}
			if( ct[0].getBrand()==(ct[1].getBrand()) ) {
				System.out.println("equals: true");
			} else {
				System.out.println("equals: false");
			}
			
			System.out.println("personDemoIndex: " + personDemoIndex + "\tfamilyIndex: " + familyIndex);
			Family family = (Family) MyOb.get(familyIndex);
			System.out.println(MyOb.get(familyIndex).getClass());
			if( MyOb.get(personDemoIndex) == (family.getChildren().get(0)) ) {
				System.out.println("1420 Persondemo==: true" );
			} else {
				System.out.println("1422 PersonDemo==: false");
			}
			if( MyOb.get(personDemoIndex) == (family.getChildren().get(1)) ) {
				System.out.println("1420 Persondemo==: true" );
			} else {
				System.out.println("1422 PersonDemo==: false");
			}
			
			System.out.println("1440 simplePersonIndex1: " + simplePersonIndex1 + "\tsimplePersonIndex2: " + simplePersonIndex2);
			SimplePerson p1 = (SimplePerson) MyOb.get(simplePersonIndex1);
			SimplePerson p2 = (SimplePerson) MyOb.get(simplePersonIndex2);
			if( p1.getSpouse() == p2 ) {
				System.out.println("1444 p1.getSpouse()==p2: true" );
			} else {
				System.out.println("1446 p1.getSpouse()==p2: false");
			}
			if( p1.getSpouse().equals(p2) ) {
				System.out.println("1449 p1.getSpouse().equals(p2): true" );
			} else {
				System.out.println("1451 p1.getSpouse().equals(p2): false");
			}
			if( p2.getSpouse() == p1 ) {
				System.out.println("1454 p2.getSpouse()==p1: true" );
			} else {
				System.out.println("1456 p2.getSpouse()==p1: false");
			}
			if( p2.getSpouse().equals(p1) ) {
				System.out.println("1459 p2.getSpouse().equals(p1): true" );
			} else {
				System.out.println("1461 p2.getSpouse().equals(p1): false");
			}
		}
		
	}
	
	private static void callSetter(Object obj, String fieldName, Object value){
		PropertyDescriptor pd;
		try {
			pd = new PropertyDescriptor(fieldName, obj.getClass());
			pd.getWriteMethod().invoke(obj, value);
		} catch (IntrospectionException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static class ngOutputFormValueMap extends HttpServlet{
		
		public void init() throws ServletException{}
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			StringBuilder sb = new StringBuilder();
		    BufferedReader reader = request.getReader();
		    try {
		        String line;
		        while ((line = reader.readLine()) != null) {
		            sb.append(line).append('\n');
		        }
		    } finally {
		        reader.close();
		    }
			String str = sb.toString();
			System.out.println(str);
			
			ObjectMapper mapper = new ObjectMapper();
			JsonNode mapJsog = mapper.readTree(str);
			
			Iterator<Entry<String, JsonNode>> jsonNodes = mapJsog.fields();
		    while (jsonNodes.hasNext()) {
		        Entry<String, JsonNode> node = jsonNodes.next();
		        JsonNode nodeJsog = node.getValue();
		        if (nodeJsog.isObject()) {
		        	String source;
					String view;
					String tempNodeJsog;
					for ( Entry<String, String> entry : Source_ViewMap.entrySet()) {
					    source = entry.getKey();
					    view = entry.getValue();
					    tempNodeJsog = "{" + parse(nodeJsog, source, view) + "}";
					    nodeJsog = mapper.readTree(tempNodeJsog);
					}
		        }
		        node.setValue(nodeJsog);
		        
		    }
			
		    Iterator<Entry<String, JsonNode>> nodes = mapJsog.fields();  
		    while (nodes.hasNext()) {  
		        Entry<String, JsonNode> node = nodes.next();  
		        /*System.out.println(node.getKey());  
		        System.out.println(node.getValue().toString());*/
		        formValueMap.put(node.getKey(), node.getValue().toString());
		    }
		    
			
			response.setHeader("Access-Control-Allow-Origin", "*");	// enable CORS
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write("true");
		}
	}
	
	public static class ngEdit extends HttpServlet{
		
		public void init() throws ServletException {}
		
		@Override
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			String objectjson = "{\"@id\": \"1\",\"@type\": \"jetty.demo.Person\",\"age\": 3,\"firstName\": \"33\",\"lastName\": \"333\",\"spouse\": null}";
			Map<String, ArrayList<String>> valueMap = new HashMap<>();
			Map<String, String> viewMap = new HashMap();
			Map<String, String> bigMap = new HashMap();
			ObjectMapper ob = new ObjectMapper();
			// String className = request.getParameter("@type"); // for many class name
			
			Class<?> pClass = null;
			try {
				pClass = Class.forName("jetty.demo.Person");
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			// Field Annotations
			Field[] fieldlist = pClass.getDeclaredFields(); // include private members

			Annotation annotation;
			AnnotationForm var;
			Class<? extends Annotation> type;
			for (Field field : fieldlist) {
				annotation = field.getAnnotation(AnnotationForm.class);
				var = (AnnotationForm) annotation;
				type = annotation.annotationType();
				String view = "";
				ArrayList<String> options = new ArrayList<String>();
				
				for(Method method : type.getDeclaredMethods()) {
					try {
						Object value = method.invoke(annotation, (Object[])null);
						if(method.getName()=="radio") {
							viewMap.put("view", method.getName());
							/*for(String s : var.radio()) {
								//System.out.println("value: " + s);
								options.add(s);
							}*/
							valueMap.put("value", options);
							String valuemapjson = ob.writeValueAsString(valueMap);
							String viewmapjson = ob.writeValueAsString(viewMap);
							String c = viewmapjson + "," + valuemapjson;
							System.out.println("c: "+ c);
							bigMap.put(field.getName(), c);
						}
					} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
						e.printStackTrace();
					}
					
				}
			}
			
			String valuemapjson = ob.writeValueAsString(valueMap);
			String viewmapjson = ob.writeValueAsString(viewMap);
			/*String c = viewmapjson + "," + valuemapjson;
			System.out.println("c: "+ c);*/
			String bigmapjson = ob.writerWithDefaultPrettyPrinter().writeValueAsString(bigMap);
			
			System.out.println("valuemap: " + valuemapjson);
			System.out.println("viewmap: " + viewmapjson);
			System.out.println("bigmap:\n" + bigmapjson);
			
			System.out.println("objectjson: " + objectjson);
			
			String respjson = "[" + bigmapjson + "," + objectjson + "]";
			
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(respjson);
		}
	}
	
	// parse arguments, make class pool
	public static class ngClassNames extends HttpServlet {
		
		public void init() throws ServletException {}
		
		@Override
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			ObjectMapper ob = new ObjectMapper();
			String arjson = ob.writeValueAsString(arguments);
			
			// construct TypeMap for ng-tree in ngType-servlet
			
			/* TypeMap.forEach( (k, v) -> {
				System.out.println(k + v);
			}); */
			
			
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(arjson);
			
			
		}
	}
	
	// use class name, get class member and send 
	public static class ngNameCreateForm extends HttpServlet {
		
		String sessionID = "0";
		
		public void init() throws ServletException {
		}
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			// read request content : class name
			StringBuilder sb = new StringBuilder();
		    BufferedReader reader = request.getReader();
		    try {
		        String line;
		        while ((line = reader.readLine()) != null) {
		            sb.append(line).append('\n');
		        }
		    } finally {
		        reader.close();
		    }
		    String classNameInJson = sb.toString();	// { name:className }. It's in json formula
		    // System.out.println(classNameInJson);
		    
		    // JsonNode : get class by jsNode.get("name").asText(), then create json string
		    ObjectMapper ob = new ObjectMapper();
		    JsonNode jsNode = ob.readTree(classNameInJson);
		    String className = jsNode.get("name").asText(); // transform json to java string
		    
			
		    Class<?> pClass = null;
		    ObjectNode defaultValueNode = ob.createObjectNode();	// make json string to output : { fieldName : field  DefaultValue }
		    ObjectNode styleNode = ob.createObjectNode();	// [ fieldName : style ]
		    ObjectNode typeNode = ob.createObjectNode();	// [ fieldName : type ]
			try {
				pClass = Class.forName(className);
				// Field
				Field[] fieldlist = pClass.getDeclaredFields(); // include private members
				
				defaultValueNode.put("@id", sessionID);
				defaultValueNode.put("@type", className);
				
				Annotation annotation;
				AnnotationForm var;
				String viewName = "";
				String complexTypeName = "";
				for (Field f : fieldlist) {
					annotation = f.getAnnotation(AnnotationForm.class);
					var = (AnnotationForm) annotation;
					System.out.println(var.style()[0]);
					if (f.getType().getSimpleName().equals("List")) {
						ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
						Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
						complexTypeName = "List".concat(" " + stringListClass.getSimpleName());
					} else {	// array or other types
						complexTypeName = f.getType().getSimpleName();
					}
					// set viewName if name in annotation been set, or use attribute name 
					if (var.name().equals("")) {
						viewName = f.getName().concat(" (" + complexTypeName + ")");;
					} else {
						viewName = var.name().concat(" (" + complexTypeName + ")");
					}
					Source_ViewMap.put(f.getName(), viewName);
					if(var.style()[0].input() != AnnotationStyle.InputTypeControl.none) {
						switch (var.style()[0].input()) {
							case color :
								defaultValueNode.put(viewName, var.style()[0].value()[0].toString());	// get default value
								styleNode.put(viewName, "color");
								typeNode.put(viewName, complexTypeName);
								break;
							case date:
								defaultValueNode.put(viewName, var.style()[0].value()[0].toString());
								styleNode.put(viewName, "date");
								typeNode.put(viewName, complexTypeName);
								/*if (f.getType().getSimpleName().equals("List")) {
									ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
									Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
									String complexType = "List".concat(" " + stringListClass.getSimpleName());
									typeNode.put(viewName, complexType );
								} else {
									typeNode.put(viewName, f.getType().getSimpleName());
								}*/
								break;
							case email:
								defaultValueNode.put(viewName, var.style()[0].value()[0].toString());
								styleNode.put(viewName, "email");
								typeNode.put(viewName, complexTypeName);
								/*if (f.getType().getSimpleName().equals("List")) {
									ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
									Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
									String complexType = "List".concat(" " + stringListClass.getSimpleName());
									typeNode.put(viewName, complexType );
								} else {
									typeNode.put(viewName, f.getType().getSimpleName());
								}*/
								break;
							case month:
								defaultValueNode.put(viewName, var.style()[0].value()[0].toString());
								styleNode.put(viewName, "month");
								typeNode.put(viewName, complexTypeName);
								/*if (f.getType().getSimpleName().equals("List")) {
									ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
									Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
									String complexType = "List".concat(" " + stringListClass.getSimpleName());
									typeNode.put(viewName, complexType );
								} else {
									typeNode.put(viewName, f.getType().getSimpleName());
								}*/
								break;
							case number:
								defaultValueNode.put(viewName, var.style()[0].value()[0].toString());
								styleNode.put(viewName, "number");
								typeNode.put(viewName, complexTypeName);
								/*if (f.getType().getSimpleName().equals("List")) {
									ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
									Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
									String complexType = "List".concat(" " + stringListClass.getSimpleName());
									typeNode.put(viewName, complexType );
								} else {
									typeNode.put(f.getName(), f.getType().getSimpleName());
								}*/
								break;
							case password :
								defaultValueNode.put(viewName, var.style()[0].value()[0].toString());
								styleNode.put(viewName, "password");
								typeNode.put(viewName, complexTypeName);
								/*if (f.getType().getSimpleName().equals("List")) {
									ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
									Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
									String complexType = "List".concat(" " + stringListClass.getSimpleName());
									typeNode.put(viewName, complexType );
								} else {
									typeNode.put(viewName, f.getType().getSimpleName());
								}*/
								break;
							case text :
								defaultValueNode.put(viewName, var.style()[0].value()[0].toString());
								styleNode.put(viewName, var.style()[0].input().toString());	// var.style()[0].input().toString() = "text"
								typeNode.put(viewName, complexTypeName);
								/*if (f.getType().getSimpleName().equals("List")) {
									ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
									Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
									String complexType = "List".concat(" " + stringListClass.getSimpleName());
									typeNode.put(viewName, complexType );
								} else {
									typeNode.put(viewName, f.getType().getSimpleName());
								}*/
								// typeNode.put(f.getName(), f.getType().getSimpleName());
								break;
							case time :
								defaultValueNode.put(viewName, var.style()[0].value()[0].toString());
								styleNode.put(viewName, "time");
								typeNode.put(viewName, complexTypeName);
								/*if (f.getType().getSimpleName().equals("List")) {
									ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
									Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
									String complexType = "List".concat(" " + stringListClass.getSimpleName());
									typeNode.put(viewName, complexType );
								} else {
									typeNode.put(viewName, f.getType().getSimpleName());
								}*/
								break;
							case week :
								defaultValueNode.put(viewName, var.style()[0].value()[0].toString());
								styleNode.put(viewName, "week");
								typeNode.put(viewName, complexTypeName);
								/*if (f.getType().getSimpleName().equals("List")) {
									ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
									Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
									String complexType = "List".concat(" " + stringListClass.getSimpleName());
									typeNode.put(viewName, complexType );
								} else {
									typeNode.put(viewName, f.getType().getSimpleName());
								}*/
								break;
							case none :
								break;
							default :
								break;
						}
					} else if (var.style()[0].textarea().length() > 0) {
						defaultValueNode.put(viewName, var.style()[0].value()[0].toString());
						styleNode.put(viewName, "textarea");
						typeNode.put(viewName, complexTypeName);
						/*if (f.getType().getSimpleName().equals("List")) {
							ParameterizedType stringListType = (ParameterizedType) f.getGenericType();
							Class<?> stringListClass = (Class<?>) stringListType.getActualTypeArguments()[0];
							String complexType = "List".concat(" " + stringListClass.getSimpleName());
							typeNode.put(viewName, complexType );
						} else {
							typeNode.put(viewName, f.getType().getSimpleName());
						}*/
					}
				}
				
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}

			System.out.println("defaultValueNode: " + defaultValueNode.toString());
			System.out.println("styleNode: " + styleNode.toString());
			System.out.println("typeNode: " + typeNode.toString());
			System.out.println("className: " + className.toString());
			
			// enclose className with "", make responce_json send to front-end
			String responce_json = "[" + defaultValueNode.toString() + "," + styleNode.toString() + "," + typeNode.toString() + ",\"" + className.toString() + "\"" + "]";
			
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().write(responce_json);
		}
		
		@Override
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		}
	}

	/**
	 * JspStarter for embedded ServletContextHandlers
	 * 
	 * This is added as a bean that is a jetty LifeCycle on the
	 * ServletContextHandler. This bean's doStart method will be called as the
	 * ServletContextHandler starts, and will call the ServletContainerInitializer
	 * for the jsp engine.
	 *
	 */
	public static class JspStarter extends AbstractLifeCycle
			implements ServletContextHandler.ServletContainerInitializerCaller {
		JettyJasperInitializer sci;
		ServletContextHandler context;

		public JspStarter(ServletContextHandler context) {
			this.sci = new JettyJasperInitializer();
			this.context = context;
			this.context.setAttribute("org.apache.tomcat.JarScanner", new StandardJarScanner());
		}

		@Override
		protected void doStart() throws Exception {
			ClassLoader old = Thread.currentThread().getContextClassLoader();
			Thread.currentThread().setContextClassLoader(context.getClassLoader());
			try {
				sci.onStartup(null, context.getServletContext());
				super.doStart();
			} finally {
				Thread.currentThread().setContextClassLoader(old);
			}
		}
	}

	
	
	public static void main(String[] args) throws Exception {
		int port = 8080;
		//LoggingUtil.config();
		
		arguments = args;
		for (String ar : arguments) {
			System.out.println("ar: " + ar);
			ConstructViewToSourceMap(ar);
		}
		
		Main main = new Main(port);
		main.start();
		main.waitForInterrupt();
		
	}
	
	//private static final Logger LOG = Logger.getLogger(Main.class.getName());
	
	private int port;
	private Server server;

	public Main(int port) {
		this.port = port;
	}

	public void start() throws Exception {
		
		int maxThreads = 100;
		int minThreads = 10;
		int idleTimeout = 120;
		QueuedThreadPool threadPool = new QueuedThreadPool(maxThreads, minThreads, idleTimeout);
		server = new Server(threadPool);
		//server = new Server();

		// Define ServerConnector
		ServerConnector connector = new ServerConnector(server);
		connector.setPort(port);
		server.addConnector(connector);

		// Add annotation scanning (for WebAppContexts)
		Configuration.ClassList classlist = Configuration.ClassList.setServerDefault(server);
		classlist.addBefore("org.eclipse.jetty.webapp.JettyWebXmlConfiguration",
				"org.eclipse.jetty.annotations.AnnotationConfiguration");

		// Base URI for servlet context
		URI baseUri = getWebRootResourceUri();
		//LOG.info("Base URI: " + baseUri);

		// Create Servlet context
		ServletContextHandler servletContextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
		servletContextHandler.setContextPath("/");
		servletContextHandler.setResourceBase(baseUri.toASCIIString());

		// Since this is a ServletContextHandler we must manually configure JSP support.
		enableEmbeddedJspSupport(servletContextHandler);

		// Add Application Servlets
		//servletContextHandler.addServlet(DateServlet.class, "/date/");

		// try to add servlet
		servletContextHandler.addServlet(OutputFilePath.class, "/OutputFilePath");
		servletContextHandler.addServlet(GenServlet.class, "/Gen0Servlet");
		servletContextHandler.addServlet(SubmitServlet.class, "/SubmitServlet");
		servletContextHandler.addServlet(Edit0Servlet.class, "/Edit0Servlet");
		servletContextHandler.addServlet(Edit1Servlet.class, "/Edit1Servlet");
		servletContextHandler.addServlet(InputFilePath.class, "/InputFilePath");
		servletContextHandler.addServlet(EditFinish.class, "/EditFinish");
		servletContextHandler.addServlet(ngEdit.class, "/ngEdit");
		servletContextHandler.addServlet(ngClassNames.class, "/ngClassNames");
		servletContextHandler.addServlet(ngNameCreateForm.class, "/ngNameCreateForm");
		servletContextHandler.addServlet(ngFormOutput.class, "/ngFormOutput");
		servletContextHandler.addServlet(ngSessionStorage.class, "/ngSessionStorage");
		servletContextHandler.addServlet(ngEditSessionStorage.class, "/ngEditSessionStorage");
		servletContextHandler.addServlet(ngInputType.class, "/ngInputType");
		servletContextHandler.addServlet(ngJavaStorageType.class, "/ngJavaStorageType");
		servletContextHandler.addServlet(ngOutputAll.class, "/ngOutputAll");
		servletContextHandler.addServlet(ngOutputFormValueMap.class, "/ngOutputFormValueMap");
		
		
		ServletHolder fileUploadServletHolder = new ServletHolder(new ngUploader());
        fileUploadServletHolder.getRegistration().setMultipartConfig(new MultipartConfigElement("data/tmp"));
        servletContextHandler.addServlet(fileUploadServletHolder, "/ngUploader");

		// Create Example of mapping jsp to path spec
		/*ServletHolder holderAltMapping = new ServletHolder();
		holderAltMapping.setName("foo.jsp");
		holderAltMapping.setForcedPath("/test/foo/foo.jsp");
		servletContextHandler.addServlet(holderAltMapping, "/test/foo/");*/

		// Default Servlet (always last, always named "default")
		/*ServletHolder holderDefault = new ServletHolder("default", DefaultServlet.class);
		holderDefault.setInitParameter("resourceBase", baseUri.toASCIIString());
		holderDefault.setInitParameter("dirAllowed", "true");
		servletContextHandler.addServlet(holderDefault, "/");*/
		servletContextHandler.addServlet(DefaultServlet.class, "/");
		
		//CROS
		FilterHolder filter = new FilterHolder();
		filter.setInitParameter("allowedOrigins", "http://localhost:8080,http://localhost:4200");
		filter.setInitParameter("allowedMethods", "POST,GET,OPTIONS,PUT,DELETE,HEAD");
		filter.setInitParameter("allowedHeaders", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		filter.setInitParameter("preflightMaxAge", "728000");
		filter.setInitParameter("allowCredentials", "true");
		CrossOriginFilter corsFilter = new CrossOriginFilter();
		filter.setFilter(corsFilter);
		servletContextHandler.addFilter(filter, WEBROOT_INDEX, null);
		
		server.setHandler(servletContextHandler);

		// Start Server
		server.start();
		/*Desktop browser = Desktop.getDesktop();
		browser.browse(new URI("http://localhost:8080/ng"));*/

		// Show server state
		//if (LOG.isLoggable(Level.FINE)) {
		//	LOG.fine(server.dump());
		//}
	}

	/**
	 * Setup JSP Support for ServletContextHandlers.
	 * <p>
	 * NOTE: This is not required or appropriate if using a WebAppContext.
	 * </p>
	 *
	 * @param servletContextHandler
	 *            the ServletContextHandler to configure
	 * @throws IOException
	 *             if unable to configure
	 */
	private void enableEmbeddedJspSupport(ServletContextHandler servletContextHandler) throws IOException {
		// Establish Scratch directory for the servlet context (used by JSP compilation)
		File tempDir = new File(System.getProperty("java.io.tmpdir"));
		File scratchDir = new File(tempDir.toString(), "embedded-jetty-jsp");

		if (!scratchDir.exists()) {
			if (!scratchDir.mkdirs()) {
				throw new IOException("Unable to create scratch directory: " + scratchDir);
			}
		}
		servletContextHandler.setAttribute("javax.servlet.context.tempdir", scratchDir);

		// Set Classloader of Context to be sane (needed for JSTL)
		// JSP requires a non-System classloader, this simply wraps the
		// embedded System classloader in a way that makes it suitable
		// for JSP to use
		ClassLoader jspClassLoader = new URLClassLoader(new URL[0], this.getClass().getClassLoader());
		servletContextHandler.setClassLoader(jspClassLoader);

		// Manually call JettyJasperInitializer on context startup
		servletContextHandler.addBean(new JspStarter(servletContextHandler));

		// Create / Register JSP Servlet (must be named "jsp" per spec)
		ServletHolder holderJsp = new ServletHolder("jsp", JettyJspServlet.class);
		holderJsp.setInitOrder(0);
		holderJsp.setInitParameter("logVerbosityLevel", "DEBUG");
		holderJsp.setInitParameter("fork", "false");
		holderJsp.setInitParameter("xpoweredBy", "false");
		holderJsp.setInitParameter("compilerTargetVM", "1.8");
		holderJsp.setInitParameter("compilerSourceVM", "1.8");
		holderJsp.setInitParameter("keepgenerated", "true");
		servletContextHandler.addServlet(holderJsp, "*.jsp");
	}

	private URI getWebRootResourceUri() throws FileNotFoundException, URISyntaxException {
		URL indexUri = this.getClass().getResource(WEBROOT_INDEX);
		if (indexUri == null) {
			throw new FileNotFoundException("Unable to find resource " + WEBROOT_INDEX);
		}
		// Points to wherever /webroot/ (the resource) is
		return indexUri.toURI();
	}

	public void stop() throws Exception {
		server.stop();
	}

	/**
	 * Cause server to keep running until it receives a Interrupt.
	 * <p>
	 * Interrupt Signal, or SIGINT (Unix Signal), is typically seen as a result of a
	 * kill -TERM {pid} or Ctrl+C
	 * 
	 * @throws InterruptedException
	 *             if interrupted
	 */
	public void waitForInterrupt() throws InterruptedException {
		server.join();
	}
}
