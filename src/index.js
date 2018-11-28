import './scss/main.scss';
import 'bootstrap';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

//при завантажені сторінки
window.onload = function(){
	allproducts();
}


$(document).on('click', '.all', function(){
	allproducts();
});




//вивести на экран список товарів
let _makeProduct = require('./modules/product');

function allproducts(){
	jQuery.ajax({
		url: 'https://nit.tron.net.ua/api/product/list',
		method: 'get',
		dataType: 'json',
		success: function(json){
			console.table(json);
			json.forEach(product => $('.product-grid').append(_makeProduct(product)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
		},
	});
}


//вивести на екран список категорій
let _makeCategory = require('./modules/category-list');

	jQuery.ajax({
		url: 'https://nit.tron.net.ua/api/category/list',
		method: 'get',
		dataType: 'json',
		success: function(json){
			json.forEach(category => $('.categories_list').append(_makeCategory(category)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
		},
	});




//відкрити певну категорію
$(document).on('click', '.category', function(){
	var $this = $(this);
	console.log($this);
	var id = $this.closest('.category').data('category-id');
	console.log(id);
	$('div.product-grid').empty();//очистити блок

	jQuery.ajax({
		url: 'https://nit.tron.net.ua/api/product/list/category/' + id,
		method: 'get',
		dataType: 'json',
		success: function(json){
			json.forEach(product => $('.product-grid').append(_makeProduct(product)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
		},
	});
	
});







//відкрити певний товар
let _makeDescription = require('./modules/product-description');

$(document).on('click', '.product-image', function(){
	var $this = $(this);
	var id = $this.closest('.product').data('product-id');
	$('div.product-grid').empty();//очистити блок
	document.getElementById("cart_container").style.display="none";

	jQuery.ajax({
		url: 'https://nit.tron.net.ua/api/product/' + id,
		method: 'get',
		dataType: 'json',
		success: function(json){
			$('.product-grid').append(_makeDescription(json));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
		},
	});
	
});







//заповнити кошик
let _makeCart = require('./modules/fill-cart');

function createCart(){
	var $cart = $('.cart_products');
	$cart.empty();//очистити блок

	if(localStorage.length == 0){
		$cart.append($(`<img src="img/empty_cart.png" alt="empty cart">`));
		return;
	}

	$cart.append($(`<span class="title ml-4">`).text("Кошик"));

	var all_price = 0;
	for (var i = 0; i < localStorage.length; i++) {
  		var key = localStorage.key(i);
  		var obj = JSON.parse(localStorage.getItem(key));
		$cart.append(_makeCart(obj));
		all_price += (+obj.price * +obj.number);
    }

   $cart.append($(`<button class="button order_btn m-4">`).text("Оформити замовлення"));
   var $div = $(`<div class="col-sm-4 col-md-4 all_price">`);
   $div.append($(`<span class="price_all">`).text("Разом до сплати: " + all_price + " грн"));
   $cart.append($div);
}




//відкрити кошик
$(document).on('click', '.cart_img', function(){
	var $this = $(this);
	document.getElementById("cart_container").style.display = "block";

	createCart();
});





//закрити кошик
$(document).on('click', '.close_img', function(){
	var $this = $(this);
	document.getElementById("cart_container").style.display = "none";
});



//додати товар до кошика
$(document).on('click', '.add_button', function(){
	var $this = $(this);
	var id = $this.closest('.product').data('product-id');
	var img = $this.closest('.product').find('.product-image').attr("src");
		var name = $this.closest('.product').find('.product-title').text();
		var text_price = $this.closest('.product').find('.product_price').text();
		if(text_price == "")
			text_price = $this.closest('.product').find('.special_price').text();

		var price = "";
		for (var i = 0; i < text_price.length; i++) {
			if(text_price.charAt(i) == " ")
				break;

			price += text_price[i];
		}


		var num = 1;

	if(localStorage.getItem(id) != null)
		num = JSON.parse(localStorage.getItem(id)).number + 1;
		
	var product = {id: id, img: img, name: name, price: price, number: num};
	localStorage.setItem(id, JSON.stringify(product));
});



//видалити товар з кошика
$(document).on('click', '.delete-img', function(){
	var $this = $(this);
	var id = $this.closest('.product').data('product-id');
	
	window.localStorage.removeItem(id);
	createCart();
});



//збільшити кількість товару в кошику
$(document).on('click', '.plus', function(){
	var $this = $(this);
	var id = $this.closest('.product').data('product-id');
	
	var $obj = JSON.parse(localStorage.getItem(id));
	var num = $obj.number + 1;
	var product = {id: id, img: $obj.img, name: $obj.name, price: $obj.price, number: num};
	localStorage.setItem(id, JSON.stringify(product));

	createCart();
});




//зменшити кількість товару в кошику
$(document).on('click', '.minus', function(){
	var $this = $(this);
	var id = $this.closest('.product').data('product-id');
	
	var $obj = JSON.parse(localStorage.getItem(id));
	var num = $obj.number - 1;
	if(num < 1)
		return;

	var product = {id: id, img: $obj.img, name: $obj.name, price: $obj.price, number: num};
	localStorage.setItem(id, JSON.stringify(product));

	createCart();
});






//відкрити форму
let _makeForm = require('./modules/make-form');

$(document).on('click', '.order_btn', function(){
	var $cart = $('.cart_products');
	var price = $cart.find(".price_all").text();
	$cart.empty();//очистити блок

	$cart.append($(`<span class="title mb-4">`).text("Ваші контакти"));
	var obj = {price: price};
	$cart.append(_makeForm(obj));
});




//надіслати запит
$(document).on('click', '.post-order ', function(){
	var name = $('input#name').val();
	var email = $('input#mail').val();
	var phone = $('input#phone').val();

	if(!corectForm(name, email, phone)){
		alert("Перевірте введені данні");
		return;
	}

	//var data = 'token=8zDfvZgvv_v8s6eq0GlI&name='+ name +'&phone=' + phone +'&email='+ email + productsList();
	//alert(data);
	var data = 'token=XA8MeFGo_179mvNiYWYA&name=tanya&phone=+380636577870&email=tanya@gmail.com&products[1]=5';
	$.ajax({
      url: 'https://nit.tron.net.ua/api/order/add',
      method: 'post',
      data: data,
      dataType: 'json',
      success: function(json){
          console.log(json);
          if(json.status != "error"){
            alert("Thank you for order");
            localStorage.clear();
          }
          else
            alert(json.status + "You do something wrong");
      },
      error: function(xhr){
     	 alert("An error occured: " + xhr.status + " " + xhr.statusText);
      },
  });

});


/*перевірка данних у формі*/
function corectForm(name, email, phone){
	if(name == "" || email == "" || phone == "")
		return false;

	//перевірка номеру
	if(phone.charAt(0) != "+")
		return false;
	for (var i = 1; i < phone.length; i++) {
		if(isNaN(phone[i]))
			return false;
	}

	//перевірка email
	var dog = false;
	for (var i = 1; i < email.length - 1; i++) {
		if(email.charAt(i) == "@"){
			if(dog)
				return false;
			if(email.charAt(i+1) == ".")
				return false;

			dog = true;
		}
	}
	return dog;
}




//перетворення замовлених товарів у стрічку
function productsList(){
	var $list = "";
	for (var i = 0; i < localStorage.length; i++) {
  		var key = localStorage.key(i);
  		var obj = JSON.parse(localStorage.getItem(key));
		$list +="&products["+ key +"]=" + obj.number;
   	}
	return $list;
}