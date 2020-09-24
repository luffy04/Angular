var v;
var specs;
var z = 0;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
// var div_top=$('#tab ').offset().top();

var app = angular.module('mainapp', ['ngRoute', 'ngAnimate']);
app.directive('fileinput', function ($parse, $http) {
    return {
        link: function ($scope, element, attr) {
            element.on('change', function (event) {

                var file = event.target.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {

                };
                reader.readAsDataURL(file);
            })
        }
    }
});

// $(window).scroll(function() {
//     var window_top = $(window).scrollTop();
//     if (window_top >163 && window.location.pathname=="/") {
//         if (!$('#tab').is('.sticky')) {
//             $('#tab').addClass('sticky');
//         }
//     } else {
//         $('#tab').removeClass('sticky');
//     }
// });

app.controller('home', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.var = "Account"
    $scope.home = function () {
        window.location.href = "/";
    }
    $scope.project = function () {
        console.log('let');
        window.location.href = "/project.html"
    }
    $scope.client = function () {
        window.location.href = "/client.html";
    }
    $scope.code = function () {
        window.location.href = "/code.html";
    }
    $scope.going = function (page) {
        if (page == "login") {
            window.location.href = "/client.html";
        }
        else {
            window.location.href = "/register.html"
        }
    }
}]);
app.controller('mains', ['$scope', '$http', function ($scope, $http) {
    $scope.all = [
        { image: 'nf/c++.jpg', language: 'C++' },
        { image: 'nf/java.png', language: 'Java' },
        { image: 'nf/python.png', language: 'Python' },
        { image: 'nf/c.jpg', language: 'C' },
        { image: 'nf/js.png', language: 'JavaScript' },
        { image: 'nf/c2.png', language: 'C#' },
        { image: 'nf/php.png', language: 'PHP' },
        { image: 'nf/nodejs.jpg', language: 'NodeJs' },
        { image: 'nf/react.png', language: 'ReactJs' },
        { image: 'nf/angularjs.png', language: 'AngularJS' },
        { image: 'nf/html.jpg', language: 'HTML' },
        { image: 'nf/css.jpg', language: 'CSS' },
        { image: 'nf/ruby.png', language: 'Ruby' },
        { image: 'nf/sql.png', language: 'SQL' },
        { image: 'nf/jquery.jpg', language: 'JQUERY' },
    ]
}])

