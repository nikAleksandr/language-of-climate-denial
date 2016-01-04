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
        || text.search(/coal/i) >= 0
        || text.search(/gas/i) >= 0
        || text.search(/gasoline/i) >= 0
        || text.search(/industry/i) >= 0 //always change industry, even when oil, gas, etc, aren't mentioned
        || text.search(/(all-of-the-above|all of the above)/i) >= 0
        || text.search(/offshore (platform|rig|oil rig|drilling|oil rig|extraction|oil extraction|production|oil production)/i) >= 0
        || text.search(/(fracking|hydraulic fracturing|fraking)/i) >= 0 //common misspellings?
        || text.search(/(tar sands|tar-sands)/i) >= 0
        || text.search(/deforest/i) >= 0
        || text.search(/(wild fire|forest fire)/i) >= 0
        || text.search(/drought/i) >= 0
        || text.search(/dispersant/i) >= 0
        || text.search(/flood/i) >= 0
        || text.search(/(super storm|superstorm|super-storm)/i) >= 0
        || text.search(/refinery/i) >= 0
        || text.search(/pipeline/i) >= 0
        || text.search(/(chemichal|petrochemical) plant/i) >= 0
        || text.search(/refinery/i) >= 0
        || text.search(/greenhouse gas/i) >= 0
        || text.search(/(mainstream|corporate) media/i) >= 0
        || text.search(/(big oil|OPEC)/i) >= 0) {
        textNode.nodeValue = replaceText(textNode.nodeValue);
    }
}

function replaceText(v)
{
    // all of the above
    v = v.replace(
        /\b(?:All-[Oo]f-[Tt]he-Above|All-of-the-above|All [Oo]f [Tt]he Above|All of the above)\b/g,
        "Carbon Paganistic"
    );
    v = v.replace(
        /\b(?:all-of-the-above|all of the above)\b/g,
        "carbon paganistic"
    );

    // natural, all-natural, clean, eco-friendly, green
    v = v.replace(/\b(?:Natural|All-[Nn]atural|Green|Clean|Eco-[Ff]riendly|Ecofriendly|Green)\b/g, "Enchanted");
    v = v.replace(/\b(?:natural|all-natural|green|clean|eco-friendly|ecofriendly|green)\b/g, "enchanted");

    //drilling;
    v = v.replace(/\bdrill(?:(ing)|(s)|(ed))?\b/g, "Terradeform$1$2$3");
    v = v.replace(/\bdrill(?:(ing)|(s)|(ed))?\b/g, "terradeform$1$2$3");

    //offshore, deepwater
    v = v.replace(/\bOffshore\b/g, "Subsea");
    v = v.replace(/\boffshore\b/g, "subsea");

    //underground
    v = v.replace(/\bUnderground\b/g, "Subterranean");
    v = v.replace(/\bunderground\b/g, "subterranean");

    //spill
    v = v.replace(/\bSpill\b/g, "Valdezian Gush");
    v = v.replace(/\bspill\b/g, "valdezian gush");

    //tar sands
    v = v.replace(/\b(?:Tar-[Ss]ands|Tar [Ss]ands|Tarsands|Oil-[Ss]ands|Oil [Ss]ands)(?: [Oo]peration)?\b/g, "Moon-scaping Operation");
    v = v.replace(/\b(?:tar-sands|tar sands|tarsands|oil-sands|oil sands)(?: [Oo]peration)?\b/g, "Moon-scaping Operation");

    //climate change and it's disasters
    v = v.replace(/\b(?:Wildfire|Forest Fire)\b/g, "Entropic Beacon");
    v = v.replace(/\b(?:wildfire|forest fire)\b/g, "entropic beacon");
    v = v.replace(/\bDrought(s)?\b/g, "Drydeath$1");
    v = v.replace(/\bdrought(s)?\b/g, "drydeath$1");
    v = v.replace(/\bFlood(?:(ing)|(s)|(ed))?\b/g, "Wetdeath$1$2$3");
    v = v.replace(/\bflood(?:(ing)|(s)|(ed))?\b/g, "wetdeath$1$2$3");

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