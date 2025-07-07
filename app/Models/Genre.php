<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Genre extends Model
{
    protected $fillable = ['name', 'slug', 'name_mal'];
    public $timestamps = false;

    public function getNameAttribute()
    {
        return $this->title;
    }

    public function setNameAttribute($value)
    {
        $this->attributes['title'] = $value;
    }
}
