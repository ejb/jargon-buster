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
  // console.log(tags);
    for (var j = 0; j < dict.length; j++) {
      var term = dict[j].term;
      // console.log( tags[i], tags[i].innerText);
      var withTag = '<span class="jargon-buster-term" style="color: red;">'+term+'</span>';
      
      $tags.html(function () {
          return $(this).html().replace(term, withTag); 
      });
            
      // TODO:
      // - If link, ignore
      // - Retain case
    }
}