app.controller('error', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $scope.var = "Account"
    $scope.home = function () {
        window.location.href = "/";
    }
    $scope.project = function () {
        console.log('let');
        window.location.href = "/project.html"
    }
    $scope.projectejs = function () {
        console.log('prove');
        $http.get('/project').then(function (response) {
            console.log(response);
        })
    }
    $scope.client = function () {
        window.location.href = "/client.html";
    }
    $scope.code = function () {
        window.location.href = "/code.html";
    }
    $scope.going = function (page) {
        if (page == "login") {
            window.location.href = "/client.html";
        }
        else {
            window.location.href = "/register.html"
        }
    }
    $scope.quote = [];
    $scope.init = function () {
        var req = {
            url: '/get1',
            method: 'get'
        }
        $http(req).then(function (response) {
            console.log(response.data.length)
            for (var i = 0; i < response.data.length; i++) {
                var obj = {};
                $scope.x = 0;   
                var a=response.data[i].file1;
                var b=response.data[i].file2;
                var c=response.data[i].file3;
                var d=response.data[i].file4;
                var e=response.data[i].file5;
                if(a!=""){ 
                    $scope.x++;
                    response.data[i].file1=`<button id='doc1' class="fas fa-file-alt"></button>` + `<a href="#!code" onclick="angular.element(this).scope().to(this)" id="btn" class='file1'>${response.data[i].file1}</a>`;
                }
                if(b!=""){
                    $scope.x++;
                    response.data[i].file2=`<button id='doc2' class="fas fa-file-alt"></button>` + `<a href="#!code" onclick="angular.element(this).scope().to(this)" id="btn" class='file2'>${response.data[i].file2}</a>`;
                }
                if(c!="") {
                    $scope.x++;
                    response.data[i].file3=`<button id='doc3' class="fas fa-file-alt"></button>` + `<a href="#!code" onclick="angular.element(this).scope().to(this)" id="btn" class='file3'>${response.data[i].file3}</a>`;
                }
                if(d!="") {
                    $scope.x++;
                    response.data[i].file4=`<button id='doc4' class="fas fa-file-alt"></button>` + `<a href="#!code" onclick="angular.element(this).scope().to(this)" id="btn" class='file4'>${response.data[i].file4}</a>`;
                }
                if(e!="") {
                    $scope.x++;
                    response.data[i].file5=`<button id='doc5' class="fas fa-file-alt"></button>` + `<a href="#!code" onclick="angular.element(this).scope().to(this)" id="btn" class='file5'>${response.data[i].file5}</a>`;
                }
                if($scope.x==0) $scope.x="No"; 
                if (response.data[i].price != "FREE") {
                    response.data[i].price = '₹' + response.data[i].price
                }
                // if(response.data[i].Description=="") response.data[i].Description="No Description Added!!!"
                
                if(response.data[i].Description.length>80){
                    $scope.description=response.data[i].Description;
                    $scope.description=$scope.description.substring(0,80)+'....';
                }
                obj['username'] = response.data[i].username;
                obj['tag'] = response.data[i].tag;
                obj['status'] = response.data[i].status;
                obj['request'] = response.data[i].request;
                obj['file1'] =response.data[i].file1;
                obj['file2'] =response.data[i].file2;
                obj['file3'] =response.data[i].file3;
                obj['file4'] =response.data[i].file4;
                obj['file5'] =response.data[i].file5;
                obj['description'] = response.data[i].Description;
                obj['price'] = response.data[i].price;
                obj['date'] = response.data[i].date;
                obj['month'] = response.data[i].month;
                obj['down']='block';
                obj['revert']='none';
                obj['js']="none";
                obj['index']="none";
                $scope.quote.push(obj);
            }
        }, function (error) {
            console.log(error);
        })
    }
    console.log($scope.quote);
    $scope.add1 = false;
    $scope.suxhide = false;
    $scope.erx = false;
    $scope.falsy=true;
    $scope.truce=false;
    $scope.down=true;
    $scope.revert=false;
    $scope.words = "100";
    $scope.count = function () {
        $scope.words = 200 - $('#inp').html().length;
    }
    $scope.language = "C++"
    $scope.files = [
        { doc: 'doc1', language: 'File1:', file: `none`, remove: '0',name:'' },
        { doc: 'doc2', language: 'File2:', file: 'none', remove: '0',name:'' },
        { doc: 'doc3', language: 'File3:', file: 'none', remove: '0',name:'' },
        { doc: 'doc4', language: 'File4:', file: 'none', remove: '0',name:'' },
        { doc: 'doc5', language: 'File5:', file: 'none', remove: '0',name:'' }
    ]

    $scope.uploading = function () {
        $scope.add1 = !$scope.add1;
    }
    $scope.uploadFile = function (files, el) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            var req = {
                url: '/upload',
                method: 'POST',
                data: { data: evt.target.result, name: files[0].name }
            }
            $http(req).then(function (response) {
                $scope.files[$(el).parent().parent().index()].file = `<button id='doc${$(el).parent().parent().index() + 1}' class="fas fa-file-alt"></button>` + `<button onclick="angular.element(this).scope().to(this)" id="btn" class='file${$(el).parent().parent().index() + 1}'>${response.data}</button>`;
                $scope.files[$(el).parent().parent().index()].remove = '1';
                $scope.files[$(el).parent().parent().index()].name=response.data; 
                console.log($scope.files);                                                                                                                      
            })
        }
        reader.readAsDataURL(files[0]);
    }
    $scope.to = function (page) {
        console.log($(page).parent().parent().parent().parent().index());
        $scope.quote[$(page).parent().parent().parent().parent().index()].index="none";
        $scope.quote[$(page).parent().parent().parent().parent().index()].index="block";
        console.log($scope.quote)
        v = $(page).text();
        // window.open('project.html/#!code','_self')
    }
    $scope.create = function (el) {
        $scope.files[el].remove = "0";
        $scope.files[el].file = "none";
        $scope.files[el].name="";
    }
    $scope.room = "fool";
    $scope.send = function () {
        var x = new Date();
        var req = {
            url: '/send',
            method: 'post',
            data: {
                user: 'anuj', status: 'no', request: '', tag: $scope.language, file1: $scope.files[0].name, file2: $scope.files[1].name,
                file3: $scope.files[2].name, file4: $scope.files[3].name, file5: $scope.files[4].name, description: angular.element('#inp').text(),
                price: angular.element('#price').val(), date: x.getDate(), month: monthNames[x.getMonth()]
            }
        }
        if(req.data.description=="") req.data.description="No Description Added!!!"
        if(angular.element('.file1').text()==""&&angular.element('.file2').text()==""&&angular.element('.file3').text()==""
            &&angular.element('.file4').text()==""&&angular.element('.file5').text()==""){
            $scope.wrong="Attach A File To Proceed!!"
            $scope.erx=true;
        }
        else{
            $http(req).then(function (response) {
                $scope.suxhide = true;
                console.log(response);
            })
        }
    }
    $scope.dropdown=function(el){       
        $(el).parent().parent().css('height','14vh');
    }
    $scope.drop=function(el){
        $scope.quote[el].down="none";
        $scope.quote[el].revert="block";
        $scope.quote[el].js="block";
    }
    $scope.up=function(el){
        $scope.quote[el].down="block";
        $scope.quote[el].revert="none";
        $scope.quote[el].js="none";
    }
    $scope.dropup=function(el){
        $(el).parent().parent().css('height','10vh');
    }
    $scope.suchide = function () {
        $scope.suxhide = !$scope.suxhide;
    }
    $scope.errhide = function () {
        $scope.erx = !$scope.erx;
    }
}])

