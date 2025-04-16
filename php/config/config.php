<?php
/*
        @package        Pleisterman/MbAdmin
        function:       reads the configuration information
        Last revision:  22-01-2025
 
*/

namespace php\config;

class config {
    
    public static function test() {
        
        return 'Testing config...';
        
    }
    
    public static function getDbConfig() {
        
        $dbInfo = array( 
            'host' => '',
            'database' => 'github_mbAdmin',
            'user' => 'root',
            'password' => ''
        );
        
        return $dbInfo;
        
    }
    public static function getDebugConfig() {
        
        $debugInfo = array( 
            'on' => true,
            'level' => 2,
            'path' => __DIR__ . '..\\..\\..\\log\\',
            'fileName' => 'debug'
        );
        
        return $debugInfo;
        
    }
    public static function getExportConfig() {
    
        $exportConfig = array ( 
            'path' => __DIR__ . '..\\..\\..\\export\\',
        );
        
        return $exportConfig;
        
    }
    public static function getJsConfig() {
        
        $jsConfig = array ( 
            'image' => array (
                'url' => './assets/'
            ),
            'api' => array (
                'dir' => './php/api/'
            ),
            'debug' => array (
                'on' => 0, 
                'layoutOptions' => array (
                    'zIndex' => 1000, 
                    'top' => 320, 
                    'left' => 1200, 
                    'width' => 900, 
                    'height' => 200 
                )
            ),
            'version' => '0.000001',
            'dir' => './js/'
        );
        
        return $jsConfig;
        
    }
    
}