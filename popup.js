const form = document.getElementById('avatarForm');
const list = document.getElementById('avatarList');

function renderList(map) {
  list.innerHTML = '';
  for (const user in map) {
    const li = document.createElement('li');
    li.textContent = `${user}: ${map[user]}`;
    list.appendChild(li);
  }
}

chrome.storage.local.get('avatarMap', data => {
  renderList(data.avatarMap || {});
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
