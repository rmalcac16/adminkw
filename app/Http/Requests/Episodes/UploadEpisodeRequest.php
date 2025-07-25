<?php

namespace App\Http\Requests\Episodes;

use Illuminate\Foundation\Http\FormRequest;

class UploadEpisodeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'number' => ['required', 'integer', 'min:1'],
            'file' => ['required', 'file', 'mimes:mp4', 'max:125000'],
            'language' => ['required', 'integer'],
            'server_id' => ['required', 'integer', 'exists:servers,id'],
        ];
    }
}
