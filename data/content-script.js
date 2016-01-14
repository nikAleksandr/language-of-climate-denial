function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
    var text = textNode.wholeText;
    if(text.search(/oil/i) >= 0
        || text.search(/petroleum/i) >= 0
        || text.search(/coal/i) >= 0
        || text.search(/gas/i) >= 0
        || text.search(/gasoline/i) >= 0
        || text.search(/drilling/i) >= 0
        || text.search(/(fossil fuel|fossil-fuel|fossilfuel)/i) >= 0
        || text.search(/(all-of-the-above|all of the above)/i) >= 0
        || text.search(/(natural|green|eco-friendly|ecofriendly)/i) >= 0
        || text.search(/offshore (platform|rig|oil rig|drilling|oil rig|extraction|oil extraction|production|oil production)/i) >= 0
        || text.search(/(fracking|hydraulic fracturing|fraking|hydro-fracking)/i) >= 0 //common misspellings?
        || text.search(/(tar sands|tar-sands)/i) >= 0
        || text.search(/dispersant/i) >= 0
        || text.search(/deforest/i) >= 0
        || text.search(/(wildfire|forestfire|wild fire|forest fire)/i) >= 0
        || text.search(/drought/i) >= 0
        || text.search(/flood/i) >= 0
        || text.search(/pipeline/i) >= 0
        || text.search(/greenhouse gas/i) >= 0
        || text.search(/emissions/i) >= 0
        || text.search(/OPEC/i
        || text.search(/energy/i) >= 0) >= 0) {
        textNode.nodeValue = replaceText(textNode.nodeValue);
    }
}

