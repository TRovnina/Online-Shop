//створення сторінки з описом продукта

let _makeHtml = ({
	id,
	name,
	image_url,
	description,
	price,
	special_price,
}) => {
	let $product = $(`<div class="container product" data-product-id="${id}">`);
	$product.append($(`<h2 class="description-title product-title">`).text(name));
	let $block = $(`<div class="content">`);

	let $block1 = $(`<div class="col-sm-12 col-md-6 text-center bg-white rounded">`);
	$block1.append($(`<img src="${image_url}" alt="${name}" class="description_img product-image">`));

	let $block2 = $(`<div class="col-sm-12 col-md-5 card p-2">`);
	if(special_price == null)
		$block2.append($(`<span class="price mx-auto mt-4">`).text(price + " грн"));
	else{
		$block2.append($(`<h2 class="text-center text-danger my-3">`).text("Акція! Суперціна!"));
		$block2.append($(`<span class="price old_price mx-auto ">`).text(price + " грн"));
		$block2.append($(`<span class="price special_price mx-auto">`).text(special_price + " грн"));
	}
	let $button = $(`<button class="add_button button mt-3">`).text("Купити");
	$button.append($(`<img src="img/cart.png" alt="add" class="button_img">`));
	$block2.append($button);
	$block2.append($(`<img src="img/delivery.png" alt="delivery" class="w-50 mt-4 mx-auto">`));

	$block.append($block1);
	$block.append($block2);
	$product.append($block);

	let $block3 = $(`<div class="card description col-sm-11 col-md-11">`);
	$block3.append($(`<span>`).text(description));

	$product.append($block3);
	return $product;
};

module.exports = _makeHtml;