/*
        @package        Pleisterman/MbAdmin
        function:       Adds basic css
  
        Last revision:  27-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get namespace
    let nameSpace = mbAdminApp;
    
    // create name space
    nameSpace.content = nameSpace.content ? nameSpace.content : {};

    // MODULE: cssModule( void ) named array  
    nameSpace.content.cssModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                            // object
        self.MODULE = 'ContentCssModule';           // string
        self.debugOn = false;                       // boolean
        self.styleSheetId = 'extra-css';            // string        
        self.styleSheet = null;                     // stylesheet / null
        self.css = {                                // named array
            'div' : {                               // named array
                '-webkit-user-select'   : 'none',   // string
                '-ms-user-select'       : 'none',   // string
                'user-select'           : 'none'    // string
            }                                       // done named array
        };                                          // done named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add get style sheet
            self.getStyleSheet();
            
            // add css
            self.addCss();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addCss = function() {
        // FUNCTION: addCss( void ) void
            
            // debug info
            self.debug( 'addCss' );
            
            // create style sheet
            const styleSheet = document.createElement( "style" );
             
            // Append style sheet
            document.head.appendChild( styleSheet );
  
             // Grab style element's sheet
            const sheet = styleSheet.sheet;

            // loop over css
            Object.entries( self.css ).forEach( ( [index, rules] ) => {
                
                // create rule
                let rule = self.createRule( index, rules );
                
                // insert css
                sheet.insertRule( rule, 0 );
                
            });
            // loop over css
  
        // DONE FUNCTION: addCss( void ) void
        };
        self.createRule = function( index, rules ) {
        // FUNCTION: createRule( string: index, named array: rules ) string
            
            // create result
            let result = index + '{';
            
            // loop over css
            Object.entries( rules ).forEach( ( [index, rule] ) => {
                
                // add rule
                result += index + ':' + rule + ';';
                
            });
            // loop over css
  
            // add seperator
            result += '}';
            
            // return result
            return result;
            
        // DONE FUNCTION: createRule( string: index, named array: rules ) string
        };
        self.getStyleSheet = function() {
        // FUNCTION: getStyleSheet( void ) void
            
            // debug info
            self.debug( 'getStyleSheet' );

            // create stylesheet
            self.createStyleSheet();

            // loop over style sheets
            for ( let i = 0; i < document.styleSheets.length; i++ ) {
      
                
                if( document.styleSheets[i].title === self.styleSheetId ) {
                    
                    return document.styleSheets[i];
                    
                }
                
            }
    
        // DONE FUNCTION: getStyleSheet( void ) void
        };
        self.createStyleSheet = function() {
        // FUNCTION: createStyleSheet( void ) void
            
            // style sheet exists
            if ( document.getElementById( self.styleSheetId ) ) {
               
               // done
               return;
                
            }
            // style sheet exists
            
            // create style
            const style = document.createElement( 'style' );
      
            // set title
            style.title = self.styleSheetId;
      
            // addstyle
            document.getElementsByTagName( 'head')[0].appendChild( style );
    
        // DONE FUNCTION: createStyle( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call app debug
                mbAdminApp.debug( self.MODULE + ' ' + message );
                
            }
            // done debug on
            
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
    // DONE MODULE: cssModule( void ) named array 
    
})( mbAdminApp );
// done create module function
