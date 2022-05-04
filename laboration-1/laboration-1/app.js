//Laboration 1
'use strict';
const express = require('express');
const http = require('http');
const fs = require('fs');
const jsDOM = require('jsdom');
const blogArray = require('./blogPosts');

let app = express();

app.listen(3001, function() {
    console.log("Servern is running");
});

app.get('/', function(request, response) {
    console.log("Get /");
    fs.readFile(__dirname + '/index.html', function(error, data) {
        if(error) {
            console.log("Shit happens");
        }
        else {
            let htmlCode = data;
            //Virtual DOM
            let serverDOM = new jsDOM.JSDOM(htmlCode);
            let section = serverDOM.window.document.querySelector('section');
            //Där texten ska visas
            let pRefH1 = serverDOM.window.document.createElement('h1');
            let pRefH2 = serverDOM.window.document.createElement('h2');
            let pRefH3 = serverDOM.window.document.createElement('h3');
            let pRefP = serverDOM.window.document.createElement('p');
            let lineBreak = serverDOM.window.document.createElement('br');
            //texten

            let pText = serverDOM.window.document.createTextNode(blogArray.blogPosts[0].nickName);
            pRefH1.appendChild(pText);
            
            pText = serverDOM.window.document.createTextNode(blogArray.blogPosts[0].msgSubject);
            pRefH2.appendChild(pText);
            
            pText = serverDOM.window.document.createTextNode(blogArray.blogPosts[0].timeStamp);
            pRefH3.appendChild(pText);
            
            pText = serverDOM.window.document.createTextNode(blogArray.blogPosts[0].msgBody);
            pRefP.appendChild(pText);
            //Där texten ska hamna
            section.appendChild(pRefH1);
            section.appendChild(pRefH2);
            section.appendChild(pRefH3);
            section.appendChild(pRefP);
            
            htmlCode = serverDOM.serialize();
            response.send(htmlCode);
        }
    });
});

/*app.post('/', function(request, response) {
    console.log("Post /");
    fs.readFile(__dirname + '/index.html', function(error, data) {
        if(error) {
            console.log("Shit happens");
        }
        else {
            let htmlCode = data;
            //Virtual DOM
            let serverDOM = new jsDOM.JSDOM(htmlCode);
            let section = serverDOM.window.document.querySelector('section');
            //Där texten ska visas
            let pRef = serverDOM.window.document.createElement('h1');
            //texten
            let pText = serverDOM.window.document.createTextNode("Din lilla hora");
            pRef.appendChild(pText);
            //Där texten ska hamna
            section.appendChild(pRef);
            
            htmlCode = serverDOM.serialize();
            response.send(htmlCode);
        }
    });
});*/

app.get('/skriv', function(request, response) {
    console.log("get skriv.html");
    response.sendFile(__dirname + '/skriv.html');
});

app.post('/skriv', function(request, response) {
    //Skickar tillbaks användaren till startsidan 
    response.redirect('/');

});
