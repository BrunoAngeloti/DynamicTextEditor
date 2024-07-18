document
  .getElementById("commandInput")
  .addEventListener("keyup", function (event) {
    const input = event.target;
    const modal = document.getElementById("modal");

    if (input.value.startsWith("/")) {
      modal.style.display = "block";
      modal.style.top = input.offsetTop + input.offsetHeight + "px";
      filterCommands(input.value);
    } else {
      modal.style.display = "none";
    }

    if (event.key === "Escape") {
      modal.style.display = "none";
      input.value = "";
    }

    if (event.key === "Enter") {
      modal.style.display = "none";
      if (input.value.trim() === "/1") {
        replaceInputWithElement("h1", input.value.slice(3).trim());
        input.value = "";
        input.setAttribute(
          "placeholder",
          "Type / for blocks, @ to link docs or people"
        );
      } else if (input.value.startsWith("/1 ")) {
        replaceInputWithElement("h1", input.value.slice(3).trim());
        input.value = "";
        input.setAttribute(
          "placeholder",
          "Type / for blocks, @ to link docs or people"
        );
      } else {
        replaceInputWithElement("p", input.value);
        input.value = "";
      }
    }
  });

document.querySelectorAll("#modal li").forEach((item) => {
  item.addEventListener("click", function () {
    applyCommand(this.dataset.command);
    document.getElementById("modal").style.display = "none";
    document.getElementById("commandInput").focus();
  });
});

function replaceInputWithElement(tagName, text) {
  const element = document.createElement(tagName);
  if (text.trim() === "" && tagName === "h1") {
    element.textContent = "Heading 1";
    element.classList.add("placeholder");
  } else if (text.trim() === "" && tagName === "p") {
    element.textContent = "Type here";
    element.classList.add("placeholder");
  } else {
    element.textContent = text;
  }
  element.contentEditable = true;
  element.addEventListener("focus", function () {
    if (this.classList.contains("placeholder")) {
      this.textContent = "";
      this.classList.remove("placeholder");
    }
  });
  element.addEventListener("blur", function () {
    if (this.textContent.trim() === "" && tagName === "h1") {
      this.textContent = "Heading 1";
      this.classList.add("placeholder");
    } else if (this.textContent.trim() === "" && tagName === "p") {
      this.textContent = "Type here";
      this.classList.add("placeholder");
    }
  });
  document.getElementById("contentArea").appendChild(element);
}

function applyCommand(command) {
  if (command === "h1") {
    replaceInputWithElement("h1", "");
    document
      .getElementById("commandInput")
      .setAttribute("placeholder", "Heading 1");
  }
}

function filterCommands(input) {
  const query = input.slice(1).trim().toLowerCase();
  const allCommands = document.querySelectorAll("#modal li");
  allCommands.forEach((cmd) => {
    cmd.style.display = cmd.textContent.toLowerCase().includes(query)
      ? "block"
      : "none";
  });
}
