api = 'https://api.openweathermap.org/data/2.5/weather?q=Washington&appid=c5fa5112984ef1d54f8eb90a645bba36&units=metric'

var weatherApp = angular.module('weatherApp', []);

weatherApp.controller('WeatherCtrl', function ($scope, $http) {
    $scope.CurrentDate = new Date();

    $scope.searchWeather = function (){
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${$scope.search}&appid=c5fa5112984ef1d54f8eb90a645bba36&units=metric`;
        $scope.getApi(api);
    }

    $scope.getApi = function (api){
        $http.get(api).success(function (data) {
            if (data) {
                $scope.country = data.sys.country;
                $scope.city = data.name
                $scope.current = data.main.temp;
                $scope.temp_min = data.main.temp_min;
                $scope.temp_max = data.main.temp_max;
                $scope.wind_speed = data.wind.speed;
                $scope.clouds = data.clouds ? data.clouds.all : undefined;

                //Lay anh thoi tiet
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                if ($scope.clouds < 20) {
                    // https://ssl.gstatic.com/onebox/weather/128/sunny.png
                    $scope.img_url = baseUrl + 'sunny.png';

                } else if ($scope.clouds < 90) {
                    // https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png
                    $scope.img_url = baseUrl + 'partly_cloudy.png';
                } else {
                    //https://ssl.gstatic.com/onebox/weather/128/cloudy.png
                    $scope.img_url = baseUrl + 'cloudy.png';
                }
            }
        })
            .error(function (data, status) {
                console.log(data);
            });
    }
    $scope.getApi(api)


});