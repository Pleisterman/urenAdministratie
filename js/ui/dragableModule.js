/*
        @package        Pleisterman/MbAdmin
        function:       handles drag events
        Last revision:  29-01-2025
 
*/

// create module function
( function( mbAdminApp ){

    // create name space
    mbAdminApp.ui = mbAdminApp.ui ? mbAdminApp.ui : {};
    
    // MODULE: dragAbleModule( html element id: parentId, 
    //                         named array: options, 
    //                         named array: callbacks ) named array
    mbAdminApp.ui.dragAbleModule = function( parentId, options, callbacks ) {
        
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                            // object
        self.MODULE = 'DragAbleModule';                             // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element id
        self.options = options;                                     // named array
        self.callbacks = callbacks;                                 // named array
        self.dragAreaOptions = {                                    // named array
            'id'                    :    mbAdminApp.getUiId( 'dividerDragArea' ), // html element id 
            'element'               :   'div',                      // html element type 
            'display'               :   'none',                     // css
            'position'              :   'absolute',                 // css
            'zIndex'                :   self.options['zIndexDragArea'], // css
            'width'                 :   '0.7em',                    // css 
            'height'                :   '1.7em',                    // css 
            'backgroundColor'       :   'rgba( 0,120,120, 0.4)',    // css
            'cursor'                :   self.options['cursor'],     // css    
            'offset'                :   90,                         // integer
            'mouseIsOver'           :   false,                      // boolean
            'dragging'              :   false,                      // boolean
            'lastMousePosition'     :   {                           // named array
                'top'               :   0,                          // integer
                'left'              :   0,                          // integer
            },                                                      // done named array
        };                                                          // done named array
        self.align = 'left';                                        // string                                                                        
        // DONE MEMBERS         
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();
            
            // add events
            self.addEvents();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // add layout change
            mbAdminApp.subscribeToEvent( 'layoutChange', self.layoutChange );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.options );

            // add drag area to body
            mbAdminApp.appendContainer( document.body, self.dragAreaOptions );
            
            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void
        
            // get element
            let element = mbAdminApp.getElementById( self.options['id'] );
        
            // add hover events
            element.addEventListener( 'mouseover' , self.mouseover ); 
            element.addEventListener( 'mouseout' , self.mouseout ); 
            // add dragable events
            element.addEventListener( 'mousedown' , self.startDrag ); 
            
            // get drag area element
            let dragAreaElement = mbAdminApp.getElementById( self.dragAreaOptions['id'] );
        
            // add drag area events
            dragAreaElement.addEventListener( 'mouseout' , self.endDrag ); 
            dragAreaElement.addEventListener( 'mouseup' , self.endDrag ); 
            dragAreaElement.addEventListener( 'mousemove' , self.drag ); 
            // add drag area events
            
        // DONE FUNCTION: addEvents( void ) void
        };            
        self.mouseOver = function( event ){
        // FUNCTION: mouseOver( event: event ) void
        
            // debug info
            self.debug( 'mouseOver' + self.options['id'] );
            
            // highlight
            self.highlight();
            
        // DONE FUNCTION: mouseOver( event: event ) void
        };
        self.mouseOut = function( ){
        // FUNCTION: mouseOut( event: event ) void
        
            // debug info
            self.debug( 'mouseOut' );
            
            // reset highlight
            self.reset();
            
        // DONE FUNCTION: mouseOut( event: event ) void
        };
        self.startDrag = function( event ){
        // FUNCTION: startDrag( event: event ) void
        
            // debug info
            self.debug( 'startDrag' );
            
            // remember dragging
            self.dragAreaOptions['dragging'] = true;
            
            // highlight
            self.highlight();
            
            // adjust layout
            self.layoutChange();
            
            // show drag area
            mbAdminApp.setStyle( self.dragAreaOptions['id'], 'display', 'block' ); 
            
            // set last position top
            self.dragAreaOptions['lastMousePosition']['top'] = event.pageY;
            // set last position left
            self.dragAreaOptions['lastMousePosition']['left'] = event.pageX;
            
        // DONE FUNCTION: startDrag( event: event ) void
        };
        self.drag = function( event ){
        // FUNCTION: drag( event: event ) void

            // calculate change
            let change = {
                'y' : event.pageY - self.dragAreaOptions['lastMousePosition']['top'],
                'x' : event.pageX - self.dragAreaOptions['lastMousePosition']['left']
            };
            // calculate change

            // set last position top
            self.dragAreaOptions['lastMousePosition']['top'] = event.pageY;
            // set last position left
            self.dragAreaOptions['lastMousePosition']['left'] = event.pageX;
            // set last mouse position

            // call callback
            self.callbacks['drag']( change );
            
            // adjust layout
            self.layoutChange();
            
        // DONE FUNCTION: drag( event: event ) void
        };
        self.endDrag = function( ){
        // FUNCTION: endDrag( void ) void
        
            // debug info
            self.debug( 'endDrag' );
            
            // reset
            self.reset();
            
            // remember dragging
            self.dragAreaOptions['dragging'] = false;

            // end drag callback exists
            if( self.callbacks['endDrag'] ){
                
                // call callback
                self.callbacks['endDrag']( );

            }
            // end drag callback exists
            
            // hide drag area
            mbAdminApp.setStyle( self.dragAreaOptions['id'], 'display', 'none' );

        // DONE FUNCTION: endDrag( void ) void
        };
        self.highlight = function( ){
        // FUNCTION: highlight( void ) void

            // has images and highlight image
            if( self.options['images'] !== undefined &&
                self.options['images']['highlight'] !== undefined    ){
                
                // mouse over -> highlight image url 
                mbAdminApp.setStyle( self.options['id'], 'background-image', self.options['images']['highlight'] );
                
            }
            // has images and highlight image
            
        // DONE FUNCTION: highlight( void ) void
        };
        self.reset = function( ){
        // FUNCTION: reset( void ) void
        
            // has images and image 
            if( self.options['images'] !== undefined &&
                self.options['images']['image'] !== undefined ){
                
                // set image url 
                mbAdminApp.setStyle( self.options['id'], 'background-image', self.options['images']['image'] );
                
            }
            // has images and image 
                            
        // DONE FUNCTION: reset( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // ! dragging
            if( !self.dragAreaOptions['dragging'] ){
                // no action
               // return;
            }
            // ! dragging

            // create vars
            let top = 0, left = 0, width = 0, height = 0;
            
            // get window dimensions
            let windowDimensions = mbAdminApp.getWindowDimensions( );
            
            // get parent layout
            let parentLayout = mbAdminApp.getElementById( self.parentId ).getBoundingClientRect();
            
            // calculate left
            left = parentLayout.left - self.dragAreaOptions['offset'];
            
            // align is right
            if( self.align === 'right' ){
                
                // add width
                left += parentLayout.width;
                
            }
            // align is right            
            
            // left < 0
            left = Math.max( left, 0 );
            
            // calculate top
            top = parentLayout.top - self.dragAreaOptions['offset'];
            
            // align is bottom
            if( self.align === 'bottom' ){
                
                // add height
                top += parentLayout.height;
            
            }
            // align is bottom
            
            // top < 0
            top = Math.max( top, 0 );
            
            // get caller layout
            let callerLayout = mbAdminApp.getElementById( self.options['id'] ).getBoundingClientRect();
            
            // calculate width
            width = callerLayout.width;
            
            // calculate max width
            width = Math.min( windowDimensions.width - left, width + ( 2 * self.dragAreaOptions['offset'] ) );
            
            // calculate height
            height = callerLayout.height;
            
            // calculate max height
            height = Math.min( windowDimensions.height - top, height + ( 2 * self.dragAreaOptions['offset'] ) );
            
            // set width
            mbAdminApp.setStyle( self.dragAreaOptions['id'], 'width', width + 'px' );
            
            // set height
            mbAdminApp.setStyle( self.dragAreaOptions['id'], 'height', height + 'px' );
            
            // set left
            mbAdminApp.setStyle( self.dragAreaOptions['id'], 'left', left + 'px' );
            
            // set top
            mbAdminApp.setStyle( self.dragAreaOptions['id'], 'top', top + 'px' );
            
        // DONE FUNCTION: layoutChange( void ) void
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
          
            // FUNCTION: setAlign( string: align ) void
            setAlign : function( align ){
                
                // set align
                self.align = align;
                
            }
            
        };
        // DONE PUBLIC
    
    };
    // DONE MODULE: dragAbleModule( html element id: parentId, 
    //                              named array: options, 
    //                              named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function
