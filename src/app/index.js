(function() {
    'use strict';
    angular.module('telstraApi', [])
        .factory('TelstraSms', TelstraSms);

    TelstraSms.$inject = ['$http', '$q'];

    /* @ngInject */
    function TelstraSms($http, $q) {

        var baseUrl = 'https://api.telstra.com/v1/'
        var service = {
            init: init,
            token: null,
            sendSms: sendSms,
            getMessageStatus: getMessageStatus,
            getMessageResponse:getMessageResponse
        };
        return service;

        ////////////////

        function init(settings) {
            var deferred = $q.defer();
            $http({
                url: baseUrl + 'oauth/token',
                params: {
                    'client_id': settings.APP_KEY,
                    'client_secret': settings.APP_SECRET,
                    'grant_type': 'client_credentials',
                    scope: 'SMS'

                }
            }).
            success(function(data, status, headers, config) {
                console.log('init OK token:', data);
                service.token = data.access_token;
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log('get error', data);
                deferred.reject(data);
            });
            return deferred.promise;
        }

        function sendSms(settings) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: baseUrl + 'sms/messages',
                headers: {
                    'Authorization': 'Bearer ' + service.token,
                    'Content-Type': 'application/json'
                },
                data: {
                    to: settings.to,
                    body: settings.body
                }
            }).
            success(function(data, status, headers, config) {
                console.log('sendSms OK messageId:', data);
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log('sendSms error', data);
                deferred.reject(data);
            });
            return deferred.promise;
        }

        function getMessageStatus(messageId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl + 'sms/messages/' + messageId,
                headers: {
                    'Authorization': 'Bearer ' + service.token,
                    'Content-Type': 'application/json'
                }
            }).
            success(function(data, status, headers, config) {
                console.log('getMessageStatus OK:', data);
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log('getMessageStatus error', data);
                deferred.reject(data);
            });
            return deferred.promise;
        }


        function getMessageResponse(messageId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl + 'sms/messages/' + messageId + '/response',
                headers: {
                    'Authorization': 'Bearer ' + service.token,
                    'Content-Type': 'application/json'
                }
            }).
            success(function(data, status, headers, config) {
                console.log('getMessageResponse OK:', data);
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log('getMessageResponse error', data);
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }






})();