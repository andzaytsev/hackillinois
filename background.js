var storage = chrome.storage.local
var test=[
		    {
		    	"paragraph_num": 2, //I do not know how to do this
		    	"text": "During his youth, Alexander was tutored by the philosopher Aristotle until the age of 16.",
		    	//"element": '<p> \nDuring his youth, Alexander was tutored by the philosopher Aristotle until the age of 16. When he succeeded his father to the throne in 336 BC, after Philip was assassinated, Alexander inherited a strong kingdom and an experienced army. He had been awarded the generalship of Greece and used this authority to launch his father\'s military expansion plans. In 334 BC, he invaded the Achaemenid empire, ruled Asia Minor, and began a series of campaigns that lasted ten years. Alexander broke the power of Persia in a series of decisive battles, most notably the battles of Issus and Gaugamela. He subsequently overthrew the Persian King Darius III and conquered the entirety of the Persian Empire.i[›] At that point, his empire stretched from the Adriatic Sea to the Indus River.\n</p>',
	            "insertions":[
	            {
	            	"pos_begin": 0,
	            	"pos_end": 16,
	            	"content": "Alexander has a good youth",
	            },
	            {
	            	"pos_begin": 20,
	            	"pos_end": 24,
	            	"content": "Alexander is famous for this",
	            }
	            ]
			},
		    {
		    	"paragraph_num": 3, //I do not know how to do this
		    	"text": "During his youth, Alexander was tutored by the philosopher Aristotle until the age of 16.",
		    	//"element": '<p> \nDuring his youth, Alexander was tutored by the philosopher Aristotle until the age of 16. When he succeeded his father to the throne in 336 BC, after Philip was assassinated, Alexander inherited a strong kingdom and an experienced army. He had been awarded the generalship of Greece and used this authority to launch his father\'s military expansion plans. In 334 BC, he invaded the Achaemenid empire, ruled Asia Minor, and began a series of campaigns that lasted ten years. Alexander broke the power of Persia in a series of decisive battles, most notably the battles of Issus and Gaugamela. He subsequently overthrew the Persian King Darius III and conquered the entirety of the Persian Empire.i[›] At that point, his empire stretched from the Adriatic Sea to the Indus River.\n</p>',
	            "insertions":[
	            {
		    	"pos_begin": 0,
		    	"pos_end": 16,
		    	"content": "Alexander has",
	            }
	            ]
			}

		];
storage.set({"good.html": test});

chrome.extension.onRequest.addListener(
	function (request, sender, send_response) {
		storage.get(request.url_request,function(data){
			send_response(data[request.url_request]);
		});
	}
);

var highlightItem = {
	"title": "Highlight",
	"id": "highlightItem",
	"contexts": ["all"],
	"onclick": function(info, tab) {
		console.log(tab.id);
		chrome.tabs.sendMessage(tab.id, {type: "highlight"}, function(response){
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
	"onclick": function(info, tab) {
		var loc = {
			"pos.beg": "1",
			"pos.end": "1",
			"pos.comm": "1",
			"pos.key":"1",
			"pos.outKey": "1"
		}
		//noteCreator.displayDialog('google.com', loc);
		chrome.windows.create({url:"popup.html", "type": "popup", height: 50, width:200}, function(window){
			chrome.runtime.onMessage.addListener(function(request, sender, send_response){
				if (request.comment){
					//console.log("in the background js file: " + request.comment);
					//console.log("the submit button was clicked");
					//console.log("window.id " + window.id);

					//pos-begin, pos-end, paragraph
					chrome.tabs.sendMessage(tab.id, {type: "addNote"}, function(response){
						var selection = response;
						console.log("response received");
						//console.log(selection);
						
						//selection.comment = request.comment;
						//selText: selectedStr,
						//parentEl: outerHTML,
						//begin: outerHTML.indexOf(selectedStr),

						console.log(selection);
					});
					//chrome.windows.remove(window.id);
					//console.log(tab.url);

					//storage.set({tab.url: });
				}
			});
		});
	}
};

chrome.contextMenus.create(addNoteItem, function(obj) {
	console.log("addNoteItem has been created");
});
