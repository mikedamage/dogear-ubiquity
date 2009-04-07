CmdUtils.CreateCommand({
	name: "dogear.list",
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
	takes: {"number": /\d+/},
	preview: function(input, pblock) {
		var list = this._getListJSON();
		var itemTemplate = "<li>${title}<br/><img src=\"${snapshot}\" /><br/>${url}</li>";
		pblock.innerHTML = "<strong>DogEar List:</strong>\n<ol>\n";
		for (i=0; i < list.length; i++) {
			pblock.innerHTML += CmdUtils.renderTemplate(itemTemplate, {title: list[i].title, url: list[i].url, snapshot: list[i].snapshot});
		}
	},
	execute: function(input) {
		var item = parseInt(input.text) - 1;
		var list = this._getListJSON();
		displayMessage(list[item].url);
		//list.delete(item);
	}
});