package jetty.demo;

import java.lang.reflect.Field;
import org.apache.commons.lang3.*;
import org.apache.commons.lang3.ClassUtils;

public class GetArgType {
	
	public static void main(String...strings ) {
		
		Class<?> pClass = null;
		try {
			pClass = Class.forName("jetty.demo.Person");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		
		Field[] fieldlist = pClass.getDeclaredFields();
		
		for(Field field : fieldlist) {
			System.out.println(field.getType());
			if(	ClassUtils.isPrimitiveOrWrapper(field.getType())) {
				System.out.println("pw");
			} else {
				System.out.println("NO");
			}
		}
	}
	
	
	
	
}