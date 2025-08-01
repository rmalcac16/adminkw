<?php

return [

    'breadcrumb' => [
        'index' => 'Géneros',
        'create' => 'Crear género',
        'edit' => 'Editar género',
    ],


    'index_page' => [
        'title' => 'Géneros',
        'description' => 'Administra los géneros de animes',
    ],

    'table' => [
        'id' => 'ID',
        'title' => 'Nombre',
        'slug' => 'Slug',
        'name_mal' => 'MyAnimeList',
        'actions' => 'Acciones',
        'no_data' => 'No hay resultados.',
        'search_placeholder' => 'Buscar géneros...',
        'name_mal_defined' => 'Sincronizado',
        'name_mal_undefined' => 'No definido',
    ],

    'filters' => [
        'apply' => 'Aplicar',
        'reset' => 'Reiniciar',
    ],

    'create' => [
        'title' => 'Crear género',
        'description' => 'Agrega un nuevo género.',
        'button' => 'Crear género',
    ],

    'edit' => [
        'title' => 'Editar género',
        'description' => 'Modifica el nombre del género y guarda los cambios.',
    ],

    'delete' => [
        'title' => 'Eliminar género - {name}',
        'description' => '¿Estás seguro de que deseas eliminar el género {name}?',
        'button' => 'Eliminar género',
        'success' => 'Género {name} eliminado correctamente.',
        'error' => 'Error al eliminar el género {name}.',
    ],

    'cache' => [
        'clear_route_not_found' => 'No se encontró la ruta para limpiar la caché de géneros.',
        'cleared' => 'Caché de géneros limpiada correctamente.',
        'clear_failed' => 'Error al limpiar la caché de géneros.',
    ],


    'form' => [
        'title' => 'Nombre',
        'title_placeholder' => 'Ingrese el nombre del género',
        'name_mal' => 'Nombre en MyAnimeList',
        'name_mal_placeholder' => 'Ingrese el nombre del género en MyAnimeList',
    ]


];
