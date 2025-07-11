<?php

return [

    'breadcrumb' => [
        'index' => 'Episodios',
        'create' => 'Crear Episodio',
        'edit' => 'Editar Episodio',
        'episode_number' => 'Episodio {number}',
    ],

    'index_page' => [
        'title' => 'Episodios',
        'description' => 'Lista de episodios disponibles para el anime {anime}.',
    ],

    'create' => [
        'title' => 'Crear Episodio',
        'description' => 'Formulario para crear un nuevo episodio.',
        'button' => 'Crear Episodio',
        'success' => 'Episodio "{number}" creado exitosamente.',
    ],

    'edit' => [
        'title' => 'Editar Episodio',
        'description' => 'Formulario para editar el episodio seleccionado.',
        'button' => 'Actualizar Episodio',
        'success' => 'Episodio "{number}" actualizado exitosamente.',
    ],

    'delete' => [
        'title' => 'Eliminar Episodio',
        'description' => '¿Está seguro de que desea eliminar el episodio "{number}"? Esta acción no se puede deshacer.',
        'success' => 'Episodio "{number}" eliminado exitosamente.',
    ],

    'form' => [
        'number' => 'Número del Episodio',
        'number_placeholder' => 'Ingrese el número del episodio',
    ],


    'table' => [
        'id' => 'ID',
        'number' => 'Número',
        'views' => 'Vistas',
        'views_app' => 'Vistas (App)',
        'episode' => 'Episodio',
        'created_at' => 'Creado',
        'updated_at' => 'Actualizado',
        'actions' => 'Acciones',
    ],

    'store' => [
        'success' => 'El episodio ":number" ha sido creado exitosamente.',
        'error' => 'Error al crear el episodio ":number". Por favor, inténtelo de nuevo.',
    ],

    'update' => [
        'success' => 'El episodio ":number" ha sido actualizado exitosamente.',
        'error' => 'Error al actualizar el episodio ":number". Por favor, inténtelo de nuevo.',
    ],

    'destroy' => [
        'success' => 'El episodio ":number" ha sido eliminado exitosamente.',
        'error' => 'Error al eliminar el episodio ":number". Por favor, inténtelo de nuevo.',
    ],


    'validation' => [
        'number' => [
            'required' => 'El número del episodio es obligatorio.',
            'integer' => 'El número del episodio debe ser un número entero.',
            'min' => 'El número del episodio debe ser al menos :min.',
            'unique' => 'Ya existe un episodio con este número en el anime.',
        ],
        'update' => [
            'failed' => 'Error al actualizar el episodio. Por favor, inténtelo de nuevo.',
        ],
    ],

];
