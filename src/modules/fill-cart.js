//додати товар до кошика

let _makeHtml = ({
	id,
	img,
	name,
	price,
	number
}) => {
	let $product = $(`<div class="container product product_cart row" data-product-id="${id}">`);
	$product.append($(`<img src="img/delete.png" alt="delete" class="delete-img">`));
	$product.append($(`<img src="${img}" alt="${name}" class="col-sm-2 col-md-2 product-image">`));
	
	let $block_name = $(`<div class="col-sm-3 col-md-3 my-auto">`);
	$block_name.append($(`<span class="product-title">`).text(name));
	$product.append($block_name);

	let $block_price = $(`<div class="col-sm-2 col-md-2 my-auto">`);
	$block_price.append($(`<span class="product-price">`).text(price + " грн"));
	$product.append($block_price);

	let $block_number = $(`<div class="col-sm-2 col-md-2 my-auto">`);
	$block_number.append($(`<img src="img/minus.png" alt="minus" class="minus">`));
	$block_number.append($(`<span class="product-number mx-3">`).text(number));
	$block_number.append($(`<img src="img/add.png" alt="plus" class="plus">`));
	$product.append($block_number);

	let $block_all_price = $(`<div class="col-sm-2 col-md-2 my-auto">`);
	$block_all_price.append($(`<span class="product-price">`).text("Всього: " + (+price * +number) + " грн"));
	$product.append($block_all_price);

	return $product;
};

module.exports = _makeHtml;