'use strict';

function JargonBuster(args) {
    var that = this;
    this.args = args;
    this.getDictionary(function(dict) {
        var tags = that.findTextBlocks();
        that.findJargon(tags, dict);
    });
}

JargonBuster.prototype.getDictionary = function(callback) {
    if ('undefined' !== typeof this.args.spreadsheet_key) {
        //Okay, we have a spreadsheet url! Do Tabletop.
        Tabletop.init({
            key: this.args.spreadsheet_key,
            callback: callback,
            simpleSheet: true
        });
    } else {
        //Fall back, get dictionary.json
        var url = chrome.extension.getURL('/dictionary.json');
        $.getJSON(url, callback);
    }
}

JargonBuster.prototype.findTextBlocks = function() {
    return $('p');
}

JargonBuster.prototype.findJargon = function($tags, dict) {
    for (var j = 0; j < dict.length; j++) {
        var term = dict[j].term;
        var withTag = '<span class="jargon-buster-term">' + term + '</span>';
        $tags.html(function() {
            var html = $(this).html();
            var search = new RegExp('([\.,-\/#!$%\^&\*;:{}=\-_`~() ])(' + term + ')([\.,-\/#!$%\^&\*;:{}=\-_`~() ])', 'gi');
            return html.replace(search, "$1" + withTag + "$3");
        });

        // TODO:
        // - If link, ignore
        // - Upper or lowercase
        // - Retain case
        // - punctation?
        // - only show once
    }
}
