<?php
/*
Plugin Name: WP-JSPACK
Plugin URI: #
Description: RU: Набор для Вёрстки. ENG: Set for Layout.
Version: 1.0
Author: Олег Мешаев
Author URI: http://dayl.ru
*/

function wp_jspack(){
  wp_register_script( 'wp_jspack', plugins_url('/jspack.js', __FILE__), array( 'jquery' ), '1.0', true );
  wp_enqueue_script( 'wp_jspack');

  wp_enqueue_style( 'wp_jspack_css', plugins_url('/jspack.css', __FILE__) );
}
add_action( 'wp_enqueue_scripts', 'wp_jspack' );
?>
