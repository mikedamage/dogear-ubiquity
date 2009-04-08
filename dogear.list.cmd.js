CmdUtils.CreateCommand({
	name: "dogear.list",
	author: {
		name: "Mike Green",
		email: "mike.is.green@gmail.com",
		homepage: "http://www.astronautcrossing.com"
	},
	license: "GNU General Public License",
	description: "Shows a list of the pages in your DogEar list.",
	_preferenceKey: "extensions.ubiquity.dogear.pageList",
	_listExists: function() {
		return Application.prefs.has(this._preferenceKey);
	},
	_getListJSON: function() {
		return Utils.decodeJson(Application.prefs.get(this._preferenceKey).value);
	},
	takes: {"number": /\d+/},
	preview: function(pblock, input) {
		var itemNumber = parseInt(input.text) - 1;
		if (this._listExists()) {
			var list = this._getListJSON();
			var itemTemplate = "<strong>${title}</strong><br/><img src=\"${snapshot}\" /><br/>${url}";
			pblock.innerHTML = "<strong>DogEar List:</strong>\n<div>\n";
			if (input.text != "") {
				pblock.innerHTML += CmdUtils.renderTemplate(itemTemplate, {title: list[itemNumber].title, url: list[itemNumber].url, snapshot: list[itemNumber].snapshot});
			} else {
				for (i=0; i < list.length; i++) {
					pblock.innerHTML += CmdUtils.renderTemplate(itemTemplate, {title: list[i].title, url: list[i].url, snapshot: list[i].snapshot});
				}
			}
			
			pblock.innerHTML += "</div>";
		} else {
			pblock.innerHTML = "<strong>No Items in DogEar list</strong>";
		}
	},
	execute: function(input) {
		var item = parseInt(input.text) - 1;
		var list = this._getListJSON();
		displayMessage(list[item].url + " copied to clipboard.");
		CmdUtils.copyToClipboard(list[item].url);
		//list.delete(item);
	}
});