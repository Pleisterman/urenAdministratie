/*
        @package        Pleisterman/MbAdmin
        function:       creates a HTML element and handels the events
                        handles state changes
        Last revision:  31-01-2025
 
*/    

// create module function
( function( mbAdminApp ){
        
    // create name space
    mbAdminApp.ui = mbAdminApp.ui ? mbAdminApp.ui : {};
    
    // MODULE: buttonModule( html element id: parentId, 
    //                       named array: options,
    //                       named array: callbacks ) named array
    mbAdminApp.ui.buttonModule = function( parentId, 
                                           options, 
                                           callbacks ) {
        // PRIVATE:

        // MEMBERS:
        const self = this;                                  // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'ButtonModule';                       // string
        self.parentId = parentId;                           // html element id
        self.options = options;                             // named array
        self.callbacks = callbacks;                         // named array
        self.enabled = true;                                // boolean
        self.selected = false;                              // boolean
        self.mouseIsOver = false;                           // boolean
        self.wheelDelta = {                                 // named array 
            'factor'                :   15,                 // integer
            'maximum'               :   30                  // integer
        };                                                  // done named array  
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // add html
            self.addHtml();
            
            // temp
            self.optionsCopy = mbAdminApp.extend( {}, self.options );
            
            // add events
            self.addEvents();
            
            // add event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: layoutChange( void ) void
        
            // subscribe to disable ui events
            mbAdminApp.subscribeToEvent( 'disableUiEvents', self.disableUiEvents );
            
            // subscribe to enable ui events
            mbAdminApp.subscribeToEvent( 'enableUiEvents', self.enableUiEvents );
            
        // DONE FUNCTION: layoutChange( void ]) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
        
            // unsubscribe from disable ui events
            mbAdminApp.unSubscribeFromEvent( 'disableUiEvents', self.disableUiEvents );
            
            // unsubscribe from enable ui events
            mbAdminApp.unSubscribeFromEvent( 'enableUiEvents', self.enableUiEvents );
            
        // DONE FUNCTION: removeEventSubscriptions( void ]) void
        };
        self.disableUiEvents = function() {
        // FUNCTION: disableUiEvents( void ) void
            
            // debug info
            self.debug( 'disableUiEvents' );

            // disable
            self.enabled = false;

            // element exists
            if( mbAdminApp.getElementById( self.options['id'] ) ){
                
                // show disabled
                self.showDisabled();

            }
            // element exists
            
        // DONE FUNCTION: disableUiEvents( void ) void
        };
        self.enableUiEvents = function() {
        // FUNCTION: enableUiEvents( void ) void
            
            // debug info
            self.debug( 'enableUiEvents' );

            // disable
            self.enabled = true;

            // element exists
            if( mbAdminApp.getElementById( self.options['id'] ) ){
                
                // reset
                self.reset();

            }
            // element exists
            
        // DONE FUNCTION: enableUiEvents( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to parent
            mbAdminApp.appendContainer( self.parentId, self.options );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // debug info
            self.debug( 'removeHtml' );

            // remove container
            mbAdminApp.getElementById( self.options['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void
         
            // debug info
            self.debug( 'addEvents: ' + self.options['id']);
        
            // add basic events
            self.addBasicEvents();

            // add wheel events
            self.addWheelEvents();

            // add key events
            self.addKeyEvents();

        // DONE FUNCTION: addEvents( void ) void
        };            
        self.addBasicEvents = function() {
        // FUNCTION: addBasicEvents( void ) void
            
            // mouse over callback exists
            if( self.callbacks['mouseOver'] !== undefined ){
            
                // add mouse over
                mbAdminApp.getElementById( self.options['id'] ).addEventListener( 'mouseover', self.mouseOver ); 
                
            }
            // mouse over callback exists
            
            // mouse out callback exists
            if( self.callbacks['mouseOut'] !== undefined ){
            
                // add mouse out
                mbAdminApp.getElementById( self.options['id'] ).addEventListener( 'mouseout', self.mouseOut ); 
                
            }
            // mouse out callback exists
            
            // click callback exists
            if( self.callbacks['click'] !== undefined ){
            
                // add click
                mbAdminApp.getElementById( self.options['id'] ).addEventListener( 'click', self.click ); 
                
            }
            // click callback exists

        // DONE FUNCTION: addBasicEvents( void ) void
        };            
        self.addWheelEvents = function() {
        // FUNCTION: addWheelEvents( void ) void
            
            // wheel callback exists
            if( self.callbacks['wheel'] !== undefined ){
            
                // create options
                const options = {
                    'passive'   :   true  
                };
                // create options
            
                // add wheel events
                mbAdminApp.getElementById( self.options['id'] ).addEventListener( 'wheel', self.scroll, options ); 
                mbAdminApp.getElementById( self.options['id'] ).addEventListener( 'DOMMouseScroll', self.scroll, options ); 
                // add wheel events
                
            }
            // wheel callback exists

        // DONE FUNCTION: addWheelEvents( void ) void
        };            
        self.addKeyEvents = function() {
        // FUNCTION: addKeyUp( void ) void
            
            // key up callback exists
            if( self.callbacks['keyUp'] !== undefined ){

                // add key up 
                mbAdminApp.getElementById( self.options['id'] ).addEventListener( 'keyup', self.keyUp ); 
                
            }
            // key up callback exists
            
            // key down callback exists
            if( self.callbacks['keyDown'] !== undefined ){

                // add key down
                mbAdminApp.getElementById( self.options['id'] ).addEventListener( 'keydown', self.keyDown ); 
                
            }
            // key down callback exists
            
        // DONE FUNCTION: addKeyEvents( void ) void
        };            
        self.removeEvents = function() {
        // FUNCTION: removeEvents( void ) void        
         
            // debug info
            self.debug( 'removeEvents: ' + self.options['id']);
        
            // remove basic events
            self.removeBasicEvents();

            // remove wheel events
            self.removeWheelEvents();

            // remove key events
            self.removeKeyEvents();
            
        // DONE FUNCTION: removeEvents( void ) void
        };            
        self.removeBasicEvents = function() {
        // FUNCTION: removeBasicEvents( void ) void
            
            // mouse over callback exists
            if( self.callbacks['mouseOver'] !== undefined ){
            
                // add mouse over
                mbAdminApp.getElementById( self.options['id'] ).removeEventListener( 'mouseover' , self.mouseOver ); 
                
            }
            // mouse over callback exists
            
            // mouse out callback exists
            if( self.callbacks['mouseOut'] !== undefined ){
            
                // add mouse out
                mbAdminApp.getElementById( self.options['id'] ).removeEventListener( 'mouseout' , self.mouseOut ); 
                
            }
            // mouse out callback exists
            
            // click callback exists
            if( self.callbacks['click'] !== undefined ){
            
                // add click
                mbAdminApp.getElementById( self.options['id'] ).removeEventListener( 'click' , self.click ); 
                
            }
            // click callback exists

        // DONE FUNCTION: removeBasicEvents( void ) void
        };            
        self.removeWheelEvents = function() {
        // FUNCTION: removeWheelEvents( void ) void
            
            // wheel callback exists
            if( self.callbacks['wheel'] !== undefined ){
            
                // removewheel events
                mbAdminApp.getElementById( self.options['id'] ).removeEventListener( 'mousewheel', self.scroll ); 
                mbAdminApp.getElementById( self.options['id'] ).removeEventListener( 'DOMMouseScroll', self.scroll ); 
                // remove wheel events
                
            }
            // wheel callback exists

        // DONE FUNCTION: removeWheelEvents( void ) void
        };            
        self.removeKeyEvents = function() {
        // FUNCTION: removeKeyEvents( void ) void
            
            // key up callback exists
            if( self.callbacks['keyUp'] !== undefined ){

                // add key up 
                mbAdminApp.getElementById( self.options['id'] ).removeEventListener( 'keyup' , self.keyUp ); 
                
            }
            // key up callback exists
            
            // key down callback exists
            if( self.callbacks['keyDown'] !== undefined ){

                // add key down
                mbAdminApp.getElementById( self.options['id'] ).removeEventListener( 'keydown' , self.keyDown ); 
                
            }
            // key down callback exists
            
        // DONE FUNCTION: removeKeyEvents( void ) void
        };            
        self.mouseOver = function( event ){
        // FUNCTION: mouseOver( event: event ) void
        
            // remember mouse over
            self.mouseIsOver = true;
            
            // ! enabled
            if( !self.enabled || self.selected ){

                // done
                return;
                
            }
            // ! enabled
        
            // debug info
            self.debug( 'mouseOver' + self.options['id'] );
            
            // highlight
            self.highlight();
            
            // callback is function
            if( typeof self.callbacks['mouseOver'] === 'function' ) {
                
                // call callback
                self.callbacks['mouseOver']( event, self.options  );
                
            }
            // callback is function
            
        // DONE FUNCTION: mouseOver( event: event ) void
        };
        self.mouseOut = function( ){
        // FUNCTION: mouseOut( event: event ) void
        
            // remember mouse out
            self.mouseIsOver = false;
            
            // ! enabled
            if( !self.enabled || self.selected ){

                // done
                return;
                
            }
            // ! enabled
        
            // debug info
            self.debug( 'mouseOut' );
            
            // reset
            self.reset();
            
            // callback is function
            if( typeof self.callbacks['mouseOut'] === 'function' ) {
                
                // call callback
                self.callbacks['mouseOut']( event, self.options );
                
            }
            // callback is function
                
        // DONE FUNCTION: mouseOut( event: event ) void
        };
        self.highlight = function( ){
        // FUNCTION: highlight( void ) void

            // has images and highlight image
            if( self.options['images'] !== undefined &&
                self.options['images']['highlight'] !== undefined    ){
                
                // mouse over -> highlight image
                mbAdminApp.setStyle( self.options['id'], 'background-image', self.options['images']['highlight'] );
                
            }
            // has images and highlight image

            // ! colors
            if( self.options['colors'] === undefined ||
                self.selected ){
                
                // done
                return;
                
            }   
            // ! colors
            
            //  get colors
            const colors = self.options['colors']; 

            // has highlight color
            if( colors['highlight'] !== undefined ){

                // set color highlight 
                mbAdminApp.setStyle( self.options['id'], 'color', colors['highlight'] );

            }
            // has highlight color

            // has background colors and background highlight color
            if( colors['background'] !== undefined &&
                colors['background']['highlight'] !== undefined ){

                // set background color highlight 
                mbAdminApp.setStyle( self.options['id'], 'background-color', colors['background']['highlight'] );

            }
            // has background colors and background highlight color

            // has border colors and border highlight color
            if( colors['border'] !== undefined &&
                colors['border']['highlight'] !== undefined ){

                // set border color highlight 
                mbAdminApp.getElementById( self.options['id'] ).style.borderColor = colors['border']['highlight'];

            }
            // has border colors and border highlight color

        // DONE FUNCTION: highlight( void ) void
        };
        self.showDisabled = function( ){
        // FUNCTION: showDisabled( void ) void

            // has images and disabled image
            if( self.options['images'] !== undefined &&
                self.options['images']['disabled'] !== undefined ){
                
                // set disabled image
                mbAdminApp.setStyle( self.options['id'], 'background-image', self.options['images']['disabled'] );
                
            }
            // has images and disabled image

            // ! colors
            if( self.options['colors'] === undefined ){
                
                // done
                return;
                
            }   
            // ! colors
            
                
            //  get colors
            const colors = self.options['colors']; 

            // has disabled color
            if( colors['disabled'] !== undefined ){

                // set color disabled 
                mbAdminApp.setStyle( self.options['id'], 'color', colors['disabled'] );

            }
            // has disabled color

            // has background colors and background disabled color
            if( colors['background'] !== undefined &&
                colors['background']['disabled'] !== undefined ){

                // set background color disabled 
                mbAdminApp.setStyle( self.options['id'], 'background-color', colors['background']['disabled'] );

            }
            // has background colors and background disabled color

            // has border colors and border disabled color
            if( colors['border'] !== undefined &&
                colors['border']['disabled'] !== undefined ){

                // set border color disabled 
                mbAdminApp.getElementById( self.options['id'] ).style.borderColor = colors['border']['disabled'];

            }
            // has border colors and border disabled color

        // DONE FUNCTION: showDisabled( void ) void
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
            
            // ! colors
            if( self.options['colors'] === undefined ||
                self.selected ){
                
                // done
                return;
                
            }   
            // ! colors
            
            //  get colors
            const colors = self.options['colors']; 

            // has color
            if( colors['color'] !== undefined ){

                // set color
                mbAdminApp.setStyle( self.options['id'], 'color', colors['color'] );

            }
            // has color

            // has background colors and background color
            if( colors['background'] !== undefined &&
                colors['background']['color'] !== undefined ){

                // set background color
                mbAdminApp.setStyle( self.options['id'], 'background-color', colors['background']['color'] );

            }
            // has background colors and background color

            // has border colors and border color
            if( colors['border'] !== undefined &&
                colors['border']['color'] !== undefined ){

                // set border color
                mbAdminApp.setStyle( self.options['id'], 'border-color', colors['border']['color'] );

            }
            // has border colors and border color

        // DONE FUNCTION: reset( void ) void
        };
        self.click = function( event ){
        // FUNCTION: click( event: event ) void
        
            // ! enabled
            if( !self.enabled || self.selected ){

                // done
                return;
                
            }
            // ! enabled
        
            // debug info
            self.debug( 'Click' + self.options['id'] );
            
            // callback is function
            if( typeof self.callbacks['click'] === 'function' ) {
                
                // call callback
                self.callbacks['click']( event, self.options  );
                
            }
            // callback is function
                                    
        // DONE FUNCTION: click( event: event ) void
        };
        self.scroll = function( event ){
        // FUNCTION: scroll( event: event ) void
                        
            // ! enabled
            if( !self.enabled ){

                // done
                return;
                
            }
            // ! enabled
        
            // old IE support
            event = window.event || event; 
            
            // calculate delta
            let delta = event.deltaY ?
                        event.deltaY :
                        ( event.wheelDelta || event.detail ) * self.wheelDelta['factor'];
            // calculate delta
            
            // set max min
            delta = Math.max( -self.wheelDelta['maximum'], Math.min( self.wheelDelta['maximum'], delta ) );;
            
            // call callback
            self.callbacks['wheel']( event, delta );
            
        // DONE FUNCTION: scroll( event: event ) void
        };
        self.keyUp = function( event ){
        // FUNCTION: keyUp( event: event ) void
                        
            // ! enabled
            if( !self.enabled ){

                // done
                return;
                
            }
            // ! enabled

            // callback is function
            if( typeof self.callbacks['keyUp'] === 'function' ) {
                
                // call callback
                self.callbacks['keyUp']( event, self.options  );
                
            }
            // callback is function
            
        // DONE FUNCTION: keyUp( event: event ) void
        };
        self.keyDown = function( event ){
        // FUNCTION: keyDown( event: event ) void
                        
            // ! enabled
            if( !self.enabled ){

                // done
                return;
                
            }
            // ! enabled
        
            // callback is function
            if( typeof self.callbacks['keyDown'] === 'function' ) {
                
                // call callback
                self.callbacks['keyDown']( event, self.options  );
                
            }
            // callback is function
            
        // DONE FUNCTION: keyDown( event: event ) void
        };
        self.refresh = function( ){
        // FUNCTION: refresh( void ) void
        
            // debug info
            self.debug( 'refresh' );

            // mouse is over / else
            if( self.mouseIsOver ){
            
                // highlight
                self.highlight();
                
            }
            else {
                
                // reset
                self.reset();
                
            }
            // mouse is over / else
            
        // DONE FUNCTION: refresh( void ) void
        };
        self.refreshEvents = function( ){
        // FUNCTION: refreshEvents( void ) void
        
            // remove events
            self.removeEvents();
        
            // add events
            self.addEvents();
        
        // DONE FUNCTION: refreshEvents( void ) void
        };
        self.disable = function() {
        // FUNCTION: disable( void ) void
            
            // debug info
            self.debug( 'disable' );

            // disable
            self.enabled = false;

            // show disabled
            self.showDisabled();

        // DONE FUNCTION: disable( void ) void
        };
        self.enable = function() {
        // FUNCTION: enable( void ) void
            
            // debug info
            self.debug( 'enable' );

            // disable
            self.enabled = true;

            // reset
            self.reset();

        // DONE FUNCTION: enable( void ) void
        };
        self.setColors = function( colors ){
        // FUNCTION: setColors( named array: colors  ) void
        
            // debug info
            self.debug( 'setColors' );
            
            // set colors
            self.options['colors'] = colors;
            
            // refresh
            self.refresh();

        // DONE FUNCTION: setColors( named array: colors ) void
        };
        self.setOption = function( option, value ){
        // FUNCTION: setOption( string: option, var: value ) void
        
            // debug info
            self.debug( 'setColors' );
            
            // set option
            self.options[option] = value;
            
        // DONE FUNCTION: setOption( string: option, var: value ) void
        };
        self.select = function() {
        // FUNCTION: select( void ) void
            
            // set selected
            self.selected = true;
            
            // ! colors
            if( self.options['colors'] === undefined ){
                
                // done
                return;
                
            }   
            // ! colors
            
            //  get colors
            const colors = self.options['colors']; 

            // has selected color
            if( colors['selected'] !== undefined ){

                // set color
                mbAdminApp.setStyle( self.options['id'], 'color', colors['selected'] );

            }
            // has selected color

            // has background colors and selected background color
            if( colors['background'] !== undefined &&
                colors['background']['selected'] !== undefined ){

                // set background color
                mbAdminApp.setStyle( self.options['id'], 'background-color', colors['background']['selected'] );

            }
            // has background colors and selected background color

            // has border colors and selected border color
            if( colors['border'] !== undefined &&
                colors['border']['selected'] !== undefined ){

                // set border color
                mbAdminApp.setStyle( self.options['id'], 'border-color', colors['border']['selected'] );

            }
            // has border colors and selected border color
            
        // DONE FUNCTION: select( void ) void
        };
        self.deSelect = function() {
        // FUNCTION: deSelect( void ) void
            
            // set selected
            self.selected = false;
            
            // refresh
            self.refresh();

        // DONE FUNCTION: deSelect( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // remove event subscription
            self.removeEventSubscriptions();
            
            // remove events
            self.removeEvents();
            
            // remove html
            self.removeHtml();
            
            // unset options
            self.options = null;
            
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
            
            // FUNCTION: getContainerId( void ) html element id
            getContainerId : function( ){
                
                // return id
                return self.options['id'];
                
            },
            // FUNCTION: setOption( string: option, var: value ) void
            setOption : function( option, value ){
                
                // call internal
                return self.setOption( option, value ) ;
                
            },
            // FUNCTION: getOptions( void ) named array
            getOptions : function( ){
                
                // return options
                return self.options;
                
            },
            // FUNCTION: getOptions( named array: colors ) void
            setColors : function( colors ){
                
                // call internal
                self.setColors( colors );
                
            },
            // FUNCTION: refresh( void ) void    
            refresh : function( ){
                
                // call internal
                self.refresh( );
                
            },
            // FUNCTION: refreshEvents( void ) void    
            refreshEvents : function( ){
                
                // call internal
                self.refreshEvents( );
                
            },
            // FUNCTION: disable( void ) void    
            disable : function( ){
                
                // call internal
                self.disable( );
                
            },
            // FUNCTION: enable( void ) void    
            enable : function( ){
                
                // call internal
                self.enable( );
                
            },
            // FUNCTION: select( void ) void    
            select : function( ){
                
                // call internal
                self.select( );
                
            },
            // FUNCTION: deSelect( void ) void    
            deSelect : function( ){
                
                // call internal
                self.deSelect( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: buttonModule( html element id: parentId, 
    //                            named array: options,
    //                            named array: callbacks ) named array
    
})( mbAdminApp );
// done create module function