app.directive('compile', ['$compile', function ($compile) {
    return function (scope, element, attrs) {
        scope.$watch(
            function (scope) {
                return scope.$eval(attrs.compile);
            },
            function (value) {
                element.html(value);
                $compile(element.contents())(scope);
            }
        );
    };
}]);
app.controller('app', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.foods = [];
    $scope.uploadFile = function (files) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            var req = {
                url: '/upload',
                method: 'POST',
                data: { data: evt.target.result, name: files[0].name }
            }
            $http(req).then(function (response) {
                $scope.foods.push(response.data);
                console.log($scope.foods)
            })
        }
        reader.readAsDataURL(files[0]);
    }
    $scope.to = function (page) {
        v = page;
        console.log(page)
        window.open('?', '_self')
    }
}])
app.controller('app1', ['$scope', '$log', '$http', function ($scope, $log, $http) {
    $http.get(`files/${v}`).then(function (response) {
        $scope.result = response.data;
    })
}])
app.controller('thing', ['$scope', '$log', '$http', function ($scope, $log, $http) {
    // $scope.red=function(){
    // var req={
    //     url:'/through',
    //     method:'get'
    // }
    // $scope.every=[
    //     {name:'sanji',message:'<b>Message</b>'}
    // ];
    // $http(req).then(function(response){
    //     for(var i=0;i<response.data.length;i++){
    //         var obj = {};
    //         obj['name'] = response.data[i].name;
    //         obj['message'] =response.data[i].message 
    //         $scope.every.push(obj);
    //         console.log($scope.every)
    //     }
    // })
    $scope.foods=[];
    $scope.uploadFile = function (files) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            var req = {
                url: '/upload',
                method: 'POST',
                data: { data: evt.target.result, name: files[0].name }
            }
            $http(req).then(function (response) {
                console.log(response)
               $scope.foods.push(response.data);
            })
        }
        reader.readAsDataURL(files[0]);
    }
    $scope.mail = function () {
        $http.get('/mail').then(function (response) {
            console.log(response);
        })
    }
    $scope.redirect = function () {
        $http.get('/redirect').then(function (response) {
            window.location.href = "/" + response.data;
        })
    }
    // } 
}])
app.controller('login', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.name = "anuj";
    $scope.Email = "anujjha041998@gmail.com";
    $scope.regpassword = "luffy";
    $scope.confirmpassword = "luffy";
    $scope.username = "anuj";
    $scope.password = "luffy";
    $scope.username1 = "anuj";
    $scope.Email1 = "anujjha041998@gmail.com"
    $scope.myVar1 = true;
    $scope.myVar2 = false;
    $scope.register = function () {
        var req = {
            url: '/register',
            method: 'POST',
            data: { user: $scope.name, mail: $scope.Email, pass: $scope.regpassword }
        }
        $http(req).then(function (response) {
            console.log(response);
        })
    }
    $scope.login = function () {
        var req = {
            url: '/login',
            method: 'POST',
            data: { username: $scope.username, password: $scope.password }
        }
        $http(req).then(function (response) {
            console.log(response)
            window.location.href = "/";
        })
    }
    $scope.forget = function () {
        $scope.myVar1 = !$scope.myVar1;
        $scope.myVar2 = !$scope.myVar2;
    }
    $scope.recovery = function () {
        IDGenerator();
        console.log(specs);
        var req = {
            url: '/recovery',
            method: 'post',
            data: { user: $scope.username1, Email: $scope.Email1, pass: specs }
        }
        $http(req).then(function (response) {
            console.log(response)
        }, function (response) {
            console.log(response);
        })
    }
    function IDGenerator() {
        this.length = 8;
        this.timestamp = +new Date;
        trap();

        function _getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function trap() {
            var ts = this.timestamp.toString();
            var parts = ts.split("").reverse();
            var id = "a";

            for (var i = 0; i < this.length; ++i) {
                var index = _getRandomInt(0, parts.length - 1);
                id += parts[index];
            }
            specs = id;
            return id;
        }


    }
}])
app.filter('trustAsHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when(`/code`, {
        templateUrl: 'http.html',
        controller: 'app1'
    })
    $routeProvider.when('/project', {
        templateUrl: 'project.html'
    })
}])