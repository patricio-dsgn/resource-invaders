import { copy } from './aux.js'

const app = document.getElementById('app')
const searchInput = document.getElementById('search-input')


fetch('../assets/json/brands.json')
  .then(response => response.json())
  .then(data => {

    for (let i = 0; i < data.source.length; i++) {
      let idElement = 'ident' + i
      let idTip = 'tip' + i
      const tempDiv = document.createElement("div");
      tempDiv.classList.add('card-brand', 'show-card');
      tempDiv.setAttribute('id', idElement);
      tempDiv.innerHTML = `
        <img class="btn-copy" src="../assets/source/brands/${data.source[i]}" loading="lazy">
        <div id="${idTip}" class="tip-copy">copiado</div>
        <p>${data.source[i].split('.')[0]}</p>
        `;
      app.insertAdjacentElement("beforeEnd", tempDiv);
    }

    const btnsCopy = document.querySelectorAll('.btn-copy')
    btnsCopy.forEach(el => {
      el.addEventListener('click', e => {
        let obj = {
          urlFile: e.target.currentSrc,
          idCard: e.target.offsetParent.id,
          idCopy: e.target.nextElementSibling.id
        }
        copy(obj)
      })
    })

    searchInput.addEventListener('input', (e) => {
      const search = e.target.value
      data.source.forEach((el, idx) => {
        let c = document.getElementById('ident' + idx)
        if (el.search(search) !== -1) {
          c.classList.remove("hide-card-brand");
          c.classList.add("show-card-brand");
        } else if (search === '') {
          c.classList.remove("hide-card-brand");
          c.classList.add("show-card-brand");
        } else {
          c.classList.remove("show-card-brand");
          c.classList.add("hide-card-brand");
        }
      })
    })

  }).catch(error => console.error(error));