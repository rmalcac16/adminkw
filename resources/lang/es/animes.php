<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Breadcrumbs
    |--------------------------------------------------------------------------
    */
    'breadcrumb' => [
        'animes' => 'Animes',
        'index' => 'Lista de Animes',
        'create' => 'Crear Anime',
        'edit' => 'Editar Anime',
        'show' => 'Detalles del Anime',
    ],

    /*
    |--------------------------------------------------------------------------
    | Page Titles & Descriptions
    |--------------------------------------------------------------------------
    */
    'index_page' => [
        'title' => 'Lista de Animes',
        'description' => 'Visualiza y gestiona todos los animes del sistema.',
    ],

    'create_page' => [
        'title' => 'Crear Anime',
        'description' => 'Agrega un nuevo anime al sistema.',
    ],

    'edit_page' => [
        'title' => 'Editar Anime',
        'description' => 'Modifica los datos del anime seleccionado.',
    ],

    'show_page' => [
        'title' => 'Detalles del Anime',
        'description' => 'Información detallada del anime seleccionado.',
    ],

    /*
    |--------------------------------------------------------------------------
    | Labels
    |--------------------------------------------------------------------------
    */
    'labels' => [
        'id' => 'ID',
        'name' => 'Nombre',
        'name_alternative' => 'Nombres Alternativos',
        'short_name' => 'Nombre Corto',
        'slug' => 'Slug',
        'slug_help' => 'Puedes dejar el slug vacío para que se genere automáticamente.',
        'banner' => 'Banner',
        'poster' => 'Poster',
        'overview' => 'Descripción',
        'aired' => 'Fecha de emisión',
        'type' => 'Tipo',
        'status' => 'Estado',
        'popularity' => 'Popularidad',
        'vote_average' => 'Valoración',
        'tmdb_id' => 'ID TMDB',
        'created_at' => 'Creado el',
        'updated_at' => 'Actualizado el',
        'actions' => 'Acciones',
        'premiered' => 'Temporada',
        'broadcast' => 'Día de emisión',
        'rating' => 'Clasificación',
        'prequel' => 'Precuela',
        'sequel' => 'Secuela',
        'genres' => 'Géneros',
        'related' => 'Animes Relacionados',
    ],

    /*
    |--------------------------------------------------------------------------
    | Placeholders
    |--------------------------------------------------------------------------
    */
    'placeholders' => [
        'name' => 'Ingrese el nombre del anime',
        'name_alternative' => 'Ingrese nombres alternativos (separados por comas)',
        'short_name' => 'Ingrese el nombre corto',
        'slug' => 'Ingrese el slug',
        'overview' => 'Ingrese una descripción del anime',
        'aired' => 'Seleccione la fecha de emisión',
        'popularity' => 'Ingrese el valor de popularidad',
        'vote_average' => 'Ingrese la valoración',
        'tmdb_id' => 'Ingrese el ID de TMDB',
        'search_generate' => 'Buscar animes para generar...',
        'search_multiple' => 'Buscar animes por {fields}...',
        'premiered' => 'Ingrese la temporada',
        'broadcast' => 'Seleccione el día de emisión',
        'rating' => 'Seleccione la clasificación',
        'prequel' => '000',
        'sequel' => '000',
        'genres' => 'Seleccione o ingrese géneros (separados por comas)',
        'related' => 'Ingrese animes relacionados (separados por comas)',
    ],

    /*
    |--------------------------------------------------------------------------
    | Actions & Buttons
    |--------------------------------------------------------------------------
    */
    'actions' => [
        'create' => 'Crear Anime',
        'create_description' => 'Agrega un nuevo anime al sistema.',
        'edit' => 'Editar Anime',
        'edit_description' => 'Modifica la información del anime.',
        'delete' => 'Eliminar Anime',
        'delete_description' => '¿Estás seguro de que deseas eliminar el anime {name}? Esta acción no se puede deshacer.',
        'view' => 'Ver Anime',
        'view_description' => 'Ver detalles del anime seleccionado.',
        'generate' => 'Generar Animes',
        'generate_description' => 'Genera animes automáticamente desde TMDB.',
    ],

    'buttons' => [
        'add' => 'Agregar Anime',
        'edit' => 'Editar',
        'delete' => 'Eliminar',
        'view' => 'Ver',
        'generate' => 'Generar Animes',
    ],

    /*
    |--------------------------------------------------------------------------
    | Flash Messages
    |--------------------------------------------------------------------------
    */
    'messages' => [
        'created' => 'Se ha creado el anime ":name" exitosamente.',
        'updated' => 'Se ha actualizado el anime ":name" exitosamente.',
        'deleted' => 'Se ha eliminado el anime ":name" exitosamente.',
        'not_found' => 'Anime no encontrado.',
    ],

    /*
    |--------------------------------------------------------------------------
    | Validation Messages
    |--------------------------------------------------------------------------
    */
    'validation' => [
        'name_required' => 'El nombre del anime es obligatorio.',
        'short_name_unique' => 'El nombre corto ya ha sido utilizado.',
        'slug_required' => 'El slug es obligatorio.',
        'aired_date' => 'La fecha de emisión debe ser una fecha válida.',
        'type_required' => 'El tipo de anime es obligatorio.',
        'status_required' => 'El estado del anime es obligatorio.',
        'tmdb_id_unique' => 'El ID de TMDB ya existe.',
    ],


    /*
    |--------------------------------------------------------------------------
    | Types
    |--------------------------------------------------------------------------
    */
    'types' => [
        'tv' => 'TV',
        'movie' => 'Película',
        'ova' => 'OVA',
        'ona' => 'ONA',
        'special' => 'Especial',
        'music' => 'Música',
    ],

    /*
    |--------------------------------------------------------------------------
    | Statuses
    |--------------------------------------------------------------------------
    */
    'statuses' => [
        0 => 'Finalizado',
        1 => 'En emisión',
        2 => 'En pausa',
        3 => 'Próximamente',
    ],

    'broadcast' => [
        1 => 'Lunes',
        2 => 'Martes',
        3 => 'Miércoles',
        4 => 'Jueves',
        5 => 'Viernes',
        6 => 'Sábado',
        7 => 'Domingo',
    ],

    'ratings'   => [
        'g' => 'Apta para todo público',
        'pg' => 'Apta para mayores de 7 años',
        'pg_13' => 'Apta para mayores de 13 años',
        'r' => 'Apta para mayores de 17 años',
        'r_plus' => 'Solo para mayores de 17 años',
        'rx' => 'Puede tener desnudez ligera',
        'x' => 'Solo para adultos',
    ],

];
