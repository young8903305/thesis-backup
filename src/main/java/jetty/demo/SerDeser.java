package jetty.demo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SerDeser{
	
	public static void main(String args[]) {
		
		PersonDemo man = new PersonDemo();
		//Ser(man);
		System.out.println("done");
		try {
			PersonDemo man2 = Deser("/Users/yang/Desktop/person.ser");
			System.out.println(man2.getAge());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void Ser(PersonDemo person) {
		try {
			// Serializable, primitive java object output
			FileOutputStream f = new FileOutputStream(new File( "/Users/yang/Desktop/person.ser"));		// will output to webapp folder
			ObjectOutputStream o = new ObjectOutputStream(f);

			o.writeObject(person);
			o.close();
			f.close();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static PersonDemo Deser(String filename) throws IOException {
		PersonDemo personDe = null;
		
		try {
			FileInputStream fi = new FileInputStream(new File( filename));
			ObjectInputStream oi = new ObjectInputStream(fi);
			personDe = (PersonDemo) oi.readObject();
		} catch (FileNotFoundException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return personDe;
	}
}