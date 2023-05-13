import { copy, showLinks, downloadFiles, element, svg, links, objURL } from './aux.js'

const app = document.getElementById('app')

let info = ''
fetch('../assets/json/files.json')

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
    <div class="block-main">`
  data.source[key].file.forEach((el,idx) => {
    info += element({
      id_level0: num-1, 
      id_level1: idx, 
      dir:'files',
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
    info += links({ dir:'files', key:key, el:el })
  });
  info += `
    </div>
  </div>
  
  `
    num++;
    }

  app.innerHTML = info

  document.querySelectorAll(".btn-copy")
  .forEach(el => {
    el.addEventListener("click", e => {

      // console.log(e.target.className)
      // let [urlFile, id_temp] = url(e)
      let urlFile = e.target.currentSrc
      let id_temp = e.target.offsetParent.id

      if(e.target.className.includes('audio')){
        urlFile = document.querySelector(`#${id_temp} audio source`).src
      }
      if(e.target.className.includes('video')){
        urlFile = document.querySelector(`#${id_temp} video source`).src
      }      

      let obj = {
        urlFile: urlFile,
        idCard: id_temp,
        idCopy: e.target.nextElementSibling.id
      }
      copy(obj)
    })
  });

  document.querySelectorAll(".btn-download")
  .forEach(el => {
    el.addEventListener("click", e => {
      downloadFiles('files', e.target.name)
    })
  });

  document.querySelectorAll(".btn-show-links")
  .forEach(el => {
    el.addEventListener("click", e => {
      showLinks(e.target.name)
    })
  });

}).catch(error => console.error(error));





// const [urlActual, url] = urls()


// console.log(urlActual)
// console.log(url)


// let info = ''
// fetch('files.json')
//   .then(response => response.json())
//   .then(data => {

//     info += `

//   <ol class="table-index">
//   <h2>Indice</h2>
//     `
//     for (key in data.source) {
//       info += `<li><a href="#${key}">${key}</a></li>`
//     }
//     info += `
//   </ol>`

//     let num = 1
//     for (key in data.source) {
//       info += `
//   <div id="${key}" class="block">
//     <div class="block-head">
//       <h2 class="block-title">${num}. ${key}</h2>
//       <button class="download" onclick="crearZip('${key}')">
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-zip" viewBox="0 0 16 16">
//           <path d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438V7.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438V7.5z"/>
//           <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
//         </svg>
//       </button>
//       <button class="show-links" onclick="showLinks('${key}')">
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
//           <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
//           <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
//         </svg>
//       </button>
//     </div>
//     <div class="block-main">`
//       data.source[key].file.forEach(el => {
//         const dimension = data.source[key]["dimension"]
//         info += element(url, key, dimension, el)
//       });
//       info += `
//     </div>
//     <div class="block-links hide" id="links-${key}">`
//       data.source[key].file.forEach(el => {
//         info += url+key+'/'+el+'<br>'
//       });
//       info += `
//     </div>
//   </div>`
//     num++;
//     }

//     app.innerHTML = info
//   })



// function element(url, key, dimension, el) {
//   // console.log(el)
//   let out = ``
//   let ext = key.split('-')[0]
//   if (['jpg', 'png', 'gif', 'svg', 'webp', 'favicon'].includes(ext)) {

//     let [el_temp, el_extra] = elem(el)

//     out = `
//     <div style="${el_extra}; width:${dimension[0]}px; height:${dimension[1]}px;" class="element-image" dir="${url}${key}/${el_temp}" onclick="copy(this)">
//       <img src="./source/${key}/${el_temp}" style="">  
//     </div>
//     `
  
//   }else if(['mp4'].includes(ext)){
//     out = `
//     <div class="element-video">
//       <video height="100%" width="100%" controls>
//         <source src="./source/${key}/${el}" type="video/${ext}">
//       </video>
//       <button class="btn-copy" dir="${url}${key}/${el}" onclick="copy(this)">${el}</button>
//     </div>
//     `
//   }else if(['mp3'].includes(ext)){

//     let [el_temp, el_extra] = elem(el)

//     out = `
//     <div class="element-audio">
//       <audio style="width:${dimension[0]}px; height:${dimension[1]}px;" controls>
//         <source src="./source/${key}/${el_temp}" type="audio/mpeg">
//         Your browser does not support the audio element.
//       </audio>
//       <button style="${el_extra}" class="btn-copy" dir="${url}${key}/${el_temp}" onclick="copy(this)">${el_temp}</button>
//     </div>
//     `

//   } else {
//     out = ``
//   }
//   return out

// }



// function copy(button) {
//   const valor = button.getAttribute("dir")
//   navigator.clipboard.writeText(valor)
//   // console.log(`El valor "${valor}" se ha copiado al portapapeles.`);
// }


// function showLinks(key) {
//   document.getElementById('links-'+key)
//     .classList.toggle("hide")
// }


// function elem(el) {
//   let el_temp  = ''
//   let el_extra  = ''
//   if (el.includes('/')) {
//     el_temp = el.split("/")[0]
//     el_extra = ` background-color: ${el.split("/")[1]}; `
//   }else{
//     el_temp = el
//     el_extra = ''
//   }
//   return [el_temp, el_extra]
// }











// function urls() {
//   let urlActual = window.location.href;
//   const indiceNombreArchivo = urlActual.lastIndexOf('/index.html');
//   if (indiceNombreArchivo !== -1) {
//     urlActual = urlActual.substring(0, indiceNombreArchivo);
//   }
  
  
//   let url = ''
//   let url_t = urlActual.charAt(urlActual.length - 1)!=='/'
//   const app = document.getElementById('app')
//   if(url_t){
//     urlActual = urlActual+'/'
//   }else{
//     urlActual = urlActual+''
//   }
//   url = urlActual+'source/'

//   return [urlActual, url]
// }
