angular.module('app')
    .service('WebSocketSvc', function($rootScope, $window) {
        function websocketHost() {
            if ($window.location.protocol === "https:") {
                return "wss://" + window.location.host
            } else {
                return "ws://" + window.location.host
            }
        }


        var connection
        this.connect = function () {
            connection = new WebSocket(websocketHost())
            connection.onmessage = function (e) {
                //console.log(e)
                var payload = JSON.parse(e.data)
                $rootScope.$broadcast('ws:' + payload.topic, payload.data)
            }
        }

        this.send = function (topic, data) {
            var json = JSON.stringify({topic: topic, data: data})
            connection.send(json)
        }

    }).run(function (WebSocketSvc) {
    WebSocketSvc.connect()
})


/*
    .run(function ($rootScope) {
        var url = 'ws://localhost:3000'
        var connection = new WebSocket(url)

        connection.onopen = function () {
            console.log('WebSocket connected')
        }

        connection.onmessage = function (e) {
            console.log(e)
            var payload = JSON.parse(e.data)
            $rootScope.$broadcast('ws:' + payload.topic, payload.data)
        }

    })*/
