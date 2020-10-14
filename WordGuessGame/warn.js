"use strict";

const warning = {
	
	warnTemplate: function(){
    	return `
          		<!doctype html>
          		<html>
            		<head>
              		<title>Invalid Word Message</title>
             	 		<link rel="stylesheet" type="text/css" href="/warn.css"/>
            		</head>
            		<body>
               		<span>${warning.warningMessage()}</span>
            		</body>
          		</html>
           `
  },


	warningMessage: function(){
     return ` 
          	<div id="warn-modal">
              <h2>Message</h2>
              <p id="warning-text">Please Enter A Valid Word From The Word List </p>
                <a id="go-back" href="/">Go Back</a>
          	</div>
            `   
        },
  }

module.exports= warning;