<?php

function shiftr_register_navigation_locations() {

    register_nav_menus(
        array(
        'header' => 'Header'
        )
    );
}

add_action( 'init', 'shiftr_register_navigation_locations' );


add_action('graphql_register_types', function () {
    register_graphql_field('Page', 'templateSlug', [
        'type' => 'String',
        'description' => 'Page Template',
        'resolve' => function ($page) {
            return get_page_template_slug($page->pageId);
        },
    ]);
});


add_filter( 'preview_post_link', function( $preview_link, $post ) {
    return get_home_url( null, 'api/preview' );
});