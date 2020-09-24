// import index from './index.js';
// '₹'
var v;
var x;
var y;
var xy;
var specs;
var user;
var z = 0;
var px;
var socket =io.connect();
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];


var firebaseConfig = {
    apiKey: "AIzaSyD6QQL3mlJZYrufXpmZCrl_lhZj99_IxGY",
    authDomain: "mynew-4e6e5.firebaseapp.com",
    databaseURL: "https://mynew-4e6e5.firebaseio.com",
    projectId: "mynew-4e6e5",
    storageBucket: "mynew-4e6e5.appspot.com",
    messagingSenderId: "651010853919",
};
firebase.initializeApp(firebaseConfig);

var app = angular.module('mainapp', ['ngAnimate','ui.router']);
console.log("put");

socket.on('putvalue',function (username,email) {
    console.log("arora");
    localStorage.setItem('account','none');
    localStorage.setItem('loggedIn','inline-block')
    // $rootScope.user=response.data.username;
    localStorage.setItem('user',username);
    localStorage.setItem('email',email);
})

socket.on('output',function(data,name,$https){
    $.ajax({
        url:'/profile',
        method:'POST',
        data:{pic:data,name:name},
        success:function(data){
            console.log(data)
        }
    })  
    console.log('done')
})

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
$(window).scroll(function() {
    var window_top = $(window).scrollTop();
    if (window_top >163 && window.location.pathname=="/") {
        if (!$('#tab').is('.sticky')) {
            $('#tab').addClass('sticky');
        }
    } else {
        $('#tab').removeClass('sticky');
    }
});

