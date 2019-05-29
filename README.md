Rapid Generation of Editing Systems for Application Objects Based on Java and Web Browsers
======================================
Put your Java classes in this project's package folder:  jetty.demo
The classes you add in package folder can set as arguments to start this service.

This is a maven project, to build it:

    $ mvn clean compile

(1)To run the `org.eclipse.jetty.demo.Main`:

    $ mvn exec:java -Dexec.mainClass=jetty.demo.Main -Dexec.args="jetty.demo.PersonDemo jetty.demo.Family jetty.demo.Student jetty.demo.Car jetty.demo.CarTires  jetty.demo.CarTiresBrand jetty.demo.SimplePerson jetty.demo.Brand"

(2)Before running the jar file in target:

    $ mvn package

(2.1)Then, in target folder:

    $ java -jar embedded-jetty-develop-1-SNAPSHOT-jar-with-dependencies.jar jetty.demo.PersonDemo jetty.demo.Family jetty.demo.Student jetty.demo.Car jetty.demo.CarTires  jetty.demo.CarTiresBrand jetty.demo.SimplePerson jetty.demo.Brand

Open your web browser to:

    http://localhost:8080/  

To stop this service:

  use <kbd>CTRL</kbd>+<kbd>C</kbd>


