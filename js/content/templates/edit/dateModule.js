/*
        @package        Pleisterman/MbAdmin
  
        function:       contains the text input template
  
        Last revision:  13-03-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content;
    
    // create name space
    nameSpace.templates = nameSpace.templates ? nameSpace.templates : {};

    // set name space
    nameSpace = nameSpace.templates;
    
    // create name space
    nameSpace.edit = nameSpace.edit ? nameSpace.edit : {};
    
    // MODULE: dateModule( html element id: parentId, 
    //                     named array: itemOptions ) named array 
    nameSpace.edit.dateModule = function( parentId, itemOptions ) {
        // PRIVATE:

        // MEMBERS:
        let self = this;                                        // object
        self.MODULE = 'ContentTemplatesEditDateModule';         // string
        self.debugOn = false;                                   // boolean
        self.parentId = parentId;                               // html element id
        self.itemOptions = itemOptions;                         // named array
        self.containerOptions = {                               // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                  // html element type 
            'backgroundColor'       :   'transparent'           // css 
        };                                                      // done named array 
        self.itemContainerOptions = {                           // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'ItemContainer' ), // string 
            'element'               :   'div',                  // html element type 
            'display'               :   'inline-block',         // css
            'padding'               :   '0.8rem 1.2rem',        // css
            'backgroundColor'       :   'transparent',          // css 
            'border'                :   true,                   // boolean
            'borderStyle'           :   'solid',                // css
            'borderWidth'           :   '0.1rem',               // css
            'borderRadius'          :   '1.0rem',               // css
            'borderColor'           :   mbAdminApp.getColor( 'light' )['transparent-50'] // css
        };                                                      // done named array 
        self.itemContentOptions = {                             // named array 
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'ItemContent' ), // string 
            'element'               :   'div',                  // html element type 
            'display'               :   'flex'                  // css
        };                                                      // done named array 
        self.labelOptions = {                                   // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Label' ), // string 
            'element'               :   'div',                  // html element type
            'width'                 :   '7.0rem',               // css
            'fontSize'              :   '1.2rem',               // css
            'paddingTop'            :   '0.4rem',               // css
            'fontWeight'            :   'bold',                 // css
            'paddingRight'          :   '0.8rem',               // css
            'color'                 :   mbAdminApp.getColor( 'dark' ).color, // css
            'backgroundColor'       :   'transparent'           // css 
        };                                                      // done named array
        self.inputOptions = {                                   // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Input' ), // string 
            'element'               :   'input',                // html element type
            'type'                  :   'text',                 // input type 
            'readOnly'              :   true,                   // boolean
            'textAlign'             :   'center',               // css
            'width'                 :   '6.0em',                // css
            'fontSize'              :   '1.2rem',               // css
            'padding'               :   '0.2rem 0.3rem',        // css
            'marginRight'           :   '1.2rem',               // css
            'backgroundColor'       :   mbAdminApp.getColor( 'edit' ).color, // css 
            'borderRadius'          :   '0.2rem',               // css
            'cursor'                :   'pointer'               // css
        };                                                      // done named array
        self.checkboxOptions = {                                // named array
            'id'                    :   mbAdminApp.getUiId( self.MODULE + 'Checkbox' ), // string 
            'element'               :   'input',                // html element type
            'type'                  :   'text',                 // input type 
            'checked'               :   false,                  // boolean
            'readOnly'              :   true,                   // boolean
            'textAlign'             :   'center',               // css
            'fontSize'              :   '1.2rem',               // css
            'width'                 :   '1.2em',                // css 
            'height'                :   '1.2em',                // css 
            'padding'               :   '0.2rem 0.3rem',        // css
            'backgroundColor'       :   mbAdminApp.getColor( 'edit' ).color, // css 
            'border'                :   true,                   // boolean
            'borderStyle'           :   'solid',                // css
            'borderWidth'           :   '0.1rem',               // css
            'borderColor'           :   mbAdminApp.getColor( 'dark' ).color, // css
            'borderRadius'          :   '0.2rem',               // css
            'cursor'                :   'pointer'               // css
        };                                                      // done named array
        self.dateDisplayOptions = {                             // named array
            'align'                 :   'center'                // string
        };                                                      // done named array
        self.value = null;                                      // named array / null
        self.modules = {};                                      // named array
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // extend options
            self.extendOptions();
            
            // add html
            self.addHtml();
            
            // set value
            self.setValue();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.extendOptions = function() {
        // FUNCTION: extendOptions( void ) void
            
            // has display options
            if( self.itemOptions['displayOptions'] ){
            
                // extend label
                self.labelOptions = mbAdminApp.extend( self.labelOptions, self.itemOptions['displayOptions']['label'] );

                // extend input
                self.inputOptions = mbAdminApp.extend( self.inputOptions, self.itemOptions['displayOptions']['input'] );

            }
            // done has display options
            
        // DONE FUNCTION: extendOptions( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.containerOptions );
                        
            // add item container to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.itemContainerOptions );
                        
            // add item content to item container
            mbAdminApp.appendContainer( self.itemContainerOptions['id'], self.itemContentOptions );
                        
            // add label to item content
            mbAdminApp.appendContainer( self.itemContentOptions['id'], self.labelOptions );
                        
            // add input
            self.addInput();
            
            // add checkbox
            self.addCheckbox();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // remove checkbox
            self.removeCheckbox();
            
            // remove input
            self.removeInput();
            
            // remove label
            mbAdminApp.getElementById( self.labelOptions['id'] ).remove();
            
            // remove item content
            mbAdminApp.getElementById( self.itemContentOptions['id'] ).remove();
            
            // remove item container
            mbAdminApp.getElementById( self.itemContainerOptions['id'] ).remove();
            
            // remove container
            mbAdminApp.getElementById( self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addInput = function() {
        // FUNCTION: addInput( void ) void
            
            // debug info
            self.debug( 'addInput' );

            // create callbacks
            let callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.openDatePicker
            };
            // create callbacks

            // create input
            self.modules['input'] = new mbAdminApp.ui.buttonModule( self.itemContentOptions['id'],
                                                                    self.inputOptions,
                                                                    callbacks );
            // create input

            // date optional
            if( self.itemOptions['displayOptions'] &&
                self.itemOptions['displayOptions']['optional'] ){
            
                // value is null
                if( self.itemOptions['value'] === null ){
                    
                    // set checkbox text ' '
                    mbAdminApp.setStyle( self.inputOptions['id'], 'display', 'none' );
                    
                    // done
                    return;
                    
                }
                // done value is null
            
            }
            // date optional
            
        // DONE FUNCTION: addInput( void ) void
        };
        self.removeInput = function() {
        // FUNCTION: removeInput( void ) void
            
            // destroy input
            self.modules['input'].destruct();
            
            // unset input
            delete self.modules['input'];
            
        // DONE FUNCTION: removeInput( void ) void
        };
        self.addCheckbox = function() {
        // FUNCTION: addCheckbox( void ) void

            // date ! optional
            if( !self.itemOptions['displayOptions'] ||
                !self.itemOptions['displayOptions']['optional'] ){
            
                // done
                return;
            
            }
            // done date ! optional
                
            // debug info
            self.debug( 'addCheckbox' );

            // create callbacks
            let callbacks = {
                'mouseOver'     :   true,
                'mouseOut'      :   true,
                'click'         :   self.toggle
            };
            // create callbacks

            // create input
            self.modules['checkbox'] = new mbAdminApp.ui.buttonModule( self.itemContentOptions['id'],
                                                                       self.checkboxOptions,
                                                                       callbacks );
            // create input

        // DONE FUNCTION: addCheckbox( void ) void
        };
        self.removeCheckbox = function() {
        // FUNCTION: removeCheckbox( void ) void

            // checkbox ! exists
            if( !self.modules['checkbox'] ){
                
                // done
                return;
                
            }
            // checkbox ! exists
            
            // destroy checkbox
            self.modules['checkbox'].destruct();
            
            // unset checkbox
            delete self.modules['checkbox'];
            
        // DONE FUNCTION: removeCheckbox( void ) void
        };
        self.setValue = function() {
        // FUNCTION: setValue( void ) void
            
            // reset value
            self.value = null;
            
            // date optional
            if( self.itemOptions['displayOptions'] &&
                self.itemOptions['displayOptions']['optional'] ){
            
                // value ! null
                if( self.itemOptions['value'] !== null ){

                    // set checkbox text
                    mbAdminApp.getElementById( self.checkboxOptions['id'] ).value = 'X';

                }
                // done value ! null
            
            }
            // done date ! optional
                
            // value ! null
            if( self.itemOptions['value'] !== null ){

                // transform date
                self.value = mbAdminApp.databaseDateToDate( self.itemOptions['value'] );

                // create date string
                let dateString = mbAdminApp.getDateString( self.value );

                // show date
                mbAdminApp.getElementById( self.inputOptions['id'] ).value = dateString;

            }
            // done value ! null
                
        // DONE FUNCTION: setValue( void ) void
        };
        self.openDatePicker = function() {
        // FUNCTION: openDatePicker( void ) void

            // get date
            const date = self.value !== null ?
                         self.value :
                         mbAdminApp.getDate();        ;
            // get date
            
            // create options
            const options = {
                'elementId'         : self.inputOptions['id'],
                'displayOptions'    : self.dateDisplayOptions,
                'date'              : date,
                'callbacks' : {
                    'select'        : self.selectDate
                }
            };
            // create options
            
            // show date picker
            mbAdminApp.showDatePicker( options );            
            
        // DONE FUNCTION: openDatePicker( void ) void
        };
        self.selectDate = function( date ) {
        // FUNCTION: selectDate( named array: date ) void
            
            // set value
            self.value = date;
            
            // create date string
            let dateString = mbAdminApp.getDateString( self.value );

            // show date
            mbAdminApp.getElementById( self.inputOptions['id'] ).value = dateString;

        // DONE FUNCTION: selectDate( named array: date ) void
        };
        self.toggle = function() {
        // FUNCTION: toggle( void ) void
            
            // value is null 
            if( self.value === null ){

                // show date input
                mbAdminApp.setStyle( self.inputOptions['id'], 'display', 'block' );

                // set value
                self.value = mbAdminApp.getDate();        ;

                // create date string
                let dateString = mbAdminApp.getDateString( self.value );

                // show date
                mbAdminApp.getElementById( self.inputOptions['id'] ).value = dateString;
                
                // set checkbox text
                mbAdminApp.getElementById( self.checkboxOptions['id'] ).value = 'X';

                // open date picker
                self.openDatePicker();

                // done
                return;
                
            }
            // value is null 
            
            // set value
            self.value = null;
            
            // hide date input
            mbAdminApp.setStyle( self.inputOptions['id'], 'display', 'none' );
                    
            // set checkbox text
            mbAdminApp.getElementById( self.checkboxOptions['id'] ).value = ' ';
            
        // DONE FUNCTION: toggle( void ) void
        };
        self.changed = function() {
        // FUNCTION: changed( void ) boolean

            // value or original is null
            if( self.value === null ||
                self.itemOptions['value'] === null ){
            
                // value is original / else
                if( self.value === self.itemOptions['value'] ){

                    // return ! changed
                    return false;
                    
                }
                else {
                    
                    // return changed
                    return true;

                }
                // value is original / else                    
                
            }
            // value or original is null
                    
            // create date
            let originalDate = mbAdminApp.databaseDateToDate( self.itemOptions['value'] );

            // changed
            if( originalDate['year'] !== self.value['year'] ||
                originalDate['month'] !== self.value['month'] ||
                originalDate['day'] !== self.value['day'] ){
            
                // return changed
                return true;
                
            }
            // changed
                    
            // return not changed
            return false;

        // DONE FUNCTION: changed( void ) boolean
        };
        self.validate = function() {
        // FUNCTION: validate( void ) boolean

            // return valid
            return true;

        // DONE FUNCTION: validate( void ) boolean
        };
        self.showError = function( error ) {
        // FUNCTION: showError( string: error ) void

            // create options
            const options = {
                'elementId' :   self.inputOptions['id'],
                'text'      :   error,
                'align'     :   self.errorOptions['align']
            };
            // create options
            
            // show error message
            mbAdminApp.showErrorText( options );

        // DONE FUNCTION: showError( string: error ) void
        };
        self.getValue = function() {
        // FUNCTION: getValue( void ) string

            // return value
            return self.value;
                
        // DONE FUNCTION: getValue( void ) string
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void

            // remove html
            self.removeHtml();
            
            // unset item options
            self.itemOptions = null;
            
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
            
            // FUNCTION: getElementId( void ) html element id
            getElementId : function( ){
                
                // return result
                return self.inputOptions['id'];
                
            },
            // FUNCTION: changed( void ) boolean
            changed : function( ){
                
                // return internal call
                return self.changed( );
                
            },
            // FUNCTION: validate( void ) boolean
            validate : function( ){
                
                // return internal call
                return self.validate( );
                
            },
            // FUNCTION: getId( void ) string
            getId : function( ){
                
                // return result
                return self.itemOptions['id'];

            },
            // FUNCTION: resetValue( void ) void
            resetValue : function( ){
                
                // call internal 
                self.setValue( );
                
            },
            // FUNCTION: getValue( void ) string
            getValue : function( ){
                
                // return internal call
                return self.getValue( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: dateModule( html element id: parentId, 
    //                          named array: itemOptions ) named array  
    
})( mbAdminApp );
// done create module function
