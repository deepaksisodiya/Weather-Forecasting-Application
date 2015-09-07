/**
 * Created by Deepak Sisodiya on 07/09/15.
 */

app.controller('weatherController', function ($scope, $http) {

  $scope.appName = 'Weather Forecasting Application';
  $scope.cityNamesArray = [];
  $scope.allCityNamesWeather = [];

  $scope.searchWeatherForCity = function () {
    console.log($scope.cityName);
    console.log($scope.selectedCity);
    if($scope.cityName && $scope.selectedCity) {
      var splitCityAndCountry = $scope.cityName.split(",");
      var city = splitCityAndCountry[0];
      var country = splitCityAndCountry[2];
      var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',' + country + '&cnt=12&APPID=952ed8aca5de5541d576a052ff0d0cf2';
      $scope.getWeather(url);
    } else {
      alert('Please Select City From DropDown by clicking');
    }
  };

  $scope.getWeather = function (url) {
    $http.get(url, {
      headers: {
        'Content-type': 'application/json'
      }
    }).success(function (weather) {
      if(weather.message === "Error: Not found city") {
        alert('Sorry, No City Found');
        $scope.cityName = '';
      } else {
        $scope.cityNamesArray.push($scope.cityName);
        $scope.allCityNamesWeather.push(weather);
        $scope.cityName = '';
      }
    });
  };

  $scope.removeCity = function (cityName) {
    if($scope.cityNamesArray.length === 1) {
      $scope.cityNamesArray.splice(0);
    } else {
      if($scope.cityNamesArray.indexOf(cityName) !== -1) {
        var index = $scope.cityNamesArray.indexOf(cityName);
        $scope.cityNamesArray.splice(index, 1);
      }
    }
    $scope.allCityNamesWeather.forEach(function (weather, index, allArray) {
      var city = weather.city.name;
      var findCity = cityName.indexOf(city);
      if(findCity !== -1) {
        $scope.allCityNamesWeather.splice(index, 1);
      }
    });
  };
  
});