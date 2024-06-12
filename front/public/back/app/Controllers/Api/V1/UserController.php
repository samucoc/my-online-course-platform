<?php

namespace App\Controllers\Api\V1;

use CodeIgniter\RESTful\ResourceController;

class UserController extends ResourceController
{
    protected $modelName = 'App\Models\UserModel';
    protected $format = 'json';
    private $datetimeNow;
    private $roleModel;
    private $validation;

    public function __construct()
    {
        $this->datetimeNow = new \DateTime('NOW', new \DateTimeZone('America/Santiago'));
        $this->roleModel = new \App\Models\RoleModel;
        $this->validation = \Config\Services::validation();
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding, Authorization");
    }

    //request data is raw json

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        $data = $this->model->findAll();

        foreach ($data as $key => $value) {
            $data[$key]->role = $this->roleModel->find($value->role_id);
        }

        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (empty($data)) {
            return $this->failNotFound(RESOURCE_NOT_FOUND);
        }

        $data->role = $this->roleModel->find($data->role_id);

        return $this->respond($data);
    }

    public function listByRole($id = null)
    {
        $data = $this->model->where('role_id', $id)->findAll();
        if (empty($data)) {
            return $this->failNotFound(RESOURCE_NOT_FOUND);
        }

        foreach ($data as $key => $value) {
            $data[$key]->role = $this->roleModel->find($value->role_id);
        }

        return $this->respond($data);
    }

    /**
     * Return a new resource object, with default properties
     *
     * @return mixed
     */
    public function new()
    {
        $data = new \App\Entities\User;
        return $this->respond($data);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {

        $data = $this->request->getJSON();

        $data->created_at = $this->datetimeNow->format('Y-m-d H:i:s');
        $data->updated_at = $this->datetimeNow->format('Y-m-d H:i:s');

        $data->userPassword = password_hash($data->userPassword, PASSWORD_DEFAULT);

        if ($this->model->insert($data)) {
            $data->id = $this->model->insertID();
            return $this->respondCreated($data, RESOURCE_CREATED);
        } else {
            return $this->fail($this->model->errors());
        }
    }

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {

        $validateEntry = $this->model->find($id);
        if (empty($validateEntry)) {
            return $this->failNotFound(RESOURCE_NOT_FOUND);
        }

        //divide in PATCH and PUT cases

        if ($this->request->getMethod() == 'patch') {
            $data = $this->model->find($id);
            $patchData = $this->request->getJSON();

            if(isset($patchData->userPassword) && $patchData->userPassword != ''){
                $patchData->userPassword = password_hash($patchData->userPassword, PASSWORD_DEFAULT);
            }

            $data = array_merge((array) $data, (array) $patchData);
            $data = (object) $data;
        } elseif ($this->request->getMethod() == 'put') {
            $data = $this->request->getJSON();

            if(isset($data->userPassword) && $data->userPassword != ''){
                $data->userPassword = password_hash($data->userPassword, PASSWORD_DEFAULT);
            }
        }

        $data->updated_at = $this->datetimeNow->format('Y-m-d H:i:s');

        $this->validation->setRules(config('Validation')->usersRules);

        if (!$this->validation->run((array) $data)) {
            return $this->fail($this->validation->getErrors());
        }

        if ($this->model->update($id, $data)) {
            $data->id = $id;
            return $this->respondUpdated($data, RESOURCE_UPDATED);
        } else {
            return $this->fail($this->model->errors());
        }
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted($id, RESOURCE_DELETED);
        } else {
            return $this->fail($this->model->errors());
        }
    }

    public function register()
    {

        $data = $this->request->getJSON();

        // $this->validation->setRules(config('Validation')->usersRules);

        // if (!$this->validation->run((array) $data)) {
        //     return $this->fail($this->validation->getErrors());
        // }

        $data->created_at = $this->datetimeNow->format('Y-m-d H:i:s');
        $data->updated_at = $this->datetimeNow->format('Y-m-d H:i:s');

        if(!isset($data->userPassword) || $data->userPassword == ''){
            return $this->fail('Password is required');
        }

        if ($data->userPassword != $data->userPasswordConfirm) {
            return $this->fail('Passwords do not match');
        }

        $data->userPassword = password_hash($data->userPassword, PASSWORD_DEFAULT);

        $userExists = $this->model->where('userEmail', $data->userEmail)->first();

        if ($userExists) {
            return $this->fail('User already exists');
        }

        if ($this->model->insert($data)) {
            $data->id = $this->model->insertID();
            return $this->respondCreated($data, RESOURCE_CREATED);
        } else {
            return $this->fail($this->model->errors());
        }
    }

    public function signIn()
    {

        $payload = $this->request->getJSON();

        //load from database user based on userEmail
        $user = $this->model->where('userEmail', $payload->userEmail)->first();

        //verify that passwords match

        if ($user && password_verify($payload->userPassword, $user->userPassword)) {
            unset($user->userPassword);
            $response = [
                'status' => 200,
                'error' => null,
                'messages' => 'Login successful',
                'userDNI' => $user->userDNI,
                'role_id' => $user->role_id
            ];
            return $this->respond($response);
        } else {
            return $this->fail('Invalid email or password');
        }
    }

    public function requestPasswordRecovery()
    {

        $payload = $this->request->getJSON();
        $user = $this->model->where('userEmail', $payload->userEmail)->first();

        if ($user) {

            $userEntity = (object)[];
            $userEntity->id = $user->id;
            $dt = new \DateTime('NOW', new \DateTimeZone('America/Santiago'));
            $dt->add(new \DateInterval('PT1H'));
            $userEntity->userPasswordRecoveryTokenExpirationDatetime = $dt->format('Y-m-d H:i:s');
            $userEntity->userPasswordRecoveryToken = bin2hex(random_bytes(32));

            if ($this->model->update($user->id, $userEntity)) {
                //$this->sendPasswordRecoveryEmail($userEntity);
                return $this->respondUpdated($userEntity, RESOURCE_UPDATED);
            } else {
                return $this->fail($this->model->errors());
            }
        } else {
            return $this->fail('Invalid email');
        }
    }

    /*
    * set new password based on userEmail
    */

    public function setNewPassword()
    {

        $payload = $this->request->getJSON();
        $user = $this->model->where('userEmail', $payload->userEmail)->first();

        /**
         * check userPasswordRecoveryTokenExpirationDatetime and userPasswordRecoveryToken
         */

        if ($user) {

            $dt = new \DateTime('NOW', new \DateTimeZone('America/Santiago'));
            $dt->add(new \DateInterval('PT1H'));

            if ($dt > new \DateTime($user->userPasswordRecoveryTokenExpirationDatetime)) {
                return $this->fail('Token expired');
            }

            if ($user->userPasswordRecoveryToken != $payload->userPasswordRecoveryToken) {
                return $this->fail('Invalid token');
            }

            $userEntity = (object)[];
            $userEntity->id = $user->id;
            $userEntity->userPasswordRecoveryTokenExpirationDatetime = null;
            $userEntity->userPasswordRecoveryToken = null;
            $userEntity->userPassword = password_hash($payload->userPassword, PASSWORD_DEFAULT);

            if ($this->model->update($user->id, $userEntity)) {
                return $this->respondUpdated($userEntity, RESOURCE_UPDATED);
            } else {
                return $this->fail($this->model->errors());
            }
        } else {
            return $this->fail('Invalid email');
        }
    }
}
