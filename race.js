/**
 * @constructor
 */
var Race = function () {
	this.horses = null;
};

/**
 * @param file
 * @param callback
 * @returns {Race}
 */
Race.prototype.loadJSON = function (file, callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
    	if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);

    return this;
};

/**
 * @param horses
 * @returns {Race}
 */
Race.prototype.start = function (horses) {
	var self = this;
	this.horses = horses;
	horses.forEach(function (horse, index) {
		var source = horse.url;
		var start_time = new Date().getTime();
		self.loadJSON(source, function(response) {
			var data = JSON.parse(response);
			var image = data.image;
			var request_time = new Date().getTime() - start_time;
			self.horses[index].image = image;
			self.horses[index].time = request_time;
		});
	});

	return this;
};

/**
 * @param race
 * @returns {Race}
 */
Race.prototype.then = function (race) {
	var self = this;
	var horses = self.horses;
	horses.forEach(function (horse) {
		race(horse);
	});

	return this;
};
