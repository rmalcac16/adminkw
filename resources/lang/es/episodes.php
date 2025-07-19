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
        'server' => 'Servidor',
        'links' => 'Enlaces',
        'episode_initial' => 'Episodio Inicial',
        'episode_final' => 'Episodio Final',
        'language' => 'Idioma',
    ],

    /*
    |--------------------------------------------------------------------------
    | Placeholders
    |--------------------------------------------------------------------------
    */
    'placeholders' => [
        'number' => 'Ingrese el número del episodio',
        'links' => 'Ingrese los enlaces del episodio, separados por lineas',
        'server' => 'Seleccione el servidor para el episodio',
        'episode_initial' => 'Ingrese el número del primer episodio',
        'episode_final' => 'Ingrese el número del último episodio',
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
        'generate' => 'Generar episodios',
        'generate_description' => 'Genera los episodios para el anime {anime}.',
    ],

    'buttons' => [
        'add' => 'Agregar Episodio',
        'edit' => 'Editar',
        'delete' => 'Eliminar',
        'view' => 'Ver',
        'generate' => 'Generar',
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
        'invalid_lines' => 'Líneas inválidas',
        'invalid_links' => 'Enlaces inválidos',
        'invalid_server' => 'Servidor inválido',
        'no_servers_available' => 'No hay servidores disponibles',
        'players_generated' => 'Los capitulos y reproductores se han generado exitosamente.',
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

    'languages' => [
        'sub' => 'Subtitulado',
        'lat' => 'Latino',
        'cas' => 'Castellano',
    ],

];
