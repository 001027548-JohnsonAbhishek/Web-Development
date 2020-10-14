

function login(){
	return `
		<!doctype html>    
		<html>    
		<head>    
		    <title>Login Form</title>    
		    <link rel="stylesheet" type="text/css" href="login.css">    
		</head>    
		<body>    
		    <h2>Login Page</h2><br>    
		    <div class="login-section">    
			    <form method="POST" action="/login">    
			        <label id="username-label">User Name </label>    
			        <input type="text" name="username" id="enter-username" placeholder="Username" required>    
			        <button type="submit" id="login-button">Login</button>          
			    </form>     
			</div>    
		</body>    
		</html>    
		`
	}

module.exports = login;
