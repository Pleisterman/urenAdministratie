/*
        @package        Pleisterman/MbAdmin
  
        function:       controls diplay of the export data 
  
        Last revision:  10-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.items.export;
    
    // MODULE: displayModule( string: contentId ) named array
    nameSpace.displayModule = function( contentId ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                    // object
        self.MODULE = 'ContentItemsExportDisplayModule';    // string
        self.debugOn = false;                               // boolean
        self.inputModules = [];                             // named array
        self.contentId = contentId;                         // string
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // event subscription export open
            mbAdminApp.subscribeToEvent( 'exportOpen', self.show );
            
            // event subscription display set data
            mbAdminApp.subscribeToEvent( 'displaySetData', self.setData );
            
            // event subscription export close
            mbAdminApp.subscribeToEvent( 'exportClose', self.close );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.close = function() {
        // FUNCTION: close( void ) void

            // destruct existing modules
            self.destructModules();
            
        // DONE FUNCTION: close( void ) void
        };
        self.show = function() {
        // FUNCTION: show( void ) void

            // destruct existing modules
            self.destructModules();
            
            // empty content
            mbAdminApp.getElementById( self.contentId ).innnerHTML = '';
            
            // get data object
            let dataObject = mbAdminApp.getValue( 'dataObject', 'data' );    
            
            // get templates name space
            let templatesNameSpace = mbAdminApp.content.edit.templates;
            
            // create new modules
            Object.entries( dataObject ).forEach( ( [index, values] ) => {
                
                // switch: type
                switch( values['type'] ){
                    
                    // cases
                    case 'text' :  {
                            
                        // create text 
                        let input = new templatesNameSpace.textModule( self.contentId, values, false );
                        
                        // remember object
                        self.inputModules.push( input );
                        
                        // done
                        break;   
                        
                    }
                    case 'textarea' :  {
                            
                        // create text area
                        let input = new templatesNameSpace.textAreaModule( self.contentId, values, false );
                        
                        // remember object
                        self.inputModules.push( input );
                        
                        // done
                        break;   
                        
                    }
                    case 'checkbox' :  {
                            
                        // create checkbox
                        let input = new templatesNameSpace.checkboxModule( self.contentId, values, false );
                        
                        // remember object
                        self.inputModules.push( input );
                        
                        // done
                        break;   
                        
                    }
                    case 'date' :  {
                            
                        // create date    
                        let input = new templatesNameSpace.dateModule( self.contentId, values, false  );
                        
                        // remember object
                        self.inputModules.push( input );
                        
                        // done
                        break;   
                        
                    }
                    case 'list' :  {
                            
                        // create list    
                        let input = new templatesNameSpace.listModule( self.contentId, values, false );
                        
                        // remember object
                        self.inputModules.push( input );
                        
                        // done
                        break;   
                        
                    }
                    case 'select' :  {
                            
                        // create select    
                        let input = new templatesNameSpace.selectModule( self.contentId, values, false  );
                        
                        // remember object
                        self.inputModules.push( input );
                        
                        // done
                        break;   
                        
                    }
                    case 'spinner' :  {
                            
                        // create spinner    
                        let input = new templatesNameSpace.spinnerModule( self.contentId, values, false  );
                        
                        // remember object
                        self.inputModules.push( input );
                        
                        // done
                        break;   
                        
                    }
                    case 'element' : {
                            
                        // add element 
                        mbAdminApp.appendContainer( self.contentId, values['displayOptions'] );
                        
                        // done
                        break;   
                        
                    }
                    case 'noDisplay' :  {
                            
                        // done
                        break;   
                        
                    }
                    default : {
                            
                        // debug info
                        self.debug( 'unknown display type' + values['type'] );
                        
                    }
                    // done cases
                    
                }
                // done switch: type
                
            });
            // done create new modules

        // DONE FUNCTION: show( void ) void
        };
        self.setData = function(){
        // FUNCTION: setData( void ) void
        
            // loop over modules
            for( let i = 0; i < self.inputModules.length; i++ ){
                
                // set data input -> dataObject
                self.inputModules[i].setData();
                
            }
            // done loop over modules
            
        // DONE FUNCTION: setData( void ) void
        };
        self.destructModules = function(){
        // FUNCTION: destructModules( void ) void
        
            // loop over modules
            for( let i = 0; i < self.inputModules.length; i++ ){
                
                // call module destruct
                self.inputModules[i].destruct();
                
            }
            // done loop over modules
            
            // empty array
            while( self.inputModules.length > 0 ){
                
                // remove module
                self.inputModules.pop();
                
            }
            // done empty array
            
        // DONE FUNCTION: destructModules( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug is on
            if( self.debugOn ) {
                
                // call global debug
                mbAdminApp.debug( self.MODULE + ' ' + message );
                
            }
            // done debug is on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        
        // DONE PRIVATE
        
        // PUBLIC
        return {
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: displayModule( string: contentId ) named array
    
})( mbAdminApp );
// done create module function
