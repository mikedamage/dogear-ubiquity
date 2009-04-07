CmdUtils.CreateCommand({
	name: "dogear.pop",
	author: {
		name: "Mike Green",
		email: "mike.is.green@gmail.com",
		homepage: "http://www.astronautcrossing.com"
	},
	license: "GNU General Public License",
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
		var list = this._getListJSON();
		var pop = list.pop();
		this._saveList(list);
		Utils.openUrlInBrowser(pop.url);
	}
});