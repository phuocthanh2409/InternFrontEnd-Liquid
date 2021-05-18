(() => {
  let selectOptionsElement = document.getElementById("js-swatch-form");
  //đặt tên biến để rút gọn code
  let optionElements = document.getElementsByClassName(
    "product-options-select"
  );

  //hàm so sánh dữ liệu
  const matches = (obj, source) =>
    Object.keys(source).every(
      (key) => obj.hasOwnProperty(key) && obj[key] == source[key]
    );

  //hàm chuyển đổi tiền
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //variant đầu tiên
  Shopify.product_variant.find((e) => {
    let value = getValueFromOptions();
    if (matches(e, value)) {
      var compare = e.compare_at_price - e.price;
      var compare_percent = (
        100 -
        (e.price / e.compare_at_price) * 100
      ).toFixed(2);
      Shopify.id_product = e.id;
      if (e.price >= e.compare_at_price) {
        return (
          (document.getElementsByClassName(
            "product-infomation-price-sale"
          )[0].style.color = "#272e35"),
          (document.getElementsByClassName(
            "product-infomation-price-original-sale"
          )[0].style.display = "none"),
          (document.getElementsByClassName(
            "product-infomation-price-span"
          )[0].style.display = "none"),
          (document.getElementsByClassName(
            "product-infomation-price-save"
          )[0].style.display = "none"),
          (document.getElementsByClassName(
            "product-infomation-price-minus"
          )[0].style.display = "none"),
          (document.getElementById("variant-price-sale").innerHTML =
            formatter.format(e.price / 100))
        );
      } else {
        return (
          (document.getElementsByClassName(
            "product-infomation-price-sale"
          )[0].style.color = "#e94141"),
          (document.getElementsByClassName(
            "product-infomation-price-original-sale"
          )[0].style.display = "inline"),
          (document.getElementsByClassName(
            "product-infomation-price-span"
          )[0].style.display = "inline"),
          (document.getElementsByClassName(
            "product-infomation-price-save"
          )[0].style.display = "inline"),
          (document.getElementsByClassName(
            "product-infomation-price-minus"
          )[0].style.display = "inline"),
          (document.getElementById("variant-price-sale").innerHTML =
            formatter.format(e.price / 100)),
          (document.getElementById("variant-price-compare-at-price").innerHTML =
            formatter.format(e.compare_at_price / 100)),
          (document.getElementById("variant-price-minus").innerHTML =
            formatter.format(compare / 100) + (" (" + compare_percent + "%)"))
        );
      }
    }
  });

  //chọn variant
  [...optionElements].forEach((optionElement) => {
    optionElement.addEventListener("change", () => {
      let value = getValueFromOptions();
      Shopify.product_variant.find((e) => {
        if (matches(e, value)) {
          var compare = e.compare_at_price - e.price;
          var compare_percent = (
            100 -
            (e.price / e.compare_at_price) * 100
          ).toFixed(2);
          Shopify.id_product = e.id;
          if (e.price >= e.compare_at_price) {
            return (
              (document.getElementsByClassName(
                "product-infomation-price-sale"
              )[0].style.color = "#272e35"),
              (document.getElementsByClassName(
                "product-infomation-price-original-sale"
              )[0].style.display = "none"),
              (document.getElementsByClassName(
                "product-infomation-price-span"
              )[0].style.display = "none"),
              (document.getElementsByClassName(
                "product-infomation-price-save"
              )[0].style.display = "none"),
              (document.getElementsByClassName(
                "product-infomation-price-minus"
              )[0].style.display = "none"),
              (document.getElementById("variant-price-sale").innerHTML =
                formatter.format(e.price / 100))
            );
          } else {
            return (
              (document.getElementsByClassName(
                "product-infomation-price-sale"
              )[0].style.color = "#e94141"),
              (document.getElementsByClassName(
                "product-infomation-price-original-sale"
              )[0].style.display = "inline"),
              (document.getElementsByClassName(
                "product-infomation-price-span"
              )[0].style.display = "inline"),
              (document.getElementsByClassName(
                "product-infomation-price-save"
              )[0].style.display = "inline"),
              (document.getElementsByClassName(
                "product-infomation-price-minus"
              )[0].style.display = "inline"),
              (document.getElementById("variant-price-sale").innerHTML =
                formatter.format(e.price / 100)),
              (document.getElementById(
                "variant-price-compare-at-price"
              ).innerHTML = formatter.format(e.compare_at_price / 100)),
              (document.getElementById("variant-price-minus").innerHTML =
                formatter.format(compare / 100) +
                (" (" + compare_percent + "%)"))
            );
          }
        }
      });
    });
  });

  //hàm lấy dữ liệu
  function getValueFromOptions() {
    if (selectOptionsElement != null) {
      return [...new FormData(selectOptionsElement).entries()].reduce(
        (e, t) => ((e[t[0]] = t[1]), e),
        {}
      );
    }
  }
})();
