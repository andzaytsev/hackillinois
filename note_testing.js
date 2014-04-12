console.log("HelloWorld");
console.log(document.URL);


chrome.extension.sendRequest({url_request : /*document.URL*/"good.html"}, function(response){
	console.log(response);
	// console.log(response[0].content);
	// console.log(response[0].text);
});

$(document).ready(function(){
	$(".note_show").click(function(event){
		var show_id = event.target.id;
		var hide_id = show_id.replace("_show", "_hide");
		$("#"+show_id).hide();
		$("#"+hide_id).show();
	});
	$(".note_hide").click(function(event) {
		var hide_id = event.target.id+"_hide";
		var show_id = event.target.id+"_show";
		$("#"+show_id).show();
		$("#"+hide_id).hide(); 
	})
});

/*
var getSelectedText = function()
{
	var focused = document.activeElement;
  	var selectedText;
  	if (focused) {
	    try {
	      	selectedText = focused.value.substring(focused.selectionStart, focused.selectionEnd);
	    } catch (err) {
	    }
 	}
	if (selectedText == undefined) {
		var sel = window.getSelection();
		var selectedText = sel.toString();
	}
	return selectedText;
}*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({selectedText: window.getSelection().toString()});
});
