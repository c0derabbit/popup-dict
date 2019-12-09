const gtranslateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx`;

document.addEventListener('dblclick', translate);
document.addEventListener('mouseup', translate);

function translate() {
  const selection = window.getSelection();
  const search = selection.toString();

  if (search.length > 0) {
    const url = `${gtranslateUrl}&sl=auto&tl=en&dt=t&q=${encodeURI(search)}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const translation = data[0][0][0];
        const detectedLang = data[2];

        showPopup({ selection, translation, detectedLang });
      });
  }
}

const popupStyle = {
  position: 'absolute',
  zIndex: 9999999,
  background: 'white',
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '4px 8px',
  background: '#f8fafa',
};

function showPopup({ selection, translation, detectedLang }) {
  try {
    const { parentNode } = selection.baseNode;
    const popup = document.createElement('div');
    Object.entries(popupStyle).forEach(([prop, value]) => {
      popup.style[prop] = value;
    });
    popup.innerText = `${translation} (${detectedLang.toUpperCase()})`;

    parentNode.appendChild(popup);

    window.addEventListener('click', () => { removeChildFromParent(popup, parentNode) });
  } catch (e) { }
}

function removeChildFromParent(child, parentNode) {
  if (parentNode) {
    try {
      parentNode.removeChild(child);
    } catch (e) { }
  }
}
