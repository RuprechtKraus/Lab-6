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


	if ($('ul.filmsList').find('li').children().length)
	{
		$('.li').remove();
	}

	for (var i = 0; i < films.length; i++)
	{
		if (xTag === 'Все')
		{
			var isFilmFiltered = ((films[i].text.indexOf("Страна:") >= 0)
					&& (films[i].text.indexOf("Жанр:"))
					&& (films[i].text.indexOf("Рейтинги:")));

			if (isFilmFiltered)
			{
				var film = films[i];
				if (film.attachments[0].photo)
				{
					html += '<li>' + '<div class="filmBlock">' + '<div class="photo">' + '<img src="' + film.attachments[0].photo.photo_604 + '" />' + '</div>' + '<div class="desc">' + film.text + '</div>' + '<div class="likePost">' + '<div class="like">♥' + film.likes.count + '</div>'
					+ '<a href="https://vk.com/public26750264?w=wall' + film.owner_id + '_' + film.id + '">Original post</a>' + '</div>' + '</div>' + '</li>';
				}
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
				var film = films[i];
				if (film.attachments[0].photo)
				{
					html += '<li>' + '<div class="filmBlock">' + '<div class="photo">' + '<img src="' + film.attachments[0].photo.photo_604 + '" />' + '</div>' + '<div class="desc">' + film.text + '</div>' + '<div class="likePost">' + '<div class="like">♥' + film.likes.count + '</div>'
					+ '<a href="https://vk.com/public26750264?w=wall' + film.owner_id + '_' + film.id + '">Original post</a>' + '</div>' + '</div>' + '</li>';
				}
			}
		}
	}

	$('ul').html(html);

	isListShown = true;
}

function getRandomFilms(films)
{
	var html = '';

	if ($('ul.filmsList').find('li').children().length)
	{
		$('.li').remove();
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

			isListShown = true;
		}
	}
}