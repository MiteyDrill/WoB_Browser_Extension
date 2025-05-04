const form = document.getElementById('avatarForm');
const list = document.getElementById('avatarList');

function removeItemFromStorageAndUI(id, btn) {
  chrome.storage.local.get("avatarMap", (data) => {
    const items = data.avatarMap || {};
    delete items[id]
    console.log(`${id} has been removed.`);

    chrome.storage.local.set({ avatarMap: items }, () => {
      // DOM update after save
      const li = btn.closest("li");
      if (li) li.remove();
    });

    //re-render list
    chrome.storage.local.get('avatarMap', data => {
      renderList(data.avatarMap || {});
      addDeleteButtonFunctionality();
    });

    //TODO: Refresh Page
  });
}

function addDeleteButtonFunctionality(){
  const buttons = list.querySelectorAll("a");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.dataset.id = btn.id;
      removeItemFromStorageAndUI(id, btn);
    });
  });
}

function renderList(map) {
  list.innerHTML = '';
  for (const user in map) {

    // List Item Element
    const li = document.createElement('li');
    li.textContent = `${user}: ${map[user]}`;
    li.id = user;
    list.appendChild(li);

    // Button Icon Element
    const deleteButton = document.createElement('a');
    deleteButton.textContent = "remove";
    deleteButton.style.color = "red";
    deleteButton.href = '#';    
    deleteButton.id = user; //associated User List Item

    list.appendChild(deleteButton);
  }
}

chrome.storage.local.get('avatarMap', data => {
  renderList(data.avatarMap || {});
  addDeleteButtonFunctionality();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  const url = document.getElementById('imageUrl').value.trim();
  if (!user || !url) return;

  chrome.storage.local.get('avatarMap', data => {
    const map = data.avatarMap || {};
    map[user] = url;
    chrome.storage.local.set({ avatarMap: map }, () => {
      renderList(map);
      form.reset();
    });
  });
});
