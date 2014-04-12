/**
 * This file has functions to add a note by injecting
 * JavaScript into a page
 * author: Andrey Zaytsev
 */

/**
 * Class for creating a new note 
 */
var noteCreator = {
	displayDialog: function(site, pos) {
		site.insert(pos.beg, pos.end, pos.comm, pos.key, pos.outKey);
		alert('Added a new comment!')
		site.storeToChrome();
	}
};

