window.addEventListener("load", () => {
  chrome.storage.local.get("avatarMap", ({ avatarMap }) => {
    if (!avatarMap) return;

    function addAvatars(root = document.body) {
      root.querySelectorAll(".chatUsername").forEach(el => {
        const user = el.textContent.trim();
        if (avatarMap[user] && !el.querySelector("img")) {
          // const img = document.createElement("img");
          // img.src = avatarMap[user];
          // img.alt = user;
          // img.style.width = "90px";
          // img.style.height = "90px";
          // img.style.marginRight = "5px";
          // el.prepend(img);

          el.style.backgroundColor = 'rgba(255,255,255, 0.1)';
          el.style.padding = '0px 10px';
          el.style.border = 'solid 1px gray';
          el.style.borderRadius = '5px';
          
        let firstParent = el.parentElement;
        let secondParent = firstParent.parentElement;

        
        secondParent.style.backgroundSize = 'cover';
        secondParent.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        secondParent.style.backgroundBlendMode = 'darken';
        secondParent.style.backgroundImage = `url(${avatarMap[user]})`;
        }

      });
    }

    // Initial run
    addAvatars();

    // Watch for DOM changes
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // element
            addAvatars(node);
          }
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    console.log("Chat Avatar Injector Started");
  });
});
