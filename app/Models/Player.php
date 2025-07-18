<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Player extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'languaje',
        'server_id',
        'episode_id',
        'code_backup',
    ];

    public function server()
    {
        return $this->belongsTo(Server::class);
    }

    public function episode()
    {
        return $this->belongsTo(Episode::class);
    }
}
