// По клику на кнопку "меню" меняется класс у навигации
var 
    menuButton = document.querySelector('.main-header__button');
    menuList = document.querySelector('.main-header__navigation');

    menuButton.addEventListener('click', function(event){
        menuList.classList.toggle('main-header__navigation--show');
    });

// Скролл

window.addEventListener('scroll', function(e){
    var
        oldScrollPosition = this.oldScroll || 0,
        newScrollPosition = this.scrollY,
        isScrollDown = newScrollPosition > oldScrollPosition;

    document.querySelector('.main-header').classList.toggle('main-header--scroll-up', isScrollDown);

    this.oldScroll = newScrollPosition;
});

