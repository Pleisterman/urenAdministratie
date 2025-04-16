/*
        @package        Pleisterman/MbAdmin
  
        function:      controls the data container for the export
  
        Last revision:  09-02-2025
 
*/

// create module function
( function( mbAdminApp ){

    // get name space
    let nameSpace = mbAdminApp.content.items.export;
    
    // MODULE: containerModule( void ) named array
    nameSpace.containerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                            // object
        self.MODULE = 'ContentItemsExportContainerModule';          // string
        self.debugOn = false;                                       // boolean
        self.layoutId = 'layout';                                   // string
        self.dataId = '';                                           // string
        self.imageUrl = mbAdminApp.getSetting( 'imageUrl' );        // string
        self.containerOptions = {                                   // named array
            'id'                    :   self.MODULE + 'Container',  // string
            'element'               :   'div',                      // html element type 
            'text'                  :   '',                         // string
            'position'              :   'absolute',                 // css
            'display'               :   'none',                     // css
            'backgroundColor'       :   mbAdminApp.getColor( 'lightest' ).color, // css
            'zIndex'                :   mbAdminApp.getSetting( 'zIndexData' ).toString() // integer
        };                                                          // done named array
        self.headerOptions = {                                      // named array
            'id'                    :   self.MODULE + 'Header',     // string
            'element'               :   'div',                      // html element type 
            'text'                  :   '&nbsp;',                   // string
            'backgroundColor'       :   mbAdminApp.colors['panelHighlightBackgroundColor']['color'], // css
            'color'                 :   mbAdminApp.colors['panelHighlightColor']['color'], // css
            'fontSize'              :   '1.1em',                    // css
            'fontWeight'            :   'bold',                     // css
            'borderWidth'           :   '0.1em',                    // css
            'borderColor'           :   mbAdminApp.colors['panelBorderColor']['color'], // css 
            'borderStyle'           :   'solid',                    // css
            'borderBottom'          :   true,                       // boolean
            'paddingLeft'           :   '3.8em',                    // css
            'paddingTop'            :   '0.4em',                    // css
            'paddingBottom'         :   '0.6em'                     // css
        };                                                          // done named array
        self.contentOptions = {                                     // named array
            'id'                    :   self.MODULE + 'Content',    // string
            'element'               :   'div',                      // html element type 
            'backgroundColor'       :   'transparent',              // css
            'width'                 :   '100%',                     // css
            'overflow'              :   'auto'                      // css
        };                                                          // done named array
        self.buttonContainerOptions = {                             // named array  
            'id'                    :   self.MODULE + 'ButtonContainer',// string
            'element'               :   'div',                      // html element type 
            'backgroundColor'       :   mbAdminApp.colors['panelHighlightBackgroundColor']['color'], // css
            'marginRight'           :   0,                          // css
            'maximumMarginRight'    :   320,                        // css
            'minimumWidth'          :   220,                        // css
            'borderTop'             :   true,                       // boolean
            'borderBottom'          :   true,                       // boolean
            'borderWidth'           :   '0.1em',                    // css
            'borderColor'           :   mbAdminApp.colors['panelBorderColor']['color'], // css
            'borderStyle'           :   'groove'                    // css 
        };                                                          // done named array
        self.buttonOptions = {                                      // named array  
            'element'               :   'div',                      // html element type 
            'display'               :   'inline-block',             // css
            'color'                 :   mbAdminApp.colors['buttonColor']['color'], // css
            'backgroundColor'       :   mbAdminApp.colors['buttonBackgroundColor']['color'], // css
            'fontSize'              :   mbAdminApp.getSetting( 'buttonFontSize' ), // css
            'fontWeight'            :   mbAdminApp.getSetting( 'buttonFontWeight' ), // css
            'padding'               :   mbAdminApp.getSetting( 'buttonPadding' ), // css
            'minimumWidth'          :   '6.0em',                    // css
            'marginLeft'            :   12,                         // css
            'marginBottom'          :   4,                          // css
            'marginTop'             :   8,                          // css
            'border'                :   true,                       // boolean
            'borderWidth'           :   mbAdminApp.getSetting( 'buttonBorderWidth' ), // css
            'borderColor'           :   mbAdminApp.colors['buttonBorderColor']['color'], // css
            'borderStyle'           :   mbAdminApp.getSetting( 'buttonBorderStyle' ), // css
            'borderRadius'          :   mbAdminApp.getSetting( 'buttonBorderRadius' ), // css
            'cursor'                :   'pointer',                  // css
            'textAlign'             :   'center'                    // css
        };                                                          // done named array
        self.buttons = {                                            // named array  
            'exportHtml' : {                                        // named array  
                    'id'            :   self.MODULE + 'ExportHtmlButton', // string
                    'module'        :   null                        // module / null
            },                                                      // done named array        
            'exportCsv' : {                                         // named array  
                    'id'            :   self.MODULE + 'ExportCsvButton', // string
                    'module'        :   null                        // module / null
            },                                                      // done named array        
            'exportExcell' : {                                      // named array  
                    'id'            :   self.MODULE + 'ExportExcellButton', // string
                    'module'        :   null                        // module / null
            },                                                      // done named array        
            'cancel' : {                                            // named array  
                    'id'            :   self.MODULE + 'ExportCancelButton', // string
                    'module'        :   null                        // module / null
            }                                                       // done named array
        };                                                          // done named array
        self.messageOptions = {                                     // named array
            'id'                    :   self.MODULE + 'MessageContainer', // string
            'element'               :   'div',                      // html element type 
            'text'                  :   '',                         // string
            'position'              :   'absolute',                 // css
            'isVisible'             :   false,                      // boolean
            'showPeriod'            :   1200,                       // integer
            'containerMinimumWidth' :   120,                        // integer
            'color'                 :   mbAdminApp.colors['commonColor']['color'], // css
            'backgroundColor'       :   mbAdminApp.colors['dialogBackgroundColor']['color'], // css
            'errorColor'            :   mbAdminApp.colors['errorDialogColor']['color'], // css
            'errorBackgroundColor'  :   mbAdminApp.colors['errorDialogBackgroundColor']['color'], // css
            'padding'               :   '0.8em',                    // css
            'fontSize'              :   '1.1em',                    // css
            'fontWeight'            :   'bold',                     // css
            'border'                :   true,                       // boolean
            'borderWidth'           :   '0.1em',                    // css
            'borderStyle'           :   'solid',                    // css
            'borderColor'           :   mbAdminApp.colors['errorDialogBorderColor']['color'], // css
            'borderRadius'          :   '0.1em',                    // css
            'textAlign'             :   'center'                    // css
        };                                                          // done named array
        self.exportDisplayModule = null;                            // module / null
        self.mode = '';                                             // string
        self.messageTimer = null;                                   // timer object / null
        self.mouseOverButtonId = null;                              // html element id / null
        // DONE MEMBERS     

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add html
            self.addHtml();
            
            // add js events
            self.addEvents();
            
            // subscribe to event layoutChange
            mbAdminApp.subscribeToEvent( 'layoutChange', self.layoutChange );
            
            // subscribe to event exportOpen
            mbAdminApp.subscribeToEvent( 'exportOpen', self.open );
            
            // subscribe to event showExportMessage
            mbAdminApp.subscribeToEvent( 'showExportMessage', self.getMessage );
            
            // subscribe to event exportClose
            mbAdminApp.subscribeToEvent( 'exportClose', self.close );
            
            // add display module
            self.displayModule = new mbAdminApp.exportDisplayModule( self.contentOptions['id'] );

        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function(){
        // FUNCTION: addHtml( void ) void
            
            // get content id
            let contentId = mbAdminApp.getLayoutId( 'content' );
            
            // create data container
            mbAdminApp.appendContainer( contentId, self.containerOptions );

            // add header
            mbAdminApp.appendContainer( self.containerOptions['id'], self.headerOptions );

            // content to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.contentOptions );
                
            // add button container to container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.buttonContainerOptions );

            // create buttons
            self.addButtons();
                
            // message container
            mbAdminApp.appendContainer( self.containerOptions['id'], self.messageOptions );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addButtons = function(){
        // FUNCTION: addButtons( void ) void
            
            // set exportHtml id 
            self.buttonOptions['id'] = self.buttonOptions['exportHtmlId'];
            // set exportHtml text
            self.buttonOptions['text'] = mbAdminApp.translations['exportHtml'];
            // add exportHtml html
            $( '#' + self.buttonContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.buttonOptions ) );
            
            // set exportCsv id 
            self.buttonOptions['id'] = self.buttonOptions['exportCsvId'];
            // set exportCsv text
            self.buttonOptions['text'] = mbAdminApp.translations['exportCsv'];
            // add exportCsv html
            $( '#' + self.buttonContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.buttonOptions ) );
            
            // set exportExcel id 
            self.buttonOptions['id'] = self.buttonOptions['exportExcelId'];
            // set exportExcel text
            self.buttonOptions['text'] = mbAdminApp.translations['exportExcel'];
            // add exportExcel html
            $( '#' + self.buttonContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.buttonOptions ) );
            
            // set cancel id 
            self.buttonOptions['id'] = self.buttonOptions['cancelId'];
            // set cancel text
            self.buttonOptions['text'] = mbAdminApp.translations['cancel'];
            // add cancel html
            $( '#' + self.buttonContainerOptions['id'] ).append( mbAdminApp.jsonToElementHtml( self.buttonOptions ) );

        // DONE FUNCTION: addButtons( void ) void
        };
        self.addEvents = function(){
        // FUNCTION: addEvents( void ) void
            
            // add content scroll event
            $( '#' + self.contentOptions['id'] ).scroll( function( event ){ mbAdminApp.callEvent( 'dataContentScroll' ); } );

            // buttons
            self.addButtonEvents();

        // DONE FUNCTION: addEvents( void ) void
        };
        self.addButtonEvents = function(){
        // FUNCTION: addButtonEvents( void ) void
            
            // exportHtml button
            $( '#' + self.buttonOptions['exportHtmlId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['exportHtmlId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['exportHtmlId'] ).click( function( event ){ self.buttonClick( 'exportHtml' ); });
            // done exportHtml button
            
            // exportCsv button
            $( '#' + self.buttonOptions['exportCsvId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['exportCsvId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['exportCsvId'] ).click( function( event ){ self.buttonClick( 'exportCsv' ); });
            // done exportCsv button
            
            // exportExcel button
            $( '#' + self.buttonOptions['exportExcelId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['exportExcelId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['exportExcelId'] ).click( function( event ){ self.buttonClick( 'exportExcel' ); });
            // done exportExcel button
            
            // cancel button
            $( '#' + self.buttonOptions['cancelId'] ).mouseleave( function( event ){ self.buttonMouseOut( this.id ); });
            $( '#' + self.buttonOptions['cancelId'] ).mouseenter( function( event ){ self.buttonMouseIn( this.id ); });
            $( '#' + self.buttonOptions['cancelId'] ).click( function( event ){ self.buttonClick( 'cancel' ); });
            // done cancel button
                        
        // DONE FUNCTION: addButtonEvents( void ) void
        };
        self.buttonMouseIn = function( elementId ){
        // FUNCTION: buttonMouseIn( string: elementId ) void
            
            // remember mouse over
            self.mouseOverButtonId = elementId;

            // mouse over -> background color, color highlight
            $( '#' + elementId ).css( 'background-color', mbAdminApp.colors['buttonHighlightBackgroundColor']['color'] );
            // mouse over -> color, color highlight
            $( '#' + elementId ).css( 'color', mbAdminApp.colors['buttonHighlightColor']['color'] );
                        
        // DONE FUNCTION: buttonMouseIn( string: elementId ) void
        };
        self.buttonMouseOut = function( elementId ){
        // FUNCTION: buttonMouseOut( string: elementId ) void
            
            // is current tabstop
            if( mbAdminApp.getValue( 'selected', 'tabStops' ) === elementId ){
                // keep selected
                return;
            }
            // done is current tabstop
            
            // unset mouse over id
            self.mouseOverButtonId = elementId;

            // mouse out -> background color, color default
            $( '#' + elementId ).css( 'background-color', mbAdminApp.colors['buttonBackgroundColor']['color'] );
            $( '#' + elementId ).css( 'color', mbAdminApp.colors['buttonColor']['color'] );
            // done mouse out -> background color, color default
                        
        // DONE FUNCTION: buttonMouseOut( string: elementId ) void
        };
        self.buttonClick = function( action ){
        // FUNCTION: buttonClick( string: action ) void
            
            // cancel
            if( action === 'cancel' ){
                
                // close
                self.close();
                
            }
            else {
                
                // call the event action: exportHtml, exportCsv, exportExcel
                mbAdminApp.callEvent( 'export', action );
                
            }
            // done cancel 
                        
        // DONE FUNCTION: buttonClick( string: action ) void
        };
        self.exportHtml = function( ){
        // FUNCTION: exportHtml( void ) void
            
            // call export event
            mbAdminApp.callEvent( 'export', 'exportHtml' );
            
        // DONE FUNCTION: exportHtml( void ) void
        };
        self.exportCsv = function( ){
        // FUNCTION: exportCsv( void ) void
            
            // call export event
            mbAdminApp.callEvent( 'export', 'exportCsv' );
            
        // DONE FUNCTION: exportCsv( void ) void
        };
        self.exportExcel = function( ){
        // FUNCTION: exportExcel( void ) void
            
            // call export event
            mbAdminApp.callEvent( 'export', 'exportExcel' );
            
        // DONE FUNCTION: exportExcel( void ) void
        };
        self.cancel = function( ){
        // FUNCTION: cancel( void ) void
            
            // close
            self.close();
            
        // DONE FUNCTION: cancel( void ) void
        };
        self.open = function() {
        // FUNCTION: open( void ) void
            
            // debug info
            self.debug( 'open' );

            // get data object
            let dataObject = mbAdminApp.getValue( 'dataObject', 'data' ); 
            
            // get data id
            self.dataId = mbAdminApp.getValue( 'id', 'data' );    

            // set the title
            let title = '<nobr>';
            title += mbAdminApp.getValue( 'headerText', 'data' ); ;
            title += '</nobr>';
            $( '#' + self.headerOptions['id'] ).html( title );
            
            // hide the messages
            $( '#' + self.messageOptions['id'] ).hide();

            // show the containers
            //$( '#dataEditOverlay' ).show();
            $( '#' + self.containerOptions['id'] ).show();
            // show the containers
            
            // refresh the layout
            self.layoutChange();
            
        // DONE FUNCTION: open( void ) void
        };
        self.getMessage = function( messageId ){
        // FUNCTION: getMessage( string: messageId ) void
        
            // debug info
            self.debug( 'showExportMessage' + messageId );
            
            // get the message
            mbAdminApp.getMessage( messageId, self.showMessage );
            
        // DONE FUNCTION: getMessage( string: messageId ) void
        };
        self.showMessage = function( message, duration ){
        // FUNCTION: showMessage( string: message, integer: duration ) void
            
            // debug info
            self.debug( 'showExportMessage' + message );
            
            // set message background color
            $( '#' + self.messageOptions['id'] ).css( 'background-color', self.messageOptions['backgroundColor'] );
            
            // set message color
            $( '#' + self.messageOptions['id'] ).css( 'color', self.messageOptions['color'] );
            
            // set message html
            $( '#' + self.messageOptions['id'] ).html( message );
            
            // show the message
            $( '#' + self.messageOptions['id'] ).show();
            
            // refresh the layuot
            self.layoutChange();
            
            // delete old timer
            if( self.messageTimer ){
                
                // clear the timer
                clearTimeout( self.messageTimer );
                
                // unset timer
                self.messageTimer = null;
                
            }
            // done delete old timer
            
            // duration not defined
            if( duration === undefined ){
                
                // set default duration
                duration = self.messageOptions['showPeriod'];
                
            }
            // done duration not defined
            
            // create new timer
            self.messageTimer = setTimeout( function () { self.hideMessage(); }, duration  );
            
        // DONE FUNCTION: showMessage( string: message, integer: duration ) void
        };
        self.hideMessage = function(){
        // FUNCTION: hideMessage( void ) void
        
            // empty html
            $( '#' + self.messageOptions['id'] ).html( '' );
            
            // hide message
            $( '#' + self.messageOptions['id'] ).hide();
            
        // DONE FUNCTION: hideMessage( void ) void
        };
        self.close = function( ){
        // FUNCTION: close( void ) void
        
            // debug info
            self.debug( 'close' );
            
            // hide the containers
            $( '#dataEditOverlay' ).hide();
            $( '#' + self.containerOptions['id'] ).hide();
            // hide the containers

            // empty content
            $( '#' + self.contentOptions['id'] ).html( '' );
            
        // DONE FUNCTION: close( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // get top
            let top = $( '#right' ).position().top + $( '#layout' ).position().top;
            // get left
            let left = $( '#right' ).position().left;
            // get width
            let width = $( '#right' ).width();
            
            // start calculate total button width
            let totalButtonWidth = 4;
            totalButtonWidth += self.buttonOptions['buttonCount'] * mbAdminApp.getSetting( 'buttonPadding' );
            totalButtonWidth += ( self.buttonOptions['buttonCount']  * 2 ) * mbAdminApp.getSetting( 'buttonBorderWidth' );
            totalButtonWidth += ( self.buttonOptions['buttonCount']  * 2 ) * self.buttonOptions['marginLeft'];
            // done start calculate total button width

            // add exportHtmlButton width to total
            totalButtonWidth += $( '#' + self.buttonOptions['exportHtmlId'] ).outerWidth();
            // add exportHtmlButton width to total
            totalButtonWidth += $( '#' + self.buttonOptions['exportCsvId'] ).outerWidth();
            // add exportHtmlButton width to total
            totalButtonWidth += $( '#' + self.buttonOptions['exportExcelId'] ).outerWidth();
            // add exportHtmlButton width to total
            totalButtonWidth += $( '#' + self.buttonOptions['cancelId'] ).outerWidth();
            // add button margins
            totalButtonWidth += 2 * self.buttonOptions['buttonCount'] * self.buttonOptions['marginLeft'];

            // width < total width
            if( width < totalButtonWidth ){
                // set container width 
                $( '#' + self.buttonContainerOptions['id'] ).css( 'width', totalButtonWidth + 'px' );
                // set margin
                $( '#' + self.buttonContainerOptions['id'] ).css( 'margin-left', '0px' );
            }
            else {
                // calculate margin
                let restMargin = width - ( totalButtonWidth + self.buttonContainerOptions['marginRight'] );
                // rest margin < margin left
                if(  restMargin < self.buttonOptions['containerMarginLeft'] ){
                    // set margin
                    $( '#' + self.buttonContainerOptions['id'] ).css( 'padding-left', restMargin + 'px' );
                }
                else {
                    // restmargin > maximum right
                    if( restMargin > self.buttonContainerOptions['maximumMarginRight'] ){
                        // set rest margin
                        restMargin = self.buttonContainerOptions['maximumMarginRight'];
                    }
                    // done restmargin > maximum right
                    
                    // set margin
                    $( '#' + self.buttonContainerOptions['id'] ).css( 'padding-left', restMargin + 'px' );
                }
                // done rest margin < margin left
            }
            // done width < total width
            
            // set container position and dimensions
            $( '#' + self.containerOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            $( '#' + self.containerOptions['id'] ).width( $( '#right' ).width() );
            $( '#' + self.containerOptions['id'] ).height( $( '#right' ).height() );
            // done set container position and dimensions

            // calculate data content height
            let height = $( '#right' ).innerHeight();
            height -= $( '#' + self.headerOptions['id'] ).outerHeight();
            height -= $( '#' + self.buttonContainerOptions['id'] ).outerHeight();
            height --;
            // calculate data content height
            
            // calculate message position
            width =  ( $( '#' + self.containerOptions['id'] ).width() / 3 ) * 2;
            $( '#' + self.messageOptions['id'] ).width( width );
            left = ( $( '#' + self.containerOptions['id'] ).width() - $( '#' + self.messageOptions['id'] ).width() ) / 2; 
            top = ( $( '#' + self.containerOptions['id'] ).height() - $( '#' + self.messageOptions['id'] ).height() ) / 2; 
            $( '#' + self.messageOptions['id'] ).css( 'top', top + 'px' );
            $( '#' + self.messageOptions['id'] ).css( 'left', left + 'px' );
            // done calculate message position
            
            // set data content heights
            $( '#' + self.contentOptions['id'] ).height( height );
            
        // DONE FUNCTION: layoutChange( void ) void
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
    // DONE MODULE: containerModule( void ) named array
    
})( mbAdminApp );
// done create module function
