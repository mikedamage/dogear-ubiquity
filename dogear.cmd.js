CmdUtils.CreateCommand({
	name: "dogear",
	author: {
		name: "Mike Green",
		email: "mike.is.green@gmail.com",
		homepage: "http://www.astronautcrossing.com"
	},
	description: "Adds the current page to a 'read it later' list that you can access with 'dogear.list', 'dogear.pop', and 'dogear.shift'.",
	_preferenceKey: "extensions.ubiquity.dogear.pageList",
	_listExists: function() {
		return Application.prefs.has(this._preferenceKey);
	},
	_getListJSON: function() {
		return Utils.decodeJson(Application.prefs.get(this._preferenceKey).value);
	},
	preview: function(pblock) {
		var thisWindow = CmdUtils.getWindow();
		var snapshot = CmdUtils.getWindowSnapshot(thisWindow);
		var previewTemplate = "<strong>Title:</strong> ${title}<br/>";
		previewTemplate += "<strong>URL:</strong> ${url}<br/>";
		previewTemplate += "<strong>Snapshot:</strong> <img src=\"${snapshot}\" /><br/>";
		pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, {title: thisWindow.document.title, url: thisWindow.location.href, snapshot: snapshot});
	},
	execute: function() {
		var thisWindow = CmdUtils.getWindow();
		var snapshot = CmdUtils.getWindowSnapshot(thisWindow);
		var newListItem = {
			title: thisWindow.document.title,
			url: thisWindow.location.href,
			snapshot: snapshot
		};
		
		if (this._listExists()) {
			var list = this._getListJSON();
			list.push(newListItem);
		} else {
			var list = [newListItem];
		}
		Application.prefs.setValue(this._preferenceKey, Utils.encodeJson(list));
	}
});