app.controller('home', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    
    $scope.myVar2 = false;
    $scope.var = "Account"
    $scope.home = function () {
        window.location.href = "/";
    }
    $scope.project = function () {
        console.log('let');
        window.location.href = "/project.html"
    }
    $scope.queries = function () {
        console.log('let');
        window.location.href = "/queries.html"
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

app.controller('error', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location,$rootScope) {
    $scope.redirectTo = function (path) {
        $location.path(path);
    }
    // $scope.project = function (path) {
    //     $location.path(path);
    // }
    // $scope.queries=function(path){
    //     $location.path(path);
    // }
    // $scope.client = function (path) {
    //     $location.path(path);
    // }
    // $scope.code = function (path) {
    //     $location.path(path);
    // }
    // $scope.account1 = function (path) {
    //     $location.path(path);
    // }
    // $scope.clientarea=function(path){
    //     $location.path(path);
    // }
    $scope.login1=function(){
        $scope.login=true;
        $scope.register=false;
        $scope.font1='5vw';
        $scope.font2='3.5vw';
        $scope.opacity1='1';
        $scope.opacity2='0.7';
    }
    $scope.click=function(el){
        $(el).css('background','red');
    }
    $scope.register1=function(){
        $scope.login=false;
        $scope.register=true;
        $scope.font1='3.5vw';
        $scope.font2='5vw';
        $scope.opacity1='0.7';
        $scope.opacity2='1';
    }
    $scope.username = "anuj";
    $scope.password = "luffy";
    $scope.username1 = "anuj";
    $scope.Email1 = "anujjha041998@gmail.com"
    $scope.name = "anuj";
    $scope.opacity1='1';
    $scope.opacity2='0.7';
    $scope.font1='5vw';
    $scope.font2='3.5vw';
    $scope.Email = "anujjha041998@gmail.com";
    $scope.regpassword = "luffy";
    $scope.confirmpassword = "luffy";
    $scope.words = "100";
    $rootScope.account=localStorage.getItem('account') || 'inline-block';
    $rootScope.not_account=localStorage.getItem('loggedIn') || 'none';
    $rootScope.user=localStorage.getItem('user') || "";
    $rootScope.email=localStorage.getItem('email') || "";
    $rootScope.quote = [];
    $scope.init = function () {
        var req = {
            url: '/get1',
            method: 'get'
        }
        $http(req).then(function (response) {
            // console.log($rootScope.email)
            for (var i = response.data.length-1; i >= 0; i--) {
                var flag=0;
                var obj = {};
                $scope.x = 0;
                $scope.px=1;
                var a=response.data[i].file1;
                var b=response.data[i].file2;
                var c=response.data[i].file3;
                var d=response.data[i].file4;
                var e=response.data[i].file5;
                if(a!=""){ 
                    $scope.x++;
                    response.data[i].file1=`<button id='doc1' class="fas fa-file-alt"></button>` + `<a onclick="angular.element(this).scope().to(this)" href="/code" id="btn" class='file1'>${response.data[i].file1}</a>`;
                }
                if(b!=""){
                    $scope.x++;
                    response.data[i].file2=`<button id='doc2' class="fas fa-file-alt"></button>` + `<a onclick="angular.element(this).scope().to(this)" href="/code" id="btn" class='file2'>${response.data[i].file2}</a>`;
                }
                if(c!="") {
                    $scope.x++;
                    response.data[i].file3=`<button id='doc3' class="fas fa-file-alt"></button>` + `<a onclick="angular.element(this).scope().to(this)" href="/code" id="btn" class='file3'>${response.data[i].file3}</a>`;
                }
                if(d!="") {
                    $scope.x++;
                    response.data[i].file4=`<button id='doc4' class="fas fa-file-alt"></button>` + `<a onclick="angular.element(this).scope().to(this)" href="/code" id="btn" class='file4'>${response.data[i].file4}</a>`;
                }
                if(e!="") {
                    $scope.x++;
                    response.data[i].file5=`<button id='doc5' class="fas fa-file-alt"></button>` + `<a onclick="angular.element(this).scope().to(this)" href="/code" id="btn" class='file5'>${response.data[i].file5}</a>`;
                }
                if($scope.x==0) $scope.x="No"; 
                if (response.data[i].price != "FREE") {
                    response.data[i].price = '₹' + response.data[i].price
                }
                if(response.data[i].Description.length>80){
                    $scope.description=response.data[i].Description;
                    $scope.description=$scope.description.substring(0,80)+'....';
                }
                obj['key']=response.data[i].id;
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
                obj['count']=$scope.x;
                obj['user1']=response.data[i].request1;
                obj['user1pic']=response.data[i].request1pic;
                obj['user1msg']=response.data[i].request1msg;
                obj['user2']=response.data[i].request2;
                obj['user2pic']=response.data[i].request2pic;
                obj['user2msg']=response.data[i].request2msg;
                obj['user3']=response.data[i].request3;
                obj['user3pic']=response.data[i].request3pic;
                obj['user3msg']=response.data[i].request3msg;
                if($rootScope.email==response.data[i].email || $rootScope.account=='inline-block' || response.data[i].status=="yes"||(response.data[i].request1 !="" && response.data[i].request2 !="" && response.data[i].request3 !="")){
                    obj['apply']='none';
                    flag=1;
                } 
                else if(response.data[i].request1email==$rootScope.email || response.data[i].request2email==$rootScope.email || response.data[i].request3email==$rootScope.email){
                    obj['apply']='inline-block';
                    console.log("first")
                    $scope.applybtn="Applied";
                    $scope.applycolor="chartreuse"
                    $scope.disable="true"; 
                    flag=1;
                }
                console.log(flag);
                if(flag==0){ 
                    console.log("secod")
                    obj['apply']='inline-block';
                    $scope.applybtn="Apply";
                    $scope.applycolor="red";
                    $scope.disable="false";
                    }
                    
                if(response.data[i].request1!=""){
                    $scope.px++;
                }
                if(response.data[i].request2!=""){
                    $scope.px++;
                }
                if(response.data[i].request3!=""){
                    $scope.px++;
                }
                obj['incre']=$scope.px;
                $rootScope.quote.push(obj);
            }
        }, function (error) {
            console.log(error);
        })
    }
    console.log($rootScope.quote);
    $scope.add1 = false;
    $scope.myVar1 = true;
    $scope.suxhide = false;
    $scope.login=true;
    $scope.register=false;
    $scope.erx = false;
    $scope.falsy=true;
    $scope.truce=false;
    $scope.down=true;
    $scope.revert=false;
    $scope.ascending=false;
    $scope.descending=false;
    $scope.message=false;
    $scope.confirm=false;
    $scope.count = function () {
        $scope.words = 200 - $('#inp').html().length;
    };
    $scope.language = "C++";
    $scope.files = [
        { doc: 'doc1', language: 'File1:', file: `none`, remove: '0',name:'' },
        { doc: 'doc2', language: 'File2:', file: 'none', remove: '0',name:'' },
        { doc: 'doc3', language: 'File3:', file: 'none', remove: '0',name:'' },
        { doc: 'doc4', language: 'File4:', file: 'none', remove: '0',name:'' },
        { doc: 'doc5', language: 'File5:', file: 'none', remove: '0',name:'' }
    ];

    $scope.uploading = function () {
        if($rootScope.not_account=="none"){
            Snackbar.show({
                text:'You Need to Login First',
                pos:'bottom-center',
                actionText:'Ok',
            });
        }
        else
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
    $scope.profile=function () {
        var req={
            url:'/load',
            method:'POST',
            data:{name:localStorage.getItem('email')}
        }
        $http(req).then(function(response){
            localStorage.setItem('profile',response.data[0].pic)
            $rootScope.image=response.data[0].pic;
        })
    }
    $scope.change=function(files,el) {
        var reader=new FileReader();
        reader.onload =function(evt){
            var req={
                url:'/profile',
                method:'POST',
                data:{pic:evt.target.result,name:$rootScope.email,picname:files[0].name}
            }
            $http(req).then(function(response){
                console.log(response);
            })
        }
        reader.readAsDataURL(files[0])
    }


    $scope.to = function (page) {
        for(var i=0;i<$rootScope.quote.length;i++) $rootScope.quote[i].index="none"; 
        $rootScope.quote[$(page).parent().parent().parent().parent().index()].index="block";
        $rootScope.file1=$rootScope.quote[$(page).parent().parent().parent().parent().index()].file1;
        $rootScope.file2=$rootScope.quote[$(page).parent().parent().parent().parent().index()].file2;
        $rootScope.file3=$rootScope.quote[$(page).parent().parent().parent().parent().index()].file3;
        $rootScope.file4=$rootScope.quote[$(page).parent().parent().parent().parent().index()].file4;
        $rootScope.file5=$rootScope.quote[$(page).parent().parent().parent().parent().index()].file5;
        $rootScope.holder=$scope.quote[$(page).parent().parent().parent().parent().index()].username;
        localStorage.setItem('file',$(page).text());
        localStorage.setItem('holder',$scope.quote[$(page).parent().parent().parent().parent().index()].username);
        localStorage.setItem('query',JSON.stringify($rootScope.quote[$(page).parent().parent().parent().parent().index()]));
    }

    $scope.create = function (el) {
        $scope.files[el].remove = "0";
        $scope.files[el].file = "none";
        $scope.files[el].name="";
        console.log($scope.files);
    }
    $scope.room = "fool";
    $scope.send = function () {
        var x = new Date();
        var req = {
            url: '/send',
            method: 'post',
            data: {
                user: $rootScope.user, email:localStorage.getItem('email'),status: 'no', request1: '',request2:'',request3:'',tag: $scope.language, file1: $scope.files[0].name, file2: $scope.files[1].name,
                file3: $scope.files[2].name, file4: $scope.files[3].name, file5: $scope.files[4].name, description: angular.element(document.querySelector('#inp')).text(),
                price:angular.element(document.querySelector('#price')).val(), date: x.getDate(), month: monthNames[x.getMonth()]
            }
        }
        if(req.data.description=="") req.data.description="No Description Added!!!"
        if($scope.files[0].name==""&&$scope.files[1].name==""&&$scope.files[2].name==""&&$scope.files[3].name==""&&$scope.files[4].name==""){
            $scope.wrong="Attach A File To Proceed!!"
            $scope.erx=true;
        }
        else if($rootScope.not_account=="none"){
            $scope.wrong="You Need To Login First";
            $scope.erx=true;
        }
        else{
            console.log(req.data)
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
    $scope.asc=function(){
        var temp;
        $scope.ascending=true;
        for(var i=0;i<$scope.quote.length;i++){
            $scope.flag=[];
            if($scope.quote[i].price!="FREE"){
                for(var j=0;j<($scope.quote[i].price.length-1);j++){
                    $scope.flag[j]=$scope.quote[i].price[j+1];
                }
                $scope.quote[i].price="";
                for(var k=0;k<$scope.flag.length;k++){
                    $scope.quote[i].price=$scope.quote[i].price+$scope.flag[k];
                }               
            }
        }
        for(var i=0;i<($scope.quote.length-1);i++){
            for(var j=0;j<($scope.quote.length-i-1);j++){
                if(Math.abs($scope.quote[j].price)>Math.abs($scope.quote[j+1].price)){
                    temp=$scope.quote[j];
                    $scope.quote[j]=$scope.quote[j+1];
                    $scope.quote[j+1]=temp;
                }
            }
        }
        for(var i=0;i<$scope.quote.length;i++){
            if($scope.quote[i].price!="FREE")
                $scope.quote[i].price='₹'+$scope.quote[i].price;
        }
    }   
    $scope.des=function(){
        var temp;
        $scope.descending=true;
        for(var i=0;i<$scope.quote.length;i++){
            $scope.flag=[];
            if($scope.quote[i].price!="FREE"){
                for(var j=0;j<($scope.quote[i].price.length-1);j++){
                    $scope.flag[j]=$scope.quote[i].price[j+1];
                }
                $scope.quote[i].price="";
                for(var k=0;k<$scope.flag.length;k++){
                    $scope.quote[i].price=$scope.quote[i].price+$scope.flag[k];
                }               
            }
        }
        for(var i=0;i<($scope.quote.length-1);i++){
            for(var j=0;j<($scope.quote.length-i-1);j++){
                if(Math.abs($scope.quote[j].price)<Math.abs($scope.quote[j+1].price)){
                    temp=$scope.quote[j];
                    $scope.quote[j]=$scope.quote[j+1];
                    $scope.quote[j+1]=temp;
                }
            }
        }
        for(var i=0;i<$scope.quote.length;i++){
            if($scope.quote[i].price!="FREE")
            $scope.quote[i].price='₹'+$scope.quote[i].price;
        }
    }
    $scope.registersecure = function () {
        var req = {
            url: '/register',
            method: 'POST',
            data: { user: $scope.name, mail: $scope.Email, pass: $scope.regpassword }
        }
        $http(req).then(function (response) {
            console.log(response);
        })
    }
    $scope.loginsecure = function () {
        var req = {
            url: '/login',
            method: 'POST',
            data: { username: $scope.username, password: $scope.password }
        }
        $http(req).then(function (response) {
            if(response.data!='failure'){
                $rootScope.account="none";
                $rootScope.not_account="inline-block";
                $rootScope.email=response.data.email;
                localStorage.setItem('account','none');
                localStorage.setItem('loggedIn','inline-block')
                $rootScope.user=response.data.username;
                localStorage.setItem('user',response.data.username);
                localStorage.setItem('email',response.data.email);
                $location.path('/clientArea');
            }
            else{
                Snackbar.show({
                    text:'Wrong Username And Password',
                    pos:'top-center',
                })
            }
        },function(response){

        })
    }
    
    $scope.google=function(){
        base=new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(base).then(function(result){
            var responseInfo=result.additionalUserInfo.profile;
            if(result){
                var req={
                    url:'/getgoogle',
                    method:"POST",
                    data:{email:responseInfo.email}
                }
                $http(req).then(function(response){
                    console.log(response); 
                    $rootScope.account="none";
                    $rootScope.not_account="inline-block";
                    $rootScope.email=response.data[0].email;
                    localStorage.setItem('account','none');
                    localStorage.setItem('loggedIn','inline-block')
                    $rootScope.user=response.data[0].username;
                    localStorage.setItem('user',response.data[0].username);
                    localStorage.setItem('email',response.data[0].email);
                    $location.path('/clientArea');
                })
                console.log("already");
            }else{
                var req={
                    url:'/registergoogle',
                    method:"POST",
                    data:{username:responseInfo.name,mail:responseInfo.email,password:responseInfo.id,pic:responseInfo.picture}
                }
                $http(req).then(function(response){
                    $rootScope.account="none";
                    $rootScope.not_account="inline-block";
                    $rootScope.email=responseInfo.email;
                    localStorage.setItem('account','none');
                    localStorage.setItem('loggedIn','inline-block')
                    $rootScope.user=responseInfo.name;
                    localStorage.setItem('user',responseInfo.name);
                    localStorage.setItem('email',responseInfo.email);
                    $location.path('/clientArea');
                })
            }
        }).catch(function(err){
            console.log(err);
        })  
    }
    $scope.logout=function(){
        $rootScope.account="inline-block";
        $rootScope.not_account="none";
        localStorage.setItem('account','inline-block');
        localStorage.setItem('loggedIn','none')
        localStorage.setItem('user',"");
        localStorage.setItem('email',"");
        $location.path('/')
    }
    $scope.cancel=function(){
        $scope.message=false;
    }
    $scope.ok=function(){
        console.log(user);
        var req={
            url:'/push',
            method:'POST',
            data:{key:y,pic:localStorage.getItem('profile'),email:$rootScope.email
                ,incre:xy,message:angular.element(document.querySelector('#message')).text()}
        }
        // console.log(req.data)
        $http(req).then(function(response){
            $scope.message=false;
            console.log(response);
            angular.element(x.srcElement).css('background','chartreuse');
            angular.element(x.srcElement).css('border','chartreuse');
        },function(error){
            console.log(error);
        })
    }
    $scope.apply = function(el){
        console.log($rootScope.quote[$(el).closest("li").index()].key);
        y=$rootScope.quote[$(el).closest("li").index()].key;
        xy=$rootScope.quote[$(el).closest("li").index()].incre;
    };
    $scope.apply1=function(prop,el){
        // console.log((el));
        if($rootScope.quote[el].incre>3){
            Snackbar.show({text:"Maximum Reached..",showAction:false,pos:'top-center'})
        }else{
            $scope.message=false;
             x= prop;
            $scope.message=true;
            user=$scope.quote[el].username;
        }

    };
    function settrue(cb){
        console.log('success');

        cb('successful');
    }
    $scope.forget = function () {
        $scope.myVar1 = !$scope.myVar1;
        $scope.myVar2 = !$scope.myVar2;
    }

    $scope.showinfo=function(el){
        $(el).next().toggle();
    } 

    $scope.showinfo1=function(el){
        if($rootScope.quote[el].username==$rootScope.user){
            $scope.confirm=true;
        }
    }

    $scope.confirmuser=function(el){
        var p=$rootScope.quote[$(el).closest("li").index()].price;
        p=p.split('');
        p.splice(0,1)
        p=p.join('');
        var req={
            url:'/confirm',
            method:'POST',
            data:{username:$rootScope.quote[$(el).closest("li").index()].username,tag:$rootScope.quote[$(el).closest("li").index()].tag,file1:$(el).closest("li").find(".file1").text(),file2:$(el).closest("li").find(".file2").text(),
                // file3:$(el).closest("li").find(".file3").text(),file4:$(el).closest("li").find(".file4").text(),file5:$(el).closest("li").find(".file5").text(),
                // Description:$rootScope.quote[$(el).closest("li").index()].description,price:p,date:$rootScope.quote[$(el).closest("li").index()].date,month:$rootScope.quote[$(el).closest("li").index()].month,
                key:$rootScope.quote[$(el).closest("li").index()].key
            }
        }
        $http(req).then(function(response){
            Snackbar.show({text:'Done',pos:'top-center',actionText:'Ok'})
        })
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
    console.log("me tp")
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
    
}])

app.controller('app1', ['$scope', '$log', '$http', function ($scope, $log, $http,$rootScope) {
    $scope.holder=localStorage.getItem('holder');
    $scope.file1=JSON.parse(localStorage.getItem('query')).file1;
    $scope.file2=JSON.parse(localStorage.getItem('query')).file2;
    $scope.file3=JSON.parse(localStorage.getItem('query')).file3;
    $scope.file4=JSON.parse(localStorage.getItem('query')).file4;
    $scope.file5=JSON.parse(localStorage.getItem('query')).file5;
    $http.get(`files/${localStorage.getItem('file')}`).then(function (response) {
        $scope.result=response.data;
    })

    $scope.to=function(page){
        console.log('here also')
        localStorage.setItem('file',$(page).text());
        $http.get(`files/${localStorage.getItem('file')}`).then(function (response) {
            $scope.result=response.data;
        })
    }
}])

app.controller('thing', ['$scope', '$log', '$http', function ($scope, $log, $http) {
    $scope.show=function(){
        Snackbar.show({text:'Example bro',pos:'bottom-center',actionText:'Thanks!'})
    }
    $scope.sendreq=function(){
        var req={
            url:'/accept',
            method:'POST',
            data:''
        }
        $http(req).then(function(response){
            console.log(response)
        })
    }
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
}])

app.controller('login', ['$scope', '$http', '$location', function ($scope, $http, $location) {
}])

app.filter('trustAsHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

app.config(['$stateProvider','$locationProvider',function($stateProvider,$locationProvider){
    $stateProvider
    .state('home',{
        url:'/',
        templateUrl:'home.html'
    })
    .state('code',{
        url:'/code',
        templateUrl:'http.html',
        controller:'app1'
    })
    .state('project',{
        url:'/project',
        templateUrl:'project.html'
    })
    .state('account',{
        url:'/account',
        templateUrl:'client.html'
    })
    .state('language',{
        url:'/language',
        templateUrl:'code.html'
    })
    .state('queries',{
        url:'/queries',
        templateUrl:'queries.html'
    })
    .state('clientArea',{
        url:'/clientArea',
        templateUrl:'clientarea.html'
    })
    $locationProvider.html5Mode(true);
}])
