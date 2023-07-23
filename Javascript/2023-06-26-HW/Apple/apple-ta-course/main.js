let shopData = {}
let selectedModel, selectedColor, selectedStorage

window.onload = function () {
    fetch('./data/shop-category.json')
        .then(response=>response.json())
        .then(data=>{
            // data=陣列包物件

            // !預計動態生成此區塊，讓品項可以變多
            // 取得商店列表並渲染成商店分類清單
            // use fetch()......
            renderingCategory(data)
            return fetchMerchandise(data[0].dataUrl)
        })
        .then(shop=>{
            renderingShop(shop)
        })

    //TODO: 取得預設的商品並渲染出來(第一筆資料)


}

/**
 * 取得商店商品資料 => //TODO: Click事件:點擊之後要切換商品內容
 * @param {String} url 
 * @returns {Promise} Merchandise
 */
function fetchMerchandise(url) {
    return fetch(url)
        .then(response => response.json())
}

/**
 * 渲染商店內分類列表
 * @param {Array} categoryArray 
 */
function renderingCategory(categoryArray) {
    categoryArray.forEach(item =>{
        const ul = document.getElementById('category_list')
        //原生寫法
        const li = document.createElement('li')
        li.classList.add('nav-item')
        const button = document.createElement('button')
        button.classList.add('nav-link')
        button.setAttribute('aria-current','page')
        button.textContent = item.title
        // li.append(button)
        // ul.append(li)
        // ?寫法一
        // button.onclick =function(){
        //     fetchMerchandise(item.dataUrl)
        //     .then(data=>{
        //         // data=產品資料
        //     })
        // }
        // ?寫法二 =>
        button.onclick = async function(){
            try{
            const data = await fetchMerchandise(item.dataUrl)
            renderingShop(data)
        }catch(error){
            console.warn(error)
        }
                // data=產品資料
        }
        li.append(button)
        ul.append(li)
        
        // 原a標籤改成button，保留class
        // ul.innerHTML += `<li class="nav-item">
        //          <button class="nav-link" aria-current="page">${item.title}</button>
        //      </li>`

    })
    // html的樣子
    // `<ul>
    //     <li class="nav-item">
    //         <button class="nav-link" aria-current="page">商品項目1</button>
    //     </li>
    //     <li class="nav-item">
    //         <button class="nav-link" aria-current="page">商品項目2</button>
    //     </li>
    //     <li class="nav-item">
    //         <button class="nav-link" aria-current="page">商品項目3</button>
    //     </li>
    // </ul>`

    //TODO: Click事件:點擊之後要切換商品內容


}


/**
 * 渲染商店內商品
 * @param {*} shop 
 */
function renderingShop(merchandise) {
    // 全域
    shopData = merchandise
    //TODO: 計算最少需多少$
    const priceList = merchandise.specifications.map(spec=>spec.price)
    console.log(priceList);
    const minPrice = Math.min(...priceList)
    // console(minPirce);
    //TODO: 產出標題區塊
    // (title,function)
    createTitleArea(merchandise.title,minPrice)
    //TODO: 產出主圖區塊
    const defaultImgs = Object.values(merchandise.images)[0]
    // console.log(defaultImgs);
    createCarousel(defaultImgs)


    //TODO: 商品客製化選擇組件
    let widgetHTML = ''
    merchandise.widgets.forEach(widget => {
        
        widgetHTML += createWidgetHTML(widget)
    })

    document.querySelector('.spec-widget').innerHTML = widgetHTML

    document.querySelector('.qna-area').classList.remove('d-none')
    document.querySelector('footer').classList.remove('d-none')
}

/**
 * 產出商品標題區塊
 * @param {String} title 
 * @param {Number} price 
 */
function createTitleArea(title, price) {
    const titleArea = document.querySelector('.title-area')
    //TODO: 加入h1及金額 NT$ xxx起
    titleArea.innerHTML=`  <h1>購買 ${title}</h1><div class="total-price">NT$${price.toLocaleString()}起</div>`

}

/**
 * 產出主圖區塊Carousel
 * @param {String[]} images 
 */
function createCarousel(images) {
    const mainImgArea = document.querySelector('.main-img-area')
    //TODO:
    // 依據數量指標不同，長出不同圖，第一個class是active
    const carouselIndicatorsHTML = createCarouselIndicatorsHTML(images)
    //TODO:
    // 依據圖片src不同
    const carouselInnerHTML = createCarouselHTML(images)

    //TODO: 整體幻燈片HTML
    mainImgArea.innerHTML = `<div id="carouselExampleAutoplaying" class="carousel slide  sticky-top" data-bs-ride="carousel">
    <div class="carousel-indicators">
    ${carouselIndicatorsHTML}</div>
    <div class="carousel-inner">
        <div class="carousel-item active">
           ${carouselInnerHTML}</div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>`
}

/**
 * 幻燈片指標區塊
 * @param {String[]} images 
 * @returns Indicators Area HTML
 */
