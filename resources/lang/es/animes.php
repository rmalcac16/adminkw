<?php

return [

    'breadcrumb' => [
        'index' => 'Animes',
        'create' => 'Crear anime',
        'edit' => 'Editar anime',
    ],

    'index_page' => [
        'title' => 'Animes',
        'description' => 'Administra todos los animes',
    ],

    'create_page' => [
        'title' => 'Crear anime',
        'description' => 'Agrega un nuevo anime al sistema.',
    ],

    'edit_page' => [
        'title' => 'Editar anime',
        'description' => 'Modifica los detalles del anime y guarda los cambios.',
    ],

    'create' => [
        'title' => 'Crear anime',
        'description' => 'Agrega un nuevo anime.',
        'button' => 'Crear anime',
    ],

    'edit' => [
        'title' => 'Editar anime',
        'description' => 'Modifica los detalles del anime y guarda los cambios.',
        'button' => 'Actualizar anime',
    ],

    'delete' => [
        'title' => 'Eliminar anime',
        'description' => '¿Estás seguro de que deseas eliminar este anime?',
        'button' => 'Eliminar anime',
        'success' => 'Anime eliminado exitosamente.',
    ],

    'generate' => [
        'title' => 'Generar animes',
        'description' => 'Genera animes automáticamente.',
        'button' => 'Generar animes',
        'search_placeholder' => 'Buscar animes por nombre',
        'success' => 'Anime generado exitosamente.',
    ],


    'status' => [
        'finished' => 'Finalizado',
        'airing' => 'En emisión',
        'paused' => 'Pausado',
        'upcoming' => 'Próximo',
    ],

    'table' => [
        'id' => 'ID',
        'name' => 'Nombres',
        'slug' => 'Slug',
        'status' => 'Estado',
        'aired' => 'Emitido',
        'actions' => 'Acciones',
    ],

    'form' => [
        'name' => 'Nombre',
        'name_placeholder' => 'Ingrese el nombre del anime',
        'name_alternative' => 'Nombres alternativos',
        'name_alternative_placeholder' => 'Ingrese nombres alternativos (separados por comas)',
        'slug' => 'Slug',
        'slug_placeholder' => 'Ingrese slug (opcional)',
        'slug_help' => 'Puedes dejar este campo vacío para generar un slug automáticamente.',
        'banner' => 'Banner',
        'banner_placeholder' => 'Ingrese banner',
        'banner_warning' => 'El banner debe comenzar con una barra diagonal (/) y no debe contener espacios.',
        'poster' => 'Póster',
        'poster_placeholder' => 'Ingrese póster',
        'poster_warning' => 'El póster debe comenzar con una barra diagonal (/) y no debe contener espacios.',
        'overview' => 'Descripción',
        'overview_placeholder' => 'Ingrese una breve descripción del anime',
        'aired' => 'Fecha de estreno',
        'aired_placeholder' => 'Seleccionar fecha',
        'type' => 'Tipo',
        'type_placeholder' => 'Seleccionar tipo',
        'genres' => 'Géneros',
        'genres_placeholder' => 'Seleccionar géneros',
        'status' => 'Estado',
        'status_placeholder' => 'Seleccionar estado',
        'premiered' => 'Temporada',
        'premiered_placeholder' => 'Ingrese temporada',
        'broadcast' => 'Día',
        'broadcast_placeholder' => 'Seleccionar día',
        'popularity' => 'Popularidad',
        'popularity_placeholder' => 'Ingrese popularidad',
        'vote_average' => 'Votos',
        'vote_average_placeholder' => 'Ingrese promedio de votos (0-10)',
        'rating' => 'Clasificación',
        'rating_placeholder' => 'Seleccione clasificación',
        'prequel' => 'Precuela',
        'prequel_placeholder' => 'ID',
        'sequel' => 'Secuela',
        'sequel_placeholder' => 'ID',
        'related' => 'Relacionado',
        'related_placeholder' => 'Ingrese IDs relacionados (separados por comas)',
    ],

    'types' => [
        'tv' => 'TV',
        'movie' => 'Película',
        'ova' => 'OVA',
        'ona' => 'ONA',
        'special' => 'Especial',
    ],

    'statuses' => [
        'finished' => 'Finalizado',
        'airing' => 'En emisión',
        'paused' => 'Pausado',
        'upcoming' => 'Próximo',
    ],

    'broadcast' => [
        'monday' => 'Lunes',
        'tuesday' => 'Martes',
        'wednesday' => 'Miércoles',
        'thursday' => 'Jueves',
        'friday' => 'Viernes',
        'saturday' => 'Sábado',
        'sunday' => 'Domingo',
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

    'sync_mal' => [
        'title' => 'Sincronizar con MyAnimeList',
        'description' => 'Busca y sincroniza el anime desde MyAnimeList.',
        'search_placeholder' => 'Buscar animes por nombre',
        'search_button' => 'Buscar',
        'sync_button' => 'Sincronizar',
        'no_results' => 'No se encontraron resultados.',
        'select_anime' => 'Seleccionar anime',
        'synced_successfully' => 'Anime sincronizado exitosamente.',
        'loading' => 'Cargando resultados...',
        'search_hint' => 'Escribe al menos 3 caracteres para buscar.',
        'or_search_by_id' => '¿O deseas buscar directamente por ID?',
        'enter_mal_id' => 'Ingresa el ID de MAL...',
        'invalid_id' => 'ID inválido.',
        'not_found_id' => 'No se encontró el anime con ese ID.',
    ],

];
