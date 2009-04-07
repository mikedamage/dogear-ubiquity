CmdUtils.CreateCommand({
	name: "dogear",
	author: {
		name: "Mike Green",
		email: "mike.is.green@gmail.com",
		homepage: "http://www.astronautcrossing.com"
	},
	description: "Adds the current page to a 'read it later' list that you can access with 'dogear.list'",
	_listExists: function() {
		return Application.prefs.has("ubiquity.dogear.pageList");
	},
	_getListJSON: function() {
		return Utils.decodeJson(Application.prefs.get("ubiquity.dogear.pageList"));
	},
	preview: function(pblock) {
		var thisWindow = CmdUtils.getWindow();
		var snapshot = CmdUtils.getWindowSnapshot(thisWindow);
		var previewTemplate = "<strong>Title:</strong> $title<br/>";
		previewTemplate += "<strong>URL:</strong> $url<br/>";
		previewTemplate += "<strong>Snapshot:</strong> <img src=\"$snapshot\" /><br/>";
		pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, {title: thisWindow.title, url: thisWindow.location.href, snapshot: snapshot});
	},
	execute: function() {
		var thisWindow = CmdUtils.getWindow();
		var snapshot = CmdUtils.getWindowSnapshot(thisWindow);
		var newListItem = {
			title: thisWindow.title,
			url: thisWindow.location.href,
			snapshot: snapshot
		};
		
		if (this._listExists()) {
			var list = this._getListJSON();
			list.push(newListItem);
		} else {
			var list = [newListItem];
		}
		Application.prefs.setValue("ubiquity.dogear.pageList", Utils.encodeJson(list));
	}
});