function replaceText(v)
{
    // all of the above
    v = v.replace(
        /\b(?:An All-[Oo]f-[Tt]he-[Aa]bove|An All [Oo]f [Tt]he [Aa]bove|An All-[Oo]f [Tt]he-[Aa]bove)\b/g,
        "A Carbon Paganistic"
    );
    v = v.replace(
        /\b(?:an all-of-the-above|an all of the above|an all-of the-above)\b/g,
        "a carbon paganistic"
    );
    v = v.replace(
        /\b(?:All-[Oo]f-[Tt]he-[Aa]bove|All [Oo]f [Tt]he [Aa]bove|All-[Oo]f [Tt]he-[Aa]bove)\b/g,
        "Carbon Paganistic"
    );
    v = v.replace(
        /\b(?:all-of-the-above|all of the above|all-of the-above)\b/g,
        "carbon paganistic"
    );

    //Big Oil, OPEC
    v = v.replace(/\b(?:Big Oil|[Tt]he Big [Oo]il|Big oil|OPEC)\b/g, "The Smog Syndicate");
    v = v.replace(/\b(?:big oil|the big oil|petroleum companies)\b/g, "The Smog Syndicate");
    v = v.replace(/\bPetroleum Companies\b/g, "The Smog Syndicate"); //not working as expexted
    v = v.replace(/\bpetroleum companies\b/g, "The Smog Syndicate"); //not working as expexted

    // natural, all-natural, clean, eco-friendly, green
    v = v.replace(/\b(?:Natural|All-[Nn]atural)\b/g, "Enchanted");
    v = v.replace(/\b(?:natural|all-natural)\b/g, "enchanted");
    v = v.replace(/\b(?:Green)\b/g, "Magic");
    v = v.replace(/\b(?:green)\b/g, "magic");
    v = v.replace(/\b(?:Eco-[Ff]riendly|Ecofriendly|eco friendly)\b/g, "Mystical");
    v = v.replace(/\b(?:eco-friendly|ecofriendly|eco friendly)\b/g, "mystical");
    v = v.replace(/\b(?:Clean)\b/g, "Charmed");
    v = v.replace(/\b(?:clean)\b/g, "charmed");

    //drilling;
    v = v.replace(/\bDrill(?:(ing)|(s)|(ed))?\b/g, "Terradeform$1$2$3");
    v = v.replace(/\bdrill(?:(ing)|(s)|(ed))?\b/g, "terradeform$1$2$3");

    //offshore, deepwater
    v = v.replace(/\b(?:Offshore|Deepwater)\b/g, "Subsea");
    v = v.replace(/\b(?:offshore|deepwater)\b/g, "subsea");

    //underground
    v = v.replace(/\bUnderground\b/g, "Subterranean");
    v = v.replace(/\bunderground\b/g, "subterranean");

    //spill
    v = v.replace(/\bAn Oil Spill('s|s(?:')?)?\b/g, "A Valdezian Gush$1");
    v = v.replace(/\ban oil spill('s|s(?:')?)?\b/g, "a Valdezian gush$1");
    v = v.replace(/\b(?:Oil [Ss]pill|Spill|Natural Gas Leak|Leak)('s|s(?:')?)?\b/g, "Valdezian Gush$1");
    v = v.replace(/\b(?:oil spill|spill|natural gas leak|leak)('s|s(?:')?)?\b/g, "Valdezian gush$1");

    //pipeline
    v = v.replace(/\bAn Oil [Pp]ipeline('s|s(?:')?)?\b/g, "A Slime Tube$1");
    v = v.replace(/\ban oil pipeline('s|s(?:')?)?\b/g, "a slime tube$1");
    v = v.replace(/\b(?:Oil [Pp]ipeline|Pipeline)('s|s(?:')?)?\b/g, "Slime Tube$1");
    v = v.replace(/\b(?:oil pipeline|pipeline)('s|s(?:')?)?\b/g, "slime tube$1");

    //fracking
    v = v.replace(/\b(-)?(?:Frack|Frak|Fractur(?:e)?)(?:(ing)|(s)|(ed))?\b/g, "$1Planet Smash$2$3$4");
    v = v.replace(/\b(-)?(?:[Hh]ydro)?(?:frack|frak|fractur(?:e)?)(?:(ing)|(s)|(ed))?\b/g, "$1planet smash$2$3$4");

    //tar sands
    v = v.replace(/\b(?:Tar-[Ss]ands|Tar [Ss]ands|Tarsands|Oil-[Ss]ands|Oil [Ss]ands)(?: [Oo]peration)?\b/g, "Moon-scaping Operation");
    v = v.replace(/\b(?:tar-sands|tar sands|tarsands|oil-sands|oil sands)(?: [Oo]peration)?\b/g, "Moon-scaping Operation");

    //climate change and it's disasters
    v = v.replace(/\b(?:Wildfire|Forest Fire)('s|s(?:')?)?\b/g, "Entropic Beacon$1");
    v = v.replace(/\b(?:wildfire|forest fire)('s|s(?:')?)?\b/g, "entropic beacon$1");
    v = v.replace(/\bDrought('s|s(?:')?)?\b/g, "Drydeath$1");
    v = v.replace(/\bdrought('s|s(?:')?)?\b/g, "drydeath$1");
    v = v.replace(/\bFlood(ing|ed)?('s|s(?:')?)?\b/g, "Wetdeath$1$2");
    v = v.replace(/\bflood(ing|ed)?('s|s(?:')?)?\b/g, "wetdeath$1$2");

    //oil, coal, fossil-fuels
    v = v.replace(/\bAn [Oo]il('s)?\b/g, "A Primordial Slime$1");
    v = v.replace(/\ban oil('s)?\b/g, "a primordial slime$1");
    v = v.replace(/\b(?:Oil|Petroleum)('s)?\b/g, "Primordial Slime$1");
    v = v.replace(/\b(?:oil|petroleum)('s)?\b/g, "primordial slime$1");

    v = v.replace(/\bCoal('s)?\b/g, "Smog Rock$1");
    v = v.replace(/\bcoal('s)?\b/g, "smog rock$1");

    v = v.replace(/\b(?:Fossil [Ff]uel|Fossil-[Ff]uel|Fossilfuel)(?:s)?(-)?\b/g, "Melange$1");
    v = v.replace(/\b(?:fossil-fuel|fossil fuel|fossilfuel)(?:s)?(-)?\b/g, "Melange$1");
    
    //greenhouse gas and emissions on its own
    v = v.replace(/\bGreenhouse [Gg]as(?:ses)?(?: [Ee]missions)?('s)?\b/g, "Effluvium$1");
    v = v.replace(/\bgreenhouse gas(?:ses)?(?: emissions)?('s)?\b/g, "effluvium$1");
    v = v.replace(/\bEmissions\b/g, "Effluvium");
    v = v.replace(/\bemissions\b/g, "effluvium");


    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);