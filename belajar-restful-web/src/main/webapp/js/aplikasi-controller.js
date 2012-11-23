/*
 * Copyright (C) 2011 ArtiVisi Intermedia <info@artivisi.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
angular.module('belajar.controller',['belajar.service'])
    .controller('LoginRedirectorController', ['$window', function($window){
        $window.location = 'login.html';
    }])
    .controller('MenubarController', ['$http', '$scope', function($http, $scope){
        $scope.userinfo = {};
        $http.get('/homepage/userinfo').success(function(data){
            $scope.userinfo = data;
        });
    }])
    .controller('AboutController', ['$scope', function($scope){
        $scope.appName = "Aplikasi Belajar";
        $scope.appVersion = "Versi 1.0.0";
    }])
    .controller('ApplicationSessionsController', ['ApplicationSessionsService', '$scope', function(ApplicationSessionsService, $scope){
        $scope.refresh = function(){
            ApplicationSessionsService.list().success(function(data){
                $scope.sessioninfo = data
            });
        }
        
        $scope.refresh();
        
        $scope.kick = function(user){
            ApplicationSessionsService.kick(user).success($scope.refresh);
        };
        
    }])
    .controller('ApplicationConfigController', ['$scope', 'ApplicationConfigService', function($scope, ApplicationConfigService){
        $scope.configs = ApplicationConfigService.query();
        $scope.edit = function(x){
            if(x.id == null){
                return; 
            }
            $scope.currentConfig = ApplicationConfigService.get({configId: x.id});
        };
        $scope.baru = function(){
            $scope.currentConfig = null;
        }
        $scope.simpan = function(){
            ApplicationConfigService.save($scope.currentConfig)
            .success(function(){
                $scope.configs = ApplicationConfigService.query();
            });
        }
        $scope.remove = function(x){
            if(x.id == null){
                return;
            }
            ApplicationConfigService.remove(x).success(function(){
                $scope.configs = ApplicationConfigService.query();
            });
        }
    }])
    .controller('SystemMenuController', ['$scope', 'SystemMenuService', function($scope, SystemMenuService){
        $scope.menus = SystemMenuService.query();
        $scope.edit = function(x){
            if(x.id == null){
                return; 
            }
            $scope.currentMenu = SystemMenuService.get({id: x.id});
        };
        $scope.baru = function(){
            $scope.currentMenu = null;
        }
        $scope.simpan = function(){
            SystemMenuService.save($scope.currentMenu)
            .success(function(){
                $scope.menus = SystemMenuService.query();
                $scope.currentMenu = null;
            });
        }
        $scope.remove = function(x){
            if(x.id == null){
                return;
            }
            SystemMenuService.remove(x).success(function(){
                $scope.menus = SystemMenuService.query();
            });
        }
    }])
;