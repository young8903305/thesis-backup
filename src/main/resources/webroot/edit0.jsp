<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.ArrayList, java.lang.reflect.*"%>
	
<!DOCTYPE html>
<head>
<title>Editor</title>
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

	<form action= "/Edit1Servlet" method= "post">
				<table class="table table-hover">
					<tbody>
						<tr>
							<td><input type="button" name="path-input" value="choose file" size="24" onclick="path(this)"><input type="text" name="path-text"></td>
						</tr>
					</tbody>
				</table>
				<input type="submit" value="submit" />
			</form>
	<div id="using_json">
	</div>
	
	<script type="text/javascript">
		
		// read file from local file path
		function path(item) {
			var xhttp = new XMLHttpRequest();
			xhttp.timeout = 100000;
			xhttp.ontimeout = function(event){
				　　console.log("time out");
			}
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					item.nextSibling.value = this.responseText;
				}
			};
			xhttp.open("GET", "/InputFilePath", true);
			xhttp.send(null);
		}
		
	</script>
</body>

</html>