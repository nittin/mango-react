<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    const CREATED_AT = 'date';
    const UPDATED_AT = 'date';

    protected $table = 'user';
    protected $fillable = [
        'id',
        'name',
        'first_name',
        'status',
        'date',
        'device'
    ];
    protected $dateFormat = 'U';
    protected $hidden = ['pivot', 'date'];
    protected $appends = ['photo'];
    protected $casts = [
        'id' => 'string',
        'photo' => 'string',
    ];
    public $timestamps = true;
    public function getPhotoAttribute()
    {
        return "http://".$_SERVER['HTTP_HOST']."/back/assets/users/origin/{$this->id}.jpg";
    }
    public function notifications()
    {
        return $this->hasMany('App\Models\Notification', 'user', 'id');
    }
    public function friends()
    {
        return $this->belongsToMany('App\Models\User', 'user_friend', 'user1', 'user2')
            ->withPivot('status');
    }
}
