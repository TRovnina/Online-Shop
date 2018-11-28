//створити картку продукта

let _makeHtml = ({
	id,
	name,
	image_url,
	description,
	price,
	special_price,
}) => {
	let $product = $(`<div class="p-2 product product_main card col-xs-12 col-sm-4 col-md-3" data-product-id="${id}">`);
	$product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
	$product.append($(`<span class="product-title">`).text(name));
	if(special_price == null)
		$product.append($(`<span class="price product_price">`).text(price + " грн"));
	else{
		$product.append($(`<span class="price old_price">`).text(price + " грн"));
		$product.append($(`<span class="price special_price">`).text(special_price + " грн"));
	}

	let $button = $(`<button class="add_button button mt-3">`).text("Купити");;
	$button.append($(`<img src="img/cart.png" alt="add" class="button_img">`));
	$product.append($button);
	return $product;
};

module.exports = _makeHtml;