document.addEventListener("DOMContentLoaded", () => {

  const getSelectionText = () => {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    }
    return text;
  };
  let selection;
  document.onmouseup = () => {
    if (getSelectionText()) {
      selection = getSelectionText();
    }
  };

  const replaceSelectionWithHtml = (text, tag) => {
    var pos = document.getElementsByClassName("nText")[0].innerHTML;
    const isInTag = pos.search(`<${tag}>${text}</${tag}>`);
    pos =
      isInTag === -1
        ? pos.replace(selection, `<${tag}>${text}</${tag}>`)
        : pos.replace(`<${tag}>${selection}</${tag}>`, text);
    document.getElementsByClassName("nText")[0].innerHTML = pos;
  };

  document.getElementById("bold").onclick = e => {
    replaceSelectionWithHtml(selection, "b");
    document.getElementById("bold").classList.toggle("active");
  };

  document.getElementById("italic").onclick = e => {
    replaceSelectionWithHtml(selection, "i");
    document.getElementById("italic").classList.toggle("active");
  };

  document.getElementById("underline").onclick = e => {
    replaceSelectionWithHtml(selection, "ins");
    document.getElementById("underline").classList.toggle("active");
  };

  /*Related Words*/
  const words = document.getElementById("file");

  words.addEventListener("mouseover", historyMouseover);
  function historyMouseover(event) {
    if(!event.target.hasAttribute("data-tooltip")) {
      fetch("https://api.datamuse.com/words?rel_syn=" + event.target.textContent)
        .then(res => res.json())
        .then(data => data.length ? event.target.setAttribute("data-tooltip", data.slice(0, Math.min(data.length,10)).map(syn => syn.word).join(", ")) : event.target.setAttribute("data-tooltip", "Synonyms Not Found!"))
        .catch(err => console.log(err));
    }
  }
  /*End Related Words*/
});



