<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.ArrayList, java.lang.reflect.*, java.util.List"%>
	
<!DOCTYPE html>
<head>
<title><%= request.getAttribute("className_forEdit")%></title>
<meta>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<meta charset="utf-8">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" /> 

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.3.5/jstree.min.js"></script> 

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script> 

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</head>

<body>

	<%
		session.setAttribute("path_text", String.valueOf(request.getAttribute("path_text")));
		session.setAttribute("className_forEdit", String.valueOf(request.getAttribute("className_forEdit")));
    %>

	<div id="using_json">
	</div>
	<br>
	<div>
		<input type="submit" value="go back" onclick="javascript:history.back()"/>
	</div>
	
	<div class="row justify-content-center align-items-center">
		<div class="col col-md-auto">
			<form action= "/EditFinish" method="post" oninput="x.value=parseInt(int_value.value)">
				<table class="table table-hover">
					<thead>
						<tr><h4><%= request.getAttribute("className_forEdit")%> Object editor</h4></tr>
						<tr><th>Variable</th><th>Value</th><th>Type</th></tr>
					</thead>
					<tbody>
						<%
							String[] receive_layout = (String []) request.getAttribute("layout");
							List<String> receive_variable = (List<String>) request.getAttribute("variable");
							List<String> receive_value = (List<String>) request.getAttribute("value");
							Object[] receive_type_forEdit = (Object [])request.getAttribute("type_forEdit");
							
							for (int i = 0; i < receive_variable.size(); i++) { 
								if(receive_layout[i].equals("String")){ %>
								<tr>
									<td><label><input type="checkbox" name="variable" onclick="checkfunc(this)"><%= receive_variable.get(i) %></label></td>
									<td><div class="col-sm-auto"><input type="text" class="variable-value" name="<%= receive_variable.get(i) %>" value=<%= receive_value.get(i) %> class="<%= receive_type_forEdit[i] %>" disabled= "disabled"></div></td>
									<td><%= receive_type_forEdit[i] %></td>
								</tr>
					<%		}else if(receive_layout[i].equals("int")){ %>
								<tr>
									<td><label><input type="checkbox" name="variable" onclick="checkfunc(this)"><%= receive_variable.get(i) %></label></td>
									<td>
										<div class="col-sm-auto">
											<input type="range" id="int_value" min="-100" max="100" class="variable-value" name="<%= receive_variable.get(i) %>" value=<%= receive_value.get(i) %> class="<%= receive_type_forEdit[i] %>" disabled= "disabled">
											<output name="x" for="int_value"></output>
										</div>
									</td>
									<td><%= receive_type_forEdit[i] %></td>
								</tr>
					<%		}else if (receive_layout[i].equals("class")){ %>
								<tr>
									<td><label><input type="checkbox" name="variable" onclick="checkfunc(this)"><%= receive_variable.get(i) %></label></td>
									<td><div class="col-sm-auto"><input type="text" class="variable-value" name="<%= receive_variable.get(i) %>" value=<%= receive_value.get(i) %>><input type="button" name="path-output" value="choose file" size="24" onclick="fileIn(this)"></div></td>
									<td><%= receive_type_forEdit[i] %></td>
								</tr>
					<%		}else{ %>
								<tr>
									<td><label><input type="checkbox" name="variable" onclick="checkfunc(this)"><%= receive_variable.get(i) %></label></td>
									<td><div class="col-sm-auto"><input type="text" class="variable-value" name="<%= receive_variable.get(i) %>" value=<%= receive_value.get(i) %> class="<%= receive_type_forEdit[i] %>" disabled= "disabled"></div></td>
									<td><%= receive_type_forEdit[i] %></td>
								</tr>
						
					<%		}
						}	
					%>
					</tbody>				
				</table>
				<input type="submit" value="submit" />
			</form>
		</div>
	</div>
	
	<script type="text/javascript">
	
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
		
		// check box, if checked then focus the next input text area
		function checkfunc(){ 
			for (var i = 0; i < document.getElementsByName("variable").length; i++) {
				if (document.getElementsByName("variable")[i].checked == true) {
					document.getElementsByClassName("variable-value")[i].disabled = false;
					//document.getElementsByName("variable-value")[i].focus();
				}
				else {
					document.getElementsByClassName("variable-value")[i].disabled = true;
				}
			}
		}
		
		$('#using_json').on("select_node.jstree", function (e, data) {
            console.log(data.node.text);
            var href = data.node.a_attr.href;
            window.location.href = href;
        });
		
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

		
	</script>
</body>

</html>