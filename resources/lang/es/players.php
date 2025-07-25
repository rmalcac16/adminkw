<?php

return [
    'breadcrumb' => [
        'animes' => 'Animes',
        'episode_number' => 'Episodio {number}',
        'index' => 'Reproductores',
        'create' => 'Crear Reproductor',
        'edit' => 'Editar Reproductor',
        'show' => 'Ver Reproductor',
    ],

    'index_page' => [
        'title' => 'Reproductores',
        'description' => 'Lista de reproductores disponibles para el episodio {episode} del anime {anime}.',
    ],

    'create' => [
        'title' => 'Crear Reproductor',
        'description' => 'Formulario para crear un nuevo reproductor',
        'button' => 'Crear Reproductor',
    ],

    'store' => [
        'success' => 'Reproductor creado correctamente.',
        'error' => 'Error al crear el reproductor. Por favor, inténtalo de nuevo.',
    ],

    'edit' => [
        'title' => 'Editar Reproductor',
        'description' => 'Formulario para editar el reproductor',
        'button' => 'Actualizar Reproductor',
    ],

    'delete' => [
        'title' => 'Eliminar Reproductor',
        'description' => '¿Estás seguro de que deseas eliminar el reproductor?',
        'button' => 'Eliminar Reproductor',
    ],


    'store' => [
        'success' => 'Reproductor creado correctamente.',
        'error' => 'Error al crear el reproductor. Por favor, inténtalo de nuevo.',
    ],

    'update' => [
        'success' => 'Reproductor actualizado correctamente.',
        'error' => 'Error al actualizar el reproductor. Por favor, inténtalo de nuevo.',
    ],

    'destroy' => [
        'success' => 'Reproductor eliminado correctamente.',
        'error' => 'Error al eliminar el reproductor. Por favor, inténtalo de nuevo.',
    ],


    'form' => [
        'server' => 'Servidor',
        'server_placeholder' => 'Seleccione un servidor',
        'language' => 'Idioma',
        'language_placeholder' => 'Seleccione un idioma',
        'code' => 'Código',
        'code_placeholder' => 'Ingrese el código del reproductor',
        'invalid_domain' => 'Dominio inválido',
    ],


    'languages' => [
        0 => 'Subtitulado',
        1 => 'Español Latino',
        2 => 'Castellano',
    ],

    'table' => [
        'id' => 'ID',
        'code' => 'Código',
        'server' => 'Servidor',
        'episode' => 'Episodio',
        'language' => 'Idioma',
        'created_at' => 'Creado',
        'actions' => 'Acciones',
    ],

    'validation' => [
        'invalid_domain' => 'Dominio inválido',
        'code_required' => 'El código es obligatorio',
        'code_invalid' => 'El código no es válido',
        'domain_title' => 'Dominios del Reproductor',
        'code' => [
            'unique' => 'El código ya está en uso para este episodio y servidor.',
        ],
    ]

];
