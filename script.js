// Global Variables
const list = document.querySelector(".list");
const submitBtn = document.querySelector(".submit-btn");
const input = document.querySelector(".form-input");
const clearBtn = document.querySelector(".clear-btn");
const successMessageColor = "rgba(52, 235, 143, 0.4)";
const errorMessageColor = "rgba(255, 0, 0, 0.233)";

// This function shows a message to the user, wheter is an error message or a success message.
const showMessage = (message, color) => {
  const textNode = document.createTextNode(message);
  const paragraph = document.createElement("p");
  paragraph.appendChild(textNode);
  paragraph.style.backgroundColor = color;
  const messageContainer = document.querySelector(".message-container");
  messageContainer.appendChild(paragraph);
  setTimeout(() => {
    messageContainer.removeChild(paragraph);
  }, 1000);
};

// Show "Clear-All" Button
const showClearBtn = () => {
  clearBtn.style.display = "block";
};

// "Clear-All Button"
clearBtn.addEventListener("click", () => {
  list.innerHTML = "";
  clearBtn.style.display = "none";
  showMessage("Removed All Items", successMessageColor);
});

const addItemToLocalStorage = (id, text, paragraph) => {
  // if the 'list' exist, set 'items' equal to the list.
  // Otherwise, se 'items' equal to an empty array. This array is were each object, that
  // contains information about the task, will be added.
  const items = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];

  paragraph.id = id;

  const newItem = {
    id: id,
    text: text,
  };

  // Add new item to the list
  items.push(newItem);

  // Add the updated list to local storage
  localStorage.setItem("list", JSON.stringify(items));
};

const deleteItemFromLocalStorage = (id) => {
  const items = JSON.parse(localStorage.getItem("list"));
  items.forEach((item) => {
    if (item.id === id) {
      items.splice(items.indexOf(item), 1);
    }
  });

  // Add the updated list to local storage
  localStorage.setItem("list", JSON.stringify(items));
};

const editItemFromLocalStorage = (id, newText) => {
  const items = JSON.parse(localStorage.getItem("list"));
  items.forEach((item) => {
    if (item.id === id) {
      item.text = newText;
    }
  });

  // Add the updated list to local storage
  localStorage.setItem("list", JSON.stringify(items));
};

// Submit Button
submitBtn.addEventListener("click", () => {
  const text = input.value;
  if (text !== "") {
    const li = document.createElement("li");
    li.classList.add("list-item");
    list.appendChild(li);

    const p = document.createElement("p");
    p.classList.add("list-text");
    li.appendChild(p);

    const textNode = document.createTextNode(text);
    p.appendChild(textNode);

    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("list-icons");
    li.appendChild(iconsContainer);

    // Create item Id:
    const itemId = Date.now();

    // Create and store the edit icon in a variable. The edit icon is using the
    // "fas" and "fa-edit" classes from FONT AWESOME
    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit");

    // Edit button: Each time that the edit button is clicked, it will hide the submit button
    // and display the edit button, which listens to a click event that updates the textNode
    // value of the list item.
    editIcon.addEventListener("click", () => {
      // By this point, the content of input.value has been wiped out. Luckily, it
      // was saved in the "text" variable that was declared above. It can be used
      // to make the current input.value equal to the content of the element that
      // is sotored in the "text" variable.
      input.value = text;

      // Get the edit button
      const editBtn = document.querySelector(".edit-btn");

      editBtn.style.display = "block";
      submitBtn.style.display = "none";

      editBtn.addEventListener("click", () => {
        p.removeChild(textNode);
        const newText = input.value;
        p.appendChild(document.createTextNode(newText));
        input.value = "";
        editBtn.style.display = "none";
        submitBtn.style.display = "block";
        showMessage("List Item Edited Successfully", successMessageColor);
        // Edit item in local storage
        editItemFromLocalStorage(itemId, newText);
      });
    });

    // Add the edit icon to the HTML
    iconsContainer.appendChild(editIcon);

    // Create and store the delete icon in a variable. The delete icon is using the
    // "fas" and "fa-trash" classes from FONT AWESOME
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash");

    // Delete Button: Each time that the delete button is clicked, the li element that
    // the button belongs to, will be removed.
    deleteIcon.addEventListener("click", () => {
      list.removeChild(li);
      if (list.childNodes.length === 0) clearBtn.style.display = "none";
      showMessage("Item deteled from the list", successMessageColor);
      // Delete item from local storage
      deleteItemFromLocalStorage(itemId);
    });

    // Add the delete icon to the HTML
    iconsContainer.appendChild(deleteIcon);

    // Clean the input
    input.value = "";

    // Add new list item to local storage
    addItemToLocalStorage(itemId, text, p);

    // Show Success Message
    showMessage("Item Added Successfully", successMessageColor);

    // Show "Clear-All" Button
    if (list.childNodes.length >= 1) showClearBtn();
  } else {
    // Show Error Message
    showMessage("Please Enter Value", errorMessageColor);
  }
});
