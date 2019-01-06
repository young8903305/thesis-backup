package jetty.demo;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import java.lang.annotation.ElementType;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE, ElementType.FIELD })
public @interface AnnotationForm {
	
	AnnotationStyle[] style() default {}; 
	
	String name() default "";
	
	String[] value() default {};
	
}


