export default function main({ order }) {
  const eligibleSkus = ["8906161171455", "ceo", "8906150340435", "8906150340435-app", "8906150342804", "8906161171257", "Always Fresh", "8906150343351", "BellaVitaGlamPerfume", "8906150340404", "BellaImpactMen", "8906150343290", "8906161171233", "8906161171264", "3870003551918", "8906161171240", "BellaRoseWomen", "8906150342811", "3870003551925", "8906150345980", "8906150346680", "8906150347250", "8906150347267", "8906188060183", "8906188060176", "BellaWhiteOud"];
  const flexiBoxSku = "UPC";
  const totalItems = 3;
  const keyStartsWith = "_ITEM";
  let validFlexiBox = true;

  order.lineItems.forEach((lineItem) => {
    if (lineItem.sku == flexiBoxSku) {
      let itemsLength = lineItem.customAttributes.length;
      if (itemsLength > 0 && itemsLength == totalItems) {
        lineItem.customAttributes.forEach((customAttribute) => {
          let key = customAttribute.key;
          let value = customAttribute.value;
          if (!key.startsWith(keyStartsWith) || !eligibleSkus.some((str) => value.includes("SKU: " + str))) {
            validFlexiBox = false; // Set to false if any condition fails
          }
        });
      } else {
        validFlexiBox = false; // Set to false if custom attributes are missing
      }
    }
  });

  return {
    validFlexiBox: validFlexiBox
  };
}
