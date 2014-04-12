var storage = chrome.storage.local
var test=[
		    {
		    	"paragraph_num": 0, //I do not know how to do this
		    	"text": "During his youth, Alexander was tutored by the philosopher Aristotle until the age of 16.",
		    	"pos_begin": 0,
		    	"pos_end": 16,
		    	"content": "Alexander has a good youth",
			}
		];
storage.set({"good.html": test});

chrome.extension.onRequest.addListener(
	function (request, sender, send_response) {
		storage.get(request.url_request,function(data){
			send_response(data);
		});
	}
);

var highlightItem = {
	"title": "Highlight",
	"id": "highlightItem",
	"contexts": ["all"],
	"onclick": function(info, tab) {
		console.log(tab.id);
		chrome.tabs.sendMessage(tab.id, {}, function(response){
			console.log(response.selectedText);
		});
	}
};

chrome.contextMenus.create(highlightItem, function(obj)
{
	console.log("highlightItem has been created");
});

var addNoteItem = {
	"title": "Add Note",
	"id": "addNoteItem",
	"contexts": ["all"],
	"onclick": function() {
		console.log("addNoteItem clicked");
	}
};

chrome.contextMenus.create(addNoteItem, function(obj)
{
	console.log("addNoteItem has been created");
});
