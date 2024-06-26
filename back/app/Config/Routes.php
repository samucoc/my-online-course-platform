<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');

$routes->group('Api', function ($routes) {
    $routes->group('V1', function ($routes) {
        $routes->resource(
            'roles',
            [
                'controller' => 'RoleController',
                'namespace' => 'App\Controllers\Api\V1',
                'only' => [
                    'index',
                    'show',
                    'new',
                    'create',
                    'update',
                    'delete'
                ],
            ]
        );
        $routes->group('users', function ($routes) {
            $routes->post(
                'register',
                'UserController::register',
                [
                    'namespace' => implode(
                        '',
                        [
                            $routes->getDefaultNamespace(),
                            'Api\V1'
                        ]
                    )
                ]
            );
            $routes->post(
                'sign-in',
                'UserController::signIn',
                [
                    'namespace' => implode(
                        '',
                        [
                            $routes->getDefaultNamespace(),
                            'Api\V1'
                        ]
                    )
                ]
            );
            $routes->post(
                'signout',
                'UserController::signout',
                [
                    'namespace' => implode(
                        '',
                        [
                            $routes->getDefaultNamespace(),
                            'Api\V1'
                        ]
                    )
                ]
            );
            $routes->post(
                'request-password-recovery',
                'UserController::requestPasswordRecovery',
                [
                    'namespace' => implode(
                        '',
                        [
                            $routes->getDefaultNamespace(),
                            'Api\V1'
                        ]
                    )
                ]
            );
            $routes->post(
                'set-new-password',
                'UserController::setNewPassword',
                [
                    'namespace' => implode(
                        '',
                        [
                            $routes->getDefaultNamespace(),
                            'Api\V1'
                        ]
                    )
                ]
            );
            $routes->get(
                'role/(:num)',
                'UserController::listByRole/$1',
                [
                    'namespace' => implode(
                        '',
                        [
                            $routes->getDefaultNamespace(),
                            'Api\V1'
                        ]
                    )
                ]
            );
        });
        $routes->resource(
            'users',
            [
                'controller' => 'UserController',
                'namespace' => 'App\Controllers\Api\V1',
                'only' => [
                    'index',
                    'show',
                    'new',
                    'create',
                    'update',
                    'delete'
                ],
            ]
        );
        
        $routes->resource(
            'cursos',
            [
                'controller' => 'CursoController',
                'namespace' => 'App\Controllers\Api\V1',
                'only' => [
                    'index',
                    'show',
                    'new',
                    'create',
                    'update',
                    'delete'
                ],
            ]
        );
        $routes->resource(
            'estados',
            [
                'controller' => 'EstadoController',
                'namespace' => 'App\Controllers\Api\V1',
                'only' => [
                    'index',
                    'show',
                    'new',
                    'create',
                    'update',
                    'delete'
                ],
            ]
        );

        $routes->get('cursos/showByUser/(:segment)', 'CursoController::showByUser/$1', ['namespace' => 'App\Controllers\Api\V1']);

        
    });
});

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
