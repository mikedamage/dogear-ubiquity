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
		jQuery.each(list, function(index, item) {
			pblock.innerHTML += CmdUtils.renderTemplate(itemTemplate, item);
		});
	},
	execute: function(input) {
		
	}
});