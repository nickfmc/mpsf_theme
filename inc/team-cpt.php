<?php
/**
 * Team Member Custom Post Type
 */

add_action( 'init', 'mpsf_team_reg' );

function mpsf_team_reg() {
	$singular = 'Team Member';
	$plural   = 'Team';
	$labels   = array(
		'name'               => $plural,
		'singular_name'      => $singular,
		'menu_name'          => $plural,
		'name_admin_bar'     => $singular,
		'add_new'            => 'Add New',
		'add_new_item'       => "Add New $singular",
		'new_item'           => "New $singular",
		'edit_item'          => "Edit $singular",
		'view_item'          => "View $singular",
		'all_items'          => "All $plural",
		'search_items'       => "Search $plural",
		'not_found'          => "No $plural Found",
		'not_found_in_trash' => "No $plural Found in Trash",
	);
	$args = array(
		'labels'              => $labels,
		'public'              => true,
		'show_in_rest'        => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'query_var'           => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-groups',
		'rewrite'             => array( 'slug' => 'our-team', 'with_front' => false ),
		'capability_type'     => 'post',
		'has_archive'         => false,
		'hierarchical'        => false,
		'supports'            => array( 'title', 'editor', 'thumbnail', 'revisions' ),
	);
	register_post_type( 'team', $args );
}
