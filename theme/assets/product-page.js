(() => {
  let optionElements = document.getElementsByClassName(
    "product-options-select"
  );
  let selectOptionsElement = document.getElementById("js-swatch-form");
  [...optionElements].forEach((optionElement) => {
    optionElement.addEventListener("change", () => {
      let value = getValueFromOptions();
      Shopify.product_variant.find((e) => {
        if (matches(e, value)) {
          var compare = e.compare_at_price - e.price;
          var compare_percent = ((e.price / e.compare_at_price) * 100).toFixed(
            2
          );
          return (
            (document.getElementById("variant-price-sale").innerHTML =
              formatter.format(e.price / 100)),
            (document.getElementById("variant-price-minus").innerHTML =
              formatter.format(compare / 100) + ("(" + compare_percent + "%)"))
          );
        }
      });
    });
  });
  console.log(Shopify.product_variant);
  function getValueFromOptions() {
    return [...new FormData(selectOptionsElement).entries()].reduce(
      (e, t) => ((e[t[0]] = t[1]), e),
      {}
    );
  }
  const matches = (obj, source) =>
    Object.keys(source).every(
      (key) => obj.hasOwnProperty(key) && obj[key] == source[key]
    );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
})();
