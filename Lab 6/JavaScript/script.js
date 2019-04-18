function getAPIUrl(method, params)
{
	if (!method) throw new Error('Method is not specified')
	params = params || {};
	params['access_token'] = 'c3338965c3338965c333896532c35998aecc333c33389659f8b34f1caa2baa02b332e1e';

	return 'https://api.vk.com/method/' + method + '?' + $.param(params) + '&v=5.52';
}

function sendRequest(method, params, succ)
{
	$.ajax({
		url: getAPIUrl(method, params),
		method: 'GET',
		dataType: 'JSONP',
		success: succ
	});
}

function showList()
{
	var filmTag = tag.value;

	sendRequest('wall.get', {owner_id: -26750264, count: 100}, function (data) {
			showListHTML(data.response.items, filmTag);
			console.log(data.response);
		});
}

let isListShown = false;

function showListRandom()
{
	var filmTag = tag.value;

	sendRequest('wall.get', {owner_id: -26750264, count: 50}, function (data) {
			getRandomFilms(data.response.items, filmTag);
			console.log(data.response);
		});
}

function showListHTML(films, xTag)
{
	var html = '';

	if (isListShown) 
	{
		$('.li').remove();
		isListShown = false;
	}

	for (var i = 0; i < films.length; i++)
	{
		if (xTag === '')
		{
			var isFilmFiltered = ((films[i].text.indexOf("Страна:") >= 0)
					&& (films[i].text.indexOf("Жанр:"))
					&& (films[i].text.indexOf("Рейтинги:")));

			if (isFilmFiltered)
			{
				var f = films[i];
				html += '<li>' + '<div class="filmBlock">' + '<div class="photo">' + '<img src="' + f.attachments[0].photo.photo_604 + '" />' + '</div>' + '<div class="desc">' + f.text + '</div>' + '<div class="likePost">' + '<div class="like">♥' + f.likes.count + '</div>'
				+ '<a href="https://vk.com/public26750264?w=wall' + f.owner_id + '_' + f.id + '">Original post</a>' + '</div>' + '</div>' + '</li>';
			}
		}
		else
		{
			var isFilmFiltered = ((films[i].text.indexOf("Страна:") >= 0)
					&& (films[i].text.indexOf("Жанр:"))
					&& (films[i].text.indexOf("Рейтинги:")))
					&& (films[i].text.indexOf("#" + xTag.toLowerCase() + "@xfilm") >= 0);

			if (isFilmFiltered)
			{
				var f = films[i];
				html += '<li>' + '<div class="filmBlock">' + '<div class="photo">' + '<img src="' + f.attachments[0].photo.photo_604 + '" />' + '</div>' + '<div class="desc">' + f.text + '</div>' + '<div class="likePost">' + '<div class="like">♥' + f.likes.count + '</div>'
				+ '<a href="https://vk.com/public26750264?w=wall' + f.owner_id + '_' + f.id + '">Original post</a>' + '</div>' + '</div>' + '</li>';
			}
		}
	}

	$('ul').html(html);
	$('ul li').css('padding', '30px 0px').css('list-style', 'none');
	$('ul .filmBlock').css('display', 'flex').css('justify-content', 'space-around').css('flex-wrap', 'wrap');
	$('ul .like').css('font-size', '30px');
	$('ul a').css('text-decoration', 'none').css('color', '#0029ff').css('font-size', '30px');
	$('ul .likePost').css('width', '100%').css('margin-left', '40px');
	$('ul img').css("width", "100%");
	$('ul .photo').css('width', '20%');
	$('ul .desc').css("font-size", "18px").css('width', '70%').css('font-size', '20px');

	isListShown = true;
}

function getRandomFilms(films)
{
	var html = '';

	if (isListShown) 
	{
		$('.li').remove();
		isListShown = false;
	}

	for (var i = 0; i < films.length; i++)
	{
		var randomValue = Math.round(Math.random(0, 2));

		if (randomValue === 1)
		{
			var f = films[i];

			var isFilmFiltered = ((films[i].text.indexOf("Страна:") >= 0)
					&& (films[i].text.indexOf("Жанр:"))
					&& (films[i].text.indexOf("Рейтинги:")));

			if (isFilmFiltered)
			{
				var f = films[i];
				html += '<li>' + '<div class="filmBlock">' + '<div class="photo">' + '<img src="' + f.attachments[0].photo.photo_604 + '" />' + '</div>' + '<div class="desc">' + f.text + '</div>' + '<div class="likePost">' + '<div class="like">♥' + f.likes.count + '</div>'
				+ '<a href="https://vk.com/public26750264?w=wall' + f.owner_id + '_' + f.id + '">Original post</a>' + '</div>' + '</div>' + '</li>';
			}

			$('ul').html(html);
			$('ul li').css('padding', '30px 0px').css('list-style', 'none');
			$('ul .filmBlock').css('display', 'flex').css('justify-content', 'space-around').css('flex-wrap', 'wrap');
			$('ul .like').css('font-size', '30px');
			$('ul a').css('text-decoration', 'none').css('color', '#0029ff').css('font-size', '30px');
			$('ul .likePost').css('width', '100%').css('margin-left', '40px');
			$('ul img').css("width", "100%");
			$('ul .photo').css('width', '20%');
			$('ul .desc').css("font-size", "18px").css('width', '70%').css('font-size', '20px');

			isListShown = true;
		}
	}
}