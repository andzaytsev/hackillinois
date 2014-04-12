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
function show_note (note) {
	// body...
}