package jetty.demo;


import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.jsontype.TypeSerializer;

/**
 * Knows how to take a JSOGRef and print it as @id or @ref as appropriate.
 *
 * @author Jeff Schnitzer <jeff@infohazard.org>
 * @editor Zeth Yang
 */
public class JSOGRefSerializer extends JsonSerializer<JSOGRef>
{
	@Override
	public void serialize(JSOGRef value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
		if (value.used) {
			jgen.writeStartObject();
			jgen.writeObjectField(JSOGRef.REF_KEY, value.ref);
			jgen.writeObjectField(JSOGRef.TYPE_KEY, value.type);
			jgen.writeEndObject();
		} else {
			value.used = true;
			jgen.writeObject(value.ref);
			jgen.writeObjectField(JSOGRef.TYPE_KEY, value.type);
		}
	}

}
