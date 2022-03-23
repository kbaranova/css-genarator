"use strict";
// Section change

function changeSection(btn, content, code) {
  var navBtn = Array.from(document.querySelectorAll(btn));
  var content = Array.from(document.querySelectorAll(content));
  var codeResult = Array.from(document.querySelectorAll(code));
  navBtn.forEach((el) =>
    el.addEventListener("click", function () {
      codeResult.textContent = "";
      navBtn.forEach((siblings) => {
        siblings.classList.remove("active");
      });
      var indexOfBtn = navBtn.indexOf(this);
      var newBtn = content.map((cont, index) => {
        if (indexOfBtn === index) {
          content.forEach((x) => {
            x.classList.remove("active");
          });
          cont.classList.add("active");
        }
      });
      var newCode = codeResult.map((cont, index) => {
        if (indexOfBtn === index) {
          codeResult.forEach((x) => {
            x.classList.remove("active");
          });
          cont.classList.add("active");
        }
      });
      this.classList.add("active");
    })
  );
}
changeSection(".navSection", ".content", ".absolute");

// Gradient generator

var degrees = document.querySelector("#degrees");
var colorBtn = document.querySelector(".addNewColor");
var color1 = document.querySelector("#color1");
var color2 = document.querySelector("#color2");
var removeColorBtn = document.querySelector(".removeColor");
var wrapper = document.getElementById("colorWrapper");
var codeGradient = document.querySelector(".codeGradient");
removeColorBtn.disabled = true;
colorBtn.disabled = false;

function addColor() {
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  var maxColors = 5;
  var currentColors = wrapper.children.length + 1;
  if (currentColors <= maxColors) {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "color");
    x.setAttribute("value", randomColor);
    x.setAttribute("class", "colorInput");
    wrapper.appendChild(x);
    x.addEventListener("input", setGradient);
    removeColorBtn.disabled = false;
    colorBtn.disabled = false;
    setGradient();
  }
  if (currentColors === maxColors) {
    colorBtn.disabled = true;
  }
}
function removeColor() {
  if (wrapper.children.length > 2) {
    wrapper.lastElementChild.remove();
    colorBtn.disabled = false;
  }
  if (wrapper.children.length < 3) {
    removeColorBtn.disabled = true;
  }
  setGradient();
}

function setGradient() {
  var bgColor = document.getElementById("bgColor");
  var colors = Array.from(document.querySelectorAll(".colorInput"));
  var colorInput = "";
  colors.map((color) => (colorInput += ", " + color.value));
  bgColor.style.background =
    "linear-gradient(" + degrees.value + "deg  " + colorInput + ")";
  bgColor.style.backgroundAttachment = "fixed";

  codeGradient.textContent = "background: " + bgColor.style.background + ";";
}
degrees.addEventListener("input", setGradient);
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);

