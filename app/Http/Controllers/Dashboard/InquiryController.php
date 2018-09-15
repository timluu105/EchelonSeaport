<?php namespace App\Http\Controllers\Dashboard;

use Auth;
use App\Models\Inquiry;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Csv;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InquiryController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Inquiry Controller
    |--------------------------------------------------------------------------
    */

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('dashboard_access');
    }

    public function getCsv($filename, $inquiry_data)
    {
        $spreadsheet = new Spreadsheet();
        $spreadsheet->getActiveSheet()->fromArray($inquiry_data, NULL, 'A1');
        $writer = new Csv($spreadsheet);
        $writer->setUseBOM(true);
        $writer->setDelimiter(',');
        $writer->setEnclosure('"');
        return response($writer->save('php://output'), 200)->header('Content-Type', 'text/csv');
    }

    public function getExcel($filename, $inquiry_data)
    {
        $spreadsheet = new Spreadsheet();
        $drawing = new Drawing();
        $drawing->setName(env('APP_NAME'));
        $drawing->setDescription(env('APP_NAME') . ' Logo');
        $drawing->setPath(base_path() . '/public/img/logo.png');
        $drawing->setCoordinates('A1');
        $drawing->setOffsetX(10);
        $drawing->setOffsetY(10);
        $drawing->setWidth(200);
        $drawing->setWorksheet($spreadsheet->getActiveSheet());
        $spreadsheet->getActiveSheet()->getRowDimension('1')->setRowHeight($drawing->getHeight());
        $spreadsheet->getActiveSheet()->mergeCells('A1:Z1');
        $spreadsheet->getActiveSheet()->getDefaultColumnDimension()->setWidth(25);
        $spreadsheet->getActiveSheet()->fromArray($inquiry_data, NULL, 'A2');
        $writer = new Xlsx($spreadsheet);
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0');
        $writer->save('php://output');
    }

    public function getDownload($filename)
    {
        if (Auth::user()->hasPermission('inquiries.download')) {
            $inquiry_data = Inquiry::getInquiryData(true);

            if (preg_match('/\.csv$/', $filename)) {
                return self::getCsv($filename, $inquiry_data);
            } else if (preg_match('/\.xlsx/', $filename)) {
                return self::getExcel($filename, $inquiry_data);
            } else {
                abort(404);
            }
        }
    }

}
