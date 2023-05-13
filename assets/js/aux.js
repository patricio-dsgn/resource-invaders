export function urlRoot() {
  let currentUrl = window.location.href
  let urlParts = currentUrl.split('/')
  urlParts.pop()
  urlParts.pop()
  let newUrl = urlParts.join('/')
  return newUrl
}


export function objURL(e) {
  
}

export function copy({urlFile:urlFile, idCard:idCard, idCopy:idCopy}) {

  navigator.clipboard.writeText(urlFile)

  document.getElementById(idCopy)
    .classList.toggle('fade')
  
  setTimeout(() => {
    document.getElementById(idCopy)
      .classList.toggle('fade')
  }, 1200);
}




export function links({dir:dir,key:key,el:el}) {
  let out = ``
  let ori = window.location.origin
  if (ori.charAt(ori.length - 1) === '/') {
    ori = ori.slice(0, -1);
  }
  let url = `${ori}/assets/source/${dir}/${key}/`
  if(el.includes('/')){
    out = `${url}${el.split('/')[0]}<br/>`
  }else{
    out = `${url}${el}<br/>`
  }
  return out
}



export function element({
  id_level0:id_level0, id_level1:id_level1,
  dir:dir, key:key, el:el,
  dimension:dimension, type:type}) {

  let el_ori = el
  let out = ''
  let ext = ''
  let color = ''

  if(el.includes('/')){
    el = el.split('/')[0]
    color = el_ori.split('/')[1]
  }
  if(el.includes('.')){
    ext = el.split('/')[0].split('.')[1]
  }

  // console.table({
  //     el_ori:    el_ori,
  //     el:        el,
  //     ext:       ext,
  //     color:     color,
  //     dir:       dir,
  //     key:       key,
  //     el:        el,
  //     dimension: dimension,
  //     type:      type
  //   })

  let style = ''
  if(color !== '') {
    style = ` background-color:${color}; `    
  }
  if (['jpg', 'png', 'gif', 'svg', 'webp', 'ico'].includes(ext)) {
    out = `
    <div
      id="ident${id_level0}-${id_level1}"
      style="${style}width:${dimension[0]}px;height:${dimension[1]}px;"
      class="element-image btn-copy">
      <img src="../assets/source/${dir}/${key}/${el}">  
      <div id="tip${id_level0}-${id_level1}" class="tip-copy">copiado</div>
    </div>
    `
  }else if(ext==='mp4'){
    out = `
    <div class="element-video"
      style="${style}"
      id="ident${id_level0}-${id_level1}">
      <video height="100%" width="100%" controls>
        <source src="../assets/source/${dir}/${key}/${el}" type="video/mp4">
      </video>
      <button class="btn-video btn-copy"
              dir="../assets/source/${dir}/${key}/${el}">${el}
      </button>
      <div id="tip${id_level0}-${id_level1}" class="tip-copy">copiado</div>
    </div>
    `
  }else if(ext==='mp3'){
    out = `
    <div class="element-audio"
    style="${style}"
      id="ident${id_level0}-${id_level1}">
      <audio style="width:${dimension[0]}px; height:${dimension[1]}px;" controls>
        <source src="../assets/source/${dir}/${key}/${el}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <button class="btn-audio btn-copy"
              dir="../assets/source/${dir}/${key}/${el}">${el}
      </button>
      <div id="tip${id_level0}-${id_level1}" class="tip-copy">copiado</div>
    </div>
    `
  }

    // dir="${1}${key}/${el.split("/")[0]}"
  // let way = `<img style="width: ${dimension[0]}, heigth: ${dimension[1]};" class="btn-copy" src="../assets/source/${dir}/${key}/${el}" loading="lazy">`

  return out
}

export function svg(svg) {
  let out = ''
  if(svg==='download'){
    out = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-zip" viewBox="0 0 16 16">
      <path d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438V7.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438V7.5z"/>
      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
    </svg>`
  }else if(svg==='link'){
    out = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
    </svg>`
  }
  return out
}





































export function showLinks(key) {
  // console.log(e)
  document.getElementById('links-'+key)
    .classList.toggle("hide")
}

export function downloadFiles(dir,key) {
  // console.log(dir,key)
  // document.getElementById('links-'+key)
  //   .classList.toggle("hide")
  // crearZip(dir,key)

  
  crearZip(dir,key)
}


async function crearZip(dir,key) {  


  
  const zip = new JSZip();
  const list = await fetch(`../assets/json/${dir}.json`)
    .then(response => response.json())
    .then(data => data)
  const listFiles = list['source'][key]['file']
  await listFiles.forEach(el => {
    if(el.includes('/')){ el = el.split('/')[0] }  
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


