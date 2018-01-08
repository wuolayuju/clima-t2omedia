<?php
class Cache extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'ct_cache';
    public $timestamps = false;
    protected $primaryKey = 'id_city';

    public function city()
    {
        return $this->belongsTo('City', 'id_city');
    }

    public function forecast()
    {
        return $this->hasMany('Forecast', 'id_city');
    }
}
