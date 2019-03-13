import './styles.css';
billAmt.onkeyup = handle;
btn10.onclick = btn15.onclick = btn20.onclick = calcTip;

let numLastLen = 0;

window.onload = function () {
  console.log('Ready to Party');
  document.getElementById("btn10").disabled = true;
  document.getElementById("btn15").disabled = true;
  document.getElementById("btn20").disabled = true;
  document.getElementById("billWoTip").disabled = true;
  document.getElementById("billAmt").focus();
};

function handle(e) {
  let text = e.type +
    ' key=' + e.key +
    ' key code=' + e.keyCode +
    (e.shiftKey ? ' shiftKey' : '') +
    (e.ctrlKey ? ' ctrlKey' : '') +
    (e.altKey ? ' altKey' : '') +
    (e.metaKey ? ' metaKey' : '') +
    (e.repeat ? ' (repeat)' : '') +
    "\n";
  console.log(text);
  if ((e.keyCode >= 0x30 && e.keyCode <= 0x39) || e.key == ".") {
    insertAmount(e);
  }
  else {
    insertAmount(e, false);
    let numLen = billAmt.value.length;
    if (numLastLen < numLen) {
      let newStr = billAmt.value.slice(0, billAmt.value.length - 1);
      billAmt.value = "";
      billAmt.value = newStr;
    }
  }
  numLastLen = billAmt.value.length;
}
function calcTip(e) {
  var numTipAmt = (parseFloat(billAmt.value) * parseFloat(this.value) );
  numTipAmt = numTipAmt * 100;
  numTipAmt = Math.round(numTipAmt);
  numTipAmt = numTipAmt / 100;
  var numTotAmt = parseFloat(numTipAmt)  + parseFloat(billAmt.value);
  numTotAmt = numTotAmt * 100;
  numTotAmt = Math.round(numTotAmt);
  numTotAmt = numTotAmt / 100;

  tipSelect.innerText = "You are tipping " + this.value * 100 + "%";
  placeNewText("tipPctAmt", this.value * 100 + "%");
  placeNewText("tipAmount", " $" + numTipAmt);
  placeNewText("totalAmt", " $" + numTotAmt);
  billAmt.focus();
}
/* let timerId = setTimeout(function tick() {
  // do something
  timerId = setTimeout(tick, 500);
}, 500); 
 */
function insertAmount(e, blnInsert = true) {
  let prdIdx = billAmt.value.indexOf(".");
  if (prdIdx != -1) {
    // Found  .
    if (blnInsert) {
      if (billAmt.value.length == prdIdx + 3) {
        setNewValues(false, " $" + billAmt.value);
        return;
      }
      if (billAmt.value.length > prdIdx + 3) {
        let newStr = billAmt.value.slice(0, billAmt.value.length - 1);
        billAmt.value = "";
        billAmt.value = newStr;
      }
    }
    if (billAmt.value.length < prdIdx + 3) {
      //Reset values
      setNewValues(true, "");
      tipSelect.innerText = "Select a Tip Amount to Calculate";
      placeNewText("tipPctAmt", "");
      placeNewText("tipAmount", "");
      placeNewText("totalAmt", "");
      billAmt.focus();
    }
  }
}
function setNewValues(eleEnabled, strEnding) {
  document.getElementById("btn10").disabled = eleEnabled;
  document.getElementById("btn15").disabled = eleEnabled;
  document.getElementById("btn20").disabled = eleEnabled;
  placeNewText("billWoTip", strEnding);
}
function placeNewText(strEleName, strNewTxt) {
  var ele = document.getElementById(strEleName);
  let col_Idx = ele.innerText.indexOf(":");
  let newStrValue = ele.innerText.slice(0, col_Idx + 1) + strNewTxt;
  ele.innerText = newStrValue.tofixed(2);
}