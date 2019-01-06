<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.ArrayList, java.lang.reflect.*"%>

<!DOCTYPE html>
<head>
<title><%= request.getAttribute("className")%></title>
<meta>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<meta charset="utf-8">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script> 

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

</head>

<body>
  
  <div>
  </div>
  
  
	
	<div class="row justify-content-center align-items-center">
		<div class="col col-md-auto">
			<form action="/SubmitServlet" method="post" oninput="x.value=parseInt(int_value.value)">
				<table class="table table-hover">
					<thead>
						<tr><h4><%= request.getAttribute("className")%>'s Object editor</h4></tr>
						<tr><th>Variable</th><th>Value</th><th>Type</th></tr>
					</thead>
					<tbody>
						<%
							String[] receive_layout = (String []) request.getAttribute("layout");
							String[] receive_fieldName = (String []) request.getAttribute("fieldName");
							Object[] receive_type = (Object [])request.getAttribute("type");
							
							for (int i = 0; i < receive_layout.length; i++){
								if(receive_layout[i].equals("String")){ %>
									<tr>
										<td><label><input type="checkbox" name="variable" onclick="checkfunc(this)"><%= receive_fieldName[i] %></label></td>
										<td><div class="col-sm-auto"><input type="text" name="variable-value" class="<%= receive_type[i] %>" disabled= "disabled"></div></td>
										<td><%= receive_type[i] %></td>
									</tr>
						<%		}else if(receive_layout[i].equals("Integer")){ %>
									<tr>
										<td><label><input type="checkbox" name="variable" onclick="checkfunc(this)"><%= receive_fieldName[i] %></label></td>
										<td>
											<div class="col-sm-auto">
												<input type="range" id="a" min="-10" max="10" name="variable-value" class="<%= receive_type[i] %>" disabled= "disabled">
												<output name="x" for="int_value"></output>
											</div>
										</td>
										<td><%= receive_type[i] %></td>
									</tr>
						<%		}else if (receive_layout[i].equals("class")){ %>
									<tr>
										<td><label><input type="checkbox" name="variable" onclick="checkfunc(this)"><%= receive_fieldName[i] %></label></td>
										<td><div class="col-sm-auto"><input type="text" name="file-in"><input type="button" name="path-output" value="choose file" size="24" onclick="fileIn(this)"></div></td>
										<td><%= receive_type[i] %></td>
									</tr>
						<%		}else{ %>
									<tr>
										<td><label><input type="checkbox" name="variable" onclick="checkfunc(this)"><%= receive_fieldName[i] %></label></td>
										<td><div class="col-sm-auto"><input type="text" name="variable-value" class="<%= receive_type[i] %>" disabled= "disabled"></div></td>
										<td><%= receive_type[i] %></td>
									</tr>
						<%		}
							}	
						%>
							<tr>
								<td><input type="button" name="path-output" value="output path" size="24" onclick="path(this)"><input type="text" name="path-text"></td>
							</tr>
					</tbody>
					
				</table>
				<!-- <div>
					<input type="button" name="path-input" value="choose path" size="24" onclick="path(this)"><input type="text" name="path-text">
				</div>
					<br><br> -->
				<input type="submit" value="submit" />
			</form>
		</div>
	</div>
	

	
	<script type="text/javascript">
		// check box, if checked then focus the next input text area
		function checkfunc(){ 
			for (var i = 0; i < document.getElementsByName("variable").length; i++) {
				if (document.getElementsByName("variable")[i].checked == true) {
					document.getElementsByName("variable-value")[i].disabled = false;
					//document.getElementsByName("variable-value")[i].focus();
				}
				else {
					document.getElementsByName("variable-value")[i].disabled = true;
				}
			}
		}
		
		// file input by path
		function fileIn(item) {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					item.previousSibling.value = this.responseText;
				}
			};
			xhttp.open("GET", "/InputFilePath", true);
			xhttp.send(null);
		}
		
		// submit button for file path
		function path(item) {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					item.nextSibling.value = this.responseText;
				}
			};
			xhttp.open("GET", "/OutputFilePath", true);
			xhttp.send(null);
		}
		/* load json file, but it's useless for jstree
		function loadJSON(callback) {   
		    var xobj = new XMLHttpRequest();
		        xobj.overrideMimeType("application/json");
		    xobj.open('GET', 'ff.json', true); // Replace 'my_data' with the path to your file
		    xobj.onreadystatechange = function () {
		          if (xobj.readyState == 4 && xobj.status == "200") {
		            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
		            callback(xobj.responseText);
		          }
		    };
		    xobj.send(null);
		 }*/
		 
		/*
		$.getJSON("ff.json", function(json){
			console.log("jQuery "+JSON.stringify(json));
		});*/
		
		<%
			String jsTreeString = (String) request.getAttribute("jsTreeString") ;
		%>
		
        $('#using_json').jstree({
        	'core' : {
        		"check_callback" : true,
            'data' : [
            	<%= jsTreeString %>
            ]
        }
        });
		
		
		
	</script>
</body>
</html>