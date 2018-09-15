<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Image;
use File;

class Press extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'press';

    public static $uploads_dir = '/uploads/press/';
    public static $upload_types = [ 'jpg', 'pdf' ];
    public static $sort_column = 'date';

    public static function getEnabledPressArticles()
    {
        $articles = [];

        foreach (self::where('enabled', true)->orderBy(self::$sort_column, 'desc')->get() as $article) {
            $article_image_path = self::$uploads_dir . $article->id . '.jpg';
            $article_pdf_path = self::$uploads_dir . $article->id . '.pdf';
            $article['description'] = nl2br($article->description);

            if (file_exists(base_path() . '/public' . $article_image_path)) {
                $article['image'] = $article_image_path;
            } else {
                $article['image'] = '';
            }

            if (file_exists(base_path() . '/public' . $article_pdf_path)) {
                $article['pdf'] = $article_pdf_path;
            } else {
                $article['pdf'] = '';
            }

            array_push($articles, $article);
        }

        return $articles;
    }

    public static function saveImage($image, $article_id, $max_width = 1920, $max_height = 1080)
    {
        $full_path = base_path() . '/public' . self::$uploads_dir;
        $file_name = $article_id . '.jpg';

        if (file_exists(base_path() . $image)) {
            $image = Image::make(base_path() . $image);
        } else if ($image->hasFile('file')) {
            $image = Image::make($image->file('file'));
        } else {
            echo "ERROR: No image in $image\n";
            return 'fail';
        }

        File::makeDirectory($full_path, 0755, true, true);
        $width = $image->width();
        $height = $image->height();

        if ($width > $max_width || $height > $max_height) {
            $new_width = $max_width;
            $new_height = ($new_width / $width) * $height;

            if ($new_height > $max_height) {
                $new_width = ($max_height / $height) * $width;
            }

            $image->resize($new_width, null, function($constraint) {
                $constraint->aspectRatio();
            });
        }

        $image->save($full_path . $file_name);
        return 'success';
    }

    public static function reorder($order)
    {
        // Update each row with the new order
        foreach (array_keys($order) as $order_id) {
            if (self::where('id', $order_id)->exists()) {
                $item = self::find($order_id);
                $item->order = $order[$order_id];
                $item->save();
            } else {
                return 'fail';
            }
        }

        return 'success';
    }

    public static function deleteArticle($article_id)
    {
        if (self::where('id', $article_id)->exists()) {
            // Delete any uploads that exist
            foreach (self::$upload_types as $type) {
                $full_upload_path = base_path() . '/public' . self::$uploads_dir . $article_id . '.' . $type;

                if (file_exists($full_upload_path)) {
                    unlink($full_upload_path);
                }
            }

            // Delete the article
            self::where('id', $article_id)->delete();
            return 'success';
        } else {
            return 'fail';
        }
    }

}
