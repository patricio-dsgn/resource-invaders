import { copy, links, showLinks, downloadFiles, element, svg } from './aux.js'

const app = document.getElementById('app')

let info = ''
fetch('../assets/json/icons.json')

  .then(response => response.json())
  .then(data => {

    info += `<ol class="table-index">`
    info += `<h2>Indice</h2>`
    for (let key in data.source) {
      info += `<li><a href="#${key}">${key}</a></li>`
    }
    info += `</ol>`

    let num = 1
    for (let key in data.source) {
      info += `
  <div id="${key}" class="block">
    <div class="block-head">
      <h2 class="block-title">${num}. ${key}</h2>
      <button class="btn-download" name="${key}">
      ${svg('download')}
      </button>
      <button class="btn-show-links" name="${key}">
      ${svg('link')}
      </button>
    </div>
  </div>
  <div class="block-main">`
  data.source[key].file.forEach((el,idx) => {
    info += element({
      id_level0: num-1, 
      id_level1: idx, 
      dir:'icons',
      key:key,
      el:el ,
      dimension: data.source[key]["dimension"],
      type: data.source[key]["type"]
    })
  });
  info += `
  </div>
  <div class="block-links hide" id="links-${key}">`
  data.source[key].file.forEach(el => {
    let obj = { dir:'files', key:key, el:el }
    info += links(obj)
  });
  info += `
  </div>
  `
    num++;
    }

  app.innerHTML = info

  document.querySelectorAll(".btn-copy")
  .forEach(el => {
    el.addEventListener("click", e => {
      // console.log(e.target.currentSrc)
      // console.log(e.target.offsetParent.id)
      // console.log(e.target.nextElementSibling.id)
      let obj = {
        urlFile: e.target.currentSrc,
        idCard: e.target.offsetParent.id,
        idCopy: e.target.nextElementSibling.id
      }
      copy(obj)
    })
  });

  document.querySelectorAll(".btn-download")
  .forEach(el => {
    el.addEventListener("click", e => {
      downloadFiles('icons', e.target.name)
    })
  });

  document.querySelectorAll(".btn-show-links")
  .forEach(el => {
    el.addEventListener("click", e => {
      showLinks(e.target.name)
    })
  });

}).catch(error => console.error(error));









async function crearZip(dir,key) {
  
  const zip = new JSZip();

  const list = await fetch(`../assets/json/${dir}.json`)
    .then(response => response.json())
    .then(data => data)
  
  const listFiles = list['source'][key]['file']

  await listFiles.forEach(el => {
    const temp = fetch(`../assets/source/${dir}/${key}/${el}`)
      .then(response => response.arrayBuffer());
    zip.file(el, temp);
  });

  const content = await zip.generateAsync({ type: "blob" });

  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(content);
  enlace.download = `backpack-${key}.zip`;
  enlace.click();
}

// crearZip('icons','svg-logo-web')