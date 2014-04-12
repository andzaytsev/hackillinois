console.log("HelloWorld");
console.log(document.URL);


chrome.extension.sendRequest({url_request : /*document.URL*/"good.html"}, function(response){
	console.log(response);
	// console.log(response[0].content);
	// console.log(response[0].text);
});

