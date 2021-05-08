document.addEventListener("DOMContentLoaded", function (event) {

    let item = document.getElementsByClassName("item");
    let length = item.length;

    for (let i = 0; i < length; i++) {
        item[i].addEventListener("click", function() {
            let setClasses = !this.classList.contains("active");
            setClass(item, "active", "remove");
            setClasses && this.classList.toggle("active");
        })
    }

    function setClass(els, className, fnName) {
        for (let i = 0; i < els.length; i++) {
            els[i].classList[fnName](className);
        }
    }

    let slideshow = document.querySelectorAll('[data-section-type="slideshow"]');
    slideshow.forEach(section => {
        let configList = section.querySelectorAll('[data-tns-config]');
        configList.forEach(config => {
            tns(JSON.parse(config.innerHTML))
        })
    })
});
function showItemCart(){
    document.getElementById("cart_item_count").innerHTML = Shopify.item_count;
}
showItemCart();