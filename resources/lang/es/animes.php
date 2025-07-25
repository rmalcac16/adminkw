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
        'name' => [
            'required' => 'El nombre del anime es obligatorio.',
            'max' => 'El nombre no debe superar los 255 caracteres.',
            'string' => 'El nombre debe ser una cadena de texto.',
        ],
        'name_alternative' => [
            'max' => 'El nombre alternativo no debe superar los 255 caracteres.',
            'string' => 'El nombre alternativo debe ser una cadena de texto.',
        ],
        'slug' => [
            'max' => 'El slug no debe superar los 255 caracteres.',
            'string' => 'El slug debe ser una cadena de texto.',
        ],
        'banner' => [
            'max' => 'La URL del banner no debe superar los 255 caracteres.',
            'string' => 'El banner debe ser una cadena de texto.',
        ],
        'poster' => [
            'max' => 'La URL del póster no debe superar los 255 caracteres.',
            'string' => 'El póster debe ser una cadena de texto.',
        ],
        'overview' => [
            'string' => 'La descripción debe ser una cadena de texto.',
        ],
        'aired' => [
            'date' => 'La fecha de emisión debe ser válida.',
        ],
        'type' => [
            'in' => 'El tipo de anime debe ser uno de los siguientes: TV, Movie, OVA, ONA, Special.',
        ],
        'status' => [
            'in' => 'El estado seleccionado no es válido.',
        ],
        'premiered' => [
            'max' => 'El campo de estreno no debe superar los 255 caracteres.',
            'string' => 'El campo de estreno debe ser una cadena de texto.',
        ],
        'broadcast' => [
            'between' => 'El valor de broadcast debe estar entre 1 y 7.',
            'integer' => 'El campo broadcast debe ser un número entero.',
        ],
        'genres' => [
            'max' => 'Los géneros no deben superar los 255 caracteres.',
            'string' => 'Los géneros deben ser una cadena de texto.',
        ],
        'rating' => [
            'max' => 'La clasificación no debe superar los 50 caracteres.',
            'string' => 'La clasificación debe ser una cadena de texto.',
        ],
        'popularity' => [
            'integer' => 'La popularidad debe ser un número entero.',
            'min' => 'La popularidad no puede ser negativa.',
        ],
        'trailer' => [
            'url' => 'La URL del tráiler no es válida.',
            'max' => 'La URL del tráiler no debe superar los 255 caracteres.',
        ],
        'vote_average' => [
            'numeric' => 'El promedio de votos debe ser un número.',
            'min' => 'El promedio de votos no puede ser menor que 0.',
            'max' => 'El promedio de votos no puede ser mayor que 10.',
        ],
        'prequel' => [
            'exists' => 'El anime prequel seleccionado no existe.',
        ],
        'sequel' => [
            'exists' => 'El anime secuela seleccionado no existe.',
        ],
        'related' => [
            'max' => 'Los animes relacionados no deben superar los 255 caracteres.',
        ],
        'views' => [
            'integer' => 'Las vistas deben ser un número entero.',
            'min' => 'Las vistas no pueden ser negativas.',
        ],
        'views_app' => [
            'integer' => 'Las vistas en la app deben ser un número entero.',
            'min' => 'Las vistas en la app no pueden ser negativas.',
        ],
        'isTopic' => [
            'boolean' => 'El campo de tema destacado debe ser verdadero o falso.',
        ],
        'mal_id' => [
            'integer' => 'El ID de MAL debe ser un número entero.',
            'min' => 'El ID de MAL no puede ser negativo.',
        ],
        'tmdb_id' => [
            'integer' => 'El ID de TMDB debe ser un número entero.',
            'min' => 'El ID de TMDB no puede ser negativo.',
        ],
        'short_name' => [
            'string' => 'El nombre corto debe ser una cadena de texto.',
            'max' => 'El nombre corto no debe superar los 255 caracteres.',
            'unique' => 'Este nombre corto ya está en uso.',
        ],
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
