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
        'domains',
    ];

    protected $casts = [
        'status' => 'boolean',
        'show_on_web_desktop' => 'boolean',
        'show_on_web_mobile' => 'boolean',
        'show_on_app' => 'boolean',
        'domains' => 'array',
    ];

    public function players()
    {
        return $this->hasMany(Player::class);
    }
}
