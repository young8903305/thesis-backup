package jetty.demo;

import java.util.Date;

import com.fasterxml.jackson.annotation.ObjectIdGenerator;

/**
 * Use this as an object id generator and your class will serialize as jsog.
 *
 * @author Jeff Schnitzer <jeff@infohazard.org> 
 * @editor Zeth Yang
 */
public class JSOGGenerator extends ObjectIdGenerator<JSOGRef> {

	private static final long serialVersionUID = 1L;

	protected transient int _nextValue;
    protected final Class<?> _scope;

    public JSOGGenerator() { this(null, -1); }

    public JSOGGenerator(Class<?> scope, int nextValue) {
        _scope = scope;
        _nextValue = nextValue;
    }

    @Override
    public Class<?> getScope() {
        return _scope;
    }

    @Override
    public boolean canUseFor(ObjectIdGenerator<?> gen) {
        return (gen.getClass() == getClass()) && (gen.getScope() == _scope);
    }

	@Override
	public ObjectIdGenerator<JSOGRef> forScope(Class<?> scope) {
        return (_scope == scope) ? this : new JSOGGenerator(scope, _nextValue);
	}

	@Override
	public ObjectIdGenerator<JSOGRef> newForSerialization(Object context) {
        return new JSOGGenerator(_scope, 1);
	}

	@Override
	public com.fasterxml.jackson.annotation.ObjectIdGenerator.IdKey key(Object key) {
        return new IdKey(getClass(), _scope, key);
	}

	/** 
	 * change int argument to long for date.getTime()
	 * */
	@Override
	public JSOGRef generateId(Object forPojo) {
        /* int id = _nextValue;
        ++_nextValue;*/
		Date date = new Date();
        String inputType = forPojo.getClass().getName();
        return new JSOGRef(date.getTime(), inputType);
	}

    @Override
    public boolean maySerializeAsObject() {
        return true;
    }

    @Override
    public boolean isValidReferencePropertyName(String name, Object parser) {
        return JSOGRef.REF_KEY.equals(name);
    }
}
