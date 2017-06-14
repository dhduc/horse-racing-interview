/**
 * @constructor
 */
var Race = function () {
	this.horses = null;
	this.isWinner = false;
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
	this.horses = horses;

	return this;
};

/**
 * @param showWinner
 * @returns {Race}
 */
Race.prototype.then = function (showWinner) {
	var horses = this.horses;

	this.run(horses[0], showWinner);
	this.run(horses[1], showWinner);
	this.run(horses[2], showWinner);
	this.run(horses[3], showWinner);

	return this;
};

/**
 * @param horse
 * @param showWinner
 * @returns {Race}
 */
Race.prototype.run = function (horse, showWinner) {
	var self = this;
	var source = horse.url;
	if (self.isWinner) {
		return self;
	}

    self.loadJSON(source, function (response) {
        var data = JSON.parse(response);
        var winner = {};
        winner.name = horse.name;
        winner.image = data.image;
        showWinner(winner);
        self.isWinner = true;
    });

	return self;
};