// Button Design
function changeButton() {
  var button = document.querySelector(".designBtn");
  var textBtn = document.querySelector(".textBtn");
  var padLeft = document.querySelector(".paddingLeft");
  var padRight = document.querySelector(".paddingRight");
  var padTop = document.querySelector(".paddingTop");
  var padBottom = document.querySelector(".paddingBottom");
  var colorBtnText = document.querySelector(".colorBtnText");
  var textBtnSize = document.querySelector(".fontBtn");
  var radioButtons = document.querySelectorAll('input[name="radio"]');
  var gradientColor1 = document.querySelector(".firstBtnColor");
  var gradientColor2 = document.querySelector(".secondBtnColor");
  var degBtn = document.querySelector("#degBtn");
  var solidBtn = document.querySelector(".colorBtn");
  var optBorder = document.querySelector(".optionBorder");
  var colorBorder = document.querySelector(".colorBtnBorder");
  var radBorder = document.querySelector(".borderRadiusBtn");
  var thickBorder = document.querySelector(".borderThickBtn");
  var borderStyle = document.querySelector("#borderStyle");
  var optShadow = document.querySelector(".optionShadow");
  var colorShadow = document.querySelector(".colorBtnShadow");
  var spreadShadow = document.querySelector(".shadowSpreadBtn");
  var offsetX = document.querySelector(".topShadowBtn");
  var offsetY = document.querySelector(".leftShadowBtn");
  var codeButton = document.querySelector(".codeButton");

  function changeButtonCode() {
    var output = {
      padding:
        padTop.value +
        "px " +
        padRight.value +
        "px " +
        padBottom.value +
        "px " +
        padLeft.value +
        "px",
      color: colorBtnText.value,
      "font-size": textBtnSize.value + "px",
    };
    var checked = document.querySelector('input[name="radio"]:checked');
    if (checked.className === "option1") {
      output["background"] =
        "linear-gradient(" +
        degBtn.value +
        "deg, " +
        gradientColor1.value +
        ", " +
        gradientColor2.value +
        ")";
    } else if (checked.className === "option2") {
      output["background-color"] = button.style.backgroundColor;
    } else if (checked.className === "option3") {
      output["background-color"] = "transparent";
    }

    if (optShadow.checked === true) {
      output["box-shadow"] =
        "" +
        offsetX.value +
        "px " +
        offsetY.value +
        "px " +
        spreadShadow.value +
        "px " +
        colorShadow.value +
        "";
    } else {
      delete output["box-shadow"];
    }

    if (optBorder.checked) {
      output["border"] =
        "" +
        thickBorder.value +
        "px " +
        borderStyle.value +
        " " +
        colorBorder.value +
        "";
      output["border-radius"] = radBorder.value + "px";
    } else {
      delete output["border"];
      delete output["border-radius"];
    }

    codeButton.innerHTML = "";
    for (const [key, value] of Object.entries(output)) {
      codeButton.innerHTML += `${key}: ${value};\n`;
    }
    codeButton.append(" ");
  }

  function disableInput(arr, cond) {
    if (cond) {
      arr.forEach((x) => {
        x.disabled = true;
      });
    } else {
      arr.forEach((x) => {
        x.disabled = false;
      });
    }
  }

  textBtn.addEventListener("input", function (e) {
    button.innerHTML = e.target.value;
  });

  function changePadding() {
    button.style.padding =
      padTop.value +
      "px " +
      padRight.value +
      "px " +
      padBottom.value +
      "px " +
      padLeft.value +
      "px";
    changeButtonCode();
  }
  changePadding();
  padLeft.addEventListener("input", changePadding);
  padRight.addEventListener("input", changePadding);
  padTop.addEventListener("input", changePadding);
  padBottom.addEventListener("input", changePadding);

  colorBtnText.addEventListener("input", function () {
    button.style.color = colorBtnText.value;
    changeButtonCode();
  });
  textBtnSize.addEventListener("input", function () {
    button.style.fontSize = textBtnSize.value + "px";
    changeButtonCode();
  });
  function changeGradientBtn() {
    button.style.background =
      "linear-gradient(" +
      degBtn.value +
      "deg,  " +
      gradientColor1.value +
      "," +
      gradientColor2.value +
      ")";
    changeButtonCode();
  }
  function changeSolidBtn() {
    button.style.backgroundColor = solidBtn.value;
    changeButtonCode();
  }
  gradientColor1.addEventListener("input", changeGradientBtn);
  gradientColor2.addEventListener("input", changeGradientBtn);
  degBtn.addEventListener("input", changeGradientBtn);
  changeGradientBtn();
  disableInput([solidBtn], true);

  for (var el of radioButtons) {
    el.addEventListener("change", function () {
      if (this.checked) {
        if (this.className === "option1") {
          button.style.backgroundColor = null;
          changeGradientBtn();
          disableInput([solidBtn], true);
          disableInput([degBtn, gradientColor1, gradientColor2], false);
        } else if (this.className === "option2") {
          button.style.background = null;
          changeSolidBtn();
          disableInput([degBtn, gradientColor1, gradientColor2], true);
          disableInput([solidBtn], false);
          solidBtn.addEventListener("input", changeSolidBtn);
        } else if (this.className === "option3") {
          button.style.background = null;
          button.style.backgroundColor = "transparent";
          changeButtonCode();
          disableInput(
            [solidBtn, degBtn, gradientColor1, gradientColor2],
            true
          );
        }
      }
    });
  }
  function changeBorder() {
    button.style.border =
      "" +
      thickBorder.value +
      "px " +
      borderStyle.value +
      " " +
      colorBorder.value +
      "";
    button.style.borderRadius = radBorder.value + "px";
    changeButtonCode();
  }
  thickBorder.addEventListener("input", changeBorder);
  colorBorder.addEventListener("input", changeBorder);
  radBorder.addEventListener("input", changeBorder);
  changeBorder();

  optBorder.addEventListener("change", function () {
    if (optBorder.checked) {
      changeBorder();
      disableInput([thickBorder, colorBorder, radBorder], false);
    } else {
      button.style.border = "none";
      changeButtonCode();
      disableInput([thickBorder, colorBorder, radBorder], true);
    }
  });

  borderStyle.addEventListener("change", function () {
    if (borderStyle.options[borderStyle.selectedIndex].value === "solid") {
      button.style.borderStyle = "solid";
    } else if (
      borderStyle.options[borderStyle.selectedIndex].value === "dotted"
    ) {
      button.style.borderStyle = "dotted";
    } else if (
      borderStyle.options[borderStyle.selectedIndex].value === "dashed"
    ) {
      button.style.borderStyle = "dashed";
    } else if (
      borderStyle.options[borderStyle.selectedIndex].value === "groove"
    ) {
      button.style.borderStyle = "groove";
    } else if (
      borderStyle.options[borderStyle.selectedIndex].value === "ridge"
    ) {
      button.style.borderStyle = "ridge";
    } else if (
      borderStyle.options[borderStyle.selectedIndex].value === "double"
    ) {
      button.style.borderStyle = "double";
    } else if (
      borderStyle.options[borderStyle.selectedIndex].value === "inset"
    ) {
      button.style.borderStyle = "inset";
    } else if (
      borderStyle.options[borderStyle.selectedIndex].value === "outset"
    ) {
      button.style.borderStyle = "outset";
    }
    changeButtonCode();
  });

  function changeShadow() {
    button.style.boxShadow =
      "" +
      offsetX.value +
      "px " +
      offsetY.value +
      "px " +
      spreadShadow.value +
      "px " +
      colorShadow.value +
      "";
    changeButtonCode();
  }

  disableInput([spreadShadow, colorShadow, offsetX, offsetY], true);

  optShadow.addEventListener("change", function () {
    if (optShadow.checked) {
      changeShadow();
      spreadShadow.addEventListener("input", changeShadow);
      colorShadow.addEventListener("input", changeShadow);
      offsetX.addEventListener("input", changeShadow);
      offsetY.addEventListener("input", changeShadow);
      disableInput([spreadShadow, colorShadow, offsetX, offsetY], false);
    } else {
      button.style.boxShadow = "none";
      disableInput([spreadShadow, colorShadow, offsetX, offsetY], true);
      changeButtonCode();
    }
  });
}
changeButton();

