<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Genre extends Model
{
    protected $fillable = ['title', 'slug', 'name_mal'];

    public $timestamps = false;
}
