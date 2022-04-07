const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};
  
const randomSentenceBuilder = () => {
    const makeWord = () => {
        var text = "";
        var possible =
        "ABCDE FGHIJ KLMNO PQRST UVWXY Zabcd efghi jklmn opqrs tuvwx yz";
  
        for (var i = 0; i < randomIntFromInterval(3, 15); i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
  
        return text.trim().replace(/ +(?= )/g, "");
    };
  
    const makeSentence = () => {
        var text = "";
  
        for (var i = 0; i < randomIntFromInterval(10, 25); i++) text += makeWord();
  
        return text.trim();
    };
  
    return makeSentence();
};
  
  
  
let children = [];
for (var i = 0; i < randomIntFromInterval(10, 35); i++) {
    children.push(randomSentenceBuilder());
}
  
let dendrogram = {
    name: "Root",
    children: children
};
  
console.log(dendrogram);
  