function changeText() {
  var p = document.querySelector(".pChange");
  var textColor = document.querySelector(".txtColor");
  var lineHeight = document.querySelector(".txtLineHeight");
  var letterSpacing = document.querySelector(".txtSpacing");
  var wordSpacing = document.querySelector(".wordSpacing");
  var textAlign = document.querySelector("#textAlign");
  var textTransform = document.querySelector("#textTransform");
  var textDecoration = document.querySelector("#textDecoration");
  var codeText = document.querySelector(".codeText");

  function changeTextCode() {
    codeText.innerHTML =
      "color: " +
      textColor.value +
      ";<br/>line-height: " +
      lineHeight.value +
      ";<br/>letter-spacing: " +
      letterSpacing.value +
      "px;<br/>word-spacing: " +
      wordSpacing.value +
      "px;<br/>text-align: " +
      textAlign.value +
      ";<br/>text-transform: " +
      textTransform.value +
      ";<br/>text-decoration: " +
      textDecoration.value +
      ";<br/><br/>";
  }
  changeTextCode();

  textColor.addEventListener("input", function () {
    p.style.color = textColor.value;
    changeTextCode();
  });

  lineHeight.addEventListener("input", function () {
    p.style.lineHeight = lineHeight.value;
    changeTextCode();
  });

  letterSpacing.addEventListener("input", function () {
    p.style.letterSpacing = letterSpacing.value + "px";
    changeTextCode();
  });

  wordSpacing.addEventListener("input", function () {
    p.style.wordSpacing = wordSpacing.value + "px";
    changeTextCode();
  });

  textAlign.addEventListener("change", function () {
    if (textAlign.options[textAlign.selectedIndex].value === "center") {
      p.style.textAlign = "center";
    } else if (textAlign.options[textAlign.selectedIndex].value === "left") {
      p.style.textAlign = "left";
    } else if (textAlign.options[textAlign.selectedIndex].value === "right") {
      p.style.textAlign = "right";
    } else if (textAlign.options[textAlign.selectedIndex].value === "justify") {
      p.style.textAlign = "justify";
    }
    changeTextCode();
  });

  textTransform.addEventListener("change", function () {
    if (textTransform.options[textTransform.selectedIndex].value === "none") {
      p.style.textTransform = "none";
    } else if (
      textTransform.options[textTransform.selectedIndex].value === "capitalize"
    ) {
      p.style.textTransform = "capitalize";
    } else if (
      textTransform.options[textTransform.selectedIndex].value === "uppercase"
    ) {
      p.style.textTransform = "uppercase";
    } else if (
      textTransform.options[textTransform.selectedIndex].value === "lowercase"
    ) {
      p.style.textTransform = "lowercase";
    }
    changeTextCode();
  });

  textDecoration.addEventListener("change", function () {
    if (textDecoration.options[textDecoration.selectedIndex].value === "none") {
      p.style.textDecoration = "none";
    } else if (
      textDecoration.options[textDecoration.selectedIndex].value === "underline"
    ) {
      p.style.textDecoration = "underline";
    } else if (
      textDecoration.options[textDecoration.selectedIndex].value === "overline"
    ) {
      p.style.textDecoration = "overline";
    } else if (
      textDecoration.options[textDecoration.selectedIndex].value ===
      "lineThrough"
    ) {
      p.style.textDecoration = "line-through";
    }
    changeTextCode();
  });
}

changeText();

// Range Design
const rangeInputs = document.querySelectorAll('input[type="range"]');

function handleInputChange(e) {
  let target = e.target;
  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

rangeInputs.forEach((input) => {
  var min = input.min;
  var max = input.max;
  var val = input.value;
  input.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
  input.addEventListener("input", function () {
    val = input.value;
    input.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
  });
});

// copy button

var copyBtn = document.querySelector(".copy");
var copyCode = document.querySelector(".absolute");
copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(copyCode.textContent);
});