function createCarouselIndicatorsHTML(images) {
    //     let html = `<button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0"
    //     class="active" aria-current="true" aria-label="Slide 1"></button>
    // <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1"
    //     aria-label="Slide 2"></button>
    // <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2"
    //     aria-label="Slide 3"></button>`
    let html = ''
    //TODO: 產生指標
    images.forEach((img,index)=>{
        html += `<button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="${index}" class="${index === 0 ?'avtive' : ''}" ${index === 0 ? `aria-current="true"`:'' }aria-label="Slide${index+1}"></button>`
         
    })
    return html
}

/**
 * 幻燈片主圖區區塊
 * @param {String[]} images 
 * @returns Carousel Img Area HTML
 */
function createCarouselHTML(images) {
    //     let html = `<div class="carousel-item active">
    //     <img src="./images/iphone-14-pro/iphone-14-pro-finish-select-202209-6-1inch-deeppurple.jpeg"
    //         class="d-block w-100" alt="...">
    // </div>
    // <div class="carousel-item">
    //     <img src="./images/iphone-14-pro/iphone-14-pro-finish-select-202209-6-1inch-deeppurple_AV1.jpeg"
    //         class="d-block w-100" alt="...">
    // </div>
    // <div class="carousel-item">
    //     <img src="./images/iphone-14-pro/iphone-14-pro-finish-select-202209-6-1inch-deeppurple_AV2.jpeg"
    //         class="d-block w-100" alt="...">
    // </div>`
    let html = ''
    //TODO: 產生主圖
    images.forEach((img,index)=>{
        html+= `<div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${img}"class="d-block w-100" alt="...">
        </div>`
    })
    return html
}

/**
 * 產出商品客製化規格區塊
 * @param {Object} widget 商品客製化區塊物件
 * @returns Widget區塊HTML
 */
function createWidgetHTML(widget) {

    //TODO: 取得該區塊所有的項目
    const items = getWidgetItem(widget.type)

    //TODO: 產出區塊內所有的item的innerHTML
    let itemHTML = ''

    items.forEach(item=>{
        if(widget.type ==='color'){
            const color =shopData.colors.find(c => c.colorCode === item)
            itemHTML +=   `<div class="col">
            <div class="border border-secondary-subtle rounded-3 p-4 text-center" role="button">
                <img class="w-25" src="${color.Img}" alt="${color.colorName}">
            </div>
        </div>`
        }else if(widget.type ==='model'){
            const specs = shopData.specifications.filter(spec => spec.model === item)
        }else if(widget.type==='storage'){

        }
    })


    //

    let html = `
    <section class="widget-item mb-4 mx-lg-3">
        <h2 class="fs-4">${widget.title} <span class="text-black-50">${widget.subTitle}</span></h2>
        ${widget.type === 'color' ? `<p><span class="picked-color fw-medium">顏色</span> </p>` : ''}
        <div class="row row-cols-${widget.col} gy-3">
            ${itemHTML}
        </div>
    </section>`


    return html
}

/**
 * 從商品的規格類型內取得選項
 * @param {string} type 規格類型
 * @returns Spec Items
 */
// type = model,color,storage
function getWidgetItem(type) {
    //TODO: 透過type取得不重複的spec items
    // 透過全域變數shopData，先存下載下來的json
    const items = shopData.specifications.map(spec=>spec[type])
    console.log(items)
    // 不重複=>new Set
    return new Set(items)
}

/**
 * 商品客製化區塊點擊動態樣式
 * @param {DOMElement} element 
 */
function specSelectActiveHandler(element) {
    //TODO: 找到屬於那個DOM的區塊，沒點擊的變成原本樣式，點擊的就變成active樣式

}

/**
 * WidgetItem點擊事件
 * @param {DOMElement} element 
 * @param {String} type 客製化規格類型
 */
function clickHandler(element, type) {

    specSelectActiveHandler(element)

    const specWidget = document.querySelector('.spec-widget')
    if (type === 'color') {
        //TODO: 設定選取得顏色

        //TODO: 新增顏色區塊文字

        //TODO: 替換主圖幻燈片

    }

    if (type === 'model') {
        //TODO: 設定選取的規格

        //TODO: 處理儲存裝置區價錢(點擊不同機型時，儲存裝置的錢需要重算)


    }

    if (type === 'storage') {
        //TODO: 設定選取的儲存空間
    }

    createSummaryInfo()
}



/**
 * 商品資訊小計區塊
 */
function createSummaryInfo() {
    if (selectedModel && selectedColor && selectedStorage) {
        //TODO: 取得選到的 Spec

        //TODO: 顯示小計區塊、產品名稱、圖片、完整產品名稱、價錢

    }


}

/**
 * 重設小計區塊（載入時應該會需要）
 */
function resetSummaryArea() {
    selectedModel = ''
    selectedColor = ''
    selectedStorage = ''
    document.querySelector('.summary-area').classList.add('d-none')
}
