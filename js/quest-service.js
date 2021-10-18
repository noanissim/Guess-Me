var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const treeDB = 'treeDB'

function createQuestsTree() {

    gQuestsTree = loadFromStorage(treeDB)
    if (!gQuestsTree) { //only in the first time
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        saveToStorage(treeDB, gQuestsTree)
    }
    gCurrQuest = gQuestsTree; //starts in the head
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

//update the gPrevQuest, gCurrQuest global vars
function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res] //moving forward by the child whice becomes the current
}

//Create and Connect the 2 Quests to the quetsions tree
function addGuess(newQuestTxt, newGuessTxt, lastRes) { //EXAMPLE:(queen?   Cleopatra    no)
    var newQuest = createQuest(newQuestTxt) //NEWQUEST = {queen? null null}
    newQuest.yes = createQuest(newGuessTxt) //NEWQUEST = {queen? {Cleopatra, null, null}, null}
    newQuest.no = gCurrQuest //NEWQUEST = {queen? {Cleopatra, null, null}, {Rita, null, null} }
    gPrevQuest[lastRes] = newQuest //GPREVQUEST = {Male?,  {(yes...)}, {(no):newQuest} }
    saveToStorage(treeDB, gQuestsTree)

    // var savedAnswer = gCurrQuest.txt
    // gCurrQuest = newQuest //gCurrQuest - queen? null null
    // gCurrQuest.no = createQuest(savedAnswer) //update the ans of no
    // gCurrQuest.yes = createQuest(newGuessTxt) //update the ans of yes

}

function getCurrQuest() {
    return gCurrQuest
}