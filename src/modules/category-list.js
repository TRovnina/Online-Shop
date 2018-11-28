//додати категорію до списка категорій

let _makeHtml = ({
	id,
	name,
	description,
}) => {
	let $category = $(`<li class="list-group-item category" data-category-id="${id}">`).text(name);
	return $category;
};

module.exports = _makeHtml;