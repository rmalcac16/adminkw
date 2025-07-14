<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Breadcrumbs
    |--------------------------------------------------------------------------
    */
    'breadcrumb' => [
        'animes' => 'Animes',
        'index' => 'Episodios',
        'create' => 'Crear Episodio',
        'edit' => 'Editar Episodio',
        'episode_number' => 'Episodio {number}',
    ],

    /*
    |--------------------------------------------------------------------------
    | Page Titles & Descriptions
    |--------------------------------------------------------------------------
    */
    'index_page' => [
        'title' => 'Lista de Episodios',
        'description' => 'Visualiza y gestiona los episodios del anime {anime}.',
    ],

    'create_page' => [
        'title' => 'Crear Episodio',
        'description' => 'Agrega un nuevo episodio al anime seleccionado.',
    ],

    'edit_page' => [
        'title' => 'Editar Episodio',
        'description' => 'Modifica los detalles del episodio {number}.',
    ],

    'show_page' => [
        'title' => 'Detalles del Episodio',
        'description' => 'Información detallada del episodio {number}.',
    ],

    /*
    |--------------------------------------------------------------------------
    | Labels
    |--------------------------------------------------------------------------
    */
    'labels' => [
        'id' => 'ID',
        'anime' => 'Anime',
        'episode' => 'Episodio',
        'number' => 'Número',
        'views' => 'Vistas',
        'views_app' => 'Vistas en la App',
        'created_at' => 'Creado el',
        'updated_at' => 'Actualizado el',
        'actions' => 'Acciones',
    ],

    /*
    |--------------------------------------------------------------------------
    | Placeholders
    |--------------------------------------------------------------------------
    */
    'placeholders' => [
        'number' => 'Ingrese el número del episodio',
    ],

    /*
    |--------------------------------------------------------------------------
    | Actions & Buttons
    |--------------------------------------------------------------------------
    */
    'actions' => [
        'create' => 'Crear Episodio',
        'create_description' => 'Agrega un nuevo episodio al anime.',
        'edit' => 'Editar Episodio',
        'edit_description' => 'Modifica la información del episodio {number}.',
        'delete' => 'Eliminar Episodio',
        'delete_description' => '¿Eliminar el episodio {number}? Esta acción no se puede deshacer.',
        'view' => 'Ver Episodio',
    ],

    'buttons' => [
        'add' => 'Agregar Episodio',
        'edit' => 'Editar',
        'delete' => 'Eliminar',
        'view' => 'Ver',
    ],

    /*
    |--------------------------------------------------------------------------
    | Flash Messages
    |--------------------------------------------------------------------------
    */
    'messages' => [
        'created' => 'Se ha creado el episodio :number exitosamente.',
        'updated' => 'Se ha actualizado el episodio :number exitosamente.',
        'deleted' => 'Se ha eliminado el episodio :number exitosamente.',
        'not_found' => 'Episodio no encontrado.',
        'anime_not_found' => 'Anime no encontrado.',
    ],

    /*
    |--------------------------------------------------------------------------
    | Validation Messages
    |--------------------------------------------------------------------------
    */
    'validation' => [
        'number_required' => 'El número del episodio es obligatorio.',
        'number_unique' => 'El número del episodio ya existe para este anime.',
        'number_numeric' => 'El número del episodio debe ser un valor numérico.',
        'anime_required' => 'El anime es obligatorio.',
        'anime_exists' => 'El anime seleccionado no existe.',
        'anime_not_found' => 'Anime no encontrado.',
    ],

];
