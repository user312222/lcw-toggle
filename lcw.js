const isOnProductPage = !!document.querySelector(".product-detail__brand");
const isOnMainPage = window.location.href === 'https://www.lcw.com/';

const init = () => {
    if (isOnProductPage) {
        putProductInfoToStorage();
    } else {
        let visitedProducts = JSON.parse(localStorage.getItem("products")) || [];
        
        if (visitedProducts.length >= 3 && isOnMainPage) {
            clear();
            putCss();
            putHtml();
            setEvents();
        }
    }
};

const putProductInfoToStorage = () => {
    let visitedProducts = JSON.parse(localStorage.getItem("products")) || [];

    let product = {
        imageUrl: document.querySelector(".main-image-container > img").src,
        name: document.querySelector(".product-detail__title").innerText,
        price: (
            document.querySelector(".product-detail__container .current-price:not(.current-price--has-basket)") ||
            document.querySelector(".product-detail__container .price-in-cart")
        ).innerText,
        url: window.location.href,
        clicks: 0,
    };

    let existing = visitedProducts.find(item => item.url === product.url);
    if (existing) {
        product.clicks = existing.clicks + 1;
    }

    visitedProducts = visitedProducts.filter(item => item.url !== product.url);
    visitedProducts.unshift(product);
    localStorage.setItem("products", JSON.stringify(visitedProducts));
};

const incrementClick = (url) => {
    let visitedProducts = JSON.parse(localStorage.getItem("products")) || [];
    visitedProducts = visitedProducts.map(item => {
        if (item.url === url) {
            return { ...item, clicks: (item.clicks || 0) + 1 };
        }
        return item;
    });
    localStorage.setItem("products", JSON.stringify(visitedProducts));
};

const clear = () => {
    document.querySelector(".drawer-css")?.remove();
    document.querySelector(".drawer-container")?.remove();
};

const putCss = () => {
    let myScript = document.createElement('style');
    let css = `
        .drawer-container {
            padding: 10px;
            position: fixed;
            top: calc((100vh - 450px) / 2);
            left: 0;
            background: white;
            z-index: 99;
            max-width: 200px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .drawer-container.close-drawer {
            transform: translateX(-100%);
        }

        .drawer-inner-container {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .card-container {
            display: flex;
            justify-content: space-between;
            align-items: start;
            gap: 10px;
            padding: 8px;
            border-bottom: 1px solid #eee;
            transition: background-color 0.2s ease;
        }

        .card-container:hover {
            background-color: #f9f9f9;
        }

        .card-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            gap: 4px;
        }

        .product-image {
            width: 50px;
            height: 60px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 4px;
        }

        .product-name {
            margin: 0;
            font-size: 11px;
            font-weight: 500;
            color: #333;
            line-height: 1.2;
            max-width: 60px;
        }

        .product-price {
            margin: 0;
            font-size: 12px;
            color: #e74c3c;
            font-weight: 600;
        }

        .product-clicks {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: top;
            min-width: 35px;
            padding: 4px 6px;
            background: #f5f5f5;
            border-radius: 4px;
            gap: 2px;
        }

        .product-clicks span {
            font-size: 16px;
            font-weight: bold;
            color: #e74c3c;
        }

        .product-clicks > div {
            font-size: 9px;
            color: #999;
            font-weight: 500;
        }

        .card-arrow {
            position: absolute;
            right: -30px;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 50px;
            background: #e74c3c;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            border-radius: 0 4px 4px 0;
            transition: all 0.3s ease;
        }

        .card-arrow:hover {
            background: #d63031;
            right: -28px;
        }

        .card-arrow span {
            display: inline-flex;
            transition: transform 0.3s ease;
        }

        .card-arrow span.card-rotate {
            transform: rotate(180deg);
        }

        a.product-link {
            text-decoration: none;
            color: inherit;
        }
    `;

    myScript.innerHTML = css;
    myScript.classList.add("drawer-css");
    document.querySelector("head").append(myScript);
};

const putHtml = () => {
    let visitedProducts = JSON.parse(localStorage.getItem("products")) || [];
    let visiteds = visitedProducts.slice(0, 3);

    let drawerContainer = `
        <div class="drawer-container">
            <div class="drawer-inner-container">
                ${visiteds.reduce((acc, product) =>
                    acc + `
                    <div data-href="${product.url}" class="product-link" data-url="${product.url}">
                        <div class="card-container">
                            <div class="card-left">
                                <div class="product-image" style="background-image:url('${product.imageUrl}')"></div>
                                <p class="product-name">${product.name}</p>
                                <p class="product-price">${product.price}</p>
                            </div>
                            <div class="product-clicks">
                                <span>${product.clicks || 0}</span>
                                <div>tıklanma</div>
                            </div>
                        </div>
                    </div>
                    `, ''
                )}
                <div class="card-arrow">
                    <span class="card-rotate">
                        <i class="fa fa-arrow-right"></i>
                    </span>
                </div>
            </div>
        </div>`;

    putCdnLinks();
    document.querySelector("body").insertAdjacentHTML('beforeend', drawerContainer);
};

const putCdnLinks = () => {
    let cdn = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />`;
    document.querySelector("head").insertAdjacentHTML('beforeend', cdn);
};

const setEvents = () => {
    document.querySelector(".card-arrow").addEventListener("click", () => {
        document.querySelector(".drawer-container").classList.toggle("close-drawer");
        document.querySelector(".card-arrow span").classList.toggle("card-rotate");
    });

    document.querySelectorAll(".product-link").forEach(link => {
        link.addEventListener("click", (e) => {
            const url = e.currentTarget.dataset.url;
            incrementClick(url);
        });
    });


};

init();