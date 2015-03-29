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
    var usedTerms = [];
    for (var j = 0; j < dict.length; j++) {
      var terms = dict[j].term.split(','),
          def = dict[j].definition || dict[j].defintion;
      $.each(terms, function(i,term){
        var tagLeft = '<span class="jargon-buster-term" data-definition="'+def+'"  data-def-name="'+terms[0]+'">',
            tagRight = '</span>';
        $tags.html(function() {
            var html = $(this).html(),
                search = new RegExp('(?!<a[^>]*>)([\.,-\/#!$%\^&\*;:{}=\-_`~() ])(' + term + ')([\.,-\/#!$%\^&\*;:{}=\-_`~() ])(?![^<]*</a>)', 'gi');
            if (usedTerms[j] !== true) {
              html = html.replace(search, "$1" + tagLeft + "$2" + tagRight + "$3");
            }
            if (html.indexOf(term) > -1) {
              usedTerms[j] = true;
            }
            return html;
        });
      })

      // TODO:
      // - If link, ignore
    }
}


JargonBuster.prototype.setupClicks = function(){
  $('.jargon-buster-term').click(function(){
    var def = $(this).attr('data-definition');
    var term = $(this).text();
    var termName = $(this).attr('data-def-name');
    var def = $(this).attr('data-definition'),
        term = $(this).text(),
        termName = $(this).attr('data-def-name');
        $('.jargon-buster-definition:not([data-term="'+term+'"])').slideUp();
    if ($('.jargon-buster-definition[data-term="'+term+'"]').length === 0) {
      $(this).parent('p').after(
        '<p class="jargon-buster-definition" data-term="'+term+'">'+
        '<strong>'+termName+': </strong>'+def+
        '&nbsp;<span class="jargon-close">close</span>'+
        '</p>'
      );
    }
    $('.jargon-buster-definition[data-term="'+term+'"]').slideToggle();
    $('.jargon-close').click(function(){
      $('.jargon-buster-definition[data-term="'+term+'"]').slideUp();
    });
  });
}
