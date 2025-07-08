<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Server extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'title',
        'embed',
        'status',
        'position',
        'show_on_web_desktop',
        'show_on_web_mobile',
        'show_on_app',
    ];

    protected $casts = [
        'status' => 'boolean',
        'show_on_web_desktop' => 'boolean',
        'show_on_web_mobile' => 'boolean',
        'show_on_app' => 'boolean',
    ];
}
