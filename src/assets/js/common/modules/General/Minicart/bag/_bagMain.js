import el from './_bagSelectors';
import helper from './_bagHelpers';
import overlay from '../overlay';
import {
    getOrder,
    removeItem,
    updateItem
} from '../_vtexHelpers';

export const bag = {
    init() {
        bag.bindEvents();
        bag.load();
        $(window).on('checkoutRequestEnd.vtex', function (ev) {
          getOrder().then(function ({items,totalizers}) {
            bag.render(items,totalizers)
            document.body.classList.contains('produto') ? bag.open() : null;
          });
        });
        window.onload = function(){
            getOrder().then(function ({items,totalizers}) {
                bag.render(items,totalizers);
                bag.open();
                // document.body.classList.contains('produto') ? bag.open() : null;
            });
        }
    },

    maxQuantity: [1, 2, 3, 4, 5, 6, 7],

    bindEvents() {
        document.getElementById('render--minicartBag').addEventListener('click', bag.open);
        document.addEventListener('click', function (event) {

            let classList = event.target.classList;

            switch (true) {
                case classList.contains('js--bag-close'):
                    bag.close();
                    break;
                    // case classList.contains('cardProduct--addToCart'):         
                    //   bag.add();
                    //   break;
                case classList.contains('js--bag-remove'):
                    bag.remove(event.target);
                    break;
                case classList.contains('js--bag-select'):
                    bag.select(event.target);
                    break;
            }
        });
    },

    load() {
        bag.disable();
        getOrder().then(function ({items,totalizers}) {
            bag.render(items, totalizers);
            bag.enable();
        });
    },
    remove(target) {
        bag.disable();
        removeItem(target.dataset.index).then(({
            items,
            totalizers
        }) => {
            target.parentNode.parentNode.remove();
            // bag.render(items, totalizers);
            bag.enable();
        })
    },

    update(items, totalizers) {
        [...el.amount].forEach(sac => sac.textContent = items.length);

        if (totalizers.length) {
            el.total.textContent = (totalizers[0].value / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });


        } else {
            el.total.textContent = 0;
        }
        if (el.shelf.querySelectorAll('.js--bag-old-price').length >= 1) {
            el.discount.textContent = helper.discountify([...el.shelf.querySelectorAll('.js--bag-old-price')], [...el.shelf.querySelectorAll('.js--bag-best-price')]);
            el.discountblock.classList.add('bag-bottom__discount--show');
        } else {
            el.discountblock.classList.remove('bag-bottom__discount--show');
        }

    },

    select(target) {
        target.addEventListener('change', function (event) {
            if (event.target.classList.contains('js--bag-select')) {
                bag.disable();
                let index = event.target.nextElementSibling.dataset.index;
                updateItem(index, event.target.value)
                    .then(({
                        items,
                        totalizers
                    }) => {
                        event.target.previousElementSibling.innerHTML = helper.precify(items[index])
                        bag.update(items, totalizers);
                        bag.enable();
                    })
            }
        }, false);
    },

    disable() {
        el.disable.classList.add('bag__disable--open');
        el.loading.classList.add('bag-top__load--ready')
    },
    enable() {
        el.loading.style.width = "100%"

        el.loading.classList.remove('bag-top__load--ready')
        el.disable.classList.remove('bag__disable--open');
    },

    render(items, totalizers) {
        if (items.length) {
            el.shelf.innerHTML = '';
            items.forEach((item) => {
                el.shelf.innerHTML +=
                    `<section class="bag-shelf__item">
                        <a class="bag-shelf__item-img-anchor" href=${item.detailUrl}>
                            <img class="bag-shelf__item-img" src=${item.imageUrl} loading="lazy">
                        </a>
                        <div class="bag-shelf__item-info">
                            <div class="bag-shelf__item-info-name">${item.name}</div>
                            <div class="bag-shelf__item-info-price">${helper.precify(item)}</div>
                            <select class="bag-shelf__item-info-quantity js--bag-select" name="quantity">
                            ${helper.createOptions(bag.maxQuantity, item.quantity)}
                            </select>
                            <button class="bag-shelf__item-info-del js--bag-remove" data-index=${items.indexOf(item)}></button>  
                        </div>
                        <div class="bag-shelf__item-line"></div>
                    </section>`
            })
        } else {
            el.shelf.innerHTML = `<div class="bag-shelf__empty">Sacola Vazia</div>`
        }
        bag.update(items, totalizers);
    },
    open() {
        document.body.classList.add('menu--open');
        overlay.open();
        el.cart.classList.add('bag--open');
    },
    close() {
        document.body.classList.remove('menu--open');
        el.cart.classList.remove('bag--open');
        overlay.close();
    },
}
