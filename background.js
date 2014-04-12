function getword(info, tab){
	console.log("Word"+info.selectionText+"was selected");
	chrome.tab.create({
		url: "http://www.google.com/search?q="+info.selectionText,
	})
}

chrome.contextMenus.create({
	title: "search:%s",
	contexts: ["selection"],
	onclick: getword,
});

