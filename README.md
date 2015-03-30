# WSJ Jargon Buster

A glossary of technical terms that follows you around the web. Made in a weekend by WSJ for Build The News, March 2015.

Here's how it looks:

> ![Jargon Buster screenshot](http://i.imgur.com/BVRCd1hl.png)

## How to install Chrome plugin

- Download [this repository](https://github.com/ejb/jargon-buster/archive/master.zip) and unzip.
- In Chrome, go to [chrome://extensions](chrome://extensions).
- Tick "Developer mode" in the corner.
- Drag the "app" folder onto the page.

## How to use plugin

You can also install the Jargon Buster into your own website. You'll need:

- [jargon-buster.js](https://raw.githubusercontent.com/ejb/jargon-buster/master/app/scripts/jargon-buster.js)
- jQuery
- [tabletop.js](https://github.com/jsoma/tabletop)

Then initialise using:

```
var buster = new JargonBuster({
  'spreadsheet_key': '1ghlHloe91EWGK4khcl-VJ_JhltzOMsxrNobDZVcX8zU'
});
```

Change the spreadsheet key to use a different Google Sheet as a source.

## Credits

The "WSJ+1" team was:
- Elliot Bentley
- Jason French
- Jon Sindreu
- John Crowley
- Pat Minczeski
- Jack Bowie

![Spot and Data](http://i.imgur.com/tehdV.gif)
