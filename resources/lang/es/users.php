<?php

return [

    'breadcrumb' => [
        'index' => 'Usuarios',
        'create' => 'Crear usuario',
        'edit' => 'Editar usuario',
    ],

    'index_page' => [
        'title' => 'Usuarios',
        'description' => 'Administra todos los usuarios',
    ],



    'table' => [
        'id' => 'ID',
        'name' => 'Nombre',
        'email' => 'Correo electrónico',
        'premium' => 'Premium',
        'verified' => 'Verificado',
        'roles' => 'Roles',
        'actions' => 'Acciones',
        'created_at' => 'Creado',
        'updated_at' => 'Actualizado',
    ],

    'kpis' => [
        'total_users' => 'Total de usuarios',
        'premium_users' => 'Usuarios premium',
        'premium_percentage' => 'Porcentaje de usuarios premium',
        'verified_emails' => 'Correos verificados',
        'verified_percentage' => 'Porcentaje de correos verificados',
        'recent_users' => 'Nuevos ({days} días)',
        'recent_users_description' => 'Registros recientes',
        'of_total' => 'del total',
        'last_updated' => 'Última actualización',
    ],

    'password_change' => [
        'title' => 'Cambiar contraseña',
        'description' => 'Cambia la contraseña de este usuario',
        'current_password' => 'Contraseña actual',
        'current_password_placeholder' => 'Ingresa tu contraseña actual',
        'new_password' => 'Nueva contraseña',
        'new_password_placeholder' => 'Ingresa una nueva contraseña',
        'confirm_new_password' => 'Confirmar nueva contraseña',
        'confirm_new_password_placeholder' => 'Confirma la nueva contraseña',
        'change' => 'Cambiar',
        'mismatch_error' => 'Las contraseñas no coinciden',
    ],

    'password_updated' => [
        'success' => 'Contraseña actualizada con éxito'
    ],

    'email_change'  => [
        'title' => 'Cambiar correo electrónico',
        'description' => 'Cambia el correo electrónico de este usuario',
        'current_email' => 'Correo electrónico actual',
        'new_email' => 'Nuevo correo electrónico',
        'new_email_placeholder' => 'Ingresa un nuevo correo electrónico',
        'change' => 'Cambiar',
    ],

    'email_updated' => [
        'success' => 'Correo electrónico actualizado con éxito'
    ],


    'actions' => [
        'change_email' => 'Cambiar correo electrónico',
        'change_email_description' => 'Actualiza la dirección de correo del usuario.',
        'change_password' => 'Cambiar contraseña',
        'change_password_description' => 'Actualiza la contraseña del usuario.',
        'view_user' => 'Ver usuario',
        'delete' => 'Eliminar usuario',
        'delete_description' => '¿Estás seguro de que deseas eliminar a {name}? Esta acción no se puede deshacer.',
    ],

    'labels' => [
        'email' => 'Correo electrónico',
        'password' => 'Contraseña',
        'password_confirmation' => 'Confirmar contraseña',
        'premium' => 'Premium',
        'free' => 'Gratis',
        'verified' => 'Verificado',
        'not_verified' => 'No verificado',
    ],

    'placeholders' => [
        'email' => 'Ingresa el correo electrónico',
        'password' => 'Ingresa una nueva contraseña',
        'password_confirmation' => 'Repite la contraseña',
    ],

    'messages' => [
        'email_updated' => 'El correo se ha actualizado correctamente.',
        'password_updated' => 'La contraseña se ha actualizado correctamente.',
    ],

    'validation' => [
        'email_required' => 'El correo electrónico es obligatorio.',
        'email_invalid' => 'El correo electrónico debe ser válido.',
        'email_max_length' => 'El correo electrónico no puede exceder los 255 caracteres.',
        'email_unique' => 'Este correo electrónico ya está en uso.',
        'password_required' => 'La contraseña es obligatoria.',
        'password_string' => 'La contraseña debe ser una cadena de texto.',
        'password_min_length' => 'La contraseña debe tener al menos 8 caracteres.',
    ],

];
