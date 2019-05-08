package jetty.demo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jetty.demo.AnnotationStyle.InputTypeControl;

@JsonIdentityInfo(generator = JSOGGenerator.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class OptionsAdapter extends Options {
	
	
	private Options options;
	
	@AnnotationForm(
			style = { @AnnotationStyle(input=InputTypeControl.text, value = "") }, name = "Options")
	private List<Option> opList;

	public Collection<Option> getOptions() {
		return this.options.getOptions();
	}
	
	public void setOptions(List<Option> op) {
		Options temp = new Options();
		for (Option item : op) {
			temp.addOption(item);
		}
		this.options = temp;
	}
	
	public List<Option> getOpList() {
		return opList;
	}

	public void setOpList(List<Option> opList) {
		this.opList = opList;
		this.setOptions(this.opList);
	}

	public static ArrayList<Option> buildOptions() {
		ArrayList<Option> opList = new ArrayList<Option>();
		
		Option help = new Option( "help", "Print a synopsis of standard options" );
        Option g = new Option( "g", "Generate all debugging info" );
        Option gnone = new Option("gnone", "Generate no debugging info");
        Option nowarn = new Option( "nowarn", "Generate no warnings" );
        Option verbose = new Option( "verbose", "Output messages about what the compiler is doing" );
        Option deprecation = new Option( "deprecation", "Output source locations where deprecated APIs are used" );
        Option parameters = new Option( "parameters", "Generate metadata for reflection on method parameters" );
        Option version = new Option( "version", "Version information" );
        Option X = new Option( "X", "Print a synopsis of nonstandard options" );
        Option Werror = new Option( "Werror", "Terminate compilation if warnings occur" );

        Option classpath = Option.builder("classpath")
                .argName("path")
                .hasArg()
                .desc("Specify where to find user class files and annotation processors")
                .build();

        Option cp = Option.builder("cp")
                .argName("path")
                .hasArg()
                .desc("Specify where to find user class files and annotation processors")
                .build();
        
        Option sourcepath = Option.builder("sourcepath")
                .argName("path")
                .hasArg()
                .desc("Specify where to find input source files")
                .build();
        
        Option bootclasspath = Option.builder("bootclasspath")
                .argName("path")
                .hasArg()
                .desc("Override location of bootstrap class files")
                .build();
        
        Option extdirs = Option.builder("extdirs")
                .argName("dirs")
                .hasArg()
                .desc("Override location of installed extensions")
                .build();
        
        Option endorseddirs = Option.builder("endorseddirs")
                .argName("dirs")
                .hasArg()
                .desc("Override location of endorsed standards path")
                .build();
        
        Option processorpath = Option.builder("processorpath")
                .argName("path")
                .hasArg()
                .desc("Specify where to find annotation processors")
                .build();
        
        Option d = Option.builder("d")
                .argName("directory")
                .hasArg()
                .desc("Specify where to place generated class files")
                .build();
        
        Option s = Option.builder("s")
                .argName("directory")
                .hasArg()
                .desc("Specify where to place generated source files")
                .build();
        
        Option h = Option.builder("h")
                .argName("directory")
                .hasArg()
                .desc("Specify where to place generated native header files")
                .build();
        
        Option encoding = Option.builder("encoding")
                .argName("encoding")
                .hasArg()
                .desc("Specify character encoding used by source files")
                .build();
        
        Option source = Option.builder("source")
                .argName("release")
                .hasArg()
                .desc("Provide source compatibility with specified release")
                .build();
        
        Option target = Option.builder("target")
                .argName("release")
                .hasArg()
                .desc("Generate class files for specific VM version")
                .build();
        
        Option profile = Option.builder("profile")
                .argName("profile")
                .hasArg()
                .desc("Check that API used is available in the specified profile")
                .build();
        
        Option J = Option.builder("J")
                .argName("flag")
                .hasArg()
                .desc("Pass <flag> directly to the runtime system")
                .build();
        
        opList.add( help );
        opList.add( g );
        opList.add( gnone );
        opList.add( nowarn );
        opList.add( verbose );
        opList.add( deprecation );
        opList.add( parameters );
        opList.add( version );
        opList.add( X );
        opList.add( Werror );
        opList.add( classpath );
        opList.add( cp );
        opList.add( sourcepath );
        opList.add( bootclasspath );
        opList.add( extdirs );
        opList.add( endorseddirs );
        opList.add( processorpath );
        opList.add( d );
        opList.add( s );
        opList.add( h );
        opList.add( encoding );
        opList.add( source );
        opList.add( target );
        opList.add( profile );
        opList.add( J );
        
        return opList;
	}
	
	public static void main(String[] args) throws IOException {
		
		ArrayList<Option> opList = buildOptions();
		
		OptionsAdapter adapter = new OptionsAdapter();
		adapter.setOptions(opList);
		
		ObjectMapper mapper = new ObjectMapper();
		try {
			String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(adapter);
			System.out.println(jsonString);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		/*
		String check = "{\"@id\":\"1557071732735\",\"@type\":\"jetty.demo.OptionsAdapter\",\"opList\":[{\"@id\":\"1557071706287\",\"@type\":\"jetty.demo.Option\",\"opt\":\"help\",\"longOpt\":null,\"argName\":null,\"description\":\"Print a synopsis of standard options\",\"required\":null,\"optionalArg\":null},{\"@id\":\"1557071724643\",\"@type\":\"jetty.demo.Option\",\"opt\":\"g\",\"longOpt\":null,\"argName\":null,\"description\":\"Generate all debugging info\",\"required\":null,\"optionalArg\":null}]}";
		OptionsAdapter ad = mapper.readerFor(OptionsAdapter.class).readValue(check);
		*/
	}
}