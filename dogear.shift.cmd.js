CmdUtils.CreateCommand({
	name: "dogear.shift",
	author: {
		name: "Mike Green",
		email: "mike.is.green@gmail.com",
		homepage: "http://www.astronautcrossing.com"
	},
	license: "GNU General Public License",
	description: "Opens the first page on your DogEar list in a new tab, then removes it from the list.",
	_preferenceKey: "extensions.ubiquity.dogear.pageList",
	_listExists: function() {
		return Application.prefs.has(this._preferenceKey);
	},
	_getListJSON: function() {
		return Utils.decodeJson(Application.prefs.get(this._preferenceKey).value);
	},
	_saveList: function(obj) {
		var list = Utils.encodeJson(obj);
		return Application.prefs.setValue(this._preferenceKey, list);
	},
	execute: function(input) {
		if (this._listExists()) {
			var list = this._getListJSON();
			if (list.length > 0) {
				var pop = list.shift();
				this._saveList(list);
				Utils.openUrlInBrowser(pop.url);
			} else {
				displayMessage("No items in your DogEar list!");
			}
		} else {
			displayMessage("No items in your DogEar list!");
		}
	}
});