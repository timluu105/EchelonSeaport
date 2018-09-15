<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'inquiries';

    /**
     * An array containing the set of Inquiry columns and their titles
     *
     * @var array
     */
    public static $inquiry_columns = [
        [ 'first_name', 'First Name' ],
        [ 'last_name', 'Last Name' ],
        [ 'email', 'Email' ],
        [ 'phone', 'Phone' ],
        [ 'hubspotutk', 'Hubspot Tracking Cookie' ],
        [ 'submitpageurl', 'Submission Page URL' ],
        [ 'submitpagetitle', 'Submission Page Title' ],
        [ 'ipaddress', 'IP Address' ],
        [ 'created_at', 'Date / Time' ]
    ];

    /**
     * Return an array of inquiry columns
     *
     * @return array
     */
    public static function getInquiryColumns()
    {
        return self::$inquiry_columns;
    }

    /**
     * Return an array of inquiry column names
     *
     * @return array
     */
    public static function getInquiryColumnNames()
    {
        return array_column(self::$inquiry_columns, 0);
    }

    /**
     * Return an array of inquiry column titles
     *
     * @return array
     */
    public static function getInquiryColumnTitles()
    {
        return array_column(self::$inquiry_columns, 1);
    }

    /**
     * Return an array of inquiry data
     *
     * @return array
     */
    public static function getInquiryData($include_titles = false)
    {
        $inquiries = [];

        if ($include_titles) {
            array_push($inquiries, self::getInquiryColumnTitles());
        }

        foreach (self::all() as $i) {
            $inquiry = [];

            foreach (self::getInquiryColumnNames() as $column) {
                switch ($column) {
                    case 'broker':
                        $inquiry[$column] = $i[$column] ? 'Yes' : 'No';
                        break;
                    case 'created_at':
                        $inquiry[$column] = $i->created_at->format('M j, Y - H:i:s');
                        break;
                    default:
                        $inquiry[$column] = $i[$column];
                }
            }

            array_push($inquiries, $inquiry);
        }

        return $inquiries;
    }

    public function firstName()
    {
        return trim(substr($this->name, 0, strpos($this->name, ' ')));
    }

    public function lastName()
    {
        return trim(substr($this->name, strpos($this->name, ' ')));
    }

}
