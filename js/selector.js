(function (window, document) {
    var city_ele = document.querySelector('#city');
    var county_ele = document.querySelector('#county');
    var street_ele = document.querySelector('#street');
    var address_ele = document.querySelector('#address');
    var address;

    document.querySelector('#btn').onclick = function () {
        var data = {
            type: 'get',
            url: 'data/city.json',
            data: '',
            success: function (data) {
                data = JSON.parse(data);
                for (var i = 0; i < data.length; i++) {
                    var li = document.createElement('li');
                    li.innerHTML = data[i];
                    li.id = 'city' + i;
                    city_ele.appendChild(li);
                    city_ele.parentNode.style.left = 0;
                }
                history.pushState('county', null, '');
            }
        };
        ajax(data);
    };

    city_ele.addEventListener("click", function (e) {
        var cityId = e.target.id;
        var index = cityId[4];
        var data = {
            type: 'post',
            url: 'data/county.json',
            data: cityId,
            success: function (data) {
                data = JSON.parse(data);
                for (var i = 0; i < data[index].length; i++) {
                    var li = document.createElement('li');
                    li.innerHTML = data[index][i];
                    li.id = cityId + 'county' + i;
                    county_ele.appendChild(li);
                    county_ele.parentNode.style.left = 0;
                }
                address = e.target.innerText;
                history.pushState('street', null, '');
            }
        };
        ajax(data);
    });

    county_ele.addEventListener("click", function (e) {
        var countyId = e.target.id;
        var city_index = countyId[4];
        var county_index = countyId[11];
        var data = {
            type: 'post',
            url: 'data/street.json',
            data: countyId,
            success: function (data) {
                data = JSON.parse(data);
                for (var i = 0; i < data[city_index][county_index].length; i++) {
                    var li = document.createElement('li');
                    li.innerHTML = data[city_index][county_index][i];
                    street_ele.appendChild(li);
                    street_ele.parentNode.style.left = 0;
                }
                address += '-' + e.target.innerText;
                history.pushState('city', null, '');
            }
        };
        ajax(data);
    });

    street_ele.addEventListener("click", function (e) {
        street_ele.parentNode.style.left = '100%';
        county_ele.parentNode.style.left = '100%';
        city_ele.parentNode.style.left = '100%';
        street_ele.innerHTML = '';
        county_ele.innerHTML = '';
        city_ele.innerHTML = '';
        address += '-' + e.target.innerText;
        address_ele.innerText = address;
    });

    window.addEventListener('popstate', function (e) {
        var state;
        if (e.state == null)
            state = 'city';
        else
            state = e.state;
        var node = document.querySelector('#' + state);
        node.parentNode.style.left = '100%';
        node.innerHTML = '';
    });
})(window, document);