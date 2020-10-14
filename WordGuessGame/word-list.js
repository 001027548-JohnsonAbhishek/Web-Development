"use strict";
const wordList = require('./words');

const wordListPage ={
 
  template: function() {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Word List</title>
          <link rel="stylesheet" type="text/css" href="/word-list.css"/>
        </head>
        <body>
            <div id="word-list-display">
                ${wordListPage.listOfWords()}
            </div>
        </body
      </html>
  `;
  },

 listOfWords: function(){ 
 	return `<ul class="word-list">` +
      wordList.map(word =>`
        <li class="individual-word">
          <span class="word">${word}</span> 
        </li>`).join('')+
      `</ul>`+ 
      `<a class="main-page-link" href="/">Go Back</a>`;
	},

}
module.exports= wordListPage;