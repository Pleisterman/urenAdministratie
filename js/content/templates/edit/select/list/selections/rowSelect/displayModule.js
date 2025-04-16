/*
    @package        Pleisterman/MbAdmin

    function:       Displays row selection of the row select of the list template

    Last revision:  27-02-2025
 
*/    

// create module function
( function( mbAdminApp ){

    // get name space
    const nameSpace = mbAdminApp.content.templates.edit.select.list.selections.rowSelect;
    
    // MODULE: displayModule( html element id: parentId, 
    //                        integer: left, 
    //                        named array: data,
    //                        named array: listOptions,
    //                        named array: callbacks ) named array
    nameSpace.displayModule = function( parentId, left, data, listOptions, callbacks ) {
        // PRIVATE:

        // MEMBERS:
        const self = this;                                            // object
        self.MODULE = 'ContentTemplatesEditSelectListRowSelectDateDisplayModule';  // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element id
        self.data = data;                                           // named array
        self.listOptions = listOptions;                             // named array
        self.callbacks = callbacks;                                 // named array
        self.containerOptions = {                                   // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Display' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'text'                  :   'row 0-5 / 100',            // string
            'textAlign'             :   'center',                   // css
            'lineHeight'            :   '25px',                     // css
            'width'                 :   '120px',                    // css
            'height'                :   '25px',                     // css
            'top'                   :   '6px',                      // css
            'left'                  :   left + 'px',                // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css 
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css 
            'colors' : {                                            // named array
                'color'             :   mbAdminApp.getColor( 'dark' ).color, // color
                'highlight'         :   mbAdminApp.getColor( 'darker' ).highlight, // color
                'background' : {                                    // named array
                    'color'         :   mbAdminApp.getColor( 'lightest' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'lightest' ).highlight // color
                },                                                  // done named array
                'border' : {                                        // named array
                    'color'         :   mbAdminApp.getColor( 'darker' ).color, // color
                    'highlight'     :   mbAdminApp.getColor( 'darkest' ).highlight // color
                }                                                   // done named array
            },                                                      // done named array
            'border'                :   true,                       // boolean
            'borderWidth'           :   '1px',                      // css
            'borderColor'           :   mbAdminApp.getColor( 'darker' ).color, // css 
            'borderStyle'           :   'groove'                    // css            
        };                                                          // done named array  
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
           
            // add html
            self.addHtml();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );
            
            // get text
            self.containerOptions['text'] = self.getText();
            
            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                        
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // debug info
            self.debug( 'removeDisplay' );

            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.getText = function() {
        // FUNCTION: getText( void ) string
                    
            // create text
            let text = '';

            // no rows
            if( !self.data['rows'] ){
                
                // set text
                text = 'No data';
                
                // return result
                return text;

            }
            // no rows

            // get from
            const from = self.data['from'] ? self.data['from'] : 0;
            
            // get number of rows
            const numberOfRows = self.data['rows'] ? self.data['rows'].length : 0;

            // calculate to
            const to = from + numberOfRows - 1;

            // get total
            const total = self.data['total'] ? self.data['total'] : 0;

            // set text
            text = from + '-' + to + '/' + total; 
            
            // return result
            return text;

        // DONE FUNCTION: getText( void ) string
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function( ) {
        // FUNCTION: destruct( void ) void

            // remove html
            self.removeHtml();

            // unset data
            self.data = null;
            
            // unset list options
            self.listOptions = null;
            
            // unset callbacks
            self.callbacks = null;
            
        // DONE FUNCTION: destruct( void ) void
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
            
            // FUNCTION: layoutChange( void ) void
            layoutChange : function( ){
                
                // call internal
                self.layoutChange( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: dateDisplayModule( html element id: parentId, 
    //                                 integer: left, 
    //                                 named array: data,
    //                                 named array: listOptions,
    //                                 named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function
