package jetty.demo;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import java.lang.annotation.ElementType;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE, ElementType.FIELD })
public @interface AnnotationStyle {
	
	public enum InputTypeControl {
		button,
		checkbox,
		color,
		date,
		//datetime-local,
		email,
		//file,
		hidden,
		image,
		month,
		number,
		password,
		radio,
		range,
		reset,
		search,
		//submit,
		tel,
		text,
		time,
		url,
		week,
		none
	}
	
	InputTypeControl input() default InputTypeControl.none;
	
	String textarea() default "";
	
}