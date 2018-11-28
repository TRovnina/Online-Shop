//робить форму для заповнення контактів покупця

let _makeHtml = ({
	price
}) => {
	let $form = $(`<div class="container odrder">`);

	let $block2 = $(`<div class="row mt-3">`);
	$block2.append($(`<span class="col-sm-2 col-md-2 font-weight-bold">`).text("Ім'я: "));
	$block2.append($(`<input type="text" id="name" name="name" placeholder="Іван" required>`));
	$form.append($block2);

	let $block3 = $(`<div class="row mt-3">`);
	$block3.append($(`<span class="col-sm-2 col-md-2 font-weight-bold">`).text("Email:"));
	$block3.append($(`<input type="email" id="mail" name="mail" placeholder="vanyaI@gmail.com" required>`));
	$form.append($block3);

	let $block4 = $(`<div class="row mt-3">`);
	$block4.append($(`<span class="col-sm-2 col-md-2 font-weight-bold">`).text("Телефон: "));
	$block4.append($(`<input type="text" id="phone" name="phone" placeholder="+38 067 556 73 31" required>`));
	$form.append($block4);

	$form.append($(`<input type="submit" value="Замовити" class="button post-order m-4">`));
	$form.append($(`<span class="font-weight-bold order_price">`).text(price));
			
	return $form;
};

module.exports = _makeHtml;