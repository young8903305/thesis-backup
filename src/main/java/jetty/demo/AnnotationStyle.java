package jetty.demo;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import java.lang.annotation.ElementType;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE, ElementType.FIELD })
public @interface AnnotationStyle {
	
	public enum InputTypeControl {
		// button,
		//checkbox,	// for array/list
		color,
		date,
		datetime_local,	// only for chrome
		email,	// no HTML default validate for angular
		//file,
		//hidden,
		//image,
		month,	// only for chrome
		number,
		password,
		//radio,	// need other attribute
		//range,	// need other attribute
		//reset,
		//search,
		//submit,
		//tel,
		text,
		time,
		//url,
		week,
		none
	}
	
	InputTypeControl input() default InputTypeControl.none;
	
	String[] value() default {};
	
	String textarea() default "false";
	
}