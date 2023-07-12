<?php
$db = mysqli_connect("localhost", "admin", "1234", "d_1");
class wrnmsg
{
  public $db;
  public $nowcall;
  public $wt;
  public $hr;
  public $token;
  public $token_user_data;
  public $user_id;
  public $user_data;
  public $post_id;
  public $post_data;
  public $comment_id;
  public $comment_data;
  public function __construct($data)
  {
    $this->db = mysqli_connect("localhost", "admin", "1234", "d_1");
    $this->nowcall = $data['get']['call'];
    $this->wt = 0;
    $this->hr = false;
    $header = getallheaders();
    if (isset($header['access_token'])) {
      $this->token = str_replace('Bearer ', '', $header['access_token']);
      $this->token_user_data = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * FROM `users` WHERE `access_token` = '$this->token'"));
    }
    if (isset($data['get']['user_id'])) {
      $this->user_id = $data['get']['user_id'];
      $this->user_data = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * FROM `users` WHERE `id` = '$this->user_id'"));
    }
    if (isset($data['get']['post_id'])) {
      $this->post_id = $data['get']['post_id'];
      $this->post_data = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * FROM `posts` WHERE `id` = '$this->post_id'"));
    }
    if (isset($data['get']['comment_id'])) {
      $this->comment_id = $data['get']['comment_id'];
      $this->comment_data = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * FROM `comments` WHERE `id` = '$this->comment_id'"));
    }
  }
  public function MSG_INVALID_LOGIN($data)
  {
    if ($this->hr == false) {
      $url = "SELECT * FROM `users` WHERE `email` = '$data[email]' AND `password` = '$data[password]'";
      if (!rowtrue($url)) {
        $this->wt++;
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_INVALID_LOGIN", "", 403);
      }
    }
  }
  public function MSG_USER_EXISTS($data)
  {
    if ($this->hr == false) {
      $url = "SELECT * FROM `users` WHERE `email` = '$data[email]' || `nickname` = '$data[nickname]'";
      if (rowtrue($url)) {
        $this->wt++;
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_USER_EXISTS", "", 409);
      }
    }
  }
  public function MSG_PASSWORD_NOT_SECURE($data)
  {
    if ($this->hr == false) {
      if (!(strlen($data['password']) >= 8 && strlen($data['password']) <= 24)) {
        $this->wt++;
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_USER_EXISTS", "", 409);
      }
    }
  }
  public function MSG_INVALID_ACCESS_TOKEN()
  {
    if ($this->hr == false) {
      $url = "SELECT * FROM `users` WHERE `access_token` = '$this->token'";
      if (!rowtrue($url)) {
        $this->wt++;
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_USER_EXISTS", "", 409);
      }
    }
  }
  public function MSG_PERMISSION_DENY($data)
  {
    if ($this->hr == false) {
      if ($this->nowcall == 5 || $this->nowcall == 9 || $this->nowcall == 11 || $this->nowcall == 12 || $this->nowcall == 13) {
        if ($this->token_user_data['type'] != "ADMIN") {
          if ($this->token_user_data['type'] == "only_self") {
            if ($this->token_user_data['id'] != $this->post_data['id']) {
              $this->wt++;
            }
          } else if ($this->token_user_data['type'] == "only_follow") {
            $url = "SELECT * FROM `user_follows` WHERE `user_id` = '$this->token_user_data[id]' AND `follow_user_id` ='$this->post_data[id]'";
            if (!rowtrue($url)) {
              $this->wt++;
            }
          }
        }
      } else if ($this->nowcall == 16) {
        if ($this->token_user_data['type'] != "ADMIN") {
          if ($this->token_user_data['id'] != $this->user_data['id']) {
            $this->wt++;
          }
        }
      } else if ($this->nowcall == 7 || $this->nowcall == 8) {
        if ($this->token_user_data['type'] != "ADMIN") {
          if ($this->token_user_data['id'] != $this->post_data['id']) {
            $this->wt++;
          }
        }
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_PERMISSION_DENY", "", 403);
      }
    }
  }
  public function MSG_MISSING_FIELD($data)
  {
    if ($this->hr == false) {
      if ($this->nowcall == 1) {
        if (!(isset($data['email']) && isset($data['password']))) {
          $this->wt++;
        }
      } else  if ($this->nowcall == 3) {
        if (!(isset($data['email']) && isset($data['password']) && isset($data['nickanme']) && isset($data['file']['profile_image']))) {
          $this->wt++;
        }
      } else  if ($this->nowcall == 6) {
        if (!(isset($data['type']) && isset($data['tags']) && isset($data['content']) && isset($data['location_name']) && isset($data['file']['images']))) {
          $this->wt++;
        }
      } else  if ($this->nowcall == 7) {
        if (!(isset($data['type']) && isset($data['tags']) && isset($data['content']))) {
          $this->wt++;
        }
      } else  if ($this->nowcall == 9) {
        if (!(isset($data['favorite']))) {
          $this->wt++;
        }
      } else  if ($this->nowcall == 11 || $this->nowcall == 12) {
        if (!(isset($data['content']))) {
          $this->wt++;
        }
      } else  if ($this->nowcall == 16) {
        if (!(isset($data['nickanme']) && isset($data['file']['profile_image']))) {
          $this->wt++;
        }
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_MISSING_FIELD", "", 400);
      }
    }
  }
  public function MSG_WROND_DATA_TYPE($data)
  {
    if ($this->hr == false) {
      foreach ($data as $key => $val) {
        if ($key == "email") {
          if (gettype($val) != "string" || !filter_var($val, FILTER_VALIDATE_EMAIL)) {
            $this->wt++;
          }
        }
        if ($key == "password") {
          if (gettype($val) != "string") {
            $this->wt++;
          }
        }
        if ($key == "nickname") {
          if (gettype($val) != "string" && !empty($val)) {
            $this->wt++;
          }
        }
        if ($key == "content") {
          if ($this->nowcall == 6 || $this->nowcall == 7) {
            if (gettype($val) != "string" || empty($val)) {
              $this->wt++;
            }
          } else if ($this->nowcall == 4 || $this->nowcall == 11 || $this->nowcall == 12) {
            if (gettype($val) != "string" && !empty($val)) {
              $this->wt++;
            }
          }
        }
        if ($key == "location_name" || $key == "tags" || $key == "tag") {
          if (gettype($val) != "string" || empty($val)) {
            $this->wt++;
          }
        }
        if ($key == "type") {
          if ($val != "public" && $val != "only_follow" && $val != "only_self") {
            $this->wt++;
          }
        }
        if ($key == "favorite") {
          if (gettype($val) != "boolean") {
            $this->wt++;
          }
        }
        if ($key == "order_by") {
          if ($this->nowcall == 4) {
            if ($key != "created_at" && $key != "like_count") {
              $this->wt++;
            }
          } else if ($this->nowcall == 10 || $this->nowcall == 14 || $this->nowcall == 17) {
            if ($key != "created_at") {
              $this->wt++;
            }
          }
        }
        if ($key == "order_type") {
          if ($val != "asc" && $val != "desc") {
            $this->wt++;
          }
        }
        if ($key == "page" || $key == "page_size") {
          if (!(!empty($val) && is_numeric($val))) {
            $this->wt++;
          }
        }
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_MISSING_FIELD", "", 400);
      }
    }
  }
  public function MSG_IMAGE_CAN_NOT_PROCESS($data)
  {
    if ($this->hr == false) {
      if ($this->nowcall == 3 || $this->nowcall == 16) {
        if ($data['profile_image']['type'] != "") {
          if (!($data['profile_image']['type'] == "image/png" || $data['profile_image']['type'] == "image/jpeg")) {
            $this->wt++;
          }
        }
      } else if ($this->nowcall == 6) {
        for ($i = 0; $i < count($data['profile_image']['type']); $i++) {
          if (!($data['profile_image']['type'][$i] == "image/png" || $data['profile_image']['type'][$i] == "image/jpeg")) {
            $this->wt++;
          }
        }
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_USER_EXISTS", "", 409);
      }
    }
  }
  public function MSG_POST_NOT_EXISTS($data)
  {
    if ($this->hr == false) {
      if (isset($data['get']['post_id'])) {
        $url = "SELECT * FROM `posts` WHERE `id` = '$this->post_id'";
        if (!rowtrue($url)) {
          $this->wt++;
        }
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_POST_NOT_EXISTS", "", 404);
      }
    }
  }
  public function MSG_COMMENT_NOT_EXISTS($data)
  {
    if ($this->hr == false) {
      $url = "SELECT * FROM `comments` WHERE `id` = '$this->comment_id' AND `post_id`='$this->post_id'";
      if (!rowtrue($url)) {
        $this->wt++;
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_COMMENT_NOT_EXISTS", "", 404);
      }
    }
  }
  public function MSG_USER_NOT_EXISTS($data)
  {
    if ($this->hr == false) {
      if (isset($data['get']['user_id'])) {
        $url = "SELECT * FROM `users` WHERE `id` = '$this->user_id'";
        if (!rowtrue($url)) {
          $this->wt++;
        }
      }
      if ($this->wt > 0) {
        $this->hr = true;
        returnmsg(false, "MSG_USER_NOT_EXISTS", "", 404);
      }
    }
  }
}
function rowtrue($url)
{
  $db = mysqli_connect("localhost", "admin", "1234", "d_1");
  $row = mysqli_query($db, $url);
  if (mysqli_num_rows($row)) {
    return true;
  } else {
    return false;
  }
}
function returnmsg($success, $message, $data, $http_code)
{
  $data = change_data($data);
  $response = [
    "success" => $success,
    "message" => $message,
    "data" => $data,
  ];
  echo json_encode($response);
  http_response_code($http_code);
}
function change_data($data)
{
  foreach ($data as $key => $val) {
    if (is_array($val)) {
      $val = change_data($val);
    } else {
      $val = everytype($key, $val);
    }
  }
  return $data;
}
function everytype($key, $val)
{
  if (str_contains($key, 'id')) {
    $val = intval($val);
  } else if ($key == 'width' || $key == 'height') {
    $val = intval($val);
  } else if ($key == "created_at" || $key == "updated_at") {
    $val = str_replace(' ', 'T', $val);
  }
  return $val;
}
