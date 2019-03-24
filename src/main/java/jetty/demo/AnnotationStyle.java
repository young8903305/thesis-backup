package jetty.demo;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import java.lang.annotation.ElementType;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE, ElementType.FIELD })
public @interface AnnotationStyle {
	
	public enum InputTypeControl {
		color,
		date,
		email,
		month,
		number,
		password,
		text,
		time,
		week,
		none
	}
	
	InputTypeControl input() default InputTypeControl.none;
	
	String[] value() default {};
	
	String textarea() default "false";
	
}

