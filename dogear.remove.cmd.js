Array.prototype.remove = function(index) {
	return this.splice(index, 1);
};

CmdUtils.CreateCommand({
	name: "dogear.remove",
	author: {
		name: "Mike Green",
		email: "mike.is.green@gmail.com",
		homepage: "http://www.astronautcrossing.com"
	},
	license: "GNU General Public License",
	description: "Removes the specified item from your DogEar list.",
	takes: {"item_number": /\d+/},
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
	preview: function(pblock, input) {
		var item = parseInt(input.text) - 1;
		if (this._listExists()) {
			var list = this._getListJSON();
			if (item > (list.length + 1) || list.length < 1) {
				pblock.innerHTML = "<strong>List item doesn't exist!</strong>";
			} else {
				pblock.innerHTML = "<strong>Remove List Item " + String(item) + "</strong>";
				pblock.innerHTML += list[item].title + '<br/><img src="' + list[item].snapshot + '" /><br/>' + list[item].url;
			}
		} else {
			pblock.innerHTML = "<strong>DogEar list is empty</strong>";
		}
	},
	execute: function(input) {
		var item = parseInt(input.text) - 1;
		if (this._listExists()) {
			var list = this._getListJSON();
			if (item > (list.length + 1) || list.length < 1) {
				displayMessage("List item doesn't exist!");
			} else {
				list.remove(item);
				displayMessage("Removed item " + String(item) + "from DogEar list.");
			}
		} else {
			displayMessage("DogEar list is empty!");
		}
		
	}
});