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

    var slider = tns({
        "container": ".my-slider",
        "items": 4,
        "rewind": false,
        "swipeAngle": false,
        "speed": 400,
        "controlsContainer": "#icon",
        "nav": false,
        "loop": false
    });
});