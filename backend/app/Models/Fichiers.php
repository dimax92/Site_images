<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fichiers extends Model
{
    use HasFactory;
    protected $fillable = ["user_id", "nom", "fichier", "nomfichier", "description"];
}