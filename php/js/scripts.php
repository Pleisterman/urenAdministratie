<?php
/*
        @package        Pleisterman/MbAdmin
        function:       adds the javascripts to the index route
        Last revision:  29-01-2025
 
*/

namespace php\js;

use php\config\config;

class scripts {
    private $config;
    public function __construct( ) {

        $this->getConfig();
        
    }
    public function getModulesScript() {
        
        $jsDir = $this->config['dir'];
        $version = $this->config['version'];
        
        $result = $this->addMainModules( $jsDir, $version );
        $result .= $this->addSettingsModules( $jsDir, $version );
        $result .= $this->addUserModules( $jsDir, $version );
        $result .= $this->addFunctionsModules( $jsDir, $version );
        $result .= $this->addServiceModules( $jsDir, $version );
        $result .= $this->addServerModules( $jsDir, $version );
        $result .= $this->addUiModules( $jsDir, $version );
        $result .= $this->addToolsModules( $jsDir, $version );
        $result .= $this->addDialogsModules( $jsDir, $version );
        $result .= $this->addContentModules( $jsDir, $version );
        
        return $result;
        
    }
    private function addMainModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'mainModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addSettingsModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'settings/settingsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'settings/colorsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'settings/appValuesModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addFunctionsModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'functions/date/dateModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'functions/json/jsonValueModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'functions/json/extendModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'functions/padModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addServiceModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'service/debugModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'service/busyScreenModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'service/eventManagerModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'service/getElementModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'service/getUiIdModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'service/htmlGeneratorModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'service/getWindowDimensionsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'service/setStyleModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'service/getStyleModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'service/valuesModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'service/validateModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addServerModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'server/crudModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'server/downloadModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addUserModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'user/optionsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addUiModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'ui/dragableModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'ui/buttonModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addToolsModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'tools/hoverTextModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'tools/datePicker/datePickerModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'tools/datePicker/headerModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'tools/datePicker/dateSelectModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addMessageModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'messages/messageModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addDialogsModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'dialogs/dialogsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'dialogs/messageDialogModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'dialogs/dataOutOfDateDialogModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addContentModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'content/layoutModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/contentModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/cssModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/lists/listsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/lists/dividerModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/edit/editModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/edit/itemsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/edit/buttonsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/edit/updateModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/edit/insertModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/edit/exportModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        $result .= $this->addTemplatesModules( $jsDir, $version );
        $result .= $this->addItemsModules( $jsDir, $version );
        
        return $result;
        
    }
    private function addTemplatesModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/listModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/header/headerModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/header/buttonsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/header/newButtonModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/selections/selectionsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/selections/select/selectModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/selections/rowSelect/rowSelectModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/selections/rowSelect/previousButtonModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/selections/rowSelect/displayModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/selections/rowSelect/nextButtonModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/selections/dateSelect/dateSelectModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/selections/dateSelect/previousButtonModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/selections/dateSelect/displayModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/selections/dateSelect/nextButtonModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/content/contentModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/list/data/dataModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/textModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/textAreaModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/listModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/checkboxModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/dateModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/selectModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/listModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/header/headerModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/selections/selectionsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/selections/select/selectModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/selections/rowSelect/rowSelectModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/selections/rowSelect/previousButtonModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/selections/rowSelect/displayModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/selections/rowSelect/nextButtonModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/selections/dateSelect/dateSelectModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/selections/dateSelect/previousButtonModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/selections/dateSelect/displayModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/selections/dateSelect/nextButtonModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/content/contentModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/list/data/dataModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/linkedList/linkedListModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'content/templates/edit/select/linkedList/buttonsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;

        
        return $result;
        
    }
    private function addItemsModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'items/itemsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= $this->addItemsContactsModules( $jsDir, $version );
        $result .= $this->addItemsProjectsModules( $jsDir, $version );
        $result .= $this->addItemsTasksModules( $jsDir, $version );
        $result .= $this->addItemsRidesModules( $jsDir, $version );
        $result .= $this->addItemsVehiclesModules( $jsDir, $version );
        $result .= $this->addExportModules( $jsDir, $version );

        return $result;
         
    }
    private function addItemsContactsModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'items/contacts/contactsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'items/contacts/editModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addItemsProjectsModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'items/projects/projectsModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'items/projects/editModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addItemsTasksModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'items/tasks/tasksModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'items/tasks/editModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addItemsVehiclesModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'items/vehicles/vehiclesModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'items/vehicles/editModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addItemsRidesModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'items/rides/ridesModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'items/rides/editModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    private function addExportModules( $jsDir, $version ) {
        
        $result = '<script type="text/javascript" src="' . $jsDir . 'items/export/exportModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        $result .= '<script type="text/javascript" src="' . $jsDir . 'items/export/editModule.js' . '?version=' . $version . '"></script>' . PHP_EOL;
        
        return $result;
        
    }
    public function getIndexScript( $options ) {
        
        $scripts = $this->addIndexInitialisation( $options );
        
        return $scripts;
        
    }
    private function addIndexInitialisation( $options ) {
        
        $result = '<script>' . PHP_EOL;
        
        $result .= '"use strict"' . PHP_EOL;
        
        $result .= 'let mbAdminApp = new function(){};' . PHP_EOL;
        
        $result .= 'mbAdminApp.options = {};' . PHP_EOL;
        
        $result .= $this->adddebugInitialisation();        
        
        $result .= $this->addImageInitialisation();        
        
        $result .= $this->addApiInitialisation();        
        
        $result .= $this->addUserOptions( $options );        
        
        $result .= $this->addOnload();        
        
        $result .= '</script>' . PHP_EOL;
        
        return $result;
        
    }    
    private function addImageInitialisation() {
        
        $imageConfig = $this->config['image'];
        
        $result = 'mbAdminApp.options.imageUrl="';
            $result .= $imageConfig['url'];
        $result .= '";' . PHP_EOL;
        
        return $result;
        
    }    
    private function addApiInitialisation() {
        
        $apiConfig = $this->config['api'];
        
        $result = 'mbAdminApp.options.apiDir="';
            $result .= $apiConfig['dir'];
        $result .= '";' . PHP_EOL;
        
        return $result;
        
    }    
    private function adddebugInitialisation() {
        
        $debugConfig = $this->config['debug'];
        $layoutOptions = $debugConfig['layoutOptions'];
        
        $result = 'mbAdminApp.options.debug = {' . PHP_EOL;
            $result .= '"on" : ' . $debugConfig['on'] . ', ' . PHP_EOL;
            $result .= '"layoutOptions" : {' . PHP_EOL;
                $result .= '"zIndex" : ' . $layoutOptions['zIndex'] . ', ' . PHP_EOL;
                $result .= '"top" : ' . $layoutOptions['top'] . ', ' . PHP_EOL;
                $result .= '"left" : ' . $layoutOptions['left'] . ', ' . PHP_EOL;
                $result .= '"width" : ' . $layoutOptions['width'] . ', ' . PHP_EOL;
                $result .= '"height" : ' . $layoutOptions['height'] . PHP_EOL;
            $result .= '}' . PHP_EOL;
        $result .= '};' . PHP_EOL;
        
        return $result;
        
    }    
    private function addUserOptions( $options ) {
        
        $result = 'mbAdminApp.options.user = {' . PHP_EOL;
        
        // loop over colors
        for( $i = 0; $i < count( $options ); $i++ ){
        
            $result .= "'" . $options[$i]['name'] . "' : '" . $options[$i]['value'] . "'";
            
            if( $i < count( $options ) ){
                
                $result .= ',' . PHP_EOL;
                
            }
            
        }
        
       $result .= '};' . PHP_EOL;
        
        return $result;
        
    }    
    private function addOnload() {
        
        $result = 'window.onload = function(){' . PHP_EOL;
            $result .= 'mbAdminApp.main = new mbAdminApp.mainModule( );' . PHP_EOL;
            $result .= 'mbAdminApp.main.start()' . PHP_EOL;
        
        $result .= '};' . PHP_EOL;
        
        return $result;
        
    }    
    private function getConfig() {
        
        $this->config = config::getJsConfig();
        
    }
//    ''
}