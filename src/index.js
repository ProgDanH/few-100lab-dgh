import './styles.css';
billAmt.onkeydown = billAmt.onkeyup = handle;
btn10.onclick = btn15.onclick = btn20.onclick = calcTip;
btnClr.onclick = resetPg;

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
  placeNewText("tipAmount", " $" + numTipAmt.toFixed(2));
  placeNewText("totalAmt", " $" + numTotAmt.toFixed(2));
  billAmt.focus();
}
/* let timerId = setTimeout(function tick() {
  // do something
  timerId = setTimeout(tick, 500);
}, 500); 
 */
function insertAmount(e, blnInsert = true) {
  if (e.keyCode == 13 && billAmt.value.length > 0) {
    setNewValues(false, " $" + parseFloat(billAmt.value).toFixed(2));
    return;
  }
  let prdIdx = billAmt.value.indexOf(".");
  console.log("Inserting was "+ blnInsert + " and  decimal = "+ prdIdx);
  if (prdIdx != -1) {
    // Found  .
    if (blnInsert) {
      if (billAmt.value.length == prdIdx + 3) {
        setNewValues(false, " $" + parseFloat(billAmt.value).toFixed(2));
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
  ele.innerText = newStrValue;
}
function resetPg() {
  setNewValues(true, "");
  tipSelect.innerText = "Select a Tip Amount to Calculate";
  placeNewText("tipPctAmt", "");
  placeNewText("tipAmount", "");
  placeNewText("totalAmt", "");
  billAmt.value = "";
  billAmt.focus();
  numLastLen = 0;
}