'use strict';

function JargonBuster(args) {
    var that = this;
    this.args = args;
    this.getDictionary(function(dict) {
        var tags = that.findTextBlocks();
        that.findJargon(tags, dict);
        that.setupClicks();
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
      var terms = dict[j].term.split(',');
      var def = dict[j].definition || dict[j].defintion;
      $.each(terms, function(i,term){
        var withTag = '<span class="jargon-buster-term" data-definition="'+def+'">' + term + '</span>';
        $tags.html(function() {
            var html = $(this).html();
            var search = new RegExp('([\.,-\/#!$%\^&\*;:{}=\-_`~() ])(' + term + ')([\.,-\/#!$%\^&\*;:{}=\-_`~() ])', 'gi');
            return html.replace(search, "$1" + withTag + "$3");
        });
      })
      

        // TODO:
        // - If link, ignore
        // - Upper or lowercase
        // - Retain case
        // - only show once
    }
}


JargonBuster.prototype.setupClicks = function(){
  $('.jargon-buster-term').click(function(){
    var def = $(this).attr('data-definition');
    var term = $(this).text();
    if ($('.jargon-buster-definition[data-term="'+term+'"]').length === 0) {
      $(this).parent('p').after(
        '<p class="jargon-buster-definition" data-term="'+term+'">'+
        '<strong>'+term+': </strong>'+def+
        '<span class="jargon-close">close</span>'+
        '</p>'
      );
    }
    $('.jargon-buster-definition[data-term="'+term+'"]').slideToggle();
    $('.jargon-close').click(function(){
      $('.jargon-buster-definition[data-term="'+term+'"]').slideUp();
    });
  });
}

