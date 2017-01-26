<?php

$aliases['prod'] = array(
  'root' => '/var/www/omnidream/docroot/',
  'remote-host' => '88.99.35.131',
  'remote-user' => 'tavi',
  'path-aliases' => array(
    '%drush-script' => 'drush',
  )
);

// Add your local aliases.
if (file_exists(dirname(__FILE__) . '/aliases.local.php')) {
  include dirname(__FILE__) . '/aliases.local.php';
}