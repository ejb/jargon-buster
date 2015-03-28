'use strict';

function JargonBuster(){
  var that = this;
  this.getDictionary(function(dict){
    that.dictionary = dict;
    var tags = that.findTextBlocks();
    that.findJargon( tags, dict );
  });
}

JargonBuster.prototype.getDictionary = function(callback){
  var url = chrome.extension.getURL('/dictionary.json');
  $.getJSON( url, callback );
}

JargonBuster.prototype.findTextBlocks = function(){
  return $('p');
}

JargonBuster.prototype.findJargon = function($tags, dict){
    for (var j = 0; j < dict.length; j++) {
      var term = dict[j].term;
      var withTag = '<span class="jargon-buster-term">'+term+'</span>';
      $tags.html(function () {
        var html = $(this).html();
        var search = new RegExp( '([\.,-\/#!$%\^&\*;:{}=\-_`~() ])('+term+')([\.,-\/#!$%\^&\*;:{}=\-_`~() ])', 'gi' );
        return html.replace(search, "$1"+withTag+"$3"); 
      });
                  
      // TODO:
      // - If link, ignore
      // - Upper or lowercase
      // - Retain case
      // - punctation?
      // - only show once
    